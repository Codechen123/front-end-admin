<template>
    <div class="common-layout">
        <el-container class="main-content">
            <el-aside width="230px">
                <Aside />
            </el-aside>
            <el-main>
                <h1>添加用户</h1>
                <br />

                <el-form style="max-width: 600px" :model="form" :rules="rules" ref="formRef" label-width="120px">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号" prop="userPhoneNumber">
                        <el-input v-model="form.userPhoneNumber" placeholder="请输入手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="年龄" prop="userAge">
                        <el-input-number v-model="form.userAge" :min="0"></el-input-number>
                    </el-form-item>

                    <el-form-item label="密码" prop="userPassword">
                        <el-input v-model="form.userPassword" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Aside from '@/components/Aside.vue';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from '@/stores/axios';

// 表单数据
const form = reactive({
    userName: '',
    userPhoneNumber: '',
    userAge: null,
    userPassword: '',
});

// 表单校验规则
const rules = reactive({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    userPhoneNumber: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
    ],
    userAge: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        { type: 'number', message: '年龄必须为数字', trigger: 'blur' }
    ],
    userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
});

const formRef = ref();

const onSubmit = () => {
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            try {
                const response = await axios.post('/manager/add_user', {
                    userName: form.userName,
                    userPhoneNumber: form.userPhoneNumber,
                    userAge: form.userAge,
                    password: form.userPassword,
                });
                if (response.status === 200) {
                    ElMessage.success('提交成功');
                    onReset();
                } else {
                    ElMessage.error('提交失败');
                }
            } catch (error) {
                ElMessage.error('提交失败，请稍后重试');
                console.error(error);
            }
        } else {
            ElMessage.error('请完善表单信息');
            return false;
        }
    });
};

const onReset = () => {
    formRef.value.resetFields();
};
</script>

<style scoped>
.el-main {
    padding: 80px 100px;
}
</style>
