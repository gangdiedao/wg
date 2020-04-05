<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <update-pwd :user="user" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdatePwd from './components/UpdatePwd'


export default {
  name: 'Profile',
  components: { UpdatePwd },
  data() {
    return {
      user: {},
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        id: '',
        name: this.name,
        email: 'admin@test.com',
      }
    }
  }
}
</script>
