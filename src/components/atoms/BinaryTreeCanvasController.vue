<template>
  <v-row>
    <v-col md="12">
      <v-row>
        <v-col md="3">
          <v-text-field
            dense
            outlined
            type="number"
            label="Insert value to tree"
            v-model.number="localNewValue"
          >
          </v-text-field>
        </v-col>
        <v-col md="3">
          <v-btn @click="insert">INSERT</v-btn>
        </v-col>
        <v-col md="3">
          <v-text-field
            outlined
            dense
            type="number"
            v-model.number="pathSum"
            label="Tree has path sum:"
          ></v-text-field>
        </v-col>
        <v-col md="3">
          <v-chip :color="hasTreePathSum ? 'green' : 'red'">{{
            hasTreePathSum
          }}</v-chip>
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col md="3">
        <v-chip color="green" text-color="white">
          Tree size:
          <v-avatar right class="green darken-4">{{ treeSize }}</v-avatar>
        </v-chip>
      </v-col>
      <v-col md="3">
        <v-chip color="green" text-color="white">
          Tree max depth:
          <v-avatar right class="green darken-4">{{ treeMaxDepth }}</v-avatar>
        </v-chip>
      </v-col>
      <v-col md="3">
        <v-chip color="green" text-color="white">
          Tree min value:
          <v-avatar right class="green darken-4">{{ treeMinValue }}</v-avatar>
        </v-chip>
      </v-col>
      <v-col md="3">
        <v-chip color="green" text-color="white">
          Tree max value:
          <v-avatar right class="green darken-4">{{ treeMaxValue }}</v-avatar>
        </v-chip>
      </v-col>
    </v-row>
    <v-col md="12">
      <span> Tree paths: {{ treePaths }} </span>
    </v-col>
    <v-col md="12">
      <v-row>
        <v-col md="3">
          <v-btn @click="mirror">mirror</v-btn>
        </v-col>
        <v-col md="3">
          <v-btn @click="doubleTree">double Tree</v-btn>
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

  private get treeMaxValue(): number {
    return this.treeData.maxValue();
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
