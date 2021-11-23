<template>
  <v-row>
    <v-col md="12">
      <v-slider
        :max="treeMetaData.wMax"
        :min="treeMetaData.wMin"
        v-model="treeMetaData.w"
        label="width"
        thumb-label="always"
      ></v-slider>
      <v-slider
        :max="treeMetaData.hMax"
        :min="treeMetaData.hMin"
        v-model="treeMetaData.h"
        label="height"
        thumb-label="always"
      ></v-slider>
      <v-slider
        v-model="treeMetaData.r"
        label="radius"
        thumb-label="always"
      ></v-slider>
      <v-text-field v-model="newValue"> </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { TreeMetaData } from "@/types";
import { Component, PropSync, Vue } from "vue-property-decorator";
@Component
export default class BinaryTreeCanvasMetadataController extends Vue {
  @PropSync("treeMetaData")
  private syncTreeMetaData!: TreeMetaData;

  @PropSync("newValue")
  private syncNewValue!: number;
}
</script>
