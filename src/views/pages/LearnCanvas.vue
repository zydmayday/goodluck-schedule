<template>
  <v-container>
    <binary-tree-canvas-panel
      :canvasMetaData="canvasMetaData"
      :treeMetaData="treeMetaData"
      :treeData="treeData"
      @tree-insert="insert"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BinaryTreeCanvasPanel from "@/components/organisms/BinaryTreeCanvasPanel.vue";
import { CanvasMetaData, TreeData, TreeMetaData } from "@/types";
@Component({
  components: {
    BinaryTreeCanvasPanel,
  },
})
export default class LearnCanvas extends Vue {
  private canvasMetaData: CanvasMetaData = {
    width: 800,
    height: 400,
  };

  private treeData: TreeData = new TreeData(10, undefined, undefined);
  private treeMetaData: TreeMetaData = {
    w: 30,
    h: 50,
    r: 15,
    wMax: this.canvasMetaData.width / 2,
    wMin: 0,
    hMax: this.canvasMetaData.height / 2,
    hMin: 0,
  };

  private insert(value: number) {
    this.treeData.insert(value);
  }
}
</script>
