<template>
  <v-container>
    <binary-tree-canvas-panel
      :canvasMetaData="canvasMetaData"
      :treeMetaData="treeMetaData"
      :treeData="treeData"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BinaryTreeCanvasPanel from "@/components/organisms/BinaryTreeCanvasPanel.vue";
import { CanvasMetaData, TreeData, TreeMetaData } from "@/types";
@Component({
  components: {
    BinaryTreeCanvasPanel
  }
})
export default class LearnCanvas extends Vue {
  private canvasMetaData: CanvasMetaData = {
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
    wMax: this.canvasMetaData.width / 2,
    wMin: 0,
    hMax: this.canvasMetaData.height / 2,
    hMin: 0
  };
}
</script>
