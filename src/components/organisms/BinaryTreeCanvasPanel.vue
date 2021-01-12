<template>
  <v-row>
    <v-col>
      <binary-tree-canvas
        :canvasMetaData="canvasMetaData"
        :treeMetaData="treeMetaData"
        :treeData="treeData"
      />
    </v-col>
    <v-col>
      <binary-tree-canvas-controller :treeMetaData="treeMetaData" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BinaryTreeCanvas from "@/components/atoms/BinaryTreeCanvas.vue";
import BinaryTreeCanvasController from "@/components/atoms/BinaryTreeCanvasController.vue";
import { CanvasMetaData, TreeData, TreeMetaData } from "@/types";
@Component({
  components: {
    BinaryTreeCanvas,
    BinaryTreeCanvasController
  }
})
export default class BinaryTreeCanvasPanel extends Vue {
  @Prop()
  private canvasMetaData!: CanvasMetaData;

  @Prop()
  private treeMetaData!: TreeMetaData;

  @Prop()
  private treeData!: TreeData;
}
</script>
