<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item label="选择导游" prop="foundation_guide_id">
        <el-select
          v-model="ruleForm.foundation_guide_id"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
          style="width: 100%">
          <el-option
            v-for="item in guideUserList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import upload from '@/components/Upload/index'
import { guideList, addAdvance, editAdvance } from '@/api/guide'

export default {
  components: {
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
            id: undefined,
            foundation_guide_id: '',
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
    this.init()
  },
  data() {
    return {
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
    createData() {
      addAdvance(this.ruleForm).then(() => {
        this.$message({
          message: 'success',
          type: 'success'
        })
        this.$emit('success')
        this.dialogFormVisible = false
      })
    },
    updateData() {
      editAdvance(this.ruleForm).then(() => {
        this.$message({
          message: 'success',
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