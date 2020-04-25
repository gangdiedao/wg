<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item label="选择导游" prop="foundation_guide_id">
        <div @click="showSelectGuid = !showSelectGuid"><el-input class="plan-edit-input" v-model="ruleForm.guide_name" readonly/></div>
      </el-form-item>
      <el-form-item label="金额" prop="deposit">
        <el-input type="number" v-model="ruleForm.deposit"></el-input>
      </el-form-item>
      <el-form-item label="相关凭证">
        <upload :accept="$config.imageAccept" list-type="picture-card" :files.sync="ruleForm.imagesArr"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
    <SelectGuide :show.sync="showSelectGuid" @row-click="handleSelectGuid"/>
  </el-dialog>
</template>

<script>
import SelectGuide from '@/views/guide/components/select-guide'
import upload from '@/components/Upload/index'
import { addDeposit } from '@/api/guide'
export default {
  components: {
    SelectGuide,
    upload
  },
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
            foundation_guide_id: '',
            guide_name: '',
            deposit: '',
            imagesArr: [],
            remark: ''
          }
          this.dialogStatus = 'create'
        }
      }
    }
  },
  data() {
    return {
      submitLoading: false,
      showSelectGuid: false,
      fileList: [],
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        foundation_guide_id: '',
        guide_name: '',
        deposit: '',
        filesArr: [],
        remark: ''
      },
      rules: {
        foundation_guide_id: [
          { required: true, message: 'required', trigger: 'blur' },
        ],
        deposit: [
          { required: true, message: 'required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 选择导游
    handleSelectGuid(item) {
      this.ruleForm.foundation_guide_id = item.id
      this.ruleForm.guide_name = item.name
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addDeposit(this.ruleForm).then(() => {
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