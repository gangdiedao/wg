<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('guide.field.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('guide.button.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('guide.button.add') }}
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      :summary-method="getSummaries"
      show-summary
      style="width: 100%;"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column :label="$t('guide.field.createDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.guide')" width="110px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.credentials')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.remark')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.reviewer')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.log')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('guide.field.actions')" fixed="right" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('actions.edit') }}
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            {{ $t('actions.open') }}
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            {{ $t('actions.close') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            {{ $t('actions.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12">
      </el-col>
      <el-col :span="12">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-col>
    </el-row>

    <edit-advance :show.sync="showEditAdvance"/>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import EditAdvance from './components/edit-advance'
  import mixin from './mixin'

  export default {
    mixins: [mixin],
    name: 'settlement',
    components: { Pagination, EditAdvance },
    directives: { waves },
    data() {
      return {
        showEditAdvance: false,
        tabMapOptions: [],
        activeName: 'open',
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
          status: ''
        },
        statusOptions: [{
          key: 'china',
          label: '中国'
        }]
      }
    },
    computed: {
      lang: {
        get() {
          return this.$store.state.app.language
        }
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      },
      lang() {
        this.setOptions()
      }
    },
    created() {
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
      this.setOptions()
      // this.getList()
    },
    methods: {
      setOptions() {
        this.tabMapOptions = this.setTabOptions()
      },
      getList() {
        this.listLoading = true
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      handleCreate() {
        this.showEditAdvance = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      },
      handleUpdate(row) {
        this.showEditAdvance = true
      },
      handleDelete(row, index) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        return sums
      }
    }
  }
</script>
