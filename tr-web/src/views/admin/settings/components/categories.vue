<template>
    <div class="w-full p-4 flex flex-col gap-10">
        <div class="flex flex-row-reverse w-full">
            <button @click="addNew"
                class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4  md:mt-0 md:order-1">
                Ajouter une nouvelle categorie
            </button>
        </div>
        <template v-if="isLoaded">
            <div class="w-full flex items-center gap-5" v-for="itm in categories">
                <div class="w-full flex flex-col items-start gap-5 p-4 border rounded-md">
                    <div class="w-full">
                        <div class="text-sm font-bold pb-2">
                            Categorie principale :
                        </div>
                        <div class="pl-10 whitespace-nowrap pr-10 flex flex-col gap-2 ">
                            <span>{{ itm.nameFR }}</span>

                        </div>
                    </div>
                    <div class="w-full">
                        <div class="text-sm font-bold pb-2">
                            Description :
                        </div>
                        <div class="pl-10 pr-10 flex flex-col gap-2 ">
                            <span>{{ itm.descFR }}</span>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-2 ">
                        <div class="text-sm font-bold">
                            Sous categories :
                        </div>
                        <div class="flex items-start gap-5 pl-10 w-full flex-wrap">
                            <ul class="px-5 list-disc">
                                <li v-for="(sub, index) in itm.subs">
                                    <span>{{ sub.nameFR }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="w-full p-2 flex flex-row-reverse gap-2 text-white">
                        <button @click="showCategoryDetails = true, selectedCategory = JSON.parse(JSON.stringify(itm))"
                            class="block px-4 py-3 md:py-2 bg-gray-200 rounded-lg text-gray-900 font-semibold text-sm">
                            Details
                        </button>
                        <button
                            @click="showAddNewCategoriePopUp = true, action = 'update', newCategory = JSON.parse(JSON.stringify(itm))"
                            class="block px-4 py-3 md:py-2 bg-gray-600 rounded-lg font-semibold text-sm">
                            Modifer
                        </button>
                        <button @click="deleteCategory(itm)"
                            class="block  px-4 py-3 md:py-2 bg-red-600 rounded-lg font-semibold text-sm">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
            <div class="" v-if="categories.length == 0">
                <EmptyState>
                    Aucune categorie n'a été ajouté pour le moment.
                </EmptyState>
            </div>
        </template>
        <template v-else>
            <loadingSpinner />
        </template>

        <pop-up :active="isPopupDeleteCategory" size="sm" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <div class="bg-white rounded-md p-5 text-base flex flex-col gap-3 p-5">
                    <div class="font-medium text-[#FE122A] text-lg">Supprimer la categorie</div>

                    <div class="w-full flex flex-col gap-2 text-[#636B75]">
                        <label class="text-sm leading-10">
                            Êtes-vous sûr(e) de vouloir supprimer la categorie {{ selectedCategory.nameFR }} ? Cette
                            action est irréversible.
                        </label>
                    </div>
                    <div class="flex flex-row-reverse items-center gap-10 mt-5">
                        <div @click="removeCategory"
                            class="bg-[#FE122A] text-white py-3 w-4/12 rounded-md text-center text-sm font-medium cursor-pointer">
                            Supprimer la categorie
                        </div>
                        <div class="py-3 text-[#101828] text-center text-sm font-medium cursor-pointer"
                            @click="isPopupDeleteCategory = false">
                            Fermer
                        </div>
                    </div>
                </div>
            </template>
        </pop-up>

        <pop-up :active="showAddNewCategoriePopUp" size="xl" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <section class="py-4 bg-white relative">
                    <div @click="showAddNewCategoriePopUp = false" class="absolute top-5 right-5">
                        <icn name="plus" class="h-4 w-4 fill-current mr-2 rotate-45 ml-1 m-auto cursor-pointer" />
                    </div>
                    <div class="w-full text-center p-4 font-bold text-xl">
                        {{ action == 'add' ? `Ajouter une nouvelle categorie` : `Modifier la categorie
                        ${newCategory.nameFR}` }}
                    </div>

                    <div class="p-6 mx-auto bg-white">
                        <form @submit.prevent="sendData" class="space-y-6 text-xs md:text-sm">
                            <div class="flex-1">
                                <span v-if="newCategory.banner && newCategory.banner != ''" class="pb-2">
                                    <img :src="newCategory.banner" class="w-[30rem] mx-auto" alt="">
                                </span>
                                <label for="nameFR" class="block text-gray-700">Banner</label>
                                <input v-model="newCategory.banner" type="text" id="banner" placeholder="Banner url"
                                    required
                                    class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />

                            </div>
                            <!-- Name (FR) and Name (EN) -->
                            <div class="flex flex-col gap-4 border-b pb-5">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (FR)</label>
                                    <input v-model="newCategory.nameFR" type="text" id="nameFR"
                                        placeholder="Enter Name in French" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="mt-4">
                                    <label for="descriptionFR" class="block text-gray-700">Description (FR)</label>
                                    <textarea v-model="newCategory.descFR" id="descriptionFR" rows="3"
                                        placeholder="Enter Description in French" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                                </div>
                            </div>

                            <div class="flex flex-col gap-4 border-b pb-5">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (AR)</label>
                                    <input v-model="newCategory.nameAR" type="text" id="nameAR"
                                        placeholder="Enter Name in Arabic" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="mt-4">
                                    <label for="descriptionFR" class="block text-gray-700">Description (AR)</label>
                                    <textarea v-model="newCategory.descAR" id="descriptionAR" rows="3"
                                        placeholder="Enter Description in Arabic" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (EN)</label>
                                    <input v-model="newCategory.nameEN" type="text" id="nameEN"
                                        placeholder="Enter Name in English" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="mt-4">
                                    <label for="descriptionFR" class="block text-gray-700">Description (EN)</label>
                                    <textarea v-model="newCategory.descEN" id="descriptionEN" rows="3"
                                        placeholder="Enter Description in English" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                                </div>
                            </div>

                            <div class="flex w-full items-center gap-4 pb-5 border-t">
                                <div class="w-full py-4 font-bold text-sm">
                                    Sous categories :
                                </div>
                                <span @click="addSub">
                                    <Icn name="plus" class="w-5 h-5 fill-current cursor-pointer"></Icn>

                                </span>
                            </div>
                            <div class="flex flex-row items-center gap-4" v-for="(sub, index) in newCategory.subs">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (FR)</label>
                                    <input v-model="sub.nameFR" type="text" id="nameFR"
                                        placeholder="Enter Name in French" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="nameEN" class="block text-gray-700">Name (EN)</label>
                                    <input v-model="sub.nameEN" type="text" id="nameEN"
                                        placeholder="Enter Name in English" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="nameAR" class="block text-gray-700">Name (AR)</label>
                                    <input v-model="sub.nameAR" type="text" id="nameAR"
                                        placeholder="Enter Name in English" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>

                                <span class="mt-5 cursor-pointer" @click="removeSub(index)">
                                    <icn name="delete" class="w-5 fill-current text-red-500"></icn>
                                </span>
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

        <pop-up :active="showCategoryDetails" size="xl" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <section class="py-4 bg-white relative">
                    <div @click="showCategoryDetails = false" class="absolute top-5 right-5">
                        <icn name="plus" class="h-4 w-4 fill-current mr-2 rotate-45 ml-1 m-auto cursor-pointer" />
                    </div>
                    <div class="w-full text-center p-4 font-bold text-xl">
                        {{ `Categorie ${selectedCategory.nameFR}` }}
                    </div>

                    <div class="p-6 mx-auto bg-white">
                        <form @submit.prevent="" class="space-y-6 text-xs md:text-sm">
                            <span v-if="selectedCategory.banner && selectedCategory.banner != ''" class="pb-2 w-full">
                                <img :src="selectedCategory.banner" class="w-[30rem] mx-auto" alt="">
                            </span>
                            <!-- Name (FR) and Name (EN) -->
                            <div class="flex flex-col gap-4 border-b pb-5">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (FR)</label>
                                    <input v-model="selectedCategory.nameFR" type="text" id="nameFR"
                                        placeholder="Enter Name in French" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="mt-4">
                                    <label for="descriptionFR" class="block text-gray-700">Description (FR)</label>
                                    <textarea v-model="selectedCategory.descFR" id="descriptionFR" rows="3"
                                        placeholder="Enter Description in French" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                                </div>
                            </div>

                            <div class="flex flex-col gap-4 border-b pb-5">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (AR)</label>
                                    <input v-model="selectedCategory.nameAR" type="text" id="nameAR"
                                        placeholder="Enter Name in Arabic" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="mt-4">
                                    <label for="descriptionFR" class="block text-gray-700">Description (AR)</label>
                                    <textarea v-model="selectedCategory.descAR" id="descriptionAR" rows="3"
                                        placeholder="Enter Description in Arabic" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (EN)</label>
                                    <input v-model="selectedCategory.nameEN" type="text" id="nameEN"
                                        placeholder="Enter Name in English" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="mt-4">
                                    <label for="descriptionFR" class="block text-gray-700">Description (EN)</label>
                                    <textarea v-model="selectedCategory.descEN" id="descriptionEN" rows="3"
                                        placeholder="Enter Description in English" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                                </div>
                            </div>

                            <div class="flex w-full items-center gap-4 pb-5 border-t">
                                <div class="w-full py-4 font-bold text-sm">
                                    Sous categories :
                                </div>
                            </div>
                            <div class="flex flex-row items-center gap-4" v-for="(sub, index) in selectedCategory.subs">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Name (FR)</label>
                                    <input v-model="sub.nameFR" type="text" id="nameFR"
                                        placeholder="Enter Name in French" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="nameEN" class="block text-gray-700">Name (EN)</label>
                                    <input v-model="sub.nameEN" type="text" id="nameEN"
                                        placeholder="Enter Name in English" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="nameAR" class="block text-gray-700">Name (AR)</label>
                                    <input v-model="sub.nameAR" type="text" id="nameAR"
                                        placeholder="Enter Name in English" disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                            </div>
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
            showCategoryDetails: false,
            showAddNewCategoriePopUp: false,
            isPopupDeleteCategory: false,
            categories: [],
            newCategory: {
                banner: '',
                nameAR: '',
                descAR: '',
                nameFR: '',
                descFR: '',
                nameEN: '',
                descEN: '',
                subs: []
            },
            selectedCategory: null
        }
    },
    mounted() {
        this.fetchAll()
    },
    methods: {
        addNew() {
            this.showAddNewCategoriePopUp = true
            this.action = 'add'
            this.newCategory = {
                banner: '',
                nameAR: '',
                descAR: '',
                nameFR: '',
                descFR: '',
                nameEN: '',
                descEN: '',
                subs: []
            }
        },
        deleteCategory(payload) {
            this.selectedCategory = payload
            this.isPopupDeleteCategory = true
        },
        async removeCategory() {
            try {
                const resp = await this.$http.post('/category/delete/' + this.selectedCategory._id)
                if (resp.status) {
                    this.categories = this.categories.filter(el => el._id != this.selectedCategory._id)
                    this.isPopupDeleteCategory = false
                }
                this.$toast.open({
                    message: 'Categorie a bien été supprimée',
                    type: 'error',
                    position: 'top-right'
                });
            } catch (error) {
                console.log(error)
            }
        },
        async fetchAll() {
            try {
                const resp = await this.$http.get('/category')
                if (resp.status) this.categories = resp.data
                this.isLoaded = true
            } catch (error) {
                console.log(error)
            }
        },
        removeSub(index) {
            this.newCategory.subs.splice(index, 1);
        },
        addSub() {
            console.log('add sub')
            this.newCategory.subs.push({
                nameAR: '',
                nameEn: '',
                nameFR: '',
            })
        },
        async sendData() {
            try {
                if (this.action == 'add') {
                    const resp = await this.$http.post('/category', this.newCategory)
                    if (resp.status) this.categories.unshift(resp.data)
                    this.showAddNewCategoriePopUp = false
                    this.$toast.open({
                        message: 'Categorie a bien été ajoutée',
                        type: 'success',
                        position: 'top-right'
                    });
                } else {
                    const resp = await this.$http.post('/category/' + this.newCategory._id, this.newCategory)
                    if (resp.status) this.categories = this.categories.map(elm => elm._id === resp.data._id ? resp.data : elm);
                    this.showAddNewCategoriePopUp = false
                    this.$toast.open({
                        message: 'Categorie a bien été modifiée',
                        type: 'success',
                        position: 'top-right'
                    });
                }
                this.newCategory = {
                    banner: '',
                    nameAR: '',
                    descAR: '',
                    nameFR: '',
                    descFR: '',
                    nameEN: '',
                    descEN: '',
                    subs: []
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>