<template>
    <VueSlickCarousel v-bind="settings">
        <img v-for="img in images" :src="img" class="w-full md:h-[80vh] h-[40vh] object-fill">
    </VueSlickCarousel>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
export default {
    name: 'vue-slick-carousel',
    components: { VueSlickCarousel },
    data() {
        return {
            images: [
                require('@/assets/banners/banner1.png'),
                require('@/assets/banners/banner2.png'),
                require('@/assets/banners/banner3.png'),
            ],
            settings: {
                "touchMove":true,
                "swipe":true,
                "arrows": false,
                "dots": false,
                "infinite": true,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "autoplay": true,
                "autoplaySpeed": 2000,
                "cssEase": "linear"
            }
        }
    }
}
</script>
<style></style>