<template>
  <dl class="accordion box w-10/12 mx-auto" role="presentation">
    <AccordionItem
      v-for="(item, index) in content"
      :multiple="multiple"
      :item="item"
      :key="item.id">
      <template v-slot:content>
        <slot :name="'content-' + index"></slot>
      </template>
    </AccordionItem>
  </dl>
</template>

<script>
import AccordionItem from './AccordionItem.vue';

export default {
  name: 'Accordion',
  props: {
    content: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },

  components: {
    AccordionItem
  }
};
</script>



<style>
.accordion {
  padding: 0;
}

.accordion div:not(:last-child) {
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);
}

.accordion div:last-child .accordion-item-details {
  border-radius: 5px;
}


.accordion-item-trigger{
  padding:1rem 0;
}

.accordion-item-details-inner {
  padding: 0 1rem;

}

.accordion-item-title {
  position: relative;
}

.accordion-item-title h4 {
  /* font-size: 1rem; */
  margin-bottom: 0;
  padding-right: 1.25rem;
}

.accordion-item-trigger {
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
}

.accordion-item-trigger-icon {
  display: block;
  position: absolute;
  top: 0;
  right: 1.25rem;
  bottom: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid #363636;
  border-bottom: 2px solid #363636;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 0.2s ease;
}

.is-active .accordion-item-trigger-icon {
  transform: translateY(2px) rotate(225deg);
}

.accordion-item-details {
  overflow: hidden;
  background-color: whitesmoke;
}

.accordion-item-enter-active,
.accordion-item-leave-active {
  will-change: height;
  transition: height 0.2s ease;
}

.accordion-item-enter,
.accordion-item-leave-to {
  height: 0 !important;
}
</style>