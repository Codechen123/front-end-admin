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
                    <el-table-column label="查看用户">
                        <template v-slot="scope">
                            <el-button type="primary" link @click="showUser(scope.row.userID)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination v-model:current-page="currentPage" layout="total, prev, pager, next, jumper"
                        :total="total" :page-size="pageSize" @current-change="handleCurrentChange" />
                </div>
            </el-main>
        </el-container>
    </div>

    <div class="modal hidden">
        <button class="close-modal" @click="closeModal">&times;</button>
        <el-form :model="user" :rules="rules" ref="formRef" label-width="100px" class="user-info-form">
            <el-form-item label="用户ID" prop="id">
                <el-input v-model="user.userID" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user.username" :disabled="!isEditing"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phoneNumber">
                <el-input v-model="user.userPhoneNumber" :disabled="!isEditing"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user.userPassword" :disabled="!isEditing"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button v-if="!isEditing" type="primary" @click="isEditing = true">编辑</el-button>
                <el-button v-if="isEditing" type="success" @click="saveChanges">保存</el-button>
                <el-button v-if="isEditing" @click="cancelEdit">取消</el-button>
                <el-button type="danger" @click="dialogVisible = true">删除</el-button>
                <el-dialog v-model="dialogVisible" title="确认" width="500">
                    <span>你确定要删除该用户吗?</span>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="deleteUser">
                                确认
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </el-form-item>
        </el-form>
    </div>
    <div class="overlay hidden"></div>
</template>

<script setup lang="ts">
import Aside from '@/components/Aside.vue';
import { ref, onMounted } from 'vue';
import axios from '@/stores/axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const dialogVisible = ref(false)

const currentPage = ref(1); // 当前页码
const pageSize = ref(15); // 每页显示的记录数
const total = ref(0); // 总记录数
const tableData = ref([]); // 表格数据
const isEditing = ref(false);
const formRef = ref<any>(null);

const user = ref({
    userID: '123',
    username: '123',
    userPhoneNumber: '',
    userPassword: ''
});


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

const showUser = async (id: number) => {
    try {
        const response = await axios.get(`/api/user?id=${id}`);
        user.value = response.data.data;

        document.querySelector('.modal').classList.remove('hidden');
        document.querySelector('.overlay').classList.remove('hidden');
    } catch (error) {
        ElMessage.error('获取用户信息失败');
    }
};

const closeModal = () => {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
};

const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { pattern: /^[^\s!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, message: '用户名不能包含空白字符或特殊符号', trigger: 'blur' }
    ],

};

// 保存修改
const saveChanges = async () => {
    if (!formRef.value) {
        console.error('表单引用为空');
        return;
    }

    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            try {
                const response = await axios.post('/updateUser', {
                    id: user.value.userID,
                    username: user.value.username,
                    userPhoneNumber: user.value.userPhoneNumber,
                    password: user.value.userPassword
                })
                isEditing.value = false;
            } catch (error) {
                ElMessage.error('修改失败');
            }
        } else {
            ElMessage.error('格式错误，请修正输入信息');
        }
    });
};

// 取消编辑
const cancelEdit = async () => {
    // 重新获取或重置用户数据
    try {
        const response = await axios.get(`/api/user?id=${user.value.userID}`);
        user.value = response.data.data;
    } catch (error) {
        ElMessage.error('获取用户信息失败');
    }
    isEditing.value = false;
};

// 删除用户
const deleteUser = async () => {
    try {
        await axios.delete(`/api/user/${user.value.userID}`);
        ElMessage.success('用户删除成功');
        // 刷新用户列表
        fetchUserData(currentPage.value);
        // 关闭对话框
        dialogVisible.value = false;
        // 关闭用户信息模态框
        closeModal();
    } catch (error) {
        ElMessage.error('删除用户失败');
    }
};

</script>


<style scoped>
.hidden {
    display: none;
}

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

.show-modal {
    font-size: 2rem;
    font-weight: 600;
    padding: 1.75rem 3.5rem;
    margin: 5rem 2rem;
    border: none;
    background-color: aqua;
    color: #444;
    border-radius: 10rem;
    cursor: pointer;
}

.close-modal {
    position: absolute;
    top: 1.2rem;
    right: 2rem;
    font-size: 5rem;
    color: #333;
    cursor: pointer;
    border: none;
    background: none;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

p {
    font-size: 1.8rem;
}


.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;

    background-color: white;
    padding: 6rem;
    border-radius: 5px;
    box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
    z-index: 10;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 5;
}
</style>