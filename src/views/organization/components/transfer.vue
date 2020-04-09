<template>
  <el-dialog :title="$t('organization.userModules.label.department') + $t('organization.userModules.label.transfer')" :visible.sync="dialogFormVisible" width="480px" center>
    <el-form label-width="100px">
      <el-form-item :label="$t('organization.userModules.label.select') + $t('organization.userModules.label.department')">
        <el-popover
          v-model="open"
          placement="bottom"
          width="550">
          <div class="parent-node-body">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="deptList"
              :props="defaultProps"
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @node-click="handleClickNode"
              ref="tree">
            </el-tree>
          </div>
          <el-input slot="reference" v-model="parentname" readonly></el-input>
       </el-popover>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button type="primary" @click="submit" :disabled="!department_id">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { moveToDept } from '@/api/organization'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    ids: [String, Array]
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    dialogFormVisible(bool) {
      if (!bool) {
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.parentname = ''
      this.department_id = ''
      this.dialogFormVisible = bool
    }
  },
  computed: {
    ...mapGetters(['deptList'])
  },
  data() {
    return {
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      open: false,
      parentname: '',
      filterText: '',
      dialogFormVisible: false,
      department_id: ''
    }
  },
  methods: {
    handleClickNode(data) {
      this.department_id = data.id
      this.parentname = data.name
      this.open = false
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    submit() {
      moveToDept({id: this.ids, department_id: this.department_id}).then(() => {
        this.$message({
          message: '转移成功',
          type: 'success'
        })
        this.$emit('success')
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style>

</style>