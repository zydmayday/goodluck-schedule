<template>
  <v-container>
    <schedule-management-panel></schedule-management-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ScheduleManagementPanel from "@/components/organisms/ScheduleManagementPanel.vue";
@Component({
  components: {
    ScheduleManagementPanel
  }
})
export default class ScheduleManagement extends Vue {}
</script>
