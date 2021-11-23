<template>
  <v-row>
    <v-col md="6">
      <v-text-field v-model="localNewValue"> </v-text-field>
    </v-col>
    <v-col md="6">
      <v-btn @click="insert">INSERT</v-btn>
    </v-col>
    <v-col md="12">
      <span> Tree size: {{ treeSize }} </span>
    </v-col>
    <v-col md="12">
      <span> Tree max depth: {{ treeMaxDepth }} </span>
    </v-col>
    <v-col md="12">
      <span> Tree min value: {{ treeMinValue }} </span>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { TreeData } from "@/types";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component
export default class BinaryTreeCanvasController extends Vue {
  @Prop()
  private treeData!: TreeData;

  private get treeSize(): number {
    return this.treeData.size();
  }

  private get treeMaxDepth(): number {
    return this.treeData.maxDepth();
  }

  private get treeMinValue(): number {
    return this.treeData.minValue();
  }

  private localNewValue = 10;

  @Emit("tree-insert")
  private insert() {
    return this.localNewValue;
  }
}
</script>
