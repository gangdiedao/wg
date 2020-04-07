<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <update-pwd />
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

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {

  }
}
</script>
