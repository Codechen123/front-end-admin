<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-menu :default-active="activeMenuItem" active-text-color="rgb(64, 158, 255)" background-color="#304156"
                class="el-menu-vertical-demo" text-color="#fff">

                <el-sub-menu index="1">
                    <template #title>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="1-1" @click="navigateTo('/users')">查看用户</el-menu-item>
                    <el-menu-item index="1-2" @click="navigateTo('/addUser')">添加用户</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title>
                        <span>模型管理</span>
                    </template>
                    <el-menu-item index="2-1" @click="navigateTo('/models')">查看模型</el-menu-item>
                    <el-menu-item index="2-2" @click="navigateTo('/addModel')">添加模型</el-menu-item>
                </el-sub-menu>

                <!-- <el-menu-item index="3">
                    <span>Navigator Three</span>
                </el-menu-item> -->

            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

// 根据当前路由路径设置侧边栏状态
const activeMenuItem = computed(() => {
    const path = route.path;

    if (path.startsWith('/users')) {
        return '1-1';
    } else if (path.startsWith('/addUser')) {
        return '1-2';
    } else if (path.startsWith('/models')) {
        return '2-1';
    } else if (path.startsWith('/addModel')) {
        return '2-2';
    }
    return '';
});

const navigateTo = (path: string) => {
    router.push(path);
};

</script>

<style scoped>
.el-menu {
    width: 230px;
    min-height: 100vh;
    text-align: center;
}
</style>
