<template>
    <div class="admin-settings w-full flex gap-2">
        <div class="relative flex flex-col gap-5 p-1 rounded-md text-sm text-[#030229]"
            :class="closePanel ? 'w-12' : 'w-1/5'">
            <div class="top-4 right-4 p-2 cursor-pointer text-[#667085] hover:text-gray-600"
                @click="closePanel == true ? closePanel = false : closePanel = true">
                <icn :name="closePanel ? 'open-panel' : 'close-panel'" class="h-4 w-4 fill-current" :class="[{ 'float-right': !closePanel }, { 'mx-auto': closePanel }]" />
            </div>
            <div class="p-1 text-[#262E56]">
                <RouterLink to="/admin/settings?tab=categories" >
                    <h1 @click="tab = 'information'" class="flex items-center mb-6 p-1.5 rounded-lg cursor-pointer"
                        :class="{ 'text-white bg-[#262E56]': $route.query.tab === 'categories' || !$route.query.tab }">
                        <icn name="tag" class="h-6 w-6 fill-current "  /> <span
                            v-if="!closePanel" class="ml-5" >Categories </span>
                    </h1>
                </RouterLink>
                <RouterLink to="/admin/settings?tab=brands">
                    <h1 @click="tab = 'service'" class=" flex items-center mb-6 p-1.5 rounded-lg cursor-pointer"
                        :class="{ 'text-white bg-[#262E56]': $route.query.tab === 'brands' }">
                        <icn name="king" class="h-6 w-6 fill-current "  /> <span
                            v-if="!closePanel" class="ml-5">Les marques</span>
                    </h1>
                </RouterLink>
            </div>
        </div>

        <div class="p-4 border rounded-md text-sm bg-[#FFFFFF]" :class="closePanel ? 'w-full' : 'w-4/5'">
            <div class="flex flex-col gap-5 rounded " v-if="$route.query.tab === 'categories'">
                <categoriesTab></categoriesTab>
            </div>

            <div class="flex flex-col gap-5 rounded " v-if="$route.query.tab === 'brands'">
                <brandsTab></brandsTab>
            </div>
        </div>
    </div>
</template>

<script>
import categoriesTab from './components/categories.vue'
import brandsTab from './components/brands.vue'


export default {
    components: { categoriesTab, brandsTab },
    data() {
        return {

            closePanel: true,
            tab: 'categories',
        }
    },
    methods: {

    },

    created() {
        this.$store.dispatch('setBreadCrumb', [
            {
                to: null,
                text: 'Paramètres'
            },
        ])
    }

}
</script>
