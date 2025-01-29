<template>
    <div class="my-4 flex flex-col gap-5 p-5 bg-white">
        <div class="hidden lg:block">
            <div class="flex flex-row justify-between pb-5">
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3">
                        <icn name="search" class="mx-1 h-5 w-5 fill-current text-gray-900" />
                    </div>
                    <input type="text"
                        class="focus:border focus:border-sky-500 text-gray-900 border border-gray-500 rounded-md rounded-lg pl-10 p-2"
                        placeholder="Rechercher" v-model="filters.inputSearch" @input="debouncedSearch" />
                </div>
                <select class="p-2 border rounded-lg text-sm" v-model="filters.status">
                    <option selected value="">status</option>
                    <option value="PENDING">En cours</option>
                    <option value="CONFIRMED">Confirmée</option>
                    <option value="SHIPPED">Expédié</option>
                    <option value="CANCELED">Annuler</option>
                </select>
            </div>
            <template v-if="isLoaded">
                <div class="shadow-md relative w-full rounded-lg  overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Client / Invoice
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Produit
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Heure / Date
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="command in commands">
                            <tr class="bg-white cursor-pointer duration-300 hover:bg-gray-50"
                                @click="setSelectedCommand(command)">
                                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                    <div class="flex">
                                        <div class="flex-shrink-0 w-10 h-10">
                                            <img class="w-full h-full rounded-full"
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                                alt="" />
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {{ command.nom }} {{ command.prenom }}
                                            </p>
                                            <p class="text-gray-600 whitespace-no-wrap">{{ command.tel }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ command.product.nameFR }}</p>
                                    <p class="text-gray-600 whitespace-no-wrap font-bold">{{ command.product.price }}
                                        MAD</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ command.createdAt | date }}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                    <span
                                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span class="relative">{{ command.status | commandStatus }}</span>
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="selectedCommand != null && command._id === selectedCommand._id">
                                <td :colspan="4">
                                    <div
                                        class="w-full p-4 bg-gray-50 rounded flex flex-row items-center justify-between gap-5 whitespace-nowrap">
                                        <div class="w-1/4">
                                            <img :src="selectedCommand.product.pictures[0]" class="w-[15rem] h-[15rem]">
                                        </div>
                                        <div class="w-full flex flex-col gap-5">
                                            <div class="flex gap-10">
                                                <div class="w-auto px-5 border-l border-gray-900">
                                                    <div class="text-sm font-bold mb-4">Information du client</div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Nom et prenom :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.nom }} {{ selectedCommand.prenom }}
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Numero de telephone :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.tel }}
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Address email :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.email }}
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Address de livraison :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.adresse }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="w-auto px-5 border-l border-gray-900">
                                                    <div class="text-sm font-bold mb-4">Information du commande</div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Produit :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.product.nameFR }}
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Categorie
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.product.category.main }} / {{
                                selectedCommand.product.category.sub }}
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Prix :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.product.price }} MAD
                                                        </span>
                                                    </div>
                                                    <div class="flex items-center gap-4 text-xs">
                                                        <span class="font-semibold ">
                                                            Date du commande :
                                                        </span>
                                                        <span>
                                                            {{ selectedCommand.createdAt | date }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full border-t border-gray-900"></div>
                                            <div class="flex justify-between p-4 border-l border-gray-900">
                                                <div class="w-full flex items-center"
                                                    v-if="selectedCommand.status == 'PENDING'">
                                                    <button @click="deleteCommand"
                                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                                        Supprimer la commande
                                                    </button>
                                                    <button @click="confirmCommand"
                                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4  md:mt-0 md:order-1">
                                                        Confirmer la commande
                                                    </button>
                                                </div>
                                                <div class="w-full flex items-center"
                                                    v-if="selectedCommand.status == 'CONFIRMED'">
                                                    <button @click="shipCommand"
                                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4  md:mt-0 md:order-1">
                                                        Expidier la commande
                                                    </button>
                                                </div>
                                                <div class="flex items-center  gap-2">
                                                    <span class="font-medium">Status du commande :</span>
                                                    <span
                                                        class="text-xs rounded-md px-3 py-2 font-semibold text-gary-900 bg-green-200 ">
                                                        {{ selectedCommand.status | commandStatus }}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else>
                <loadingSpinner />
            </template>

            <div class="flex flex-row justify-end mt-4">
                <div class="flex flex-row gap-1 basis-1/12 justify-end">
                    <div :class="[hasPrev ? 'border rounded-md p-2 hover:bg-gray-100 cursor-pointer' : 'border rounded-md p-2 ']"
                        @click="paginateTo('prev')">
                        <icn name="arrow-left" class="h-4 w-4 fill-current text-gray-600" />
                    </div>
                    <select class="block border text-center rounded-lg p-1" v-model="filters.limit">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <div :class="[hasNext ? 'border rounded-md p-2 hover:bg-gray-100 cursor-pointer' : 'border rounded-md p-2 ']"
                        @click="paginateTo('next')">
                        <icn name="arrow-right" class="h-4 w-4 fill-current text-gray-600" />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-10 lg:hidden p-2 relative">
            <select class="absolute -top-[3rem] right-2 p-2 border rounded-lg text-sm" v-model="status">
                <option selected value="">status</option>
                <option value="PENDING">En cours</option>
                <option value="CONFIRMED">Confirmée</option>
                <option value="SHIPPED">Expédié</option>
                <option value="CANCELED">Annuler</option>
            </select>
            <template v-if="isLoaded">
                <div class="w-full shadow-lg rounded-md px-5 pb-5" v-for="command in commands">
                    <div class="bg-white rounded-lg m-h-64 p-2">
                        <figure class="mb-2">
                            <img :src="command.product.pictures[0]" alt="" class="h-40 ml-auto mr-auto" />
                        </figure>
                        <div class="rounded-lg p-4 bg-gray-600 flex flex-col">
                            <div>
                                <span class="text-xs text-gray-400 leading-none">Ref : {{ command._id.substring(0, 6)
                                    }}</span>

                                <h5 class="text-white text-xl font-bold leading-none">
                                    {{ command.product.nameFR }}
                                </h5>
                                <span class="text-xs text-gray-400 leading-none"> {{ command.product.category.main }} /
                                    {{ command.product.category.sub }}</span>
                                <div class="text-lg text-white font-light">
                                    {{ command.product.price }} MAD
                                </div>
                            </div>
                            <div class="flex items-center">
                                <span class="px-4 py-1 rounded-md bg-gray-800 text-white">
                                    {{ command.status | commandStatus }}
                                </span>
                                <button @click="toggleCommand(command)"
                                    class="rounded-full bg-gray-800 text-white  w-10 h-10 flex ml-auto">
                                    <Icn name="eye" class="w-6 h-6 text-white fill-current m-auto" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <loadingSpinner />
            </template>
            <pop-up :active="showDetailsCommandPopUp" size="xl" :hideCancel="true" :removable="false">
                <template v-slot:content>
                    <section class="py-4 bg-white relative">

                        <div @click="showDetailsCommandPopUp = false" class="absolute top-3 right-1">
                            <icn name="plus" class="h-4 w-4 fill-current mr-2 rotate-45 ml-1 m-auto cursor-pointer" />
                        </div>
                        <div class="w-full text-center p-4 font-semibold text-base border-b">
                            Details du commande ref : {{ selectedCommand._id.substring(0, 6) }}
                        </div>
                        <div class="mx-auto py-5 flex flex-col gap-5 bg-white px-2">
                            <figure class="mb-2">
                                <img :src="selectedCommand.product.pictures[0]" alt="" class="h-40 ml-auto mr-auto" />
                            </figure>
                            <div class="flex items-center px-2 gap-2">
                                <span class="font-medium">Status du commande :</span>
                                <span class="text-xs rounded-md px-3 py-2 font-medium text-gary-900 bg-green-200 ">
                                    {{ selectedCommand.status | commandStatus }}
                                </span>
                            </div>
                            <div class="w-auto px-2">
                                <div class="text-sm font-bold mb-2 border-b w-full">Information du client</div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Nom et prenom :
                                    </span>
                                    <span>
                                        {{ selectedCommand.nom }} {{ selectedCommand.prenom }}
                                    </span>
                                </div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Telephone :
                                    </span>
                                    <span>
                                        {{ selectedCommand.tel }}
                                    </span>
                                </div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold ">
                                        Email :
                                    </span>
                                    <span>
                                        {{ selectedCommand.email }}
                                    </span>
                                </div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Address de livraison :
                                    </span>
                                    <span>
                                        {{ selectedCommand.adresse }}
                                    </span>
                                </div>
                            </div>
                            <div class="w-auto px-2">
                                <div class="text-sm font-bold mb-2 border-b w-full">Information du commande</div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Produit :
                                    </span>
                                    <span>
                                        {{ selectedCommand.product.nameFR }}
                                    </span>
                                </div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Categorie :
                                    </span>
                                    <span>
                                        {{ selectedCommand.product.category.main }} / {{
                            selectedCommand.product.category.sub }}
                                    </span>
                                </div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Prix :
                                    </span>
                                    <span>
                                        {{ selectedCommand.product.price }} MAD
                                    </span>
                                </div>
                                <div class="flex items-start gap-4 text-xs">
                                    <span class="font-semibold whitespace-nowrap">
                                        Date du commande :
                                    </span>
                                    <span>
                                        {{ selectedCommand.createdAt | date }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex flex-col gap-2 px-2 text-base">
                                <div class="w-full flex flex-col items-center"
                                    v-if="selectedCommand.status == 'PENDING'">
                                    <button @click="confirmCommand"
                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mb-4  md:mt-0 md:order-1">
                                        Confirmer la commande
                                    </button>

                                    <button @click="deleteCommand"
                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                        Supprimer la commande
                                    </button>

                                </div>
                                <div class="w-full flex items-center" v-if="selectedCommand.status == 'CONFIRMED'">
                                    <button @click="shipCommand"
                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4  md:mt-0 md:order-1">
                                        Expidier la commande
                                    </button>
                                </div>
                            </div>
                        </div>

                    </section>
                </template>
            </pop-up>
        </div>
    </div>
</template>

<script>
import { debounce } from "lodash";

export default {
    data() {
        return {
            filters: {
                page: 1,
                limit: 10,
                inputSearch: '',
                status: '',
            },
            searchInputChanged: false,
            pageHasChanged: false,
            commands: [],
            pagination: {},
            isLoaded: false,
            selectedCommand: null,
            showDetailsCommandPopUp: null,
            status: ''
        }
    },
    watch: {
        status(value) {
            this.getCommands()
        },
        'filters.searchInput': function (newValue, oldValue) {
            this.searchInputChanged = true;
        },
        'filters.page': function (newValue, oldValue) {
            this.pageHasChanged = true;
        },
        filters: {
            handler(newVal, oldVal) {
                if (this.searchInputChanged) {
                    this.searchInputChanged = false;
                } else if (this.pageHasChanged) {
                    this.pageHasChanged = false;
                } else {
                    this.filters.page = 1
                    this.getCommands()
                }
            },
            deep: true,
        },
    },
    computed: {
        hasNext() {
            return (this.filters.limit * this.filters.page) < this.pagination?.total
        },
        hasPrev() {
            return (this.pagination?.page > 1)
        },
    },
    mounted() {
        this.$store.dispatch('setBreadCrumb', [
            {
                to: null,
                text: 'Gestion des commandes'
            },
        ]),
        this.getCommands()
        this.debouncedSearch = debounce(this.getCommands, 500)
    },

    unmounted() {
        this.debouncedSearch.cancel();
    },
    methods: {
        toggleCommand(payload) {
            this.selectedCommand = payload
            this.showDetailsCommandPopUp = true
        },
        async shipCommand() {
            try {
                const resp = await this.$http.post('/commande/ship', { id: this.selectedCommand._id })
                if (resp.status) {
                    this.commands.forEach(el => {
                        if (el._id === resp.data._id) el.status = resp.data.status
                    })
                    this.$toast.open({
                        message: 'La commande a bien été expédié',
                        type: 'success',
                        position: 'top-right'
                    });
                }
            } catch (error) {
                console.log(error)
            }
        },
        async confirmCommand() {
            try {
                const resp = await this.$http.post('/commande/confirm', { id: this.selectedCommand._id })
                if (resp.status) {
                    this.commands.forEach(el => {
                        if (el._id === resp.data._id) el.status = resp.data.status
                    })
                    this.$toast.open({
                        message: 'La commande a bien été confirmée',
                        type: 'success',
                        position: 'top-right'
                    });

                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteCommand() {
            try {
                const resp = await this.$http.post('/commande/cancel', { id: this.selectedCommand._id })
                if (resp.status) {
                    this.commands.forEach(el => {
                        if (el._id === resp.data._id) el.status = resp.data.status
                    })
                    this.$toast.open({
                        message: 'La commande a bien été supprimée',
                        type: 'error',
                        position: 'top-right'
                    });
                }
            } catch (error) {
                console.log(error)
            }
        },
        setSelectedCommand(payload) {
            this.selectedCommand && this.selectedCommand._id === payload._id ? this.selectedCommand = null : this.selectedCommand = payload
        },
        async getCommands() {
            try {
                const resp = await this.$http.get('/commande/all', { params: { status: this.status } })
                if (resp.status) this.commands = resp.data
                this.isLoaded = true
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>