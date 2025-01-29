<template>
    <div class="w-full border pb-5 text-xs md:text-base overflow-scroll max-h-full">
        <div class="text-lg font-medium w-10/12 mx-auto border-b py-5 capitalize">
            {{ $t("filter") }}
        </div>
        <Accordion :content="accordionContent" :multiple="true">
            <template v-slot:content-0>
                <div class="flex items-center space-x-3 py-4" v-for="elm in accordionContent[0].boxes">
                    <input type="checkbox" class="border-gray-300 rounded h-5 w-5" :value="elm.name"
                        v-model="productsFilter.marques" @change="onFilterChange()"/>
                    <h1 class="text-gray-700 font-medium leading-none">{{ elm.name }}</h1>
                </div>
            </template>

            <template v-slot:content-1>
                <div class="flex flex-col gap-2" v-for="elm in accordionContent[1].boxes">
                    <div class="flex items-center space-x-3 py-4">
                        <input type="checkbox" class="border-gray-300 rounded h-5 w-5" :value="elm.nameEN"
                            v-model="productsFilter.main_categories" @change="onMainCategoryChange(elm)" />
                        <h1 class="text-gray-700 font-medium leading-none">{{ getDisplayName(elm) }}</h1>


                    </div>
                    <div class="ml-4 flex items-center space-x-3 py-4" v-for="itm in elm.subs"
                        v-if="productsFilter.main_categories.includes(elm.nameEN)">
                        <input type="checkbox" class="border-gray-300 rounded h-5 w-5" :value="itm.nameEN"
                            v-model="productsFilter.sub_categories" @change="onFilterChange()"/>
                        <h1 class="text-gray-700 font-medium leading-none">{{ getDisplayName(itm) }}</h1>
                    </div>
                </div>

            </template>
        </Accordion>
    </div>
</template>
<script>
import Accordion from './Accordion';

export default {
    components: {
        Accordion
    },
    data() {
        return {
            productsFilter: {
                main_categories: [],
                marques: [],
                sub_categories: []
            },
            accordionContent: [
                { id: 1, ref: "brand", titleFR: "Marque", titleEN: "Brand", titleAR: "العلامات التجارية", active: true, boxes: [] },
                { id: 2, ref: "category", titleFR: "Catégorie", titleEN: "Category", titleAR: "الفئات", active: true, boxes: ['Essence de Beauté', 'Bijoux Majestueux'] },
            ],
            categories: [],
            sub_categories: [],
            brands: []

        };
    },
    computed: {
        subGategories() {
            return this.categories.reduce((acc, item) => {
                if (!acc[item.main]) {
                    acc[item.main] = [];
                }
                acc[item.main].push(item.sub);
                return acc;
            }, {});
        }
    },
    watch: {
        'productsFilter.main_categories'(newVal, oldVal) {
            // Find removed main categories
            const removedCategories = oldVal.filter(category => !newVal.includes(category));

            // Loop through the removed main categories and remove their subcategories from the filter
            removedCategories.forEach(category => {
                const elm = this.accordionContent[1].boxes.find(box => box.nameEN === category);
                if (elm) {
                    // Remove subcategories from productsFilter.sub_categories
                    this.productsFilter.sub_categories = this.productsFilter.sub_categories.filter(
                        subCategory => !elm.subs.some(sub => sub.nameEN === subCategory)
                    );
                }
            });
        },
        productsFilter: {
            handler(new_val, old_val) {
                this.$emit('updatedProductsFilter', new_val)
            },
            deep: true,
        },
        "$route.params.category"(value) {
            if (value) this.productsFilter['main_categories'] = [this.$route.params.category]
        }
    },
    mounted() {
        this.getCategories()
        this.getBrands()
        if (this.$route.params.category) this.productsFilter['main_categories'] = [this.$route.params.category]
    },
    methods: {
        onMainCategoryChange(elm) {
            if (!this.productsFilter.main_categories.includes(elm.nameEN)) {
                this.productsFilter.sub_categories = this.productsFilter.sub_categories.filter(
                    subCategory => !elm.subs.some(sub => sub.nameEN === subCategory)
                );
            }
            this.$emit('updatedProductsFilter', this.productsFilter);
        },
        onFilterChange() {
            this.$emit('updatedProductsFilter', this.productsFilter);
        },
        getDisplayName(item) {
            // Return the name based on the selected language
            return item[`name${this.$store.state.siteLanguage.toUpperCase()}`];
        },
        updatedProductsFilter() {
            this.$emit('updatedProductsFilter', this.productsFilter)
        },

        async getCategories() {
            try {
                const resp = await this.$http.get('/category')
                if (resp.status) {
                    this.categories = resp.data
                    this.accordionContent.find(el => el.ref == 'category').boxes = this.categories
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getBrands() {
            try {
                const resp = await this.$http.get('/brand')
                if (resp.status) {
                    this.brands = resp.data
                    this.accordionContent.find(el => el.ref == 'brand').boxes = [...new Set(this.brands)];
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>