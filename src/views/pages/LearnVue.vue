<template>
  <v-container>
    <v-row>
      <learn-vue-model v-model="modelChecked"></learn-vue-model>
    </v-row>
    <v-row>
      <learn-slot></learn-slot>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LearnVueModel from "@/components/organisms/LearnVueModel.vue";
import LearnSlot from "@/components/organisms/LearnSlot.vue";
@Component({
  components: {
    LearnVueModel,
    LearnSlot
  }
})
export default class LearnVue extends Vue {
  private modelChecked = false;
}
</script>
