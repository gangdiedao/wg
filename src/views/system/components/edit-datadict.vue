<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" style="width: 100%" placeholder="请选择角色">
          <el-option v-for="(value, name) in dictTypeList" :key="name" :label="value" :value="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="键">
        <el-input v-model="ruleForm.key"></el-input>
      </el-form-item>
      <el-form-item label="数据" prop="value">
        <el-input v-model="ruleForm.value"></el-input>
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
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('system/getDictTypeList')
    },
    createData() {
      createDict(this.ruleForm).then(res => {
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
      updateDict(this.ruleForm).then(res => {
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