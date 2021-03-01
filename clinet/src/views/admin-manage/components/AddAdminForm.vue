<template>
  <div class="AddAdminForm">
    <el-form class="form" ref="form" :model="formData">
      <el-form-item label="管理员名" required prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入管理员名"
        ></el-input>
      </el-form-item>
      <el-form-item label="学工号" required prop="account">
        <el-input
          v-model.trim="formData.account"
          placeholder="请输入学工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" required prop="phone">
        <el-input
          v-model.trim="formData.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input
          v-model.trim="formData.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择身份" required>
        <el-radio v-model="formData.role" label="admin">普通管理员</el-radio>
        <el-radio v-model="formData.role" label="superAdmin"
          >超级管理员</el-radio
        >
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="handleSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAdmin } from '@/api/user'
export default {
  name: 'AddAdminForm',
  data() {
    return {
      formData: {
        name: '',
        account: '',
        phone: '',
        password: '',
        role: 'admin'
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(result => {
        if (result) {
          addAdmin(this.formData).then(() => {
            this.$message.success('注册管理员成功')
            this.$parent.fetchAdminTableData().then(() => {
              this.$message.success('数据已更新')
              //$parent在子组件中对父组件的方法进行的操作
            })
          })
        } else {
          this.$message.error('请填充完整信息')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.AddAdminForm {
  position: relative;
  .btn {
    text-align: center;
  }
}
</style>
