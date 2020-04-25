<template>
  <el-dialog :fullscreen="false" top="0" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center>
    <el-form ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="80px">
      <el-form-item :label="$t('i18nView.information.infoType')">
        <el-select v-model="formData.info_type_id" clearable class="filter-item" @change="handleChangeSelect('infotag', {info_type_name: 'value'}, $event)" :placeholder="$t('i18nView.information.infoType')">
          <el-option v-for="item in infotag" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.name')" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.pic')">
        <upload :accept="$config.imageAccept" list-type="picture-card" :files.sync="formData.imagesArr"></upload>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.city')" prop="city_id">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeCity" :placeholder="$t('i18nView.common.selectCity')">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.website')">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.company')">
        <el-input v-model="formData.company" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.contacts')">
        <el-input v-model="formData.contact" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.telePhone')">
        <el-input v-model="formData.telphone" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.address')">
        <el-input v-model="formData.address" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.email')">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.fax')">
        <el-input v-model="formData.fax" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.valuationMethod')">
        <el-select v-model="formData.money_type_id" class="filter-item" @change="handleChangeValuation" placeholder="选择计价方式">
          <el-option v-for="item in valuationOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.payType')">
        <el-select v-model="formData.pay_type_id" class="filter-item" @change="handleChangePayType" :placeholder="$t('i18nView.common.selectPayType')">
          <el-option v-for="item in payOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.files')">
        <upload :files.sync="formData.filesArr">
          <el-button size="small" type="primary">{{$t('i18nView.common.upload')}}</el-button>
        </upload>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.introduce')">
        <el-input v-model="formData.intro" :autosize="{ minRows: 1, maxRows: 4}" type="textarea" placeholder="" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.remarks')">
        <el-input v-model="formData.remark" :autosize="{ minRows: 1, maxRows: 4}" type="textarea" placeholder="" />
      </el-form-item>

      <!-- <el-divider hidden content-position="left">价格信息</el-divider> -->
      <!-- <el-calendar hidden v-model="calendar">
         <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div @click="handleCaledar(data.day, date)">
            <b :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1)[1] }}
            </b>
            <div style="margin-top: 10px;">
              <small>成人价：10</small><br>
              <small>小孩价：10</small><br>
              <small>限预定数量：10</small>
            </div>
          </div>
        </template>
      </el-calendar> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
    <!-- <el-dialog
      width="30%"
      :visible.sync="innerVisible"
      center
      append-to-body>
      <el-form label-width="100px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="calendarData.daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            :editable="false"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="小孩价">
          <el-input type="number" v-model="calendarData.childprice"></el-input>
        </el-form-item>
        <el-form-item label="成人价">
          <el-input type="number" v-model="calendarData.price"></el-input>
        </el-form-item>
        <el-form-item label="控制预定数量">
          <el-input type="number" v-model="calendarData.num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button @click="saveCalendar" type="primary">确 定</el-button>
      </span>
    </el-dialog> -->
  </el-dialog>
</template>>

<script>
import { getOtherDictList } from '@/api/system'
import { addDining, editDining } from '@/api/dining'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import upload from '@/components/Upload/index'
import { mapGetters } from 'vuex'

