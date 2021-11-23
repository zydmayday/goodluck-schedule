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
import {
  CanvasMetaData,
  TreeData,
  TreeMetaData,
  CanvasTreeNode
} from "@/types";
@Component
export default class BinaryTreeCanvas extends Vue {
  @Prop()
  private canvasMetaData!: CanvasMetaData;

  @Prop()
  private treeMetaData!: TreeMetaData;

  @Prop()
  private treeData!: TreeData;

  @Watch("treeMetaData", { immediate: true, deep: true })
  onTreeMetaDataChanged(): void {
    this.draw();
  }

  @Watch("treeData", { immediate: true, deep: true })
  onTreeDataChanged(): void {
    this.draw();
  }

  private ctx!: CanvasRenderingContext2D | null;

  get canvasStyle() {
    return {
      width: this.canvasMetaData.width + "px",
      height: this.canvasMetaData.height + "px"
    };
  }

  private calculateNodePosition(
    node: CanvasTreeNode | undefined,
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

  private clearCtx(): void {
    this.ctx?.clearRect(
      0,
      0,
      this.canvasMetaData.width,
      this.canvasMetaData.height
    );
  }

  private draw() {
    const rootNode = CanvasTreeNode.fromTreeData(this.treeData);
    this.calculateNodePosition(
      rootNode,
      this.canvasMetaData.width / 2,
      this.canvasMetaData.height / 8
    );
    this.clearCtx();
    if (this.ctx) {
      rootNode?.draw(this.ctx, this.treeMetaData.r);
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
}
</style>
