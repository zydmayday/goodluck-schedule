<template>
  <v-row>
    <v-col md="12">
      <binary-tree-canvas
        :canvasMetaData="canvasMetaData"
        :treeMetaData="treeMetaData"
        :treeData="treeData"
      />
    </v-col>
    <v-col md="12">
      <binary-tree-canvas-metadata-controller :treeMetaData="treeMetaData" />
    </v-col>
    <v-col md="12">
      <binary-tree-canvas-controller
        :treeData="treeData"
        @tree-insert="insert"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import BinaryTreeCanvas from "@/components/atoms/BinaryTreeCanvas.vue";
import BinaryTreeCanvasMetadataController from "@/components/atoms/BinaryTreeCanvasMetadataController.vue";
import BinaryTreeCanvasController from "@/components/atoms/BinaryTreeCanvasController.vue";
import { CanvasMetaData, TreeData, TreeMetaData } from "@/types";
@Component({
  components: {
    BinaryTreeCanvas,
    BinaryTreeCanvasMetadataController,
    BinaryTreeCanvasController,
  },
})
export default class BinaryTreeCanvasPanel extends Vue {
  @Prop()
  private canvasMetaData!: CanvasMetaData;

  @Prop()
  private treeMetaData!: TreeMetaData;

  @Prop()
  private treeData!: TreeData;

  @Emit("tree-insert")
  private insert(value: number) {
    return value;
  }
}
</script>
