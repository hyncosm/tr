<template>
    <div class="w-full p-4">
        <template v-if="isLoaded">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb lg:flex hidden">
                    <li class="breadcrumb-item text-gray-600"><a href="#"
                            class="text-gray-600 hover:text-[#dab37d] mx-2">Produits</a></li>
                    <li class="breadcrumb-item text-gray-600"><a href="#"
                            class="text-gray-600 hover:text-[#dab37d] mx-2">{{ this.selectedProduct.category.main
                            }}</a></li>
                    <li class="breadcrumb-item text-gray-600"><a href="#"
                            class="text-gray-600 hover:text-[#dab37d] mx-2">{{ this.selectedProduct.brand }}</a>
                    </li>

                    <li class="breadcrumb-item active text-[#dab37d] hover:text-[#dab37d] mx-2" aria-current="page">
                        {{ this.selectedProduct.nameFR }}</li>
                </ol>
            </nav>

            <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="md:w-10/12 px-5 py-10 md:py-24 mx-auto">
                    <div class="mx-auto flex flex-col gap-10 md:flex-row md:gap-20">
                        <div class="relative md:text-base text-xs">
                            <span
                                class="bg-red-500 font-semibold text-white  px-2 py-1 rounded-lg absolute md:top-5 md:left-5 top-1 left-1">
                                -{{ selectedProduct.discount }} % DE RÉDUCTION
                            </span>
                            <span
                                class="bg-red-500 font-semibold text-white  px-2 py-1 rounded-lg absolute md:top-5 md:right-5 top-1 right-1">
                                {{ selectedProduct.price }} MAD
                            </span>
                            <img alt="ecommerce"
                                class="w-full object-cover object-center rounded border border-gray-200"
                                :src="selectedProduct.pictures[0]">
                        </div>
                        <div class="md:w-2/3">
                            <div class="flex flex-col gap-2">
                                <div class="font-bold py-1">Les informations de paiement</div>
                                <div class="flex items-center gap-5 border p-2 mb-2">

                                    <span class="w-5"><svg viewBox="0 0 511 511.99978"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m235.792969 347.265625c3.902343-3.910156 3.902343-10.238281 0-14.148437-3.90625-3.898438-10.234375-3.898438-14.144531 0-3.898438 3.910156-3.898438 10.238281 0 14.148437 3.910156 3.898437 10.238281 3.898437 14.144531 0zm0 0">
                                            </path>
                                            <path
                                                d="m188.449219 109.96875c0 60.636719 49.332031 109.972656 109.96875 109.972656s109.96875-49.335937 109.96875-109.972656-49.332031-109.96875-109.96875-109.96875-109.96875 49.332031-109.96875 109.96875zm199.945312 0c0 49.613281-40.363281 89.976562-89.976562 89.976562s-89.976563-40.363281-89.976563-89.976562c0-49.609375 40.363282-89.972656 89.976563-89.972656s89.976562 40.363281 89.976562 89.972656zm0 0">
                                            </path>
                                            <path
                                                d="m115.652344 509.042969c3.875 3.90625 10.183594 3.949219 14.109375.082031l48.46875-47.75c8.234375-8.234375 10.738281-20.425781 7.117187-31.023438l10.425782-10.054687c5.613281-5.421875 13.003906-8.410156 20.816406-8.410156h132.902344c23.578124 0 45.863281-9.054688 62.757812-25.496094.695312-.675781-5.277344 6.359375 90.667969-108.3125 14.230469-16.835937 12.101562-42.117187-4.75-56.363281-16.746094-14.113282-41.832031-12.085938-56.101563 4.460937l-58.992187 60.632813c-7.449219-9.167969-18.808594-14.882813-31.082031-14.882813h-111.480469c-15.863281-6.636719-32.695313-9.996093-50.0625-9.996093-48.140625 0-90.175781 22.234374-112.734375 63.921874-9.503906-1.800781-19.527344 1.074219-26.738282 8.285157l-47.558593 47.699219c-3.882813 3.894531-3.890625 10.195312-.015625 14.101562zm74.792968-227.121094c15.3125 0 30.117188 3.082031 44.011719 9.160156 1.265625.554688 2.628907.839844 4.007813.839844h113.527344c10.839843 0 19.996093 8.839844 19.996093 19.992187 0 11.027344-8.96875 19.996094-19.996093 19.996094h-81.566407c-5.519531 0-9.996093 4.476563-9.996093 9.996094 0 5.523438 4.476562 9.996094 9.996093 9.996094h81.566407c22.050781 0 39.988281-17.9375 39.988281-39.988282 0-1.757812-.125-3.5-.351563-5.226562 57.066406-58.660156 65.113282-66.902344 65.457032-67.3125 7.125-8.410156 19.773437-9.476562 28.1875-2.382812 8.421874 7.121093 9.488281 19.761718 2.34375 28.21875l-89.667969 107.195312c-13.09375 12.570312-30.285157 19.488281-48.457031 19.488281h-132.902344c-13.023438 0-25.351563 4.980469-34.703125 14.015625l-8.496094 8.199219-78.320313-78.316406c18.304688-34.339844 52.652344-53.871094 95.375-53.871094zm-125.320312 66.34375c3.296875-3.296875 8.359375-3.890625 12.378906-1.40625 1.730469 1.054687-3.238281-3.46875 86.589844 86.234375 3.996094 3.996094 3.78125 10.363281.054688 14.089844l-41.320313 40.707031-98.230469-98.980469zm0 0">
                                            </path>
                                            <path
                                                d="m286.421875 49.988281v11.714844c-11.636719 4.125-19.996094 15.238281-19.996094 28.273437 0 16.535157 13.453125 29.992188 29.992188 29.992188 5.511719 0 9.996093 4.484375 9.996093 9.996094 0 5.511718-4.484374 9.996094-9.996093 9.996094-4.269531 0-8.882813-2.683594-12.980469-7.5625-3.554688-4.226563-9.859375-4.769532-14.085938-1.21875-4.226562 3.554687-4.773437 9.859374-1.21875 14.085937 5.34375 6.355469 11.628907 10.785156 18.289063 13.019531v11.667969c0 5.523437 4.476563 9.996094 9.996094 9.996094s9.996093-4.472657 9.996093-9.996094v-11.714844c11.636719-4.128906 19.996094-15.242187 19.996094-28.273437 0-16.539063-13.453125-29.992188-29.992187-29.992188-5.511719 0-9.996094-4.484375-9.996094-9.996094 0-5.511718 4.484375-10 9.996094-10 3.542969 0 7.28125 1.808594 10.8125 5.226563 3.96875 3.839844 10.296875 3.734375 14.136719-.230469 3.839843-3.96875 3.734374-10.296875-.230469-14.136718-5.074219-4.910157-10.152344-7.6875-14.722657-9.203126v-11.644531c0-5.523437-4.476562-10-9.996093-10s-9.996094 4.476563-9.996094 10zm0 0">
                                            </path>
                                        </svg></span>
                                    <span class="payment-title-name">Paiement à la livraison</span>
                                </div>
                            </div>

                            <div class="font-bold py-1 mt-5">Information d'xpédition</div>

                            <form @submit.prevent="confirm" class="mt-4 text-xs md:text-sm">
                                <div class="flex w-full justify-between mt-4">
                                    <div class="w-full">
                                        <label class="block text-gray-700">Nom</label>
                                        <input v-model="user.firstname" type="text" id="firstname" name="firstname"
                                            placeholder="Entrez nom"
                                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                                            required>
                                    </div>
                                    <div class="w-2"></div>
                                    <div class="w-full">
                                        <label class="block text-gray-700">Prénom </label>
                                        <input v-model="user.lastname" type="text" name="lastname"
                                            placeholder="Enter prénom"
                                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                                            required>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <label class="block text-gray-700">Adresse email</label>
                                    <input type="email" v-model="user.email" name="email"
                                        placeholder="Entrez adresse email"
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                </div>
                                <div class="mt-4">
                                    <label class="block text-left w-full mb-4">
                                        <span class="block text-gray-700">Ville</span>
                                        <select v-model="user.city"
                                            class="form-select px-2 py-3 border border-gray-100 mt-2 bg-gray-50 rounded-lg block w-full text-gray-500 ">
                                            <option value="" selected>Selectionner votre ville</option>
                                            <option :value="city" v-for="city in cities">{{ city }}</option>

                                        </select>
                                    </label>
                                </div>

                                <div class="mt-4">
                                    <label class="block text-gray-700">Adresse de livraison</label>
                                    <input type="text" v-model="user.address" name="address"
                                        placeholder="Entrez adresse personnel"
                                        class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none">
                                </div>
                                <div class="mt-4">
                                    <span class="block text-gray-700">Numéro de téléphone</span>
                                    <VuePhoneNumberInput v-model="phoneNumber" class="mt-2" default-country-code="MA"  @update="updatePhone" />
                                </div>

                                <button type="submit"
                                    class="w-full disabled:opacity-50 block bg-[#dab37d] hover:bg-gray-900 focus:bg-gray-900 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                                    Confirmer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-else>
            <loadingSpinner />
        </template>
    </div>
