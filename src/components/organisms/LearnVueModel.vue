<template>
  <v-col>
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    {{ checked }}
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
@Component
export default class LearnVueModel extends Vue {
  @Model("change", { type: Boolean })
  private checked!: boolean;
}
</script>
