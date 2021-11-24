<template>
  <v-row>
    <v-col md="6">
      <v-text-field type="number" v-model.number="localNewValue">
      </v-text-field>
    </v-col>
    <v-col md="6">
      <v-btn @click="insert">INSERT</v-btn>
    </v-col>
    <v-row>
      <v-col md="3">
        <span> Tree size: {{ treeSize }} </span>
      </v-col>
      <v-col md="3">
        <span> Tree max depth: {{ treeMaxDepth }} </span>
      </v-col>
      <v-col md="3">
        <span> Tree min value: {{ treeMinValue }} </span>
      </v-col>
    </v-row>
    <v-col md="12">
      <v-row>
        <v-col md="6">
          <v-text-field v-model="pathSum"></v-text-field>
        </v-col>
        <v-col md="6">
          <span> Tree has path sum: {{ hasTreePathSum }} </span>
        </v-col>
      </v-row>
    </v-col>
    <v-col md="12">
      <span> Tree paths: {{ treePaths }} </span>
    </v-col>
    <v-col md="12">
      <v-row>
        <v-col md="3">
          <v-btn @click="mirror">mirror</v-btn>
        </v-col>
        <v-col md="3">
          <v-btn @click="doubleTree">doubleTree</v-btn>
        </v-col>
      </v-row>
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

  private get hasTreePathSum(): boolean {
    return this.treeData.hasPathSum(this.pathSum);
  }

  private get treePaths(): number[][] {
    return this.treeData.printPaths();
  }

  private mirror() {
    this.treeData.mirror();
  }

  private doubleTree() {
    this.treeData.doubleTree();
  }

  private localNewValue = 10;
  private pathSum = 10;

  @Emit("tree-insert")
  private insert() {
    return this.localNewValue;
  }
}
</script>
