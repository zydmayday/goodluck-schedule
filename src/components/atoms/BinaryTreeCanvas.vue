<template>
  <canvas
    :width="canvasMetaData.width"
    :height="canvasMetaData.height"
    :style="canvasStyle"
    class="canvas"
  ></canvas>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CanvasMetaData, TreeData, TreeMetaData, TreeNode } from "@/types";
@Component
export default class BinaryTreeCanvas extends Vue {
  @Prop()
  private canvasMetaData!: CanvasMetaData;

  @Prop()
  private treeMetaData!: TreeMetaData;

  @Watch("treeMetaData", { immediate: true, deep: true })
  onTreeMetaDataChanged(): void {
    this.draw();
  }

  @Prop()
  private treeData!: TreeData;

  private ctx!: CanvasRenderingContext2D | null;

  get canvasStyle() {
    return {
      width: this.canvasMetaData.width + "px",
      height: this.canvasMetaData.height + "px"
    };
  }

  toNode(
    treeData: TreeData | undefined,
    parent: TreeNode | undefined
  ): TreeNode | undefined {
    let node;
    if (treeData) {
      node = new TreeNode(treeData.val);
      node.left = this.toNode(treeData.left, node);
      node.right = this.toNode(treeData.right, node);
      if (parent) {
        parent.layer = Math.max(parent.layer, node.layer + 1);
      }
    }
    return node;
  }

  calculateNodePosition(
    node: TreeNode | undefined,
    x: number,
    y: number
  ): void {
    if (node) {
      node.x = x;
      node.y = y;
      this.calculateNodePosition(
        node.left,
        x - this.treeMetaData.w * 2 ** (node.layer - 1),
        y + this.treeMetaData.h
      );
      this.calculateNodePosition(
        node.right,
        x + this.treeMetaData.w * 2 ** (node.layer - 1),
        y + this.treeMetaData.h
      );
    }
  }

  draw() {
    const rootNode = this.toNode(this.treeData, undefined);
    this.calculateNodePosition(
      rootNode,
      this.canvasMetaData.width / 2,
      this.canvasMetaData.height / 8
    );
    if (this.ctx && rootNode) {
      this.ctx.clearRect(
        0,
        0,
        this.canvasMetaData.width,
        this.canvasMetaData.height
      );
      rootNode.draw(this.ctx, this.treeMetaData.r);
    }
  }

  mounted() {
    const $ele = this.$el as HTMLCanvasElement;
    this.ctx = $ele.getContext("2d");
    this.draw();
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #000;
  width: 200px;
}
</style>
