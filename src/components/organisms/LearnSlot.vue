<template>
  <v-row>
    <v-col md="12">
      <slot-default></slot-default>
      <slot-default>
        <template #text>123</template>
      </slot-default>
    </v-col>
    <v-col md="12">
      <slot-scope :user="user">
        <template #default="{ user }">
          firstName: {{ user.firstName }} LastName:
          {{ user.lastName }}
        </template>
      </slot-scope>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SlotDefault from "@/components/atoms/SlotDefault.vue";
// import SlotScope from "@/components/atoms/SlotScope.vue";
@Component({
  components: {
    SlotDefault,
    "slot-scope": () => import("@/components/atoms/SlotScope.vue")
  }
})
export default class LearnSlot extends Vue {
  user = { firstName: "li", lastName: "hui" };
}
</script>
