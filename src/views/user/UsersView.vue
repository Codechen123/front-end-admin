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
                    <el-table-column prop="id" label="ID" width="180" />
                    <el-table-column prop="name" label="用户名" width="180" />
                    <el-table-column prop="phoneNumber" label="手机号" />
                </el-table>
                <div class="pagination">
                    <el-pagination v-model:current-page="currentPage" layout="total, prev, pager, next, jumper"
                        :total="total" :page-size="15" @current-change="handleCurrentChange" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>



<script setup lang="ts">
import Aside from '@/components/Aside.vue';
import { ref } from 'vue'

const currentPage = ref(5)
const total = ref(300)

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const tableData = [
    {
        id: '1',
        name: 'Tom',
        phoneNumber: '12345678',
    },
    {
        id: '2',
        name: 'Tom',
        phoneNumber: '12345678',
    },
    {
        id: '3',
        name: 'Tom',
        phoneNumber: '12345678',
    },
    {
        id: '4',
        name: 'Tom',
        phoneNumber: '12345678',
    },
]

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