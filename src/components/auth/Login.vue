<template>
  <div class="auth">
    <div class="container">
      <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Подтвердить</el-button>
          <el-button @click.prevent="resetForm('ruleForm')">Сбросить</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста введите email адрес'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста, введите пароль'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        email: ''
      },
      rules: {
        email: [
          {validator: validateEmail, trigger: 'blur'},
          {type: 'email', message: 'Пожалуйста введите корректный email адрес', trigger: ['blur']}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    ...mapActions('auth', ['auth']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.email === 'test@test.ru' && this.ruleForm.pass === '1234') {
            this.auth({username: this.ruleForm.email, password: this.ruleForm.pass});
          } else {
            alert('Нет такого пользователя')
          }
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  },
};
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100vh;
  font-style: normal;
  font-weight: 400;
  background-color: wheat;
  padding-top: 100px;
}
</style>
