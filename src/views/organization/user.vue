<template>
  <el-container>
    <el-aside class="user-aside">
      <div>
        <label @click="clearDept">组织架构</label>
      </div>
      <el-tree
        :data="deptList"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        @node-click="handleClickNode"
        :props="defaultProps"
        :draggable="false"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag">
      </el-tree>
    </el-aside>
    <el-main>
      <label>{{deptName}}用户列表</label>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleAdd">{{ $t('actions.create') }}</el-button>
          <el-button type="success" @click="handleChangeStatus(1)" :disabled="!multipleSelection.length" size="mini">{{ $t('actions.open') }}</el-button>
          <el-button size="mini" @click="handleChangeStatus(2)" :disabled="!multipleSelection.length">{{ $t('actions.close') }}</el-button>
          <el-button size="mini" :disabled="!multipleSelection.length" @click="handleTransfers">{{ $t('actions.transfer') }}</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-input v-model="listQuery.keyword" :placeholder="$t('organization.userModules.field.username')" size="mini" class="input-with-select">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('actions.search') }}</el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="username"
          :label="$t('organization.userModules.field.username')"
          fixed="left"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('organization.userModules.field.name')"
          fixed="left"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name_en"
          :label="$t('organization.userModules.field.nameEn')"
          width="120">
        </el-table-column>
        <el-table-column
          :label="$t('organization.userModules.field.nationality')"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.nationality && scope.row.nationality.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('organization.userModules.field.deptname')"
          width="160">
          <template slot-scope="scope">
            <span>{{scope.row.department && scope.row.department.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('organization.userModules.field.role')"
          width="160">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roles" :key="item.id" type="info">{{item.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          :label="$t('organization.userModules.field.phone')"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          :label="$t('organization.userModules.field.remark')">
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('organization.userModules.field.status')"
          width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">{{scope.row.status === 1 ? $t('actions.open') : $t('actions.close')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          :label="$t('organization.userModules.field.createTime')"
          width="160">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
          :label="$t('organization.userModules.field.action')">
          <template slot-scope="scope">
            <el-button @click="handleTransfer(scope.row)" type="text" size="small">{{ $t('actions.transfer') }}</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">{{ $t('actions.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-row>
    </el-main>
    <user-edit :show.sync="showUserEdit" :item="userItem" @success="getList" :dept-id="listQuery.department_id" :dept-name="deptName"/>
    <transfer :show.sync="showTransfer" :ids="userIds" @success="getList"/>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination'
import UserEdit from './components/edit-user'
import Transfer from './components/transfer'
import mixin from './mixin'
import { mapGetters } from 'vuex'
import { getUserList, setStatus } from '@/api/organization'
export default {
  mixins: [mixin],
  name: 'userManage',
  components: {
    Pagination,
    UserEdit,
    Transfer
  },
  created() {
    if (!this.deptList.length) {
      this.$store.dispatch('organization/getDeptList', {page: 1, limit: 500})
    }
    this.getList()
  },
  computed: {
    ...mapGetters(['deptList'])
  },
  data() {
    return {
      deptName: '全部',
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      userItem: '',
      showUserEdit: false,
      showTransfer: false,
      userIds: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        keyword: undefined,
        department_id: undefined
      },
      multipleSelection: [],
      tableData: []
    }
  },
  methods: {
    handleAdd() {
      this.userItem = ''
      this.showUserEdit = true
    },
    handleEdit(item) {
      this.userItem = item
      this.showUserEdit = true
    },
    handleTransfers() {
      this.userIds = this.multipleSelection.map(item => item.id)
      this.showTransfer = true
    },
    handleTransfer(item) {
      this.userIds = [item.id]
      this.showTransfer = true
    },
    // 删除
    handleDelete(row, index) {
      this.$confirm('确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // this.list.splice(index, 1)
      }).catch(() => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    handleClickNode(data) {
      this.listQuery.department_id = data.id
      this.deptName = data.name
      this.handleSearch()
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },
    clearDept() {
      this.listQuery.department_id = undefined
      this.deptName = '全部'
      this.handleSearch()
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      getUserList(this.listQuery).then(res => {
        this.total = res.data.count
        this.tableData = res.data.data
      })
    },
    handleChangeStatus(type) {
      let ids = this.multipleSelection.map(item => item.id)
      setStatus({id: ids, status: type}).then(() => {
        this.getList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>
  .user-aside {
    margin-top: 2px;;
    background: #ffffff;
    border-right: 1px solid #ccc;
    /* min-height: 100vh; */
  }
  .row-bg {
    margin: 10px 0;
  }
  .input-with-select {
    width: 350px;
  }
</style>