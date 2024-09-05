<template>
    <div class="common-layout">
        <el-container class="main-content">
            <el-aside width="230px">
                <Aside />
            </el-aside>
            <el-main>
                <h1>用户管理</h1>
                <br />

                <el-table :data="tableData" border stripe style="width: 100%">
                    <el-table-column prop="userID" label="ID" width="120" />
                    <el-table-column prop="username" label="用户名" width="140" />
                    <el-table-column prop="userPhoneNumber" label="手机号" />
                    <el-table-column prop="userPassword" label="密码" />
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

// 获取用户信息
const fetchUserData = async (page: number) => {
    try {
        const response = await axios.get('/users', {
            params: {
                page,
                pageSize: pageSize.value,
            },
        });

        // 假设返回数据格式为 { data: [...], total: 300 }
        tableData.value = response.data.data;
        total.value = response.data.total;
    } catch (error) {
        console.error('获取用户数据失败:', error);
    }
};

// 处理页码变化
const handleCurrentChange = (page: number) => {
    console.log(page);

    currentPage.value = page;
    fetchUserData(page); // 获取对应页码的数据
};

// 组件挂载时获取初始数据
onMounted(() => {
    fetchUserData(currentPage.value);
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