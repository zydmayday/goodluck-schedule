<template>
  <v-card>
    <v-form>
      <v-row>
        <v-col cols="12" sm="4">
          <event-date-picker></event-date-picker>
        </v-col>
        <v-col cols="12" sm="8">
          <event-time-range-picker></event-time-range-picker>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventDatePicker from "@/components/molecules/EventDatePicker.vue";
import EventTimeRangePicker from "@/components/molecules/EventTimeRangePicker.vue";
@Component({
  components: {
    EventDatePicker,
    EventTimeRangePicker
  }
})
export default class ScheduleManagementPanel extends Vue {}
</script>
