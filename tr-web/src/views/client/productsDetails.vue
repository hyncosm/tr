<template>
  <div class="w-full lg:py-10 py-5">
    <template v-if="isLoaded">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb lg:flex hidden">
          <li class="breadcrumb-item text-gray-600">
            <a href="#" class="text-gray-600 hover:text-[#dab37d] mx-2"
              >{{ $t("productDetailPage.title") }}</a
            >
          </li>
          <li class="breadcrumb-item text-gray-600">
            <a href="#" class="text-gray-600 hover:text-[#dab37d] mx-2">{{
              this.selectedProduct.category.main
            }}</a>
          </li>
          <li class="breadcrumb-item text-gray-600">
            <a href="#" class="text-gray-600 hover:text-[#dab37d] mx-2">{{
              this.selectedProduct.category.sub
            }}</a>
          </li>
          <li class="breadcrumb-item text-gray-600">
            <a href="#" class="text-gray-600 hover:text-[#dab37d] mx-2">{{
              this.selectedProduct.brand
            }}</a>
          </li>
          <li
            class="breadcrumb-item active text-[#dab37d] hover:text-[#dab37d] mx-2"
            aria-current="page"
          >
            {{ getProductName(this.selectedProduct) }}
          </li>
        </ol>
      </nav>

      <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="container px-5 md:py-24 pb-20 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap relative">
            <span
              class="bg-red-500 font-semibold text-white text-base px-2 rounded-lg absolute top-5 left-5"
            >
              -{{ selectedProduct.discount }} {{ $t("productDetailPage.PoucentageRed") }}
            </span>
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              :src="selectedProduct.pictures[0]"
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {{ this.selectedProduct.brand }}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {{ getProductName(this.selectedProduct) }}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    ></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    ></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    ></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    ></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    ></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 {{ $t("productDetailPage.reviews") }}</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                      ></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      ></path>
                    </svg>
                  </a>
                  <a class="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                      ></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed">
                {{ getProductDescription(this.selectedProduct).replace(/\/\/n/g, "") }}
              </p>
              <div
                class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"
              >
                <div class="flex ml-6 items-center">
                  <span class="mr-3">{{ $t("productDetailPage.quantity") }}</span>
                  <div class="relative">
                    <select
                      class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                    <span
                      class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-between gap-4 text-sm md:text-base"
              >
                <div class="text-lg text-gray-500 line-through">
                  {{ this.selectedProduct.oldPrice }}
                  MAD
                </div>
                <span class="title-font font-medium text-2xl text-gray-900"
                  >{{ this.selectedProduct.price }} MAD</span
                >
                <button
                  class="flex text-white bg-red-500 border-0 p-2 md:px-6 focus:outline-none hover:bg-red-600 rounded"
                  @click="
                    goTo({
                      name: 'commander-produit',
                      params: { id: selectedProduct._id },
                    })
                  "
                >
                {{ $t("productDetailPage.passerCommande") }}
                </button>
                <button
                  class="rounded-full w-10 h-10 bg-gray-200 p-2 border-0 inline-flex items-center justify-center text-gray-500"
                >
                  <Icn
                    name="shopping-cart"
                    class="text-black w-5 h-5 fill-current"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="mt-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        <h3 class="text-xl font-bold text-gray-800">{{ $t("productDetailPage.infosProduit") }}</h3>
        <ul class="mt-4 space-y-6 text-gray-800 capitalized">
          <li class="text-sm">
            {{ $t("productDetailPage.marque") }}
            <span class="ml-4 float-right">{{
              selectedProduct.brand
            }}</span>
          </li>
          <li class="text-sm">
            {{ $t("productDetailPage.category") }}
            <span class="ml-4 float-right">{{
              selectedProduct.category.main
            }}</span>
          </li>
          <li class="text-sm">
            {{ $t("productDetailPage.nombreVente") }}
            <span class="ml-4 float-right">{{ selectedProduct.sales }}</span>
          </li>
          <li class="text-sm">
            {{ $t("productDetailPage.reduction") }}
            <span class="ml-4 float-right">
              - {{ selectedProduct.discount }} %</span
            >
          </li>
          <li class="text-sm">
            {{ $t("productDetailPage.prixSansRed") }}
            <span class="ml-4 float-right"
              >{{ selectedProduct.oldPrice }}MAD</span
            >
          </li>
          <li class="text-sm">
            {{ $t("productDetailPage.prixAvcRed") }}
            <span class="ml-4 float-right font-bold"
              >{{ selectedProduct.price }}MAD</span
            >
          </li>
        </ul>
      </div>
      <!-- <div class="mt-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
                <div class="grid md:grid-cols-2 gap-12 mt-4">
                    <div class="space-y-3">
                        <div class="flex items-center">
                            <p class="text-sm text-gray-800 font-bold">5.0</p>
                            <svg class="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-2/3 h-full rounded bg-blue-600"></div>
                            </div>
                            <p class="text-sm text-gray-800 font-bold ml-3">66%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-800 font-bold">4.0</p>
                            <svg class="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-1/3 h-full rounded bg-blue-600"></div>
                            </div>
                            <p class="text-sm text-gray-800 font-bold ml-3">33%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-800 font-bold">3.0</p>
                            <svg class="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-1/6 h-full rounded bg-blue-600"></div>
                            </div>
                            <p class="text-sm text-gray-800 font-bold ml-3">16%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-800 font-bold">2.0</p>
                            <svg class="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-1/12 h-full rounded bg-blue-600"></div>
                            </div>
                            <p class="text-sm text-gray-800 font-bold ml-3">8%</p>
                        </div>

                        <div class="flex items-center">
                            <p class="text-sm text-gray-800 font-bold">1.0</p>
                            <svg class="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <div class="bg-gray-400 rounded w-full h-2 ml-3">
                                <div class="w-[6%] h-full rounded bg-blue-600"></div>
                            </div>
                            <p class="text-sm text-gray-800 font-bold ml-3">6%</p>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-start">
                            <img src="https://readymadeui.com/team-2.webp"
                                class="w-12 h-12 rounded-full border-2 border-white" />
                            <div class="ml-3">
                                <h4 class="text-sm font-bold text-gray-800">John Doe</h4>
                                <div class="flex space-x-1 mt-1">
                                    <svg class="w-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <p class="text-xs !ml-2 font-semibold text-gray-800">2 mins ago</p>
                                </div>
                                <p class="text-sm mt-4 text-gray-800">Lorem ipsum dolor sit amet, consectetur adipisci elit,
                                    sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <button type="button"
                            class="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded">Read
                            all reviews</button>
                    </div>
                </div>
            </div> -->
    </template>
    <template v-else>
      <loadingSpinner />
    </template>
  </div>
