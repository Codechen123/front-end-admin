<template>
  <div class="common-layout">
    <el-container class="main-content">
      <el-aside width="230px">
        <Aside />
      </el-aside>
      <el-main>
        HomeView
      </el-main>
    </el-container>
  </div>
</template>



<script setup lang="ts">
import Aside from '@/components/Aside.vue';

</script>

<style scoped>
.el-main {
  padding: 80px 100px;
}
</style>