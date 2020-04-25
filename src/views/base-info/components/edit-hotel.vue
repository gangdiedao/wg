<template>
  <el-dialog :fullscreen="false" top="0" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center>
    <el-form style="height: 80vh;overflow-y: auto" ref="dataForm" :rules="rules" :model="formData" label-position="right" label-width="80px">
      <el-form-item :label="$t('i18nView.information.infoType')">
        <el-select v-model="formData.info_type_id" clearable class="filter-item" @change="handleChangeSelect('infotag', {info_type_name: 'value'}, $event)" :placeholder="$t('i18nView.information.infoType')">
          <el-option v-for="item in infotag" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.name')" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.company')">
        <el-input v-model="formData.company" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.telePhone')">
        <el-input v-model="formData.telphone" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.fax')">
        <el-input v-model="formData.fax" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.contacts')">
        <el-input v-model="formData.contact" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.city')" prop="city_id">
        <el-select v-model="formData.city_id" class="filter-item" @change="handleChangeSelect('cityOptions', {city_name: 'value'}, $event)" :placeholder="$t('i18nView.common.selectCity')">
          <el-option v-for="item in cityOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.hotelType')">
        <el-select v-model="formData.hotel_type_id" class="filter-item" @change="handleChangeSelect('hoteltype', {hotel_type_name: 'value'}, $event)" :placeholder="$t('i18nView.common.selectHotelType')">
          <el-option v-for="item in hoteltype" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.hotelLevel')">
        <el-input v-model="formData.level" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.address')">
        <el-input v-model="formData.address" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.email')">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.website')">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item :label="$t('i18nView.information.payType')">
        <el-select v-model="formData.pay_type_id" class="filter-item" @change="handleChangeSelect('paymenttype', {pay_type_name: 'value'}, $event)" :placeholder="$t('i18nView.common.selectPayType')">
          <el-option v-for="item in paymenttype" :key="item.id" :label="item.value" :value="item.id" />
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
      <el-divider content-position="left">
        <label>{{ $t('i18nView.common.priceInfo') }}</label>
      </el-divider>
      <el-calendar v-model="calendar">
         <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div @click="handleCaledar(data.day, date)">
            <b :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1)[1] }}
            </b>
            <div style="margin-top: 10px;">
              <small>{{ $t('i18nView.common.price') }}：{{setCalendarPrice(data.day).price || '-'}}</small><br>
              <small>{{ $t('i18nView.common.kidPrice') }}：{{setCalendarPrice(data.day).kid_price || '-'}}</small><br>
              <small>{{ $t('i18nView.common.num') }}：{{setCalendarPrice(data.day).num || '-'}}</small>
            </div>
          </div>
        </template>
      </el-calendar>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('actions.cancel') }}
      </el-button>
      <el-button :loading="submitLoading" type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('actions.confirm') }}
      </el-button>
    </div>
    <el-dialog
      width="30%"
      :visible.sync="innerVisible"
      center
      append-to-body>
      <el-form label-width="100px">
        <el-form-item :label="$t('i18nView.common.selectDate')">
          <el-date-picker
            v-model="calendarData.daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            :editable="false"
            :picker-options="pickerOptions"
            :range-separator="$t('i18nView.common.to')"
            :start-placeholder="$t('i18nView.common.startDate')"
            :end-placeholder="$t('i18nView.common.endDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('i18nView.common.price')">
          <el-input type="number" v-model="calendarData.childprice"></el-input>
        </el-form-item>
        <el-form-item :label="$t('i18nView.common.kidPrice')">
          <el-input type="number" v-model="calendarData.price"></el-input>
        </el-form-item>
        <el-form-item :label="$t('i18nView.common.num')">
          <el-input type="number" v-model="calendarData.num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">{{ $t('actions.cancel') }}</el-button>
        <el-button @click="saveCalendar" type="primary">{{ $t('actions.confirm') }}</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>>

