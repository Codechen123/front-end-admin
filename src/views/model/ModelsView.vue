<template>
    <div class="common-layout">
        <el-container class="main-content">
            <el-aside width="230px">
                <Aside />
            </el-aside>
            <el-main>
                <h1>模型管理</h1>
                <br />

                <el-table :data="tableData" border stripe style="width: 100%">
                    <el-table-column prop="modelID" label="ID" width="120" />
                    <el-table-column prop="modelName" label="模型名称" width="180" />
                    <el-table-column prop="modelVersion" label="版本" />
                    <el-table-column prop="modelType" label="类型" />
                    <el-table-column prop="releaseDate" label="发布日期" />
                </el-table>

                <div class="pagination">
                    <el-pagination v-model:current-page="currentPage" layout="total, prev, pager, next, jumper"
                        :total="total" :page-size="pageSize" @current-change="handleCurrentChange" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Aside from '@/components/Aside.vue';
import { ref, onMounted } from 'vue';
import axios from '@/stores/axios';

const currentPage = ref(1); // 当前页码
const pageSize = ref(15); // 每页显示的记录数
const total = ref(0); // 总记录数
const tableData = ref([]); // 表格数据

// 获取模型信息
const fetchModelData = async (page: number) => {
    try {
        const response = await axios.get('/api/models', {
            params: {
                page,
                pageSize: pageSize.value,
            },
        });

        // 假设返回数据格式为 { data: [...], total: 300 }
        tableData.value = response.data.data;
        total.value = response.data.total;
    } catch (error) {
        console.error('获取模型数据失败:', error);
    }
};

// 处理页码变化
const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    fetchModelData(page); // 获取对应页码的数据
};

// 组件挂载时获取初始数据
onMounted(() => {
    fetchModelData(currentPage.value);
});
</script>

<style scoped>
.el-main {
    padding: 80px 100px;
}

.el-table {
    margin-bottom: 30px;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>
