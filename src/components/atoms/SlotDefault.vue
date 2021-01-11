<template>
  <v-btn @click="click">
    <slot name="text">Default text</slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class DefaultSlot extends Vue {
  click() {
    const value = 42;
    alert(value);
  }
}
</script>
