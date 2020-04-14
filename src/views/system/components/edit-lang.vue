<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('system.field.tag')"  prop="tag">
        <el-input v-model="ruleForm.tag"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.cn')">
        <el-input v-model="ruleForm.cn"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.en')">
        <el-input v-model="ruleForm.en"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.th')">
        <el-input v-model="ruleForm.th"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addLang, updateLang } from '@/api/system'
import { mapGetters } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: ''
  },
  watch: {
    dialogFormVisible(bool) {
      if (!bool) {
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.dialogFormVisible = bool
      if (bool) {
        if (this.item) {
          Object.assign(this.ruleForm, this.item)
          this.dialogStatus = 'update'
        } else {
          this.ruleForm = {
            id: undefined,
            tag: '',
            cn: '',
            en: '',
            th: ''
          }
          this.dialogStatus = 'create'
        }
      }
    }
  },
  data() {
    return {
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: undefined,
        tag: '',
        cn: '',
        en: '',
        th: ''
      },
      rules: {
        tag: [
          { required: true, message: 'required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createData() {
      addLang(this.ruleForm).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$emit('success')
        this.dialogFormVisible = false
      }).catch(error => {
        this.$notify.error(error)
      })
    },
    updateData() {
      updateLang(this.ruleForm).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('success')
        this.dialogFormVisible = false
      }).catch(error => {
        this.$notify.error(error)
      })
    }
  }
}
</script>

<style>

</style>