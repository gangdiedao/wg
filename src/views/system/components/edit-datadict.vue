<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('system.field.type')" prop="type">
        <el-select v-model="ruleForm.type" style="width: 100%" placeholder="请选择角色">
          <el-option v-for="(value, name) in dictTypeList" :key="name" :label="value" :value="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('system.field.key')">
        <el-input v-model="ruleForm.key"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.field.value')" prop="value">
        <el-input v-model="ruleForm.value"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button :loading="submitLoading" type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createDict, updateDict } from '@/api/system'
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
            id: '',
            type: '',
            key: '',
            value: ''
          }
          this.dialogStatus = 'create'
        }
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    ...mapGetters([
      'dictTypeList'
    ])
  },
  created() {
    if (this.dictTypeList.length < 1) {
      this.getList()
    }
  },
  data() {
    return {
      submitLoading: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: '',
        type: '',
        key: '',
        value: ''
      },
      rules: {
        type: [
          { required: true, message: '类型必选', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请填写数据', trigger: 'blur' }
        ]
      },
      filterText: '',
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('system/getDictTypeList')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          createDict(this.ruleForm).then(res => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    },
    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          updateDict(this.ruleForm).then(res => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    }
  }
}
</script>

<style>

</style>