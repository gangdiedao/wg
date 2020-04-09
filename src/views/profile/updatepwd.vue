<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <update />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Update from './components/Update'
import mixin from './mixin'

export default {
  name: 'updatePwd',
  mixins: [mixin],
  components: { Update },
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
