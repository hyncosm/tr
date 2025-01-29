<template>
    <div>
        <div id="fixed_header"
            class="fixed flex flex-wrap z-20 w-full top-0 uppercase lg:px-10 px-5 py-3 border-b bg-white">
            <div class="bg-white w-full">
                <div class="flex w-full items-center justify-between">
                    <div class="flex-1 flex items-center justify-start">
                        <span class="rounded-md w-16">
                            <img src="@/assets/logo.png" class="w-full h-full" alt="">
                        </span>
                    </div>
                    <div @click="logout()" class="flex cursor-pointer bg-white items-center gap-2 duration-200">
                        <icn name="exit" class="h-4 w-4 fill-current" />
                        <span class="text-xs font-medium leading-6">Deconnexion</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="admin_container" class="flex h-[100vh] overflow-scroll w-full"
            :style="{ 'padding-top': `${fixedHeaderHeight}px` }">
            <div id="menu_sidebar" class="h-full fixed z-10 hidden lg:block">
                <Menu :menuItems="menuItems" :footerMenuItems="menuFooterItems"></Menu>
            </div>
            <div class="flex lg:hidden">
                <sitckySideBar>
                    <template v-slot:title>
                        Menu
                    </template>
                    <template v-slot:content="{ toggle }">
                        <ul class="w-full">
                            <li v-for="(menuItem, index) in menuItems" :key="index" v-if="menuItem.showInMobile"
                                @click="toggle">
                                <RouterLink :to="menuItem.link" class="flex items-center gap-2 px-10 py-4">
                                    <icn :name="menuItem.icon" class="w-5 h-5 icn fill-current" />
                                    <span>{{ menuItem.name }}</span>
                                </RouterLink>
                            </li>
                        </ul>
                    </template>
                </sitckySideBar>
            </div>

            <div id="main_page_admin" class="w-full h-full pb-5 flex flex-col gap-5 relative"
                :style="{ 'padding-left': `${sideBarWidth}px` }">

                <div class="w-full flex items-center justify-between p-4 ">
                    <breadcrumb />
                    <div class=" hidden lg:flex py-2 px-4 rounded-md text-white bg-gray-800 text-base cursor-pointer flex gap-2 items-center"
                        @click="newProduct">
                        Ajouter un produit
                    </div>
                </div>

                <div class="w-full shadow-[#E2ECF980] mx-auto pb-5 px-4">
                    <RouterView />
                </div>
            </div>
        </div>


        <pop-up :active="showAddNewProductPopUp" size="xl" :hideCancel="true" :removable="false">
            <template v-slot:content>
                <section class="py-4 bg-white relative">
                    <div @click="showAddNewProductPopUp = false" class="absolute top-5 right-5">
                        <icn name="plus" class="h-4 w-4 fill-current mr-2 rotate-45 ml-1 m-auto cursor-pointer" />
                    </div>
                    <div class="w-full text-center p-4 font-bold text-xl">
                        Ajouter un nouveau produit
                    </div>

                    <div class="p-6 mx-auto bg-white">
                        <form @submit.prevent="submitProductForm" class="space-y-6 text-xs md:text-sm">

                            <!-- Name (FR) and Name (EN) -->
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="flex-1">
                                    <label for="nameFR" class="block text-gray-700">Nom (FR)</label>
                                    <input v-model="newProductData.nameFR" type="text" id="nameFR"
                                        placeholder="Enter Name in French" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="nameEN" class="block text-gray-700">Nom (EN)</label>
                                    <input v-model="newProductData.nameEN" type="text" id="nameEN"
                                        placeholder="Enter Name in English" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="nameAR" class="block text-gray-700">Nom (AR)</label>
                                    <input v-model="newProductData.nameAR" type="text" id="nameAR"
                                        placeholder="Enter Name in Arabic" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                            </div>

                            <!-- Pictures and Video URL -->
                            <div class="flex flex-col md:flex-row items-center gap-4">
                                <div class="w-full flex flex-row items-center gap-2">
                                    <span v-if="newProductData.pictures[0]">
                                        <img :src="newProductData.pictures[0]" class="w-40" alt="">
                                    </span>
                                    <div class="flex-1">
                                        <label for="pictures" class="block text-gray-700">Photo du produit</label>
                                        <input v-model="newProductData.pictures[0]" type="text" id="pictures"
                                            placeholder="Enter URLs" required
                                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                    </div>
                                </div>
                                <div class="w-full flex flex-col gap-2">
                                    <div class="flex-1">
                                        <label for="video" class="block text-gray-700">Video URL</label>
                                        <input v-model="newProductData.video" type="text" id="video"
                                            placeholder="Enter Video URL"
                                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                    </div>
                                </div>
                            </div>

                            <!-- Price and Old Price -->
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="flex-1">
                                    <label for="price" class="block text-gray-700">Prix</label>
                                    <input v-model="newProductData.price" type="number" id="price"
                                        placeholder="Enter Price" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="oldPrice" class="block text-gray-700">Ancien prix</label>
                                    <input v-model="newProductData.oldPrice" type="number" id="oldPrice"
                                        placeholder="Enter Old Price" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="currency" class="block text-gray-700">Devise</label>
                                    <input v-model="newProductData.currency" type="text" id="currency"
                                        placeholder="Enter Currency" required disabled
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                                <div class="flex-1">
                                    <label for="discount" class="block text-gray-700">Réductions</label>
                                    <input v-model="newProductData.discount" type="number" id="discount"
                                        placeholder="Enter Discount" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                            </div>

                            <!-- Main Category Dropdown -->
                            <div class="mt-4">
                                <label for="mainCategory" class="block text-gray-700">Catégorie</label>
                                <select v-model="selectedMainCategory" id="mainCategory"
                                    class="form-select px-4 py-3 border border-gray-100 mt-2 bg-gray-50 rounded-lg block w-full text-gray-500 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                    <option value="" disabled selected>Sélectionnez une catégorie principale</option>
                                    <option v-for="itm in categories" :value="itm">
                                        {{ itm.nameFR }}
                                    </option>
                                </select>
                            </div>

                            <!-- Sub Category Dropdown -->
                            <div class="mt-4" v-if="selectedMainCategory">
                                <label for="subCategory" class="block text-gray-700">Sous-catégorie</label>
                                <select v-model="newProductData.category.sub" id="subCategory"
                                    class="form-select px-4 py-3 border border-gray-100 mt-2 bg-gray-50 rounded-lg block w-full text-gray-500 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                    <option :value="''" disabled selected>Sélectionnez une sous-catégorie</option>
                                    <option v-for="sub in selectedMainCategory.subs" :value="sub.nameEN">
                                        {{ sub.nameFR }}
                                    </option>
                                </select>
                            </div>

                            <div class="mt-4">
                                <label for="ownerName" class="block text-gray-700">Nom de marque</label>
                                <select v-model="newProductData.brand" id="brand"
                                    class="form-select px-4 py-3 border border-gray-100 mt-2 bg-gray-50 rounded-lg block w-full text-gray-500 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                    <option :value="''" disabled selected>Sélectionnez une marque</option>
                                    <option v-for="brand in brands" :value="brand.name">
                                        {{ brand.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="mt-4">
                                <label for="genders" class="block text-gray-700">Spécifiques au sexe</label>
                                <select v-model="newProductData.genders" id="genders" multiple required
                                    class="form-select px-4 py-3 border border-gray-100 mt-2 bg-gray-50 rounded-lg block w-full text-gray-500 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                    <option value="female">Femme</option>
                                    <option value="male">Homme</option>
                                </select>
                            </div>

                            <div class="mt-4">
                                <label for="descriptionFR" class="block text-gray-700">Description (FR)</label>
                                <textarea v-model="newProductData.descriptionFR" id="descriptionFR" rows="3"
                                    placeholder="Enter Description in French" required
                                    class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                            </div>

                            <div class="mt-4">
                                <label for="descriptionEN" class="block text-gray-700">Description (EN)</label>
                                <textarea v-model="newProductData.descriptionEN" id="descriptionEN" rows="3"
                                    placeholder="Enter Description in English" required
                                    class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                            </div>

                            <div class="mt-4">
                                <label for="descriptionAR" class="block text-gray-700">Description (AR)</label>
                                <textarea v-model="newProductData.descriptionAR" id="descriptionAR" rows="3"
                                    placeholder="Enter Description in Arabic" required
                                    class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"></textarea>
                            </div>
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="flex-1">
                                    <label for="bestSeller" class="block text-gray-700">Best Seller</label>
                                    <select v-model="newProductData.bestSeller" id="bestSeller" required
                                        class="form-select px-4 py-3 border border-gray-100 mt-2 bg-gray-50 rounded-lg block w-full text-gray-500 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                <div class="flex-1">
                                    <label for="discount" class="block text-gray-700">Quantity</label>
                                    <input v-model="newProductData.quantity" type="number" id="quantity"
                                        placeholder="Quantity" required
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none" />
                                </div>
                            </div>
                            <div class="w-full flex justify-center">
                                <button type="submit"
                                    class="w-1/2 bg-gray-900 hover:bg-gray-600 text-white font-semibold rounded-lg px-4 py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </template>
        </pop-up>
    </div>

</template>

<script>
import sitckySideBar from "@/components/stickySideBar.vue";
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import LoadingOverlay from '@/components/admin/LoadingOverlay.vue'
import Menu from '@/components/admin/Menu.vue'
export default {
    components: { Breadcrumb, Menu, LoadingOverlay, sitckySideBar },
    data() {
        return {
            fixedHeaderHeight: 0,
            sideBarWidth: 0,
            menuItems: [
                {
                    name: 'Dashboard',
                    icon: 'dashboard',
                    link: '/admin/dashboard',
                    showInMobile: true,
                    children: []
                },
                {
                    name: 'Commandes',
                    icon: 'demandes',
                    link: '/admin/commandes',
                    showInMobile: true,
                    children: []
                },
                {
                    name: 'Produits',
                    icon: 'produit',
                    link: '/admin/produits',
                    showInMobile: false,
                    children: []
                },

            ],
            menuFooterItems: [
                {
                    name: 'Settings',
                    icon: 'settings-n',
                    link: '/admin/settings?tab=categories',
                },
            ],

            showAddNewProductPopUp: false,
            newProductData: {
                nameFR: '',
                nameEN: '',
                nameAR: '',
                pictures: [],
                video: '',
                category: {
                    main: '',
                    sub: '',
                },
                brand: '',
                price: 0,
                currency: 'MAD',
                oldPrice: 0,
                stars: 0,
                sales: 0,
                discount: 0,
                genders: ['female'],
                descriptionFR: '',
                descriptionEN: '',
                descriptionAR: '',
                bestSeller: 'false',
                quantity:0
            },
            categories: [],
            selectedMainCategory: '',
        }
    },
    computed: {

    },
    mounted() {
        this.getCategories();
        this.getBrands();
        this.updateFixedDimensions();
        window.addEventListener('resize', this.updateFixedDimensions);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateFixedDimensions);
    },
    methods: {
        updateFixedDimensions() {
            // Get the height of the fixed header element
            const fixedHeader = document.getElementById('fixed_header');
            if (fixedHeader) {
                const computedStyleHeader = window.getComputedStyle(fixedHeader);
                const height = fixedHeader.offsetHeight;
                const paddingTop = parseFloat(computedStyleHeader.paddingTop);
                const paddingBottom = parseFloat(computedStyleHeader.paddingBottom);

                this.fixedHeaderHeight = height + paddingTop + paddingBottom;
            }
            const sidebar = document.getElementById('sidebarMenu');
            if (sidebar) {
                const computedStyleSideBar = window.getComputedStyle(sidebar);
                const width = sidebar.offsetWidth;
                console.log(width)
                const paddingLeft = parseFloat(computedStyleSideBar.paddingLeft);
                const paddingRight = parseFloat(computedStyleSideBar.paddingRight);
                this.sideBarWidth = width + paddingLeft + paddingRight;
            }
        },
        newProduct() {
            !this.$route.path.includes('admin/produits') ? this.$router.push({ 'name': 'admin-produits' }) : this.showAddNewProductPopUp = true
        },
        logout() {
            window.localStorage.removeItem('x-auth-token')
            window.localStorage.removeItem('uid')
            // window.localStorage.removeItem('x-refresh-token')
            window.open('/admin/login', '_self')
        },
        async getBrands() {
            try {
                const resp = await this.$http.get('/brand')
                if (resp.status) {
                    this.brands = resp.data
                    this.$store.dispatch('setBrands', this.brands)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getCategories() {
            try {
                const resp = await this.$http.get('/category')
                if (resp.status) {
                    this.categories = resp.data
                    this.$store.dispatch('setCategories', this.categories)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async submitProductForm() {
            try {
                this.newProductData.category.main = this.selectedMainCategory.nameEN
                const response = await this.$http.post('/product/add', { product: this.newProductData });
                if (response.status === 200) {
                    this.$store.dispatch('setProduct', response.data)
                    this.$toast.open({
                        message: 'Le produit a bien été ajouté',
                        type: 'success',
                        position: 'top-right'
                    });
                    this.newProductData = {
                        nameFR: '',
                        nameEN: '',
                        nameAR: '',
                        pictures: '',
                        video: '',
                        category: {
                            main: '',
                            sub: '',
                        },
                        brand:'',
                        price: 0,
                        currency: 'MAD',
                        oldPrice: 0,
                        stars: 0,
                        sales: 0,
                        discount: 0,
                        genders: [],
                        descriptionFR: '',
                        descriptionEN: '',
                        descriptionAR: '',
                        bestSeller: 'false',
                        quantity:0
                    }
                    this.showAddNewProductPopUp = false;
                    // Optionally clear the form or close the popup here
                }
            } catch (error) {
                console.error('Error adding product:', error);
            }
        },
    },
    watch: {

    }

}
</script>

<style></style>