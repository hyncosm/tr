<template>
  <div :id="item.id" class="accordion-item" :class="{ 'is-active': item.active }">
    <dt class="accordion-item-title">
      <button @click="toggle" class="accordion-item-trigger">
        <h4 class="accordion-item-title-text">{{ getTitleByLang(item) }}</h4>
        <span class="accordion-item-trigger-icon"></span>
      </button>
    </dt>
    <transition name="accordion-item" @enter="startTransition" @after-enter="endTransition"
      @before-leave="startTransition" @after-leave="endTransition">
      <dd v-if="item.active" class="accordion-item-details">
        <div class="accordion-item-details-inner">
          <slot name="content"></slot>
        </div>
      </dd>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    groupId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      currentLanguage: this.$store.state.siteLanguage,
    }
  },
  watch:{
    "$store.state.siteLanguage"(value){
      this.currentLanguage = value
    }
  },
  computed: {
    getTitleByLang() {
      return (content) => {
        switch (this.currentLanguage) {
          case "en":
            return content.titleEN || "Name not available";
          case "ar":
            return content.titleAR || "اسم غير متوفر";
          case "fr":
            return content.titleFR || "Nom non disponible";
        }
      }
    },
  },
  methods: {

    toggle(event) {
      if (this.multiple) {
        this.item.active = !this.item.active;
      } else { 
        this.$parent.$children.forEach((item) => {
          if (item.$el.id === event.currentTarget.parentElement.parentElement.id)
            item.item.active = !item.item.active;
          else
            item.item.active = false;
        });
      }
    },
    startTransition(el) {
      el.style.height = el.scrollHeight + "px";
    },
    endTransition(el) {
      el.style.height = "";
    }
  }
};
</script>