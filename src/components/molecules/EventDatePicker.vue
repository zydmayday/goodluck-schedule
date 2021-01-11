<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="日期"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date"></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class EventDatePicker extends Vue {
  date: string = new Date().toISOString().substr(0, 10);
}
</script>
