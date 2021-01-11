<template>
  <v-container>
    <binary-tree-canvas
      :canvasMetaData="metaData"
      :treeData="treeData"
      :treeMetaData="treeMetaData"
    />
    <binary-tree-canvas-controller :treeMetaData.sync="treeMetaData" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BinaryTreeCanvas from "@/components/atoms/BinaryTreeCanvas.vue";
import BinaryTreeCanvasController from "@/components/atoms/BinaryTreeCanvasController.vue";
import { CanvasMetaData, TreeData, TreeMetaData } from "@/types";
@Component({
  components: {
    BinaryTreeCanvas,
    BinaryTreeCanvasController
  }
})
export default class LearnCanvas extends Vue {
  private metaData: CanvasMetaData = {
    width: 800,
    height: 400
  };

  private treeData: TreeData = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1
      },
      right: {
        val: 3
      }
    },
    right: {
      val: 6,
      left: {
        val: 5,
        left: {
          val: 4.5,
          left: {
            val: 4.2
          }
        },
        right: {
          val: 5.5
        }
      },
      right: {
        val: 7
      }
    }
  };
  private treeMetaData: TreeMetaData = {
    w: 50,
    h: 30,
    r: 10,
    wMax: this.metaData.width / 2,
    wMin: 0,
    hMax: this.metaData.height / 2,
    hMin: 0
  };
}
</script>
