<template>
    <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center register">
        <div
            class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-lg">
            <div class="text-white bg-[#dab37d] md:w-1/3 md:flex-shrink-0 md:flex md:flex-col md:items-center">
                <div class="text-4xl font-bold tracking-wider text-center">
                    <RouterLink to="/">
                        <img src="@/assets/logo.png" alt="" class="w-full h-full">
                    </RouterLink>
                </div>
                <p class="text-lg text-center font-bold text-gray-900 mt-20">Créez votre compte</p>
                <p class="mt-6 font-normal text-center text-white">
                    Bienvenue chez Coaching élégance ! Pour commencer, veuillez créer un compte en remplissant le
                    formulaire d'inscription ci-dessous. Avec votre compte, vous pourrez accéder à des fonctionnalités
                    exclusives, suivre votre activité et profiter d'une expérience personnalisée.
                </p>
                <p class="p-4 py-6 mt-20 text-sm text-center text-white"> Avez-vous déjà un compte ?
                    <RouterLink class="text-white hover:text-gray-900 font-semibold" to="/login">Se connetcer
                    </RouterLink>
                </p>
            </div>
            <div class="mx-auto md:py-10 p-5 ">
                <h1 class="text-lg font-bold text-gray-600 leading-tight lg:mt-10 mt-4">Enregistrez vos informations
                </h1>
                <button type="button"
                    class="w-full block bg-white mt-4 hover:bg-gray-50 duration-300 focus:bg-gray-50 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                    <div class="flex items-center justify-center gap-4">
                        <icn name="google" class="w-5 h-5" />
                        <span class=" text-gray-600">
                            Connectez-vous avec Google</span>
                    </div>
                </button>
                <div class="lg:py-10 py-5 flex items-center">
                    <span class="w-full border-t border-black"></span>
                    <span class="text-center mx-2">Ou</span>
                    <span class="w-full border-t border-black"></span>
                </div>
                <form @submit.prevent="register" class="mt-4">
                    <div class="flex w-full justify-between mt-4">
                        <div class="w-full">
                            <label class="block text-gray-700 text-sm">Nom</label>
                            <input v-model="user.firstname" type="text" id="firstname" name="firstname"
                                placeholder="Entrez nom"
                                class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                                required>
                            <small v-if="errors.firstname" class="text-red-500 text-xs px-2"> {{ errors.firstname }}
                            </small>
                        </div>
                        <div class="w-2"></div>
                        <div class="w-full">
                            <label class="block text-gray-700 text-sm">Prénom </label>
                            <input v-model="user.lastname" type="text" name="lastname" placeholder="Enter prénom"
                                class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                                required>
                            <small v-if="errors.lastname" class="text-red-500 text-xs px-2"> {{ errors.lastname }}
                            </small>
                        </div>
                    </div>
                    <div class="mt-4 ">
                        <label class="block text-gray-700 text-sm">Genre</label>
                        <div class="w-full flex gap-5 items-center mt-2">
                            <div class="flex gap-5 text-sm font-light w-full ">
                                <input type="radio" id="male" value="male" v-model="user.sex" class="hidden" />
                                <label for="male" :class="user.sex === 'male' ? activeClasses : inactiveClasses"
                                    class="cursor-pointer w-2/4 text-center py-2 rounded-lg">
                                    Male
                                </label>

                                <input type="radio" id="female" value="female" v-model="user.sex" class="hidden" />
                                <label for="female" :class="user.sex === 'female' ? activeClasses : inactiveClasses"
                                    class="cursor-pointer w-2/4 text-center py-2 rounded-lg">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-gray-700 text-sm">Adresse email</label>
                        <input type="email" v-model="user.mail" name="email" placeholder="Entrez adresse email"
                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                            required>
                        <small v-if="errors.email" class="text-red-500 text-xs px-2"> {{ errors.email }} </small>
                    </div>
                    <div class="mt-4">
                        <span class="text-sm text-gray-700">Numéro de téléphone</span>
                        <VuePhoneNumberInput v-model="phoneNumber" class="mt-2" default-country-code="MA"  @update="updatePhone" />
                    </div>
                    <div class="mt-4">
                        <label class="block text-left w-full mb-4">
                            <span class="text-gray-500 text-sm mb-1">Ville *</span>
                            <select v-model="user.city"
                                class="form-select px-2 py-3 border border-gray-100 bg-gray-50 rounded-lg block w-full text-sm text-gray-500 ">
                                <option value="">Selectionner votre ville</option>
                                <option :value="city" v-for="city in cities">{{ city }}</option>
                            </select>
                        </label>
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700 text-sm">Mot de passe *</label>
                        <input v-model="user.password" type="password" name="password" placeholder="Enter mots de passe"
                            minlength="6"
                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                            required>
                        <small v-if="errors.password" class="text-red-500 text-xs px-2"> {{ errors.password }} </small>
                    </div>
                    <div class="mt-4">
                        <label class="block text-gray-700 text-sm">Confirmer mots de passe *</label>
                        <input v-model="user.confirmedPassword" type="password" name="password"
                            placeholder="Confirmer mots de passe" minlength="6"
                            class="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border border-gray-100 focus:border-indigo-500 focus:bg-white focus:outline-none"
                            required>
                    </div>
                    <button type="submit"
                        class="w-full disabled:opacity-50 block bg-[#dab37d] hover:bg-gray-900 focus:bg-gray-900 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                        S'inscrire
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
    components: { VuePhoneNumberInput },
    data() {
        return {
            gender: 'male',
            activeClasses: 'text-gray-700 bg-gray-300 font-bold border border-gray-300',
            inactiveClasses: 'text-gray-400 bg-white font-bold border border-gray-400',
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
            phoneNumber: null,
            user: {
                type: "CUSTOMER",
                firstname: null,
                lastname: null,
                mail: null,
                sex: null,
                password: null,
                confirmedPassword: null,
                city: '',
                tel: null
            },
            errors: {}
        }
    },
    created() {
    },
    methods: {
        updatePhone(paylaod) {
            this.phoneNumber = paylaod
            let { nationalNumber, countryCallingCode } = paylaod
            var phoneNumber = {
                number: nationalNumber, dialCode: countryCallingCode
            };
            this.user.tel = phoneNumber
        },
        async register() {
            try {
                if (this.user.password !== this.user.confirmedPassword) {
                    this.$toast.open({
                        message: 'Le mot de passe ne correspond pas',
                        type: 'error',
                        position: 'top-right'
                    });
                } else {
                    console.log('register actiion 1')

                    const resp = await this.$http.post('/auth/register', {
                        "name": `${this.user.firstname} ${this.user.lastname}`,
                        "sex": this.user.sex,
                        "tel": this.phoneNumber,
                        "mail": this.user.mail,
                        "mdp": this.user.password,
                        "address": '',
                    })
                    console.log(resp)
                    if (resp.status) {
                        this.$toast.open({
                            message: 'Votre compte a bien été crée',
                            type: 'success',
                            position: 'top-right'
                        });
                    }
                    this.$router.push({ name: 'login' });
                }
            } catch (error) {

            }
        },
    },
}
</script>
<style></style>