<script>
import { getOtherDictList } from '@/api/system'
import { addHotel, editHotel, getHotelDetail } from '@/api/hotel'
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
        this.getHotelDetail(this.item.id)
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
  computed: {
    ...mapGetters({
      cityOptions: 'cityList'
    })
  },
  data() {
    return {
      submitLoading: false,
      currentDate: '',
      daterange: '',
      calendar: '',
      calendarData: {
        id: undefined,
        daterange: '',
        price: '',
        childprice: '',
        num: ''
      },
      innerVisible: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')} ${this.$t('i18nView.information.hotel')}`,
        create: `${this.$t('actions.create')} ${this.$t('i18nView.information.hotel')}`,
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
        num: [],
        priceDate: []
      },
      rules: {
        name: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
        city_id: [{ required: true, message: this.$t('rules.required'), trigger: 'blur' }],
      },
      // cityOptions: [],
      hoteltype: [],
      paymenttype: [],
      infotag: [],
      pickerOptions: {
        disabledDate: (date) => {
          // console.log(new Date(date).getTime(), new Date(this.currentDate).setHours(0).getTime())
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
      this.getCity()
      this.getDictList('paymenttype')
      this.getDictList('hoteltype')
      this.getDictList('infotag')
    },
    getDictList(name) {
      getOtherDictList({type: name}).then(res => {
        this[name] = res.data
      })
    },
    getCity() {
      if (!this.cityOptions.length) {
        this.$store.dispatch('system/getCity')
      }
    },
    handleCaledar(day, date) {
      this.currentDate = date
      this.calendarData.daterange = [day, day]
      let res = this.setCalendarPrice(day)
      if (res.id) {
        this.calendarData.id = res.id
        this.calendarData.price = res.price
        this.calendarData.childprice = res.kid_price
        this.calendarData.num = res.num
      }
      
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
        num: [],
        priceDate: []
      }
    },
    getHotelDetail(id) {
      getHotelDetail({id}).then(res => {
        this.formData.priceDate = res.data.price_date
        this.formData.num = res.data.num
      })
    },
    setCalendarPrice(day) {
      let data = {
        id: undefined,
        price: '',
        kid_price: '',
        num: ''
      }
      for (let i = 0, len = this.formData.priceDate.length; i < len; i++) {
        if (this.formData.priceDate[i]['start_date'] == day) {
          data.id = this.formData.priceDate[i]['id']
          data.price = this.formData.priceDate[i]['detail'].length ? this.formData.priceDate[i]['detail'][0]['price'] : ''
          data.kid_price = this.formData.priceDate[i]['detail'].length ? this.formData.priceDate[i]['detail'][0]['kid_price']: ''
          break
        }
      }
      for (let i = 0, len = this.formData.num.length; i < len; i++) {
        if (this.formData.num[i]['start_date'] == day) {
          data.num = this.formData.num[i]['num']
          break
        }
      }
      return data
    },
    close() {
      this.resetformData()
      this.dialogFormVisible = false
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          addHotel(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.close()
            this.$emit('success')
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          editHotel(this.formData).then(() => {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.close()
            this.$emit('success')
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
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
          id: this.calendarData.id,
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
          id: this.calendarData.id,
          start_date: m.format('YYYY-MM-DD'),
          end_date: m.format('YYYY-MM-DD'),
          num: this.calendarData.num
        }
      })
      if (this.dialogStatus === 'update') {
        let dates = days.map(m => m.format('YYYY-MM-DD'))
        let _price = this.formData.priceDate.filter(item => !dates.includes(item.start_date))
        let _num = this.formData.num.filter(item => !dates.includes(item.start_date))
        this.formData.priceDate = [..._price, ...data]
        this.formData.num = [..._num, ...num]
      } else {
        this.formData.priceDate = data
        this.formData.num = num
      }
      this.innerVisible = false
    }
  }
}
</script>

<style>

</style>