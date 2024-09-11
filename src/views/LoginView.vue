<template>
    <div class="common-layout">
        <div class="box">
            <form @submit.prevent="handleLogin" autocomplete="off">
                <h2>运动姿态评估管理系统</h2>
                <div class="inputBox">
                    <input v-model="userPhoneNumber" type="text" required />
                    <span>电话号码</span>
                    <i></i>
                </div>
                <div class="inputBox">
                    <input v-model="password" type="password" required />
                    <span>密码</span>
                    <i></i>
                </div>
                <div class="links">
                    <span>电话号码: 12345</span>
                    <span>密码: 54321</span>
                </div>
                <input type="submit" value="登录" />
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from '@/stores/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const userPhoneNumber = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
        const response = await axios.post('/start/login', {
            userPhoneNumber: userPhoneNumber.value,
            password: password.value,
        });

        if (response.data.code === 0) {
            const token = response.data.token; // 获取后端返回的 token
            if (token) {
                localStorage.setItem('token', token); // 将 token 存储在 localStorage 中
                ElMessage.success('登录成功'); 
                router.push('/users'); // 跳转到主页
            } else {
                ElMessage.error('登录失败，未收到令牌');
            }
        } else {
            ElMessage.error(response.data.message || '用户名或密码错误');
        }
    } catch (error) {
        ElMessage.error('登录失败，请稍后再试');
    }
};
</script>

<style scoped>
.common-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    background-color: #23242a;
    color: #45f3ff;
}

.box {
    position: relative;
    width: 380px;
    height: 420px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
}

.box::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    animation: animate 6s linear infinite;
}

.box::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    animation: animate 6s linear infinite;
    animation-delay: -3s;
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

form {
    position: absolute;
    inset: 2px;
    background: #28292d;
    padding: 50px 40px;
    border-radius: 8px;
    z-index: 2;
    display: flex;
    flex-direction: column;
}

h2 {
    color: #45f3ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
}

.inputBox {
    position: relative;
    width: 300px;
    margin-top: 35px;
}

.inputBox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: #23242a;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
}

.inputBox span {
    position: absolute;
    left: 0;
    padding: 20px 0px 10px;
    pointer-events: none;
    font-size: 1em;
    color: #8f8f8f;
    letter-spacing: 0.05em;
    transition: 0.5s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
    color: #45f3ff;
    transform: translateX(0px) translateY(-34px);
    font-size: 0.75em;
}

.inputBox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #45f3ff;
    border-radius: 4px;
    overflow: hidden;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
}

.inputBox input:valid~i,
.inputBox input:focus~i {
    height: 44px;
}

.links {
    display: flex;
    justify-content: space-between;
}

.links span {
    margin: 10px 0;
    font-size: 0.75em;
    color: #8f8f8f;
    text-decoration: beige;
}

input[type='submit'] {
    border: none;
    outline: none;
    padding: 11px 25px;
    background: #45f3ff;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;
    width: 100px;
    margin-top: 10px;
}

input[type='submit']:active {
    opacity: 0.8;
}
</style>
