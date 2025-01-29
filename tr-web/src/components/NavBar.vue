<template>
    <div>
        <nav class="flex justify-between items-center mx-auto px-5 py-5 text-gray-900 font-bold uppercase">
            <ul class="flex items-center lg:hidden" @click="showMenu = !showMenu">
                <li>
                    <a href="#" class="flex items-center gap-2">
                        <p class="text-gray-900 font-semibold tracking-wide rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </p>
                        <span class="capitalized text-xs font-bold"> {{ $t("mainPage.headerText.menu") }} </span>
                    </a>
                    <div class="fixed top-0 right-0 z-40 h-full w-full bg-black transition"
                        :class="{ 'invisible opacity-0': !showMenu, ' visible opacity-40': showMenu, }"></div>
                    <div class="absolute right-0 z-50 w-full mt-10 transition"
                        :class="{ 'invisible opacity-0': !showMenu, 'visible opacity-100': showMenu, }">
                        <ul class="flex flex-col bg-white w-full rounded shadow-md overflow-hidden py-4 pt-2">
                            <li class="text-xs px-3 py-2">
                                <router-link to="/"
                                    class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                                    :class="{ 'underline text-[#dab37d]': $route.path == '/' }"
                                    style="text-underline-offset: 8px">
                                    {{ $t("mainPage.headerText.acceuil") }}
                                </router-link>
                            </li>
                            <li class="text-xs px-3 py-2" v-for="itm in urls">
                                <router-link :to="{ name: 'produits', params: { category: itm.nameEN } }"
                                    class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                                    :class="{ 'underline text-[#dab37d]': $route.path == `/produits/${itm.nameEN}` }"
                                    style="text-underline-offset: 8px">
                                    {{ getDisplayName(itm) }}
                                </router-link>
                            </li>
                            <!-- <li class="text-xs px-3 py-2">
                                <router-link :to="{ name: 'produits', params: { category: 'Jewelry' } }"
                                    class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                                    :class="{ 'underline text-[#dab37d]': this.$route.path == '/produits/Jewelry'}" style="text-underline-offset: 8px">
                                    {{ $t("mainPage.headerText.espaceBijouterie") }}
                                </router-link>
                            </li> -->

                            <li class="text-xs px-3 py-2" v-if="!showProfil">
                                <router-link to="/login"
                                    class="flex gap-2 cursor-pointer items-center transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d] underline-offset-8">
                                    <icn name="exit" class="h-4 w-4 fill-current" />
                                    <span class="">{{ $t("mainPage.headerText.seConnecter") }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div class="flex items-center gap-2" @click="() => { $router.push({ name: 'home' }) }">
                <img src="../assets/logo.png" alt="" class="lg:w-32 w-20 h-full" />
            </div>


            <div class="flex items-center gap-1 lg:hidden">
                <div class="relative">
                    <button class="flex items-center justify-between px-2 py-2 bg-white" @click="toggleDropdown">
                        <img class="w-7 h-7 rounded-md" :src="selectedOption" alt="Selected flag" />
                    </button>
                    <transition enter-active-class="transform transition duration-500 ease-custom"
                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                        leave-active-class="transform transition duration-300 ease-custom"
                        leave-class="translate-y-0 scale-y-100 opacity-100"
                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                        <ul v-show="isOptionsExpanded"
                            class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden z-30">
                            <li v-for="option in options" :key="option.code"
                                class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex items-center"
                                @click="changeLanguage(option.code)">
                                <img class="w-5 h-5 rounded-md" :src="option.flag" alt="Flag" />
                            </li>
                        </ul>
                    </transition>
                </div>

                <div class="py-0 relative gap-3 flex items-center justify-center" v-if="showProfil">
                    <input type="checkbox" class="hidden" name="dropdownCheckout" id="dropDown_mobile" />
                    <label id="dropDownLabel_mobile"
                        class="relative cursor-pointer w-7 h-7 rounded-full bg-[#dab37d] flex items-center justify-center shadow_border">
                        <div class="text-xs font-medium text-white text-center uppercase pointer-events-none">
                            {{ $store.state.user.letters }}
                        </div>
                    </label>
                    <div class="dropdown_menu shadow-lg rounded border border-gray-100">
                        <ul>
                            <li>
                                <div @click="logout()"
                                    class="flex cursor-pointer px-3 py-2 bg-white items-center text-gray-500 gap-2 duration-200 hover:bg-gray-100 border-0 border-gray-200 border-t">
                                    <icn name="exit" class="h-4 w-4 fill-current" /> <span
                                        class="text-xs font-medium leading-6">{{ $t("mainPage.headerText.seDeconnecter")
                                        }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <ul class="flex items-center gap-4 hidden lg:flex">
                <li class="text-xs">
                    <router-link to="/"
                        class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                        :class="{ 'underline text-[#dab37d]': $route.path == '/' }"
                        style="text-underline-offset: 8px">{{ $t("mainPage.headerText.acceuil") }}</router-link>
                </li>
                <li class="text-xs" v-for="itm in urls">
                    <router-link :to="{ name: 'produits', params: { category: itm.nameEN } }"
                        class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                        :class="{ 'underline text-[#dab37d]': $route.path == `/produits/${itm.nameEN}` }"
                        style="text-underline-offset: 8px">
                        {{ getDisplayName(itm) }}
                    </router-link>
                </li>
                <!-- <li class="text-xs">
                    <router-link :to="{ name: 'produits', params: { category: 'Cosmetics' } }"
                        class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                        :class="{ 'underline text-[#dab37d]': this.$route.path == '/produits/Cosmetics' }"
                        style="text-underline-offset: 8px">
                        {{ $t("mainPage.headerText.espaceCosmetique") }}
                    </router-link>
                </li>
                <li class="text-xs">
                    <router-link :to="{ name: 'produits', params: { category: 'Jewelry' } }"
                        class="transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d]"
                        :class="{ 'underline text-[#dab37d]': this.$route.path == '/produits/Jewelry' }"
                        style="text-underline-offset: 8px">
                        {{ $t("mainPage.headerText.espaceBijouterie") }}
                    </router-link>
                </li> -->

                <li class="text-xs" v-if="!showProfil">
                    <router-link to="/login"
                        class="flex gap-2 cursor-pointer px-3 py-2 bg-white items-center transition duration-300 focus:outline-none focus:text-[#dab37d] focus:underline hover:underline hover:text-[#dab37d] underline-offset-8">
                        <icn name="exit" class="h-4 w-4 fill-current" />
                        <span class="">{{ $t("mainPage.headerText.seConnecter") }}</span>
                    </router-link>
                </li>

                <div class="relative">
                    <button class="flex items-center justify-between px-2 py-2 bg-white" @click="toggleDropdown">
                        <img class="w-7 h-7 rounded-md" :src="selectedOption" alt="Selected flag" />
                    </button>
                    <transition enter-active-class="transform transition duration-500 ease-custom"
                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                        leave-active-class="transform transition duration-300 ease-custom"
                        leave-class="translate-y-0 scale-y-100 opacity-100"
                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                        <ul v-show="isOptionsExpanded"
                            class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden z-30">
                            <li v-for="option in options" :key="option.code"
                                class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex items-center"
                                @click="changeLanguage(option.code)">
                                <img class="w-5 h-5 rounded-md" :src="option.flag" alt="Flag" />
                            </li>
                        </ul>
                    </transition>
                </div>

                <div class="py-0 relative gap-3 flex items-center justify-center" v-if="showProfil">
                    <input type="checkbox" class="hidden" name="dropdownCheckout" id="dropDown" />
                    <label id="dropDownLabel"
                        class="relative cursor-pointer w-7 h-7 rounded-full bg-[#dab37d] flex items-center justify-center shadow_border">
                        <div class="text-xs font-medium text-white text-center uppercase pointer-events-none">
                            {{ $store.state.user.letters }}
                        </div>
                    </label>
                    <div class="dropdown_menu shadow-lg rounded border border-gray-100">
                        <ul>
                            <li>
                                <div @click="logout()"
                                    class="flex cursor-pointer px-3 py-2 bg-white items-center text-gray-500 gap-2 duration-200 hover:bg-gray-100 border-0 border-gray-200 border-t">
                                    <icn name="exit" class="h-4 w-4 fill-current" />
                                    <span class="text-xs font-medium leading-6">{{
                $t("mainPage.headerText.seDeconnecter") }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
import arFlag from "@/assets/flags/ar.webp";
import enFlag from "@/assets/flags/en.webp";
import frFlag from "@/assets/flags/fr.webp";

export default {
    name: "nav-bar",
    props: [],
    data() {
        const siteLanguage = this.$store.state.siteLanguage
        const options = [
            { code: "ar", flag: arFlag },
            { code: "en", flag: enFlag },
            { code: "fr", flag: frFlag },
        ];
        const initialOption = options.find(option => option.code === siteLanguage);
        return {
            dropDownMenu: {},
            showMenu: false,
            isOptionsExpanded: false,
            selectedOption: initialOption ? initialOption.flag : frFlag,
            options,
        };
    },

    created() {
        this.init();
    },
    computed: {
        urls() {
            return this.$store.state.categories
        },
        showProfil() {
            return (this.$store.state.user && this.$store.state.user._id) ||
                (this.$store.state.user && this.$store.state.user.id)
                ? true
                : false;
        },
    },
    methods: {
        getDisplayName(item) {
            return this.$store.state.siteLanguage == 'ar' ? 'قسم ' + item[`name${this.$store.state.siteLanguage.toUpperCase()}`] : (this.$store.state.siteLanguage == 'fr' ? 'espace ' + item[`name${this.$store.state.siteLanguage.toUpperCase()}`] : item[`name${this.$store.state.siteLanguage.toUpperCase()}`] + ' section')
        },
        init() {
            document.addEventListener('click', (e) => {
                if (document.getElementById('dropDown') && e.target.id == 'dropDownLabel')
                    document.getElementById('dropDown').checked = !document.getElementById('dropDown').checked
                else if (document.getElementById('dropDown'))
                    document.getElementById('dropDown').checked = false
            })

            document.addEventListener('click', (e) => {
                if (document.getElementById('dropDown_mobile') && e.target.id == 'dropDownLabel_mobile')
                    document.getElementById('dropDown_mobile').checked = !document.getElementById('dropDown_mobile').checked
                else if (document.getElementById('dropDown_mobile'))
                    document.getElementById('dropDown_mobile').checked = false
            })
        },
        logout() {
            window.localStorage.removeItem("x-auth-token");
            window.open("/", "_self");
        },
        setOption(option) {
            this.selectedOption = option;
            this.isOptionsExpanded = false;
        },
        toggleMenu() {
            var x = document.getElementById("side-navbar");
            if (x.classList.contains("hidden")) {
                x.classList.remove("hidden");
            } else {
                x.classList.add("hidden");
            }
        },
        changeLanguage(code) {
            this.$i18n.locale = code;
            localStorage.setItem("language", code);
            const option = this.options.find((option) => option.code === code);
            if (option) {
                this.selectedOption = option.flag;
            } else {
                console.error("Flag not found for code:", code);
            }
            this.$store.dispatch('setSiteLanguage', code)
            this.isOptionsExpanded = false;
        },
        toggleDropdown() {
            this.isOptionsExpanded = !this.isOptionsExpanded;
        },
        closeDropdown() {
            this.isOptionsExpanded = false;
        },
    },
};
</script>

<style>
.ease-custom {
    transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}

.dropdown_menu {
    position: absolute;
    top: calc(50% + 24px);
    width: 180px;
    background-color: #fff;
    z-index: 4;
    right: -1rem;
    left: inherit;
    overflow: hidden;
    max-height: 0em;
    opacity: 0;
    transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    transition-duration: 300ms;
    height: 0px;
}

input[name="dropdownCheckout"]:checked~.dropdown_menu {
    max-height: 500em;
    opacity: 1;
    height: auto;
    transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    transition-duration: 300ms;
}
</style>
