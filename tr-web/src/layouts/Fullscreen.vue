<template>
    <div class="container mx-auto">
        <NavBar />
        <RouterView />
        <Footer />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
export default {
    name: 'full-screen',
    components: { NavBar, Footer },
    mounted(){
        if( ["EN", "FR", "AR"].includes(localStorage.getItem("language")?.toUpperCase())) {
            this.$store.dispatch('setSiteLanguage', localStorage.getItem("language"))
        } else {
            this.$store.dispatch('setSiteLanguage', "FR")
        }
        this.getBrands()
        this.getCategories()
        document.getElementById('scrollToTopBtn').addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },
    methods:{
        async getBrands() {
            try {
                const resp = await this.$http.get('/brand')
                if (resp.status) {
                    this.$store.dispatch('setBrands', resp.data)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getCategories() {
            try {
                const resp = await this.$http.get('/category')
                if (resp.status) {
                    this.$store.dispatch('setCategories', resp.data)
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>