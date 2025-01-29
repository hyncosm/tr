<template>
    <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-lg">
            <div class="text-white bg-[#dab37d] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center">
                <div class="text-4xl font-bold tracking-wider text-center">
                    <RouterLink to="/">
                        <img src="@/assets/logo.png" alt="" class="w-full h-full">
                    </RouterLink>
                </div>
                <p class="p-4 py-6 flex flex-col items-center justify-center mt-10 text-center">
                    <span>Besoin d'un compte ?</span>
                    <RouterLink class="underline" to="/register">
                        Créer un compte
                    </RouterLink>
                </p>
            </div>
            <div class="p-5 bg-white md:flex-1">
                <h1 class="text-lg text-gray-600 font-bold leading-tight my-5">
                    Connectez-vous à votre compte</h1>
                <form @submit.prevent="login" class="flex flex-col space-y-5">
                    <div class="flex flex-col space-y-1">
                        <label for="email" class="text-sm font-semibold text-gray-500">Adresse email</label>
                        <input type="email" id="email" autofocus v-model="email"
                            class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200" />
                    </div>
                    <div class="flex flex-col space-y-1">
                        <div class="flex items-center justify-between">
                            <label for="password" class="text-sm font-semibold text-gray-500">Mots de passe</label>
                            <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Mot de passe
                                oublié ?</a>
                        </div>
                        <input type="password" id="password" v-model="password"
                            class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-200" />
                    </div>
                    <div>
                        <button type="submit"
                            class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-[#dab37d] rounded-md shadow hover:bg-gray-900 focus:outline-none focus:ring-blue-200 focus:ring-4">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

            email: undefined,
            password: undefined
        }
    },
    mounted() { },
    methods: {
        async login() {
            try {
                const resp = await this.$http.post("/auth/login", { 'role':'CLIENT', 'email': this.email, 'password': this.password });
                console.log(resp)
                if (resp.status === 200) {
                    window.localStorage.setItem("x-auth-token", resp.data.token);
                    window.localStorage.setItem("uid", resp.data.id);
                    this.$store.commit('setUser', resp.data);
                    window.location = '/'
                }
            } catch (error) {
                console.log('login error', error)
                this.$toast.open({
                    message: 'email et/ou mot de passe incorrect(s)',
                    type: 'error',
                    position: 'top-right'
                });
            }


        },

    },
}
</script>