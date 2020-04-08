<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <account :user="data" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Account from './components/Account'
import mixin from './mixin'

export default {
  mixins: [mixin],
  name: 'Profile',
  components: { Account },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.data = {
        ...this.user,
        role: this.roles.join(' | ')
      }
    }
  }
}
</script>
