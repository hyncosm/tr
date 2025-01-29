<template>
    <div class="my-4 flex flex-col gap-5 p-5 bg-white">
        <div class="flex flex-row justify-between">
            <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3">
                    <icn name="search" class="mx-1 h-5 w-5 fill-current text-gray-900" />
                </div>
                <input type="text"
                    class="focus:border focus:border-sky-500 text-gray-900 border border-gray-500 rounded-md rounded-lg pl-10 p-2"
                    placeholder="Rechercher" v-model="filters.inputSearch" @input="debouncedSearch" />
            </div>
            <div class="flex flex-row gap-2 justify-evenly">
                <select class="block p-2  text-gray-900 border border-gray-500 rounded-md  rounded-lg" v-model="filters.categorie">
                    <option selected value="">Catégorie</option>
                    <option :value="itm.nameEN" v-for="itm in $store.state.categories">{{ itm.nameFR }}</option>
                </select>
                <select class="block p-2  text-gray-900 border border-gray-500 rounded-md  rounded-lg" v-model="filters.subCategorie" v-if="filters.categorie != '' && filters.categorie">
                    <option selected value="">Sous-catégorie</option>
                    <option :value="itm.nameEN" v-for="itm in  $store.state.categories.find(el => el.nameEN === filters.categorie).subs">{{ itm.nameFR }}</option>
                </select>
                <select class="block p-2 text-gray-900 border border-gray-500 rounded-md  rounded-lg" v-model="filters.marque">
                    <option selected value="">Marque</option>
                    <option :value="itm.name" v-for="itm in $store.state.brands">{{ itm.name }}</option>

                </select>
                <select class="block p-2 text-gray-900 border border-gray-500 rounded-md  rounded-lg" v-model="filters.sex">
                    <option selected value="">Sex</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                </select>
            </div>
        </div>
        <template v-if="isLoaded">

            <div class="shadow-md relative w-full rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                ID Produit
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Nom
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Catégorie
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Marque
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Prix
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Sex
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(produit, key) in produits" :key="key">
                        <tr class="bg-white border-b cursor-pointer duration-300 hover:bg-gray-100"
                            @click="setSelectedProduct(produit)">
                            <td class="px-4 py-4">
                                {{ produit._id.substring(0, 8) }}
                            </td>
                            <td class="px-4 py-4">
                                {{ produit.nameFR }}
                            </td>
                            <td class="px-4 py-4">
                                {{ produit.category.main }}
                            </td>
                            <td class="px-4 py-4">
                                {{ produit.brand }}
                            </td>
                            <td class="px-4 py-4">
                                {{ produit.price.toFixed(2) }} MAD
                            </td>
                            <td class="px-4 py-4">
                                <div class="flex flex-col gap-2">
                                    <span v-for="gender in produit.genders ">{{ gender | gender }}</span>
                                </div>
                            </td>
                            <td class="px-4 py-4">
                                {{ produit.quantity }}
                            </td>
                        </tr>
                        <tr v-if="selectedProduct != null && produit._id === selectedProduct._id">
                            <td :colspan="7">
                                <div
                                    class="w-full p-4 bg-gray-50 rounded flex flex-row items-center justify-between gap-5 whitespace-nowrap">
                                    <div class="w-1/4">
                                        <img :src="selectedProduct.pictures[0]" class="w-[15rem] h-[15rem]">
                                    </div>
                                    <div class="w-full flex flex-col gap-5">
                                        <div class="flex gap-10">
                                            <div class="w-auto px-5 border-l border-gray-900">
                                                <div class="text-sm font-bold mb-4">Information du Produit</div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Nom :
                                                    </span>
                                                    <span>
                                                        {{ selectedProduct.nameFR }}
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Marque :
                                                    </span>
                                                    <span>
                                                        {{ selectedProduct.brand }}
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Prix :
                                                    </span>
                                                    <span>
                                                        {{ selectedProduct.price }} MAD
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Ancien prix :
                                                    </span>
                                                    <span>
                                                        {{ selectedProduct.oldPrice }} MAD
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Remise :
                                                    </span>
                                                    <span>
                                                        - {{ selectedProduct.discount }} %
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Catégorie :
                                                    </span>
                                                    <span>
                                                        {{ selectedProduct.category.main }}
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4 text-xs">
                                                    <span class="font-semibold ">
                                                        Sous catégorie :
                                                    </span>
                                                    <span>
                                                        {{ selectedProduct.category.sub }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full border-t border-gray-900"></div>
                                        <div class="flex justify-between p-4 border-l border-gray-900">
                                            <div class="w-full flex items-center">
                                                <button @click="isPopupDeleteProduct = true"
                                                    class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                                    Supprimer le produit
                                                </button>
                                                <!-- <button @click="updateProduct"
                                                    class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4  md:mt-0 md:order-1">
                                                    Modifier le produit
                                                </button> -->
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="produits.length == 0">
                        <tr>
                            <td :colspan="8">
                                <EmptyState>Aucun produit n'a été ajouté pour le moment.</EmptyState>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-row justify-end mt-4">
                <div class="flex flex-row gap-1 basis-1/12 justify-end">
                    <div :class="[hasPrev ? 'border rounded-md p-2 hover:bg-gray-100 cursor-pointer' : 'border rounded-md p-2 ']"
                        @click="paginateTo('prev')">
                        <icn name="arrow-left" class="h-4 w-4 fill-current text-gray-600" />
                    </div>
                    <select class="block border text-center rounded-lg p-1" v-model="filters.limit">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <div :class="[hasNext ? 'border rounded-md p-2 hover:bg-gray-100 cursor-pointer' : 'border rounded-md p-2 ']"
                        @click="paginateTo('next')">
                        <icn name="arrow-right" class="h-4 w-4 fill-current text-gray-600" />
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <loadingSpinner />
        </template>

        <pop-up :active="isPopupDeleteProduct" size="sm" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <div class="bg-white rounded-md p-5 text-base flex flex-col gap-3 p-5">
                    <div class="font-medium text-[#FE122A] text-lg">Supprimer le produit</div>

                    <div class="w-full flex flex-col gap-2 text-[#636B75]">
                        <label class="text-sm leading-10">
                            Êtes-vous sûr(e) de vouloir supprimer le produit ? Cette action est irréversible.
                        </label>
                    </div>
                    <div class="flex flex-row-reverse items-center gap-10 mt-5">
                        <div @click="deleteProduct"
                            class="bg-[#FE122A] text-white py-3 w-4/12 rounded-md text-center text-sm font-medium cursor-pointer">
                            Supprimer le produit
                        </div>
                        <div class="py-3 text-[#101828] text-center text-sm font-medium cursor-pointer"
                            @click="isPopupDeleteProduct = false">
                            Fermer
                        </div>
                    </div>
                </div>
            </template>
        </pop-up>
    </div>
</template>

<script>
import { debounce } from "lodash";

export default {
    name: "products",
    data() {
        return {
            isPopupDeleteProduct:false,
            isLoaded:false,
            filters: {
                page: 1,
                limit: 10,
                inputSearch: '',
                categorie: '',
                subCategorie:'',
                marque: '',
                sex: '',
            },
            pagination: {},
            produits: [],
            selectedProduct: null,
            pageHasChanged: false,
            searchInputChanged: false,
        }
    },
    created() {
        this.$store.dispatch('setBreadCrumb', [
            {
                to: null,
                text: 'Gestion des produits'
            }
        ])
        this.init();
        this.debouncedSearch = debounce(this.init, 500)
    },

    unmounted() {
        this.debouncedSearch.cancel();
    },
    watch: {
        '$store.state.newProduct'(value){
            this.produits.unshift(value)
        },
        'filters.searchInput': function (newValue, oldValue) {
            this.searchInputChanged = true;
        },
        'filters.page': function (newValue, oldValue) {
            this.pageHasChanged = true;
        },
        filters: {
            handler(newVal, oldVal) {
                if (this.searchInputChanged) {
                    this.searchInputChanged = false;
                } else if (this.pageHasChanged) {
                    this.pageHasChanged = false;
                } else {
                    this.filters.page = 1
                    this.init()
                }
            },
            deep: true,
        },
    },
    computed: {
        hasNext() {
            return (this.filters.limit * this.filters.page) < this.pagination?.total
        },
        hasPrev() {
            return (this.pagination?.page > 1)
        },
    },
    methods: {
        
        setSelectedProduct(payload) {
            this.selectedProduct && this.selectedProduct._id === payload._id ? this.selectedProduct = null : this.selectedProduct = payload
        },
        async init() {
            try {
                const resp = await this.$http.get('/product/all', { params: this.filters })
                if (resp.status) {
                    this.produits = resp.data.result
                    this.pagination = resp.data.pagination
                    this.isLoaded = true
                }
            } catch (error) {
                console.log(error);
            }
        },
        paginateTo(val) {
            if (val === 'next' && this.hasNext) {
                this.filters.page++
                this.init()
            }
            if (val === 'prev' && this.hasPrev) {
                this.filters.page--
                this.init()
            }
        },
        async updateProduct() {
           console.log("updatte product")
           this.$toast.open({
                message: 'Le produit a bien été modifié',
                type: 'success',
                position: 'top-right'
            });
        },
        async deleteProduct() {

            try {
                const resp = await this.$http.post('/product/delete/'+this.selectedProduct._id )
                if (resp.status) {
                    this.produits = this.produits.filter(el => el._id != this.selectedProduct._id)
                    this.$toast.open({
                        message: 'Le produit a bien été supprimée',
                        type: 'error',
                        position: 'top-right'
                    });
                    this.isPopupDeleteProduct = false
                }
            } catch (error) {
                console.log(error)
            }
        },


    },
}
</script>

<style></style>