</template>
<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
    name: 'commande',
    components: { VuePhoneNumberInput },
    data() {
        return {
            cities: [
                "Casablanca",
                "Rabat",
                "Marrakech",
                "Fes",
                "Tangier",
                "Agadir",
                "Meknes",
                "Oujda",
                "Kenitra",
                "Tetouan",
                "Safi",
                "Mohammedia",
                "El Jadida",
                "Nador",
                "Beni Mellal",
                "Taza",
                "Settat",
                "Laayoune",
                "Khouribga",
                "Inezgane",
                "Ksar El Kebir",
                "Larache",
                "Guelmim",
                "Berkane",
                "Ouarzazate",
                "Taroudant",
                "Al Hoceima",
                "Errachidia",
                "Sidi Kacem",
                "Sidi Slimane"
            ],
            villes: [],
            user: {
                firstname: undefined,
                lastname: undefined,
                email: undefined,
                address: undefined,
                city: '',
                phone: undefined
            },
            isLoaded: false,
            selectedProduct: null,
            phoneNumber: null
        }
    },
    created() {
        this.getProductDetails()
    },
    methods: {
        async getProductDetails() {
            try {
                const resp = await this.$http.get(`/product/one/${this.$route.params.id}`)
                if (resp.status) {
                    this.selectedProduct = resp.data
                    this.isLoaded = true
                }
            } catch (error) {
                console.log(error)
            }
        },
        updatePhone(paylaod) {
            this.phoneNumber = paylaod
            let { nationalNumber, countryCallingCode } = paylaod
            var phoneNumber = {
                number: nationalNumber, dialCode: countryCallingCode
            };
            this.user.phone = phoneNumber
        },
        async confirm() {
            try {
                const resp = await this.$http.post("/commande/add", {
                    commande: {
                        nom: this.user.firstname,
                        prenom: this.user.lastname,
                        email: this.user.email,
                        city: this.user.city,
                        tel: this.phoneNumber,
                        adress: this.user.address,
                        product: this.selectedProduct._id
                    }
                });
                if (resp.status) {
                    this.$toast.open({
                        message: 'Votre commande a bien été envoyée',
                        type: 'success',
                        position: 'top-right'
                    });
                }
                this.$router.push({ name: 'produits-detail', params: {id:this.selectedProduct._id} });

            } catch (error) {
                console.log(error)
            }

        }
    }
}
</script>
<style scoped>
.breadcrumb {
    .breadcrumb-item {
        position: relative;

        &:first-child {
            margin-left: 0 !important;
        }

        &:not(:last-child):after {
            content: '/';
        }
    }
}
</style>