<template>
  <el-dialog :fullscreen="false" top="0" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" center>
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px">
      <el-form-item :label="$t('i18nView.information.name')" prop="name">
        <el-input v-model="temp.name"/>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.company')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.telePhone')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.fax')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.contacts')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.city')" prop="title">
        <el-select v-model="temp.city" class="filter-item" placeholder="">
          <el-option v-for="item in cityOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.hotelType')" prop="title">
        <el-select v-model="temp.hotelType" class="filter-item" placeholder="">
          <el-option key="" label="未选择" value="" />
          <el-option v-for="item in hotelTypeOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.hotelLevel')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.address')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.email')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.website')" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.payType')" prop="title">
        <el-select v-model="temp.payType" class="filter-item" placeholder="">
          <el-option key="" label="未指定" value="" />
          <el-option v-for="item in payOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.files')" prop="title">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.introduce')">
        <el-input v-model="temp.remark" :autosize="{ minRows: 1, maxRows: 4}" type="textarea" placeholder="" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.remarks')">
        <el-input v-model="temp.remark" :autosize="{ minRows: 1, maxRows: 4}" type="textarea" placeholder="" />
      </el-form-item>

      <el-divider content-position="left">价格信息</el-divider>
      <el-calendar v-model="calendar">
         <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div @click="handleCaledar(data.day, date)">
            <b :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1)[1] }}
            </b>
            <div style="margin-top: 10px;">
              <small>小孩价：10</small><br>
              <small>成人价：10</small><br>
              <small>预定数量：10</small>
            </div>
          </div>
        </template>
      </el-calendar>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
    <el-dialog
      width="30%"
      :visible.sync="innerVisible"
      center
      append-to-body>
      <el-form label-width="100px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            @change="handleChangeDate"
            :editable="false"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="小孩价">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="成人价">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="控制预定数量">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import mixin from '../mixin'

export default {
  mixins: [mixin],
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
    },
    innerVisible(bool) {
      if (!bool) {
        this.daterange = ''
      }
    },
    calendar(val) {
      console.log(val)
    }
  },
  data() {
    return {
      calendar: '',
      currentDate: '',
      daterange: '',
      innerVisible: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')} ${this.$t('i18nView.information.hotel')}`,
        create: `${this.$t('actions.create')} ${this.$t('i18nView.information.hotel')}`,
      },
      temp: {
        id: undefined,
        name: '',
        city: '',
        hotelType: '',
        payType: '',
        remark: '',
        status: 'published'
      },
      fileList: [],
      rules: {
        name: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
      },
      cityOptions: [],
      hotelTypeOptions: [],
      payOptions: [],
      pickerOptions: {
        disabledDate: (date) => {
          // console.log(new Date(date).getTime(), new Date(this.currentDate).setHours(0).getTime())
          return new Date(new Date(this.currentDate).setHours(0)).getTime() > new Date(date).getTime()
        }
      }
    }
  },
  created() {
    this.cityOptions = this.setCityOptions().filter(item => item.key !== 'all')
    this.hotelTypeOptions = this.setHotelTypeOptions()
    this.payOptions = this.setPayOptions()
  },
  methods: {
    handleChangeDate(val) {
      console.log(val)
    },
    handleCaledar(day, date) {
      this.currentDate = date
      this.daterange = [day, day]
      this.innerVisible = true
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    resetTemp() {
      this.temp = {
        id: '',
        name: undefined,
        remark: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
  }
}
</script>

<style>

</style>