<template>
    <div class="common-layout">
        <el-container class="main-content">
            <el-aside width="230px">
                <Aside />
            </el-aside>
            <el-main>
                <h1>添加管理</h1>
                <br />

                <el-form style="max-width: 600px" :model="form" :rules="rules" ref="formRef" label-width="120px">
                    <el-form-item label="模型名称" prop="modelName">
                        <el-input v-model="form.modelName" placeholder="请输入模型名称"></el-input>
                    </el-form-item>

                    <el-form-item label="模型类型" prop="modelType">
                        <el-input v-model="form.modelType" placeholder="请输入模型类型"></el-input>
                    </el-form-item>

                    <el-form-item label="模型版本" prop="modelVersion">
                        <el-input v-model="form.modelVersion" placeholder="请输入模型版本"></el-input>
                    </el-form-item>

                    <el-form-item label="上传模型文件" prop="modelFile">
                        <el-upload :action="null" :auto-upload="false" v-model:file-list="fileList"
                            :before-upload="beforeUpload" :on-change="handleChange" :limit="1" list-type="text">
                            <el-button>点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只支持上传一个模型文件</div>
                        </el-upload>
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
    modelName: '',
    modelType: '',
    modelVersion: '',
    modelFile: null as File | null, // 文件对象初始化为 null
});

// 文件列表
const fileList = ref<File[]>([]);

// 表单校验规则
const rules = reactive({
    modelName: [
        { required: true, message: '请输入模型名称', trigger: 'blur' },
    ],
    modelType: [
        { required: true, message: '请输入模型类型', trigger: 'blur' },
    ],
    modelVersion: [
        { required: true, message: '请输入模型版本', trigger: 'blur' },
    ],
    modelFile: [
        { required: true, message: '请上传模型文件', trigger: 'change' },
    ],
});

const formRef = ref();

const beforeUpload = (file: File) => {
    form.modelFile = file;
    return false; // 阻止自动上传
};

const handleChange = (file: any, fileList: any[]) => {
    form.modelFile = file.raw; // 更新文件对象
};

const onSubmit = async () => {
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            if (form.modelFile) {
                const formData = new FormData();
                formData.append('modelName', form.modelName);
                formData.append('modelType', form.modelType);
                formData.append('modelVersion', form.modelVersion);
                formData.append('modelFile', form.modelFile);

                try {
                    const response = await axios.post('/api/models', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
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
                ElMessage.error('请上传模型文件');
            }
        } else {
            ElMessage.error('请完善表单信息');
            return false;
        }
    });
};

const onReset = () => {
    formRef.value.resetFields();
    fileList.value = []; // 清空文件列表
    form.modelFile = null; // 重置文件对象
};
</script>


<style scoped>
.el-main {
    padding: 80px 100px;
}

.el-upload__tip {
    margin-left: 15px;
}
</style>
