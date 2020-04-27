<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('i18nView.information.add') : $t('i18nView.information.edit')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
    customClass="customWidth"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="120px"
      @keyup.enter.native="dataFormSubmitHandle()"
    >
      <el-form-item prop="info_type_id" :label="$t('i18nView.information.infoType')">
        <el-select v-model="dataForm.info_type_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.infoType')" @change="typeChange">
          <el-option
            v-for="item in infoTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="plan_group" :label="$t('i18nView.information.plan_group')">
        <el-input v-model="dataForm.plan_group" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.plan_group')" />
      </el-form-item>
      <el-form-item prop="code" :label="$t('i18nView.information.code')">
        <el-input v-model="dataForm.code" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.code')" />
      </el-form-item>
      <el-form-item prop="name" :label="$t('i18nView.information.name')">
        <el-input v-model="dataForm.name" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.name')" />
      </el-form-item>
      <el-form-item prop="op_organization_id" :label="$t('i18nView.information.operator')">
        <el-select v-model="dataForm.op_organization_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.operator')" @change="opChange">
          <el-option
            v-for="item in userListArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="sale_organization_id" :label="$t('i18nView.information.seller')">
        <el-select v-model="dataForm.sale_organization_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.seller')" @change="saleChange">
          <el-option
            v-for="item in userListArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="company_id" :label="$t('i18nView.information.company_name')">
        <el-select v-model="dataForm.company_id" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.company_name')" @change="companyChange">
          <el-option
            v-for="item in companyListArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="logo" :label="$t('i18nView.information.icon')">
        <el-image
          v-if="dataForm.logo != ''"
          style="width: 100px; height: 100px"
          :src="dataForm.logo"
          fit="cover"
        />
        <el-upload
          ref="uploadIcon"
          class="upload-demo"
          style="display:inline-block"
          action="string"
          :show-file-list="false"
          :limit="1"
          :http-request="UploadIcon"
          :before-upload="onBeforeUploadImage"
          :on-exceed="handleExceed"
        >
          <el-button type="text" size="small">上传</el-button>
        </el-upload>
        <el-button type="text" size="small" style="display:inline-block" @click="deleteIcon">删除</el-button>
      </el-form-item>
      <el-form-item prop="imagesArr" :label="$t('i18nView.information.pic')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="true"
          list-type="picture-card"
          :file-list="dataForm.imagesArr"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemoveImage"
          :http-request="UploadImage"
          :before-upload="onBeforeUploadImage"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item prop="filesArr" :label="$t('i18nView.information.files')">
        <el-upload
          class="upload-demo"
          action="string"
          :show-file-list="true"
          :http-request="UploadFile"
          :file-list="dataForm.filesArr"
          :on-remove="handleRemoveFile"
          :before-upload="onBeforeUploadFile"
        >
          <el-button type="primary" size="small">添加文件</el-button>
        </el-upload>
      </el-form-item>
    <el-divider content-position="left">计划信息</el-divider>
      <el-form-item :label="$t('i18nView.information.tripDays')">
        <el-input v-model="dataForm.product_dataArr.info.plan_day" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.tripDays')">
          <template slot="append">(Exp:2-2-1 5N7D)</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="outlay" :label="$t('i18nView.information.outlay')">
        <el-input v-model="dataForm.product_dataArr.info.outlay" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.outlay')" />
      </el-form-item>
      <el-form-item prop="cost" :label="$t('i18nView.information.tourFee')">
        <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" size="small" @click="handleCreate(1)">
        {{ $t('i18nView.information.add') }}
      </el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="项目" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.name" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.price" type="number"/>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.count" type="number"/>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="小计" align="center">
          <template slot-scope="{row}">
            <!-- <span>{{parseInt(row.count) + parseInt(row.price)}}</span> -->
            <span>{{row.total}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="{row}">
            <el-select v-model="row.type">
              <el-option
                v-for="item in proTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="deleteData($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-form-item>
      <el-form-item prop="from_city" :label="$t('i18nView.information.origin')">
        <el-input v-model="dataForm.product_dataArr.info.from_city" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.origin')">
          <template slot="append">(Exp: 杭州 - 曼谷)</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="flight" :label="$t('i18nView.information.flight')">
        <el-input v-model="dataForm.product_dataArr.info.flight" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.flight')">
          <template slot="append">(Exp:FT1 1530/1700; FT3 2300/0100+1 次日凌晨1点)</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="party_op" :label="$t('i18nView.information.firstPartyOperation')">
        <el-input v-model="dataForm.product_dataArr.exdata.party_op" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.firstPartyOperation')" />
      </el-form-item>
      <el-form-item prop="source" :label="$t('i18nView.information.touristDestination')">
        <el-select v-model="dataForm.product_dataArr.exdata.source" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.touristDestination')" @change="coChange">
          <el-option
            v-for="item in cityListData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="market" :label="$t('i18nView.information.market')">
        <el-select v-model="dataForm.product_dataArr.exdata.market" :placeholder="$t('i18nView.information.select')+$t('i18nView.information.market')" @change="coChange">
          <el-option
            v-for="item in marketListData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="shopping" :label="$t('i18nView.information.buy')">
        <el-select v-model="dataForm.product_dataArr.exdata.shopping" multiple :placeholder="$t('i18nView.information.select')+$t('i18nView.information.buy')" @change="coChange">
          <el-option
            v-for="item in buyListDatas"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="self_cost" :label="$t('i18nView.information.selfcost')">
        <el-select v-model="dataForm.product_dataArr.exdata.self_cost" multiple :placeholder="$t('i18nView.information.select')+$t('i18nView.information.selfcost')" @change="coChange">
          <el-option
            v-for="item in selFcostData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="one_price" :label="$t('i18nView.information.one_price')">
        <el-input v-model="dataForm.product_dataArr.exdata.one_price" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.one_price')" />
      </el-form-item>
      <el-form-item prop="passport" :label="$t('i18nView.information.passport')">
        <el-input v-model="dataForm.product_dataArr.exdata.passport" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.passport')" />
      </el-form-item>
      <el-form-item prop="leader_expense" :label="$t('i18nView.information.leader_expense')">
        <el-select v-model="dataForm.product_dataArr.exdata.leader_expense" multiple :placeholder="$t('i18nView.information.select')+$t('i18nView.information.leader_expense')" @change="coChange">
          <el-option
            v-for="item in payTypeData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="service_expense" :label="$t('i18nView.information.service_expense')">
        <el-select v-model="dataForm.product_dataArr.exdata.service_expense" multiple :placeholder="$t('i18nView.information.select')+$t('i18nView.information.service_expense')" @change="coChange">
          <el-option
            v-for="item in serviceData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="pay_type" :label="$t('i18nView.information.payType')">
        <el-select v-model="dataForm.product_dataArr.exdata.pay_type" multiple :placeholder="$t('i18nView.information.select')+$t('i18nView.information.payType')" @change="coChange">
          <el-option
            v-for="item in payTypeData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="shopping_team_no" :label="$t('i18nView.information.shopping_team_no')">
        <el-input v-model="dataForm.product_dataArr.exdata.shopping_team_no" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.shopping_team_no')" />
      </el-form-item>
      <el-form-item prop="kingpower_team_no" :label="$t('i18nView.information.kingpower_team_no')">
        <el-input v-model="dataForm.product_dataArr.exdata.kingpower_team_no" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.kingpower_team_no')" />
      </el-form-item>
      <el-form-item prop="car_explain" :label="$t('i18nView.information.car_explain')">
        <el-input v-model="dataForm.product_dataArr.info.car_explain" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.car_explain')" type="textarea" />
      </el-form-item>
      <el-form-item prop="room_explain" :label="$t('i18nView.information.room_explain')">
        <el-input v-model="dataForm.product_dataArr.info.room_explain" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.room_explain')" type="textarea" />
      </el-form-item>
      <el-form-item prop="remark" :label="$t('i18nView.information.remarks')">
        <el-input v-model="dataForm.product_dataArr.info.remark" :placeholder="$t('i18nView.information.input')+$t('i18nView.information.remarks')" type="textarea" />
      </el-form-item>
      <el-divider content-position="left">行程信息</el-divider>
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" size="small" @click="handleCreate(2)">
        {{ $t('i18nView.information.add') }}
      </el-button>
      <el-table :data="tableData2" border style="width: 100%">
        <el-table-column type="index" label="天数" align="center"></el-table-column>
        <el-table-column prop="name" label="行程" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.trip" type="textarea"/>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="用餐" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.dine" type="textarea"/>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="餐厅" align="center">
          <template>
            <el-button type="text" size="small" @click="handleSet(1)">设置</el-button>
            <el-button type="text" size="small" @click="handleClear(1)">清除</el-button>
            <el-button type="text" size="small" @click="handleSets(1)">设为用餐</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="景点" align="center">
          <template>
            <el-button type="text" size="small" @click="handleSet(2)">设置</el-button>
            <el-button type="text" size="small" @click="handleClear(1)">清除</el-button>
            <el-button type="text" size="small" @click="handleSets(2)">设为行程</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="酒店" align="center">
          <template>
           <el-button type="text" size="small" @click="handleSet(3)">设置</el-button>
            <el-button type="text" size="small" @click="handleClear(1)">清除</el-button>
            <el-button type="text" size="small" @click="handleCopy()">复制上一天酒店</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="备注" align="center">
          <template slot-scope="{row}">
            <el-input v-model="row.remark"  type="textarea"/>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="deleteData($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()" :loading="saveBtn">{{ $t('i18nView.information.save') }}</el-button>
    </template>
    <el-dialog
      width="50%"
      title="设置"
      :visible.sync="innerVisible"
      center
      append-to-body>
      <el-table
      :data="restaurantListData"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="联系电话">
      </el-table-column>
      <!-- <el-table-column
        prop="telphone"
        label="价格">
      </el-table-column> -->
      <el-table-column
        prop="pay_type_name"
        label="支付类型">
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button @click="innerVisible = false">{{ $t('i18nView.information.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{ $t('i18nView.information.save') }}</el-button>
    </template>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { createArticle, updateArticle, upload, userList, companyList, cityList, restaurantList } from '@/api/product'
import mixin from '../mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      visible: false,
      saveBtn: false,
      dialogVisible: false,
      innerVisible: false,
      dataForm: {
        type: 1, // 类型：1：普通套餐 2：单订车 3：单酒店 4：单订房和车 默认1
        code: '',
        name: '',
        status: 1, // 状态 1:激活 2：锁定
        plan_group: '',
        info_type_id: '',
        info_type_name: '',
        fax: '',
        op_user_id: '',
        op_organization_id: '',
        op_user_name: '',
        sale_user_id: '',
        sale_organization_id: '',
        sale_user_name: '',
        logo: '',
        company_id: '',
        company_name: '',
        intro: '',
        remark: '',
        imagesArr: [],
        filesArr: [],
        product_dataArr: {
          info:{
            remark: '',
            flight: '',
            from_city: '',
            plan_day: '',
            car_explain: '',
            room_explain: '',
            outlay: ''
          },
          cost:[],
          exdata: {
            party_op: '',
            source: '',
            market: '',
            shopping: '',
            self_cost: '',
            one_price: '',
            passport: '',
            leader_expense: '',
            service_expense: '',
            pay_type: '',
            shopping_team_no:'',
            kingpower_team_no: ''
          },
          trips: []
      }
      },
      listQuery: {
        page: 1,
        limit: 1000,
        keyword: '',
        status: ''
      },
      listQuery2: {
        page: 1,
        limit: 1000,
      },
      restaurantQuery: {
        page: 1,
        limit: 1000,
      },
      proTypeList: [
        {
          id: 0,
          name: '默认'
        },
        {
          id: 1,
          name: '可选'
        }
      ],
      dataRule: {
        info_type_id: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.infoType'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.name'), trigger: 'blur' }
        ],
        logo: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.icon'), trigger: 'blur' }
        ],
        imagesArr: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.pic'), trigger: 'blur' }
        ],
        url: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.url'), trigger: 'blur' }
        ],
        intro: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.introduce'), trigger: 'blur' }
        ],
        contact: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.contacts'), trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.telePhone'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('i18nView.information.input') + this.$t('i18nView.information.email'), trigger: 'blur' }
        ],
        filesArr: [
          { required: true, message: this.$t('i18nView.information.select') + this.$t('i18nView.information.files'), trigger: 'blur' }
        ]
      },
      userListArr: [],
      infoTypeList: [],
      companyListArr: [],
      cityListData: [],
      marketListData: [],
      buyListDatas: [],
      selFcostData: [],
      payTypeData: [],
      serviceData: [],
      tableData: [],
      tableData2: [],
      restaurantListData: [],
      dialogImageUrl: ''
    }
  },
  watch: {
    tableData:{
       handler(val, oldVal) {
         val.map(item => {
           item.total = item.count * item.price
         })
      },
      deep: true
    }
  },
  computed: {},
  created() {
    this.infoTypeList = this.infoTypeListData()
  },
  methods: {
    init(item) {
      this.visible = true
      this.userListData()
      this.companyListData()
      this.getCityList()
      this.buyListData()
      this.selFcostList()
      this.payTypeListData()
      this.serviceListData()
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          this.dataForm = item
        } else {
          this.dataForm = {
            type: 1, // 类型：1：普通套餐 2：单订车 3：单酒店 4：单订房和车 默认1
            code: '',
            name: '',
            status: 1, // 状态 1:激活 2：锁定
            plan_group: '',
            info_type_id: '',
            info_type_name: '',
            fax: '',
            op_user_id: '',
            op_organization_id: '',
            op_user_name: '',
            sale_user_id: '',
            sale_organization_id: '',
            sale_user_name: '',
            logo: '',
            company_id: '',
            company_name: '',
            intro: '',
            remark: '',
            imagesArr: [],
            filesArr: [],
            product_dataArr: [
              {
                info:{
                  remark: '',
                  flight: '',
                  from_city: '',
                  plan_day: '',
                  car_explain: '',
                  room_explain: '',
                  outlay: ''
                },
                cost:[],
                exdata: {
                  party_op: '',
                  source: '',
                  market: '',
                  shopping: '',
                  self_cost: '',
                  one_price: '',
                  passport: '',
                  leader_expense: '',
                  service_expense: '',
                  pay_type: '',
                  shopping_team_no:'',
                  kingpower_team_no: ''
                },
                trips: []
              }
            ]
          }
          this.tableData = []
          this.tableData2 = []
        }
      })
    },
    // 操作者
    userListData() {
      userList(this.listQuery).then(response => {
        this.userListArr = response.data.data
      })
    },
    // 组团社列表
    companyListData() {
      companyList(this.listQuery2).then(response => {
        this.companyListArr = response.data.data
      })
    },
    // 客源地列表
    getCityList() {
      cityList({ type: 'customersource' }).then(response => {
        this.cityListData = response.data
      })
    },
    // 市场列表
    getCityList() {
      cityList({ type: 'shichangrex' }).then(response => {
        this.marketListData = response.data
      })
    },
    // 自费列表
    selFcostList() {
      cityList({ type: 'selfcost' }).then(response => {
        this.selFcostData = response.data
      })
    },
    // 购物列表
    buyListData() {
      cityList({ type: 'shopping' }).then(response => {
        this.buyListDatas = response.data
      })
    },
    // 结算方式列表
    payTypeListData() {
      cityList({ type: 'settlement' }).then(response => {
        this.payTypeData = response.data
      })
    },
    // 服务费列表
    serviceListData() {
      cityList({ type: 'service' }).then(response => {
        this.serviceData = response.data
      })
    },
    // 信息类型改变
    typeChange(id) {
      let obj = {}
      obj = this.infoTypeList.find(item => {
        return item.id === id
      })
      this.dataForm.info_type_name = obj.name
    },
    // 操作者类型改变
    opChange(id) {
      let obj = {}
      obj = this.userListArr.find(item => {
        return item.id === id
      })
      this.dataForm.op_user_name = obj.name
      this.dataForm.op_organization_id = obj.department_id
    },
    // 销售类型改变
    saleChange(id) {
      let obj = {}
      obj = this.userListArr.find(item => {
        return item.id === id
      })
      this.dataForm.sale_user_name = obj.name
      this.dataForm.op_organization_id = obj.department_id
    },
    // 组团社改变
    companyChange(id) {
      let obj = {}
      obj = this.companyListArr.find(item => {
        return item.id === id
      })
      this.dataForm.company_name = obj.name
    },
    //行程信息--设置
    handleSet(e){
      this.innerVisible = true
      restaurantList(this.restaurantQuery).then(response => {
        this.restaurantListData = response.data.data
      })
    },
    //行程信息--清除
    handleClear(e){

    },
    //行程信息--设为...
    handleSets(e){

    },
    //行程信息--弹窗多选
    handleSelectionChange(e){
      console.log(e)
    },
    //行程信息---保存
    handleSubmit(){
      this.innerVisible = false
    },
    //新增团费，新增行程
    handleCreate(flag){
      if(flag == 1){
        this.tableData.push(
          {
            name: '',
            count: 0,
            price: 0,
            total: 0,
            type: '默认'
          }
        )
      }else{
        this.tableData2.push(
          {
            trips: '',
            dine: '',
            hotels: [],
            scenics: [],
            restaurants: [],
            remark: ''
          }
        )
      }
    },
    coChange(){},
    // 上传图片、图标之前
    onBeforeUploadImage(file) {
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        this.$message.error(this.$t('i18nView.information.uploadTip', { format: 'jpg、png、gif' }))
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error(this.$t('i18nView.information.uploadSize', { format: '10MB' }))
        return false
      }
    },
    // 上传图片、图标之前
    onBeforeUploadFile(file) {
      if (
        file.type !== 'application/vnd.ms-excel' &&
        file.type !== 'pplication/msword' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.$message.error(this.$t('i18nView.information.uploadTip', { format: 'doc、docx、xls、xlsx' }))
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error(this.$t('i18nView.information.uploadSize', { format: '10MB' }))
        return false
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传1张图标`)
    },
    // 上传图标
    UploadIcon(param) {
      const formData = new FormData()
      formData.append('Filedata', param.file)
      upload(formData).then(response => {
        if (response.code === 2000) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: this.$t('i18nView.information.upload') + this.$t('i18nView.information.success')
          })
          this.dataForm.logo = response.data.url
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 删除图标
    deleteIcon() {
      this.dataForm.logo = ''
      this.$refs.uploadIcon.clearFiles()
    },
    // 上传图片
    UploadImage(param) {
      const formData = new FormData()
      formData.append('Filedata', param.file)
      upload(formData).then(response => {
        if (response.code === 2000) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: this.$t('i18nView.information.upload') + this.$t('i18nView.information.success')
          })
          this.dataForm.imagesArr.push(response.data)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片
    handleRemoveImage(file, fileList) {
      this.dataForm.imagesArr = fileList
    },
    // 上传文件
    UploadFile(param) {
      const formData = new FormData()
      formData.append('Filedata', param.file)
      upload(formData).then(response => {
        if (response.code === 2000) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: this.$t('i18nView.information.upload') + this.$t('i18nView.information.success')
          })
          this.dataForm.filesArr.push(response.data)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 删除文件
    handleRemoveFile(file, fileList) {
      this.dataForm.filesArr = fileList
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          this.saveBtn = true
          if (this.dataForm.id) {
            updateArticle(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.edit') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.saveBtn = false
                    this.$emit('callBcak', 'edit')
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            })
          } else {
            createArticle(this.dataForm).then(response => {
              if (response.code === 2000) {
                this.$message({
                  type: 'success',
                  duration: 1000,
                  message: this.$t('i18nView.information.add') + this.$t('i18nView.information.success'),
                  onClose: () => {
                    this.visible = false
                    this.saveBtn = false
                    this.$emit('callBcak', 'add')
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style>
.customWidth{
  width:1200px
}
</style>
