<template>
    <div class="flex flex-col w-full gap-10">
        <Slider />
        <div class="md:py-10 flex items-center">
            <span class="w-full border-t lg:border-2 border-black"></span>
            <span class="w-full text-center mx-2 text-lg lg:text-3xl font-base font-[titillium-web-black] uppercase">{{ $t('mainPage.productCategories.title') }}</span>
            <span class="w-full border-t lg:border-2 border-black"></span>
        </div>

        <div class="slider-wrapper flex gap-4 flex-col md:flex-row w-full overflow-hidden">
            <div class="slider flex flex-row gap-4 w-full px-2">
                <div class="card md:flex-1 rounded-lg overflow-hidden relative border border-[#C9C9C9] hover:border-2 hover:border-[#dab37d] rounded-lg overflow-hidden  cursor-pointer"
                    v-for="card in $store.state.categories">
                    <div @click="goTo({ name: 'produits', params: { category: card.nameEN } })">
                        <img :src="card.banner" class="w-full h-[30vh] object-cover">

                        <div class="flex flex-col gap-1 mt-6 p-4 pt-0">
                            <div class="w-3/4 font-bold text-lg leading-[30px]">{{ getDisplayName(card) }}</div>
                            <div class="text-sm	leading-6 lg:pb-12">
                                {{ getDisplayDesc(card) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between slider-navigation md:hidden px-4">
                <div class="index text-base">1/{{ cards.length }}</div>
                <div class="flex items-center gap-2">
                    <button class="prev cursor-pointer button-like select-none" @click="prevBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                            <rect x="0.5" y="1.02979" width="35" height="35" rx="17.5" stroke="#7A00E6" />
                            <path
                                d="M11.2937 17.8234C10.9031 18.2141 10.9031 18.8484 11.2937 19.2391L16.2937 24.2391C16.6843 24.6297 17.3187 24.6297 17.7093 24.2391C18.1 23.8484 18.1 23.2141 17.7093 22.8234L14.4125 19.5297H24C24.5531 19.5297 25 19.0828 25 18.5297C25 17.9766 24.5531 17.5297 24 17.5297H14.4156L17.7062 14.2359C18.0968 13.8453 18.0968 13.2109 17.7062 12.8203C17.3156 12.4297 16.6812 12.4297 16.2906 12.8203L11.2906 17.8203L11.2937 17.8234Z"
                                fill="#7A00E6" />
                        </svg>
                    </button>
                    <button class="next cursor-pointer button-like select-none" @click="nextBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none"
                            class="rotate-180">
                            <rect x="0.5" y="1.02979" width="35" height="35" rx="17.5" stroke="#7A00E6" />
                            <path
                                d="M11.2937 17.8234C10.9031 18.2141 10.9031 18.8484 11.2937 19.2391L16.2937 24.2391C16.6843 24.6297 17.3187 24.6297 17.7093 24.2391C18.1 23.8484 18.1 23.2141 17.7093 22.8234L14.4125 19.5297H24C24.5531 19.5297 25 19.0828 25 18.5297C25 17.9766 24.5531 17.5297 24 17.5297H14.4156L17.7062 14.2359C18.0968 13.8453 18.0968 13.2109 17.7062 12.8203C17.3156 12.4297 16.6812 12.4297 16.2906 12.8203L11.2906 17.8203L11.2937 17.8234Z"
                                fill="#7A00E6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="md:py-10 flex items-center">
            <span class="w-full border-t lg:border-2 border-black"></span>
            <span class="w-full text-center mx-2 text-lg lg:text-3xl font-base font-[titillium-web-black] uppercase">{{ $t('mainPage.bestSellers') }}</span>
            <span class="w-full border-t lg:border-2 border-black"></span>
        </div>

        <div class="flex flex-col gap-2">
            <div class="carousel" :style="carouselStyle">
                <div class="carousel__list">
                    <div class="carousel__item" v-for="(product, index) in fav_products" :key="index"
                        :style="{ '--position': index }"
                        @click="goTo({ name: 'produits-detail', params: { id: product._id } })">
                        <div ref="carouselItem"
                            class="w-[60vw] md:w-[20vw] cursor-pointer carousel-focus flex items-center text-base md:text-xl flex-col justify-between relative bg-white md:mx-4 md:px-4 px-2 py-3 hover:border-2 hover:border-[#dab37d] rounded-lg">
                            <img class="h-40 w-40 rounded-full shadow-2xl" :src="product.pictures[0]" alt="Img">
                            <span class="text-gray-900 text-sm font-bold my-3 text-center line-clamp-2">{{ getProductName(product) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- slider -->
            <div class="carousel" reverse="true" :style="carouselStyle">
                <div class="carousel__list">
                    <div class="carousel__item" v-for="(product, index) in fav_products" :key="index"
                        :style="{ '--position': index }"
                        @click="goTo({ name: 'produits-detail', params: { id: product._id } })">
                        <div ref="carouselItem"
                            class="w-[60vw] md:w-[20vw] cursor-pointer carousel-focus flex items-center text-base flex-col justify-between relative bg-white md:px-4 md:mx-4 px-2 py-3 hover:border-2 hover:border-[#dab37d] rounded-lg">
                            <img class="h-40 w-40 rounded-full shadow-2xl" :src="product.pictures[0]" alt="Img">
                            <span class="text-gray-900 text-sm font-bold my-3 text-center line-clamp-2">{{ getProductName(product) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="2xl:mx-auto 2xl:container mx-4 py-16">
            <div class="w-full relative flex items-center justify-center">
                <img src="https://i.ibb.co/4sYZ8gC/img-2.png" alt="dining"
                    class="w-full h-full absolute z-0 hidden xl:block" />
                <img src="https://i.ibb.co/bbS3J9C/pexels-max-vakhtbovych-6301182-1.png" alt="dining"
                    class="w-full h-full absolute z-0 hidden sm:block xl:hidden" />
                <img src="https://i.ibb.co/JKkzGDs/pexels-max-vakhtbovych-6301182-1.png" alt="dining"
                    class="w-full h-full absolute z-0 sm:hidden" />
                <div
                    class="bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
                    <h1 class="text-4xl font-semibold leading-9 text-white text-center">{{ $t('mainPage.subscribe.titre') }}</h1>
                    <p class="text-base leading-normal text-center text-white mt-6">
                        {{ $t('mainPage.subscribe.texte') }}
                    </p>
                    <div
                        class="sm:border border-white flex-col sm:flex-row flex items-center lg:w-6/12 w-full mt-12 space-y-4 sm:space-y-0">
                        <input
                            class="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white"
                            placeholder="Email Address" />
                        <button
                            class="whitespace-nowrap focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75">{{ $t('mainPage.subscribe.button') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <section class="grid md:grid-cols-2 xl:grid-cols-3 mx-auto py-10 px-5 lg:px-10 gap-5">
            <h1 class="md:col-span-2 xl:col-span-3 text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                {{ $t('mainPage.clientThoughts') }}</h1>
            <div class="bg-[#dab37d] relative p-5 md:p-9 rounded-lg opacity-75">
                <div class="bg-white pt-8 lg:pt-0 pb-8 px-5 md:px-8 rounded-md">
                    <div class="flex flex-col lg:flex-row items-center gap-4">
                        <img class="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                            src="https://cdn-icons-png.flaticon.com/256/13164/13164529.png"
                            alt="James Connor">
                        <div>
                            <h2 class="text-lg font-semibold lg:mt-10">- @Laila</h2>
                            <div class="flex items-center mt-2">
                                <span
                                    class="shadow-lg bg-white rounded-full inline-flex items-center px-3 py-1.5 text-gray-500 text-xs"><svg
                                        class="mr-1 w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>5</span>
                                <span class="ml-2.5 text-sm text-gray-400 mt-2.5">Excellent</span>
                            </div>
                        </div>
                    </div>

                    <!-- <h3 class="text-lg font-semibold mt-7 mb-2.5">Toujours satisfait de HynCos.</h3> -->
                    <p class="leading-loose">Le produit cosmétique X est incroyable ! Il a une texture douce, s'absorbe
                        rapidement, et ne laisse aucun effet gras. Ma peau est plus éclatante et plus douce après
                        quelques utilisations seulement. De plus, le parfum léger est parfait. Je le recommande vivement
                        !</p>
                    <div class="md:flex items-center gap-5 mt-4">
                        <span class="mb-3 md:mb-0 flex items-center text-gray-400 text-sm"> <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-1.5 w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>2 days ago</span>
                    </div>

                </div>
            </div>
            <div class="bg-[#dab37d] relative p-5 md:p-9 rounded-lg opacity-75	">
                <div class="bg-white pt-8 lg:pt-0 pb-8 px-5 md:px-8 rounded-md">
                    <div class="flex flex-col lg:flex-row items-center gap-4">
                        <img class="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                            src="https://cdn-icons-png.flaticon.com/256/13164/13164529.png"
                            alt="Claire Smith">
                        <div>
                            <h2 class="text-lg font-semibold lg:mt-10">- @Salma</h2>
                            <div class="flex items-center mt-2">
                                <span
                                    class="shadow-lg bg-white rounded-full inline-flex items-center px-3 py-1.5 text-gray-500 text-xs"><svg
                                        class="mr-1 w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>5</span>
                                <span class="ml-2.5 text-sm text-gray-400 mt-2.5">Excellent</span>
                            </div>
                        </div>
                    </div>

                    <!-- <h3 class="text-lg font-semibold mt-7 mb-2.5">Toujours satisfait de HynCos.</h3> -->
                    <p class="leading-loose">Le produit cosmétique X est incroyable ! Il a une texture douce, s'absorbe
                        rapidement, et ne laisse aucun effet gras. Ma peau est plus éclatante et plus douce après
                        quelques utilisations seulement. De plus, le parfum léger est parfait. Je le recommande vivement
                        !</p>
                    <div class="md:flex items-center gap-5 mt-4">
                        <span class="mb-3 md:mb-0 flex items-center text-gray-400 text-sm"> <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-1.5 w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>2 days ago</span>
                    </div>

                </div>
            </div>
            <div class="bg-[#dab37d] relative p-5 md:p-9 rounded-lg opacity-75	">
                <div class="bg-white pt-8 lg:pt-0 pb-8 px-5 md:px-8 rounded-md">
                    <div class="flex flex-col lg:flex-row items-center gap-4">
                        <img class="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                            src="https://cdn-icons-png.flaticon.com/256/13164/13164529.png"
                            alt="Chris Newton">
                        <div>
                            <h2 class="text-lg font-semibold lg:mt-10">- @Hajar</h2>
                            <div class="flex items-center mt-2">
                                <span
                                    class="shadow-lg bg-white rounded-full inline-flex items-center px-3 py-1.5 text-gray-500 text-xs"><svg
                                        class="mr-1 w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>5</span>
                                <span class="ml-2.5 text-sm text-gray-400 mt-2.5">Excellent</span>
                            </div>
                        </div>
                    </div>

                    <!-- <h3 class="text-lg font-semibold mt-7 mb-2.5">Toujours satisfait de HynCos.</h3> -->
                    <p class="leading-loose">Le produit cosmétique X est incroyable ! Il a une texture douce, s'absorbe
                        rapidement, et ne laisse aucun effet gras. Ma peau est plus éclatante et plus douce après
                        quelques utilisations seulement. De plus, le parfum léger est parfait. Je le recommande vivement
                        !</p>
                    <div class="md:flex items-center gap-5 mt-4">
                        <span class="mb-3 md:mb-0 flex items-center text-gray-400 text-sm"> <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-1.5 w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>2 days ago</span>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>

import Slider from '@/components/Slider.vue'
export default {

    name: 'home',
    components: { Slider },
    data() {
        const siteLanguage = this.$store.state.siteLanguage
        const cards = [
                {
                    name: this.$t('mainPage.productCategories.cosmeticTitle'),
                    category: this.$t('mainPage.productCategories.cosmeticTitle'),
                    img: 'https://cdn.bioalaune.com/img/article/thumb/900x500/36958-cosmetiques-5-astuces-faire-durer-produits-beaute-plus-longtemps.png',
                    description: this.$t('mainPage.productCategories.cosmeticText'),
                    path: "Cosmetics"
                },
                {
                    name: this.$t('mainPage.productCategories.bijouterieTitle'),
                    category: this.$t('mainPage.productCategories.bijouterieTitle'),
                    img: 'https://www.voici.fr/imgre/fit/~1~voi~2022~04~25~dd99ac2f-d10f-40d6-a8a5-af9a02a180c9.jpeg/1200x675/quality/80/lese-majeste-choisit-pour-vous-des-collections-de-tres-beaux-bijoux-et-accessoires-a-des-prix-abordables.jpg',
                    description: this.$t('mainPage.productCategories.bijouterieText'),
                    path: "Jewelry"
                },
            ]
        return {
            currentIndex: 0,
            currentLanguage: siteLanguage || "fr",
            cards,
            fav_products: [],
            itemWidth: '', // Default values if not calculated
            itemHeight: ''
        }
    },
    watch:{
        "$store.state.siteLanguage"(value){
            this.currentLanguage = value
            this.updateCards();
        }
    },
    computed: {
        carouselStyle() {
            return {
                '--width': this.itemWidth,
                '--height': this.itemHeight,
                '--quantity': this.fav_products.length,
                '--duration': '15s'
            }
        },
        getProductName() {
            return (product) => {
                switch (this.currentLanguage) {
                    case "en":
                        return product.nameEN || "Name not available";
                    case "ar":
                        return product.nameAR || "اسم غير متوفر";
                    case "fr":
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
                        return product.descriptionFR || "Description non disponible";
                    default:
                        return product.descriptionFR || "Description non disponible";
                }
            };
        },
    },
    mounted() {
        window.addEventListener('resize', this.calculateItemDimensions);
        this.fetchBestSellers()
        this.updateSlider()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.calculateItemDimensions);
    },


    methods: {
        getDisplayName(item) {
            return item[`name${this.$store.state.siteLanguage.toUpperCase()}`];
        },
        getDisplayDesc(item) {
            return item[`desc${this.$store.state.siteLanguage.toUpperCase()}`];
        },
        calculateItemDimensions() {
            this.$nextTick(() => {
                const items = this.$refs.carouselItem;
                if (items && items.length > 0) {
                    const item = items[0];
                    const computedStyle = window.getComputedStyle(item);
                    this.itemWidth = computedStyle.width;
                    this.itemHeight = computedStyle.height;
                }
            });
        },
        async fetchBestSellers() {
            try {
                const resp = await this.$http.get('/product/bestSeller')
                if (resp.status) this.fav_products = resp.data
                this.calculateItemDimensions()
            } catch (error) {
                console.log(error)
            }
        },
        goTo(payload) {
            this.$router.push({ name: payload.name, params: payload.params });
        },

        updateSlider() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.card');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const indexDisplay = document.querySelector('.index');
            const width = slides[0] ? slides[0].clientWidth : 0;
            const isMobile = window.matchMedia('(max-width: 767px)').matches;

            if (isMobile) {
                slider.style.transform = `translateX(-${this.currentIndex * width}px)`;
            } else {
                slider.style.transform = 'translateX(0)';
            }

            indexDisplay.textContent = `${this.currentIndex + 1}/${slides.length}`;

            if (this.currentIndex === 0) {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }

            if (this.currentIndex === slides.length - 1) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        },

        prevBtn() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateSlider();
            }
        },

        nextBtn() {
            const slides = document.querySelectorAll('.card');
            if (this.currentIndex < slides.length - 1) {
                this.currentIndex++;
                this.updateSlider();
            }
        },

        updateCards() {
            this.cards = [
                {
                    name: this.$t('mainPage.productCategories.cosmeticTitle'),
                    category: this.$t('mainPage.productCategories.cosmeticTitle'),
                    img: 'https://cdn.bioalaune.com/img/article/thumb/900x500/36958-cosmetiques-5-astuces-faire-durer-produits-beaute-plus-longtemps.png',
                    description: this.$t('mainPage.productCategories.cosmeticText'),
                    path: "Cosmetics"
                },
                {
                    name: this.$t('mainPage.productCategories.bijouterieTitle'),
                    category: this.$t('mainPage.productCategories.bijouterieTitle'),
                    img: 'https://www.voici.fr/imgre/fit/~1~voi~2022~04~25~dd99ac2f-d10f-40d6-a8a5-af9a02a180c9.jpeg/1200x675/quality/80/lese-majeste-choisit-pour-vous-des-collections-de-tres-beaux-bijoux-et-accessoires-a-des-prix-abordables.jpg',
                    description: this.$t('mainPage.productCategories.bijouterieText'),
                    path: "Jewelry"
                },
            ];
        },

    }
}
</script>

<style>
.carousel {
    width: 100%;
    height: calc(2rem + var(--height));
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
}

.carousel:hover .carousel__item {
    -webkit-animation-play-state: paused !important;
    animation-play-state: paused !important;
}

.carousel__list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
}

.carousel__item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    text-align: center;
    font-size: 45px;
    -webkit-animation: slide var(--duration) linear infinite;
    animation: slide var(--duration) linear infinite;
    -webkit-animation-delay: calc((var(--duration) / var(--quantity)) * (var(--position) - var(--quantity))) !important;
    animation-delay: calc((var(--duration) / var(--quantity)) * (var(--position) - var(--quantity))) !important;
}

[reverse=true] .carousel__item {
    -webkit-animation: slideReverse var(--duration) linear infinite;
    animation: slideReverse var(--duration) linear infinite;
}

@-webkit-keyframes slide {
    from {
        left: 100%;
    }

    to {
        left: calc(var(--width) * -1);
    }
}

@keyframes slide {
    from {
        left: 100%;
    }

    to {
        left: calc(var(--width) * -1);
    }
}

@-webkit-keyframes slideReverse {
    from {
        left: calc(var(--width) * -1);
    }

    to {
        left: 100%;
    }
}

@keyframes slideReverse {
    from {
        left: calc(var(--width) * -1);
    }

    to {
        left: 100%;
    }
}

.slider {
    display: flex;
    transition: transform 0.3s ease-in-out;
}

@media (max-width: 768px) {
    .card {
        min-width: 85%;
    }
}

.slider-navigation button:disabled rect {
    stroke: gray;
}

.slider-navigation button:disabled path {
    fill: gray;
}
</style>