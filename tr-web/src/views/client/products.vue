<template>
    <div class="w-full">
        <div class="lg:py-10 py-5 flex items-center">
            <span class="w-full border-t lg:border-2 border-black"></span>
            <span class="w-full text-center mx-2 text-lg lg:text-3xl font-base font-[titillium-web-black] uppercase">{{
                $t("mainPage.cosmétiquePage.title") }}</span>
            <span class="w-full border-t lg:border-2 border-black"></span>
        </div>
        <div class="flex items-start md:my-10 md:gap-4">
            <div class="w-4/12 hidden md:flex" v-if="!isMobile">
                <filtersSideBar @updatedProductsFilter="filterProducts" />
            </div>
            <div class="flex md:hidden" v-if="isMobile">
                <sitckSideBar>
                    <template v-slot:title>
                        {{ $t("filter") }}
                    </template>
                    <template v-slot:content>
                        <filtersSideBar @updatedProductsFilter="filterProducts" />
                    </template>
                </sitckSideBar>
            </div>
            <div class="w-full flex flex-col gap-5 border py-4">
                <div class="flex items-center justify-end gap-3 px-8 md:mb-5 capitalize">
                    <div class="text-xs w-3/5 lg:w-1/4 md:text-base text-center border rounded-lg px-4 py-2 cursor-pointer hover:bg-[#dab37d] hover:text-white transform transition duration-500 hover:scale-105 border-[#dab37d]"
                        :class="[gender === 'male' ? 'bg-[#dab37d] text-white' : 'bg-white text-[#dab37d]',]"
                        @click="gender = 'male'">
                        {{ $t("males") }}
                    </div>
                    <div class="text-xs w-3/5 lg:w-1/4 md:text-base text-center border rounded-lg px-4 py-2 hover:scale-105 hover:bg-[#dab37d] hover:text-white transform transition duration-500 cursor-pointer border-[#dab37d]"
                        :class="[gender === 'female' ? 'bg-[#dab37d] text-white' : 'bg-white text-[#dab37d]',]"
                        @click="gender = 'female'">
                        {{ $t("females") }}
                    </div>
                </div>
                <template v-if="isLoaded">
                    <div class="w-full flex items-center lg:gap-5 gap-3 justify-evenly flex-wrap">
                        <div class="grow max-w-[40%] lg:max-w-[20%] inline-flex lg:min-w-[20%] rounded-md hover:border-2 hover:border hover:border-[#dab37d] overflow-hidden"
                            v-for="product in filtred_products"
                            @click=" goTo({ name: 'produits-detail', params: { id: product._id } })">
                            <div
                                class="cursor-pointer relative bg-white inline-flex items-stretch w-full h-full p-0 box-border">
                                <!-- heart -->
                                <div
                                    class="absolute top-[4px] right-[4px] w-[28px] h-[28px] text-center z-10 rounded-full">
                                    <div>
                                        <span
                                            class="absolute top-[4px] right-[4px] w-[24px] h-[24px] text-center z-10 rounded-full bg-gray-200">
                                            <div
                                                class="absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center">
                                                <icn name="heart" class="h-4 w-4 fill-current m-auto" />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <!-- end heart -->
                                <div class="relative shadow-md rounded-lg min-w-full flex flex-col">
                                    <!-- img product -->
                                    <div
                                        class="relative h-0 rounded-t-lg pb-[100%] w-full bg-white text-ellipsis overflow-hidden pb-5">
                                        <div
                                            class="bg-no-repeat bg-cover inline-block my-0 mx-auto text-center w-full h-full absolute">
                                            <img :src="product.pictures[0]" alt="" />
                                        </div>
                                    </div>

                                    <!-- end img product -->
                                    <div class="relative p-2 box-border overflow-hidden grow">
                                        <!-- product name -->
                                        <div
                                            class="text-gray-800 max-h-[38px] text-sm font-semibold leading-5 overflow-hidden whitespace-normal break-words pb-5">
                                            {{ getProductName(product) }}
                                        </div>
                                        <!-- end product name -->
                                        <!-- price -->
                                        <div>
                                            <div class="block w-full text-sm font-bold text-amber-700">
                                                {{ product.price }} MAD
                                            </div>
                                        </div>
                                        <!-- end price -->
                                        <!-- store name -->
                                        <p class="mx-0 my-1 text-gray-600 line-clamp-3">
                                            {{ getProductDescription(product).replace(/\/\/n/g, "") }}
                                        </p>
                                        <!-- end store name -->
                                        <!-- rating -->
                                        <div class="min-h-[14px] text-xs">
                                            <div class="align-items-center my-1 mx-0">
                                                <i class="fa-solid fa-star" style="color: #7a7600"></i>
                                                <i class="fa-solid fa-star" style="color: #7a7600"></i>
                                                <i class="fa-solid fa-star" style="color: #7a7600"></i>
                                                <i class="fa-solid fa-star" style="color: #7a7600"></i>
                                                <i class="fa-solid fa-star" style="color: #7a7600"></i>
                                                <span class="align-midle ml-1 text-gray-600">
                                                    {{ product.brand}}
                                                </span>
                                            </div>
                                        </div>
                                        <!-- end rating -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <template v-if="filtred_products.length == 0">
                            <EmptyState>
                                {{ getEmptyStateContent() }}
                            </EmptyState>
                        </template>
                    </div>
                    <div v-if="filtred_products.length != 0"
                        class="w-8/12 text-xs md:text-base md:w-1/4 text-center border rounded-lg mx-auto px-4 py-2 cursor-pointer bg-[#dab37d] text-white hover:scale-105 transform transition duration-500">
                        {{ $t("loadMoreProducts") }}
                    </div>
                </template>
                <template v-else>
                    <loadingSpinner />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import filtersSideBar from "@/components/sideBarFilter.vue";
