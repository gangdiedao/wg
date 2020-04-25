<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item label="选择导游" prop="foundation_guide_id">
        <div @click="showSelectGuid = !showSelectGuid"><el-input class="plan-edit-input" v-model="ruleForm.guide_name" readonly/></div>
      </el-form-item>
      <el-form-item label="日期" prop="bill_date">
        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.bill_date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="金额">
        <el-input type="number" v-model="ruleForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="预支号">
        <el-input v-model="ruleForm.advance_no"></el-input>
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
import upload from '@/components/Upload/index'
import { guideList, addAdvance, editAdvance } from '@/api/guide'
import SelectGuide from '@/views/guide/components/select-guide'

export default {
  components: {
    upload,
    SelectGuide
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
            id: undefined,
            foundation_guide_id: '',
            guide_name: '',
            bill_date: '',
            amount: '',
            advance_no: '',
            imagesArr: [],
            remark: ''
          }
          this.dialogStatus = 'create'
        }
      }
    }
  },
  created() {
    // this.init()
  },
  data() {
    return {
      submitLoading: false,
      showSelectGuid: false,
      loading: false,
      guideUserList: [],
      fileList: [],
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: undefined,
        foundation_guide_id: '',
        guide_name: '',
        bill_date: '',
        amount: '',
        advance_no: '',
        imagesArr: [],
        remark: ''
      },
      rules: {
        foundation_guide_id: [
          { required: true, message: 'required', trigger: 'blur' },
        ],
        bill_date: [
          { required: true, message: 'required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      guideList({page: 1, limit: 1000}).then(res => {
        this.guideUserList = res.data.data
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        guideList({page: 1, limit: 100, keyword: query}).then(res => {
          this.guideUserList = res.data.data
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.guideUserList = []
      }
    },
    // 选择导游
    handleSelectGuid(item) {
      this.ruleForm.foundation_guide_id = item.id
      this.ruleForm.guide_name = item.name
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addAdvance(this.ruleForm).then(() => {
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
          editAdvance(this.ruleForm).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.dialogFormVisible = false
          })
        }
      })
    }
  }
}
</script>

<style>

</style>