const moment = extendMoment(Moment)

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
  computed: {
    ...mapGetters({
      cityOptions: 'cityList'
    })
  },
  watch: {
    dialogFormVisible(bool) {
      if (!bool) {
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.resetformData()
      // this.$refs['dataForm'].clearValidate()
      this.dialogFormVisible = bool
      if (this.item) {
          Object.assign(this.formData, this.item)
          this.dialogStatus = 'update'
        } else {
          this.dialogStatus = 'create'
        }
    },
    innerVisible(bool) {
      if (!bool) {
        this.daterange = ''
      }
    }
  },
  data() {
    return {
      currentDate: '',
      daterange: '',
      calendar: '',
      calendarData: {
        daterange: '',
        price: '',
        childprice: '',
        num: ''
      },
      innerVisible: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      formData: {
        id: undefined,
        name: '',
        intro: '',
        info_type_id: undefined,
        info_type_name: '',
        pay_type_id: undefined,
        pay_type_name: '',
        city_id: undefined,
        city_name: '',
        company: '',
        address: '',
        remark: '',
        url: '',
        level: '',
        fax: '',
        telphone: '',
        contact: '',
        email: '',
        filesArr: [],
        imagesArr: [],
        hotel_type_id: undefined,
        hotel_type_name: '',
        money_type_id: undefined,
        money_type_name: '',
        priceDate: []
      },
      rules: {
        name: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
        city_id: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
      },
      // cityOptions: [],
      hotelTypeOptions: [],
      payOptions: [],
      valuationOptions: [],
      infotag: [],
      pickerOptions: {
        disabledDate: (date) => {
          return new Date(new Date(this.currentDate).setHours(0)).getTime() > new Date(date).getTime()
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getDictList('infotag')
      this.getPayType()
      this.getValuation()
    },
    getDictList(name) {
      getOtherDictList({type: name}).then(res => {
        this[name] = res.data
      })
    },
    getPayType() {
      getOtherDictList({type: 'paymenttype'}).then(res => {
        this.payOptions = res.data
      })
    },
    getCity() {
      getOtherDictList({type: 'city'}).then(res => {
        this.cityOptions = res.data
      })
    },
    getValuation() {
      getOtherDictList({type: 'valuation_mode'}).then(res => {
        this.valuationOptions = res.data
      })
    },
    handleCaledar(day, date) {
      this.currentDate = date
      this.calendarData.daterange = [day, day]
      this.innerVisible = true
    },
    resetformData() {
      this.formData = {
        id: undefined,
        name: '',
        intro: '',
        info_type_id: undefined,
        info_type_name: '',
        pay_type_id: undefined,
        pay_type_name: '',
        city_id: undefined,
        city_name: '',
        company: '',
        address: '',
        remark: '',
        url: '',
        level: '',
        fax: '',
        telphone: '',
        contact: '',
        email: '',
        filesArr: [],
        imagesArr: [],
        hotel_type_id: undefined,
        hotel_type_name: '',
        money_type_id: undefined,
        money_type_name: '',
        priceDate: []
      }
    },
    close() {
      this.resetformData()
      this.dialogFormVisible = false
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addDining(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.close()
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          editDining(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.$emit('success')
            this.close()
          })
        }
      })
    },
    // 选择城市
    handleChangeCity(id) {
      let res = this.cityOptions.filter(item => item.id === id)
      if (res.length > 0) {
        this.formData.city_name = res[0]['value']
      }
    },
    handleChangePayType(id) {
      let res = this.payOptions.filter(item => item.id === id)
      if (res.length > 0) {
        this.formData.pay_type_name = res[0]['value']
      }
    },
    handleChangeHotel(id) {
      let res = this.hotelTypeOptions.filter(item => item.id === id)
      if (res.length > 0) {
        this.formData.hotel_type_name = res[0]['value']
      }
    },
    handleChangeValuation(id) {
      let res = this.valuationOptions.filter(item => item.id === id)
      if (res.length > 0) {
        this.formData.money_type_name = res[0]['value']
      }
    },
    // 选择
    handleChangeSelect(dataname, params, id) {
      let res = this[dataname].filter(item => item.id === id)
      if (res.length > 0) {
        for (let key in params) {
          this.formData[key] = res[0][params[key]]
        }
      }
    },
    saveCalendar() {
      // console.log(this.calendarData)
      // let res = moment.range(this.calendarData.daterange[0], this.calendarData.daterange[1])
      // for (let m of res.by('day')) {
      //   console.log(m)
      // }
      const start = moment(this.calendarData.daterange[0], 'YYYY-MM-DD')
      const end = moment(this.calendarData.daterange[1], 'YYYY-MM-DD')
      const range = moment.range(start, end)
      const days = Array.from(range.by('days'))
      const data = days.map(m => {
        return {
          start_date: m.format('YYYY-MM-DD'),
          end_date: m.format('YYYY-MM-DD'),
          detail: [{
            price: this.calendarData.price,
            kid_price: this.calendarData.childprice,
            cost: this.calendarData.price,
            kid_cost: this.calendarData.childprice
          }]
        }
      })
      const num = days.map(m => {
        return {
          start_date: m.format('YYYY-MM-DD'),
          end_date: m.format('YYYY-MM-DD'),
          num: this.calendarData.num
        }
      })
      this.formData.priceDate = data
      this.formData.num = num
      this.innerVisible = false
    }
  }
}
</script>

<style>

</style>