import sitckSideBar from "@/components/stickySideBar.vue";
export default {
    name: "products",
    components: { filtersSideBar, sitckSideBar },
    data() {
        return {
            productsFilter: {
                main_categories: [],
                marques: [],
                sub_categories: [],
                gender: null,
            },
            products: [],
            filtred_products: [],
            isLoaded: false,
            gender: null,
            isMobile: false,
            currentLanguage: this.$store.state.siteLanguage,
        };
    },

    computed: {
        getProductName() {
            return (product) => {
                switch (this.currentLanguage) {
                    case "en":
                        return product.nameEN || "Name not available";
                    case "ar":
                        return product.nameAR || "اسم غير متوفر";
                    case "fr":
                        return product.nameFR || "Nom non disponible";
                    default:
                        return product.nameFR || "Nom non disponible";
                }
            };
        },
        getProductDescription() {
            return (product) => {
                switch (this.currentLanguage) {
                    case "en":
                        return product.descriptionEN || "Description not available";
                    case "ar":
                        return product.descriptionAR || "وصف غير متوفر";
                    case "fr":
                    default:
                        return product.descriptionFR || "Description non disponible";
                }
            };
        },
        getEmptyStateContent() {
            return () => {
                switch (this.currentLanguage) {
                    case "en":
                        return "No products have been added yet.";
                    case "ar":
                        return "لم تتم إضافة أي منتجات حتى الآن";
                    case "fr":
                        return "Aucun produit n'a été ajouté pour le moment."
                    default:
                        return "Aucun produit n'a été ajouté pour le moment."
                }
            };
        },
    },
    async mounted() {
        this.checkIsMobile();
        window.addEventListener("resize", this.checkIsMobile);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.checkIsMobile);
    },
    watch: {
        "$store.state.siteLanguage"(value) {
            this.currentLanguage = value
        },
        gender(value) {
            if (value) {
                this.isLoaded = false;
                this.productsFilter["gender"] = value;
                this.filterProducts();
            }
        },
    },
    methods: {
        checkIsMobile() {
            this.isMobile = window.innerWidth <= 440; // You can adjust the breakpoint as necessary
        },
        async filterProducts(payload) {
            if (payload) {
                for (let key in this.productsFilter) {
                    if (payload.hasOwnProperty(key))
                        this.productsFilter[key] = payload[key];
                }
            }
            try {
                const resp = await this.$http.get("/product/", {
                    params: { ...this.productsFilter },
                });
                this.products = resp.data;
                this.filtred_products = resp.data;
                this.isLoaded = true;
            } catch (error) {
                console.log(error);
            }
        },
        goTo(payload) {
            this.$router.push({ name: payload.name, params: payload.params });
        },
    }
};
</script>
