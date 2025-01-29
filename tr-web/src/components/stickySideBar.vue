<template>
    <div class="flex z-40 text-xs" :class="{ 'fixed inset-0 overflow-hidden': dimmer && open }">
        <div class="fixed flex h-[100vh] inset-y-0 z-20" :class="[right ? '-right-2 flex-row' : '-left-2 flex-row-reverse']">
            <!--Drawer -->
            <button @click.prevent="toggle()"
                class="w-10 h-32 p-1 my-auto rounded text-white bg-gray-900 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
                <span :class="[right ? '-rotate-90' : 'rotate-90']" class="block transform origin-center font-bold capitalize">
                    <slot name="title"> </slot>
                </span>
            </button>

            <!-- Sidebar Content -->
            <div ref="content" class="transition-all duration-700 overflow-scroll bg-white flex pt-10 justify-center" :class="[open ? 'max-w-[70vw] w-[70vw]' : 'max-w-0']">
                <slot name="content" :toggle="toggle"> </slot>
            </div>
        </div>

        <transition name="fade">
            <div v-if="dimmer && open" @click="toggle()"
                class="h-[100vh] flex-1 bg-gray-400 bg-opacity-75 active:outline-none z-10" />
        </transition>
    </div>
</template>
<script>
export default {
    name: 'sticky-side-bar',
    data() {
        return {
            open: false,
            dimmer: true,
            right: false
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        }
    }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>