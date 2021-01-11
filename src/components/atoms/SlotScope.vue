<template>
  <span>
    <slot :user="user"> lastName: {{ user.lastName }} </slot>
  </span>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import { User } from "@/types";
@Component
export default class SlotScope extends Vue {
  @PropSync("user", { type: Object })
  private syncedUser!: User;
}
</script>
