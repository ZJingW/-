<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
//vuex的语法，用于将vuex的getters映射到某个组件的计算属性里
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import studentDashboard from './student'

export default {
  name: 'Dashboard',
  components: { adminDashboard, studentDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles']) //...扩展运算符
  },
  created() {
    if (this.roles.includes('student')) {
      //获取权限滴
      this.currentRole = 'studentDashboard'
    }
  }
}
</script>
