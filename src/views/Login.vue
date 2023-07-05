<template>
  <div v-loading="loading">
    <el-form ref="loginForm" :model="loginForm" label-width="100px">
      <el-form-item label="Логин">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Пароль">
        <el-input
          v-model="loginForm.password"
          type="password"
          :show-password="showPassword"
          @click="toggleShowPassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Войти</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "ViewLogin",
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    login() {
      this.loading = true;
      const { username, password } = this.loginForm;
      axios
        .post("https://eltex-co.ru/test/login.php", {
          login: username,
          password: password,
        })
        .then((response) => {
          const data = response.data;
          if (data.code === 1) {
            localStorage.setItem("isLoggedIn", "true");
            this.$router.push("/");
          } else {
            ElMessage.error("Неверный логин и/или пароль");
          }
        })
        .catch(() => {
          ElMessage.error("Ошибка авторизации");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
