<template>
    <div>
        <div v-if="isOpened" @click="isOpened = false" class="fixed inset-0 h-full w-full z-10 "></div>
        <div id="sidebarMenu" class="sidebar border-r border-gray-200 py-3" :class="isOpened ? 'open' : ''">
            <div style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1 ">
                <div id="my-scroll" style="margin:10px 14px;">
                    <ul style="overflow: visible;">
                        <li v-for="(menuItem, index) in menuItems" :key="index" @click="toggleMenu">
                            <a class="relative cursor-pointer"
                                :class="[isSelectedMenu(menuItem) ? 'text-[#03A9F4]' : 'text-gray-500']">
                                <icn :name="menuItem.icon" class="w-5 h-5 icn fill-current" />
                                <RouterLink active-class="footer-active"
                                    :class="[path === menuItem.link ? 'text-[#03A9F4]' : 'text-gray-500']"
                                    :to="menuItem.link">
                                    <span @click="navigateTo(menuItem)" class="links_name">
                                        {{ menuItem.name }}
                                    </span>
                                </RouterLink>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="px-2">
                    <hr class="border-gray-700" />
                </div>
                <div style="margin:5px 14px;">
                    <ul style="overflow: hidden;">
                        <li v-for="(menuItem, index) in footerMenuItems" :key="index" @click="toggleMenu(menuItem)"
                            class="flex items-center cursor-pointer"
                            :class="[path.includes(menuItem.link) ? 'text-[#03A9F4]' : 'text-gray-500']">
                            <span>
                                <icn :name="menuItem.icon" class="fill-current h-5 w-5 icn" />
                            </span>

                            <RouterLink class="links_name" active-class="footer-active" :to="menuItem.link"
                                v-if="isOpened">
                                <span @click="navigateTo(menuItem)">{{ menuItem.name }}</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SidebarMenu',
    props: {
        //! Menu settings
        isMenuOpen: {
            type: Boolean,
            default: false,
        },
        isPaddingLeft: {
            type: Boolean,
            default: true,
        },
        menuOpenedPaddingLeftBody: {
            type: String,
            default: '200px'
        },
        menuClosedPaddingLeftBody: {
            type: String,
            default: '70px'
        },
        supportSideMenuu: {
            type: Boolean,
            default: false,
        },
        //! Menu items
        menuItems: {
            type: Array,
            default: () => [
            ],
        },

        footerMenuItems: {
            type: Array,
            default: () => [
            ],
        }
    },
    data() {
        return {
            menuItem: null,
            path: null,
            isOpened: false,
            searchInput: '',
            showSubMenu: {},
        }
    },
    created() {
        this.path = this.$route.path
        this.isOpened = this.isMenuOpen
    },
    computed: {

    },
    watch: {
        '$route.path': {
            handler: function (value) {
                this.path = value
            },
            deep: true,
            immediate: true
        },
        isOpened() {
            document.getElementById('main_page_admin').style.paddingLeft = this.isOpened && this.isPaddingLeft ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody
        }
    },
    methods: {
        navigateTo(payload) {
            if (payload.link != this.path && payload.link != '#') {
                this.path = payload.link
                // this.$store.dispatch('setLoadingValue', true)
                // this.isOpened = false
            }
        },
        logout() {
            window.localStorage.removeItem('x-auth-token')
            window.localStorage.removeItem('x-refresh-token')
            window.localStorage.removeItem('uid')
            window.open('/login', '_self')
        },

        isSelectedMenu(value) {
            return value.children.length > 0 ? (value.children.filter(el => this.path.includes(el.link)).length > 0 ? true : false) : (this.path.includes(value.link) ? true : false)
        },
        toggleMenu() {
            this.isOpened = !this.isOpened
            // this.menuItem === value ? (this.isOpened = false, this.menuItem = null) : (this.isOpened = true, this.menuItem = value)
        }
    }
}
</script>

<style scoped>
/* Google Font Link */
@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');

#main_page {
    transition: all 0.5s ease;
}


.sidebar {
    display: flex;
    flex-direction: column;
    position: absolute;
    min-height: min-content;
    width: 70px;
    height: 90%;
    background: white;
    z-index: 99;
    transition: all 0.2s ease;
}

.sidebar.open {
    width: 160px;
}

.sidebar i,
.icn {
    height: 80px;
    min-width: 36px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
}


.sidebar li {
    position: relative;
    margin: 0 5px;
    list-style: none;
}

.sidebar input {
    font-size: 15px;
    color: #fff;
    font-weight: 400;
    outline: none;
    height: 50px;
    width: 100%;
    width: 50px;
    border: none;
    border-radius: 12px;
    transition: all 0.2s ease;
    background: #1d1b31;
}

.sidebar.open input {
    padding: 0 20px 0 50px;
    width: 100%;
}

.sidebar .bx-search {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 22px;
    background: #1d1b31;
    color: #fff;
}

.sidebar li a {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s ease;
    background: white;
}

.sidebar li .links_name {
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.2s ease;
}

.sidebar.open li .links_name {
    opacity: 1;
}


.sidebar li i,
.icn {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 12px;
}


#my-scroll {
    overflow-y: auto;
    height: calc(100% - 35px);
}

#my-scroll::-webkit-scrollbar {
    display: none;
}

.footer-active {
    color: #03A9F4
}

.active {
    color: #03A9F4;
    border-left: 2px solid;
    border-color: #03A9F4
}
</style>