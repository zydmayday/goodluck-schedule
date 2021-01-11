<template>
  <v-row>
    <v-col>
      <event-time-picker
        label="开始时间"
        :time="startTime"
        :max="endTime"
      ></event-time-picker>
    </v-col>
    <v-col>
      <event-time-picker
        label="结束时间"
        :time="endTime"
        :min="startTime"
      ></event-time-picker>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import EventTimePicker from "@/components/atoms/EventTimePicker.vue";
@Component({
  components: {
    EventTimePicker
  }
})
export default class EventTimeRangePicker extends Vue {
  @Prop({ type: String, required: true })
  startTime: string | null = null;

  @Prop({ type: String, required: true })
  endTime: string | null = null;
}
</script>
