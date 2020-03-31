<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('i18nView.information.add') : $t('i18nView.information.edit')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="120px"
      @keyup.enter.native="dataFormSubmitHandle()"
    >
      <el-form-item prop="selectData" :label="$t('i18nView.information.infoType')">
        <el-select v-model="dataForm.selectData" :placeholder="'请选择'+$t('i18nView.information.infoType')">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="'请输入'+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="icon" :label="$t('i18nView.information.icon')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="false"
          :http-request="UploadImage"
          :before-upload="onBeforeUploadImage"
        >
          <el-button type="primary" icon="el-icon-upload2">添加图标</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item prop="pic" :label="$t('i18nView.information.pic')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="false"
          :http-request="UploadImage"
          :before-upload="onBeforeUploadImage"
        >
          <el-button type="primary" icon="el-icon-upload2">添加图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item prop="url" :label="$t('i18nView.information.url')">
        <el-input v-model="dataForm.url" :placeholder="'请输入'+$t('i18nView.information.url')" />
      </el-form-item>
      <el-form-item prop="introduce" :label="$t('i18nView.information.introduce')">
        <el-input v-model="dataForm.introduce" :placeholder="'请输入'+$t('i18nView.information.introduce')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="company" :label="$t('i18nView.information.company')">
        <el-input v-model="dataForm.name" :placeholder="'请输入'+$t('i18nView.information.company')" />
      </el-form-item>
      <el-form-item prop="city" :label="$t('i18nView.information.city')">
        <el-select v-model="dataForm.city" :placeholder="'请选择'+$t('i18nView.information.city')">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="address" :label="$t('i18nView.information.address')">
        <el-input v-model="dataForm.address" :placeholder="'请输入'+$t('i18nView.information.address')" />
      </el-form-item>
      <el-form-item prop="contacts" :label="$t('i18nView.information.contacts')">
        <el-input v-model="dataForm.contacts" :placeholder="'请输入'+$t('i18nView.information.contacts')" />
      </el-form-item>
      <el-form-item prop="telePhone" :label="$t('i18nView.information.telePhone')">
        <el-input v-model="dataForm.telePhone" :placeholder="'请输入'+$t('i18nView.information.telePhone')" />
      </el-form-item>
      <el-form-item prop="fax" :label="$t('i18nView.information.fax')">
        <el-input v-model="dataForm.fax" :placeholder="'请输入'+$t('i18nView.information.fax')" />
      </el-form-item>
      <el-form-item prop="valuationMethod" :label="$t('i18nView.information.valuationMethod')">
        <el-select v-model="dataForm.valuationMethod" :placeholder="'请选择'+$t('i18nView.information.valuationMethod')">
          <el-option
            v-for="item in valuationMethodList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="email" :label="$t('i18nView.information.email')">
        <el-input v-model="dataForm.email" :placeholder="'请输入'+$t('i18nView.information.email')" />
      </el-form-item>
      <el-form-item prop="payType" :label="$t('i18nView.information.payType')">
        <el-select v-model="dataForm.payType" :placeholder="'请选择'+$t('i18nView.information.payType')">
          <el-option
            v-for="item in payTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="creator" :label="$t('i18nView.information.creator')">
        <el-select v-model="dataForm.creator" :placeholder="'请选择'+$t('i18nView.information.creator')">
          <el-option
            v-for="item in creatorList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="files" :label="$t('i18nView.information.files')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="false"
          :http-request="UploadImage"
          :before-upload="onBeforeUploadImage"
        >
          <el-button type="primary" icon="el-icon-upload2">添加文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item prop="remarks" :label="$t('i18nView.information.remarks')">
        <el-input v-model="dataForm.remarks" :placeholder="'请输入'+$t('i18nView.information.remarks')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="detailIntroduce" :label="$t('i18nView.information.detailIntroduce')">
        <el-input v-model="dataForm.detailIntroduce" :placeholder="'请输入'+$t('i18nView.information.detailIntroduce')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="AccountBookRemark" :label="$t('i18nView.information.AccountBookRemark')">
        <el-input v-model="dataForm.AccountBookRemark" :placeholder="'请输入'+$t('i18nView.information.AccountBookRemark')" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item prop="UKey" :label="$t('i18nView.information.UKey')">
        <el-input v-model="dataForm.UKey" :placeholder="'请输入'+$t('i18nView.information.UKey')" />
      </el-form-item>
      <el-form-item prop="returnType" :label="$t('i18nView.information.returnType')">
        <el-select v-model="dataForm.returnType" :placeholder="'请选择'+$t('i18nView.information.returnType')" @change="returnTypeChange">
          <el-option
            v-for="item in returnTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="returnTypeFlag == 1" prop="fixedValue" :label="$t('i18nView.returnTypeList.fixedValue')">
        <el-input v-model="dataForm.fixedValue" :placeholder="'请输入'+$t('i18nView.returnTypeList.fixedValue')" type="number" />
      </el-form-item>
      <el-form-item v-if="returnTypeFlag == 2" prop="returnedCommissionPercentage" :label="$t('i18nView.returnTypeList.returnedCommissionPercentage')">
        <el-input v-model="dataForm.returnedCommissionPercentage" type="number" :placeholder="'请输入'+$t('i18nView.returnTypeList.returnedCommissionPercentage')">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="returnTypeFlag == 3" prop="everyoneReturns" :label="$t('i18nView.returnTypeList.everyoneReturns')">
        <el-input v-model="dataForm.everyoneReturns" type="number" :placeholder="'请输入'+$t('i18nView.returnTypeList.everyoneReturns')">
          <template slot="append">/人</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="returnTypeFlag == 4" prop="everyAdultReturns" :label="$t('i18nView.returnTypeList.everyAdultReturns')">
        <el-input v-model="dataForm.everyAdultReturns" type="number" :placeholder="'请输入'+$t('i18nView.returnTypeList.everyAdultReturns')">
          <template slot="append">/大人</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="returnTypeFlag == 4" prop="everyChildReturns" :label="$t('i18nView.returnTypeList.everyChildReturns')">
        <el-input v-model="dataForm.everyChildReturns" type="number" :placeholder="'请输入'+$t('i18nView.returnTypeList.everyChildReturns')">
          <template slot="append">/小孩</template>
        </el-input>
      </el-form-item>
      <el-divider content-position="left">价格信息</el-divider>
      <el-calendar>
        <template
          slot="dateCell"
          slot-scope="{date, data}"
        >
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
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
    <!--日历弹窗-->
    <el-dialog
      width="30%"
      :visible.sync="innerVisible"
      center
      append-to-body
    >
      <el-form label-width="100px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            :editable="false"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChangeDate"
          />
        </el-form-item>
        <el-form-item label="小孩价">
          <el-input />
        </el-form-item>
        <el-form-item label="成人价">
          <el-input />
        </el-form-item>
        <el-form-item label="控制预定数量">
          <el-input />
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
import mixin from './mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      currentDate: '',
      daterange: '',
      innerVisible: false,
      dataForm: {
        selectData: '',
        name: '',
        url: '',
        introduce: '',
        company: '',
        city: '',
        address: '',
        contacts: '',
        telePhone: '',
        fax: '',
        valuationMethod: '',
        email: '',
        payType: '',
        creator: '',
        files: '',
        remarks: '',
        detailIntroduce: '',
        AccountBookRemark: '',
        UKey: '',
        returnType: '',
        fixedValue: '',
        returnedCommissionPercentage: ''
      },
      returnTypeFlag: 0,
      dataRule: {},
      infoTypeList: [],
      cityList: [
        {
          id: 0,
          name: this.$t('i18nView.areas.bangkok')
        },
        {
          id: 1,
          name: this.$t('i18nView.areas.pattaya')
        },
        {
          id: 3,
          name: this.$t('i18nView.areas.samed')
        },
        {
          id: 4,
          name: this.$t('i18nView.areas.rayong')
        },
        {
          id: 5,
          name: this.$t('i18nView.areas.ayutthaya')
        },
        {
          id: 6,
          name: this.$t('i18nView.areas.huahin')
        },
        {
          id: 7,
          name: this.$t('i18nView.areas.kanchanaburi')
        },
        {
          id: 8,
          name: this.$t('i18nView.areas.samui')
        },
        {
          id: 9,
          name: this.$t('i18nView.areas.surat')
        },
        {
          id: 10,
          name: this.$t('i18nView.areas.kohchang')
        }
      ],
      valuationMethodList: [],
      creatorList: [
        {
          id: 0,
          name: this.$t('i18nView.creatorList.zhangshan')
        },
        {
          id: 1,
          name: this.$t('i18nView.creatorList.liudehua')
        },
        {
          id: 2,
          name: this.$t('i18nView.creatorList.zhangxueyou')
        },
        {
          id: 3,
          name: this.$t('i18nView.creatorList.zhoujielun')
        }
      ],
      returnTypeList: [],
      payTypeList: [],
      pickerOptions: {
        disabledDate: (date) => {
          // console.log(new Date(date).getTime(), new Date(this.currentDate).setHours(0).getTime())
          return new Date(new Date(this.currentDate).setHours(0)).getTime() > new Date(date).getTime()
        }
      }
    }
  },
  computed: {},
  created() {
    this.payTypeList = this.payTypeListData()
    this.returnTypeList = this.returnTypeListData()
    this.valuationMethodList = this.valuationMethodListData()
    this.infoTypeList = this.infoTypeListData()
  },
  methods: {
    init(item) {
      this.visible = true
      this.$nextTick(() => {
        if (item) {
          this.dataForm = item
        }
      })
    },
    // 上传文件之前
    onBeforeUploadImage(file) {
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        this.$message.error(this.$t('upload.tip', { format: 'jpg、png、gif' }))
        return false
      }
    },
    // 上传文件
    UploadImage(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      this.$http.post(
        '/school/student/import',
        formData
      ).then(({ data: res }) => {
        if (res.code === 0) {
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.query()
        } else {
          this.$message.error(res.msg || '导入失败')
        }
      }).catch((e) => {
        this.$message.error(e.msg || '导入失败')
      })
    },
    // 返佣改变
    returnTypeChange(e) {
      this.returnTypeFlag = e
    },
    handleCaledar(day, date) {
      this.currentDate = date
      this.daterange = [day, day]
      this.innerVisible = true
    },
    handleChangeDate(val) {
      console.log(val)
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          try {
            await this.$http[!this.dataForm.id ? 'post' : 'put'](
              '/sys/mailtemplate',
              this.dataForm,
              {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
              }
            )

            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          } catch (error) {
            this.$message.error(error.msg)
          }
        }
      })
    }
  }
}
</script>
