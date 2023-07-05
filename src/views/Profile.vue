<template>
  <div>
    <h2>Профиль администратора</h2>
    <el-form ref="profileForm" :model="profileForm">
      <el-form-item label="Имя Фамилия: ">
        <el-input v-model="profileForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Дата рождения: ">
        <el-date-picker
          v-model="profileForm.birthDate"
          type="date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Город: ">
        <el-select v-model="profileForm.city" placeholder="Выберите город">
          <el-option label="Москва" value="Москва"></el-option>
          <el-option
            label="Санкт-Петербург"
            value="Санкт-Петербург"
          ></el-option>
          <el-option label="Новосибирск" value="Новосибирск"></el-option>
          <el-option label="Челябинск" value="Челябинск"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveData">Сохранить</el-button>
      </el-form-item>
    </el-form>
    <div v-loading="loading">
      <h2>Список пользователей</h2>
      <el-table :data="users" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="Имя"></el-table-column>
        <el-table-column
          prop="bornDate"
          label="Дата рождения"
        ></el-table-column>
        <el-table-column prop="city" label="Город"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewProfile",
  data() {
    return {
      loading: false,
      profileForm: {
        name: "Василий Форточкин",
        birthDate: null,
        city: "",
      },
      users: [],
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get("https://eltex-co.ru/test/users.php")
      .then((response) => {
        const data = response.data;
        this.users = data;
      })
      .catch(() => {
        // Обработка ошибки
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    saveData() {
      // Заглушка сохранения данных
    },
  },
};
</script>
