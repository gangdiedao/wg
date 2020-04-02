<template>
  <el-dialog :title="$t('organization.userModules.label.department') + $t('organization.userModules.label.transfer')" :visible.sync="dialogFormVisible" width="480px" :destroy-on-close="true" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('organization.userModules.label.select') + $t('organization.userModules.label.department')">
        <el-select v-model="ruleForm.departmentId" filterable style="width: 100%" placeholder="请选择部门">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button type="primary">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    items: [String, Array]
  },
  watch: {
    dialogFormVisible(bool) {
      if (!bool) {
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.dialogFormVisible = bool
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        departmentId: ''
      }
    }
  }
}
</script>

<style>

</style>