</template>

<script>
export default {
  name: "product-details",
  data() {
    return {
      selectedProduct: null,
      isLoaded: false,
      currentLanguage: this.$store.state.siteLanguage,
    };
  },
  computed: {
    getProductName() {
      return (product) => {
        switch (this.currentLanguage) {
          case "en":
            return product.nameEN || "Name not available";
          case "ar":
            return product.nameAR || "اسم غير متوفر";
          case "fr":
            return product.nameFR || "Nom non disponible";
          default:
            return product.nameFR || "Nom non disponible";
        }
      };
    },
    getProductDescription() {
      return (product) => {
        switch (this.currentLanguage) {
          case "en":
            return product.descriptionEN || "Description not available";
          case "ar":
            return product.descriptionAR || "وصف غير متوفر";
          case "fr":
            return product.descriptionFR || "Description non disponible";
          default:
            return product.descriptionFR || "Description non disponible";
        }
      };
    },
  },
  created() {
    this.getProductDetails();
  },
  watch: {
    "$store.state.siteLanguage"(value) {
        this.currentLanguage = value;
    },
  },
  methods: {
    async getProductDetails() {
      try {
        const resp = await this.$http.get(
          `/product/one/${this.$route.params.id}`
        );
        if (resp.status) {
          this.selectedProduct = resp.data;
          this.isLoaded = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    goTo(payload) {
      this.$router.push({ name: payload.name, params: payload.params });
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  .breadcrumb-item {
    position: relative;

    &:first-child {
      margin-left: 0 !important;
    }

    &:not(:last-child):after {
      content: "/";
    }
  }
}
</style>
