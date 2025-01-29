<template>
    <div class="w-full p-4 flex flex-col gap-10">
        <div class="flex flex-row-reverse w-full">
            <button @click="showAddNewBrandPopUp = true, action = 'add', newBrand = { name: '', logo : null}"
                class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4  md:mt-0 md:order-1">
                Ajouter une nouvelle marque
            </button>
        </div>
        <template v-if="isLoaded">
            <div class="w-full flex items-center gap-5" v-for="itm in brands">
                <div class="flex w-full items-center justify-between ">
                    <div class="flex items-center gap-10">
                        <img :src="itm.logo" class="w-24 rounded-full" alt="">

                        <div class="w-full py-4 font-bold text-sm">
                            {{ itm.name }}
                        </div>
                    </div>

                    <div class="p-2 flex flex-row-reverse gap-2 text-white">
                        <button
                            @click="showAddNewBrandPopUp = true, action = 'update', newBrand = JSON.parse(JSON.stringify(itm))"
                            class="block px-4 py-3 md:py-2 bg-gray-600 rounded-lg font-semibold text-sm">
                            Modifer
                        </button>
                        <button @click="selectedBrand = JSON.parse(JSON.stringify(itm)), isPopupDeleteBrand = true"
                            class="block  px-4 py-3 md:py-2 bg-red-600 rounded-lg font-semibold text-sm">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
            <div class="" v-if="brands.length == 0">
                <EmptyState>
                    Aucune categorie n'a été ajouté pour le moment.
                </EmptyState>
            </div>
        </template>
        <template v-else>
            <loadingSpinner />
        </template>

        <pop-up :active="isPopupDeleteBrand" size="sm" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <div class="bg-white rounded-md p-5 text-base flex flex-col gap-3 p-5">
                    <div class="font-medium text-[#FE122A] text-lg">Supprimer la marque</div>

                    <div class="w-full flex flex-col gap-2 text-[#636B75]">
                        <label class="text-sm leading-10">
                            Êtes-vous sûr(e) de vouloir supprimer la marque {{ selectedBrand.name }} ? Cette action est
                            irréversible.
                        </label>
                    </div>
                    <div class="flex flex-row-reverse items-center gap-10 mt-5">
                        <div @click="deleteBrand"
                            class="bg-[#FE122A] text-white py-3 w-4/12 rounded-md text-center text-sm font-medium cursor-pointer">
                            Supprimer la marque
                        </div>
                        <div class="py-3 text-[#101828] text-center text-sm font-medium cursor-pointer"
                            @click="isPopupDeleteBrand = false">
                            Fermer
                        </div>
                    </div>
                </div>
            </template>
        </pop-up>

        <pop-up :active="showAddNewBrandPopUp" size="xl" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <section class="py-4 bg-white relative">
                    <div @click="showAddNewBrandPopUp = false" class="absolute top-5 right-5">
                        <icn name="plus" class="h-4 w-4 fill-current mr-2 rotate-45 ml-1 m-auto cursor-pointer" />
                    </div>
                    <div class="w-full text-center p-4 font-bold text-xl">
                        {{ action == 'add' ? `Ajouter une nouvelle marque` : `Modifier la categorie
                        ${newBrand.name}` }}
                    </div>

                    <div class="p-6 mx-auto bg-white">
                        <form @submit.prevent="confirm" class="space-y-6 text-xs md:text-sm">

                            <!-- Name (FR) and Name (EN) -->
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (FR)</label>
                                    <input v-model="newBrand.name" type="text" id="name"
                                        placeholder="Enter nom du marque" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                            </div>

                            <div class="flex flex-col w-full items-center border-t">
                                <div class="w-full py-4 font-bold text-sm">
                                    Logo :
                                </div>
                                <div class="w-full flex items-center gap-4">
                                    <div v-if="newBrand.logo">
                                        <img :src="newBrand.logo" class="w-24 rounded-full" alt="">
                                    </div>
                                    <div class="flex-1">
                                        <input v-model="newBrand.logo" type="text" id="logo"
                                            placeholder="Logo du marque" required
                                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                    </div>

                                    <span @click="removeLogo">
                                        <icn name="delete" class="w-5 fill-current text-red-500"></icn>
                                    </span>
                                </div>
                            </div>


                            <button type="submit"
                                class="w-full bg-gray-900 text-white font-semibold rounded-lg px-4 py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Enregistrer
                            </button>
                        </form>
                    </div>
                </section>
            </template>
        </pop-up>
    </div>
</template>
<script>
export default {
    name: 'settings-categories',
    data() {
        return {
            action: null,
            isLoaded: false,
            showAddNewBrandPopUp: false,
            isPopupDeleteBrand: false,
            selectedBrand: null,
            brands: [],
            newBrand: {
                name: '',
                logo: null,
            },
        }
    },
    mounted() {
        this.fetchAll()
    },
    methods: {
        removeLogo() {
            this.newBrand.logo = null
        },
        async deleteBrand() {
            try {
                const resp = await this.$http.post('/brand/delete/' + this.selectedBrand._id)
                if (resp.status) {
                    this.brands = this.brands.filter(el => el._id != this.selectedBrand._id)
                    this.isPopupDeleteBrand = false
                }
                this.$toast.open({
                    message: 'Marque a bien été supprimée',
                    type: 'error',
                    position: 'top-right'
                });
            } catch (error) {
                console.log(error)
            }
        },
        async fetchAll() {
            try {
                const resp = await this.$http.get('/brand')
                if (resp.status) this.brands = resp.data
                this.isLoaded = true
            } catch (error) {
                console.log(error)
            }
        },

        async confirm() {
            try {
                if (this.action == 'add') {

                    const resp = await this.$http.post('/brand', this.newBrand)
                    if (resp.status) this.brands.unshift(resp.data)
                    this.showAddNewBrandPopUp = false
                    this.$toast.open({
                        message: 'Marque a bien été ajoutée',
                        type: 'success',
                        position: 'top-right'
                    });
                } else {
                    const resp = await this.$http.post('/brand/' + this.newBrand._id, this.newBrand)
                    if (resp.status) this.brands = this.brands.map(elm => elm._id === resp.data._id ? resp.data : elm);
                    this.showAddNewBrandPopUp = false
                    this.$toast.open({
                        message: 'Marque a bien été modifiée',
                        type: 'success',
                        position: 'top-right'
                    });
                }
                this.newBrand = {
                    name: '',
                    logo: null,
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>