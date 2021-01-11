<template>
  <div>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :label="label"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-model="time"
        full-width
        scrollable
        @click:minute="$refs.menu.save(time)"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$refs.menu.save(time)">确认</v-btn>
      </v-time-picker>
    </v-menu>
    <v-menu></v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class EventTimePicker extends Vue {
  @Prop({ type: String, required: true })
  time: string | null = null;

  @Prop({ type: String })
  max: string | null = null;

  @Prop({ type: String })
  min: string | null = null;

  @Prop({ type: String, required: true })
  label = "";
}
</script>
