<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="handleAdd">{{ $t('actions.create') }}</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="deptList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'childs', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        :label="$t('organization.deptModules.field.name')"
        width="360">
      </el-table-column>
      <el-table-column
        prop="name_en"
        :label="$t('organization.deptModules.field.nameEn')"
        width="360">
      </el-table-column>
      <el-table-column
        prop="parent_id"
        :label="$t('organization.deptModules.field.parent')"
        width="480">
      </el-table-column>
      <!-- <el-table-column
        prop="sort"
        :label="$t('organization.deptModules.field.sort')">
      </el-table-column> -->
       <el-table-column
          fixed="right"
          :label="$t('organization.deptModules.field.action')">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">{{ $t('actions.edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">{{ $t('actions.delete') }}</el-button>
          </template>
        </el-table-column>
    </el-table>
    <edit-department :show.sync="showEditDepartment" :item="deptItem" @success="getList"/>
  </div>
</template>

<script>
import EditDepartment from './components/edit-department'
import mixin from './mixin'
import { mapGetters } from 'vuex'
import { deleteDept } from '@/api/organization'
export default {
  mixins: [mixin],
  name: 'deptManage',
  components: {
    EditDepartment
  },
  created() {
    this.getList()
  },
  data() {
    return {
      showEditDepartment: false,
      deptItem: ''
    }
  },
  computed: {
    ...mapGetters(['deptList'])
  },
  methods: {
    getList() {
      this.$store.dispatch('organization/getDeptList', {page: 1, limit: 500}).then(res => {
        // this.tableData = res.data.data
      })
    },
    handleAdd() {
      this.deptItem = ''
      this.showEditDepartment = true
    },
    handleEdit(item) {
      this.deptItem = item
      this.showEditDepartment = true
    },
    handleDelete(item) {
      this.$confirm('确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDept({id: [item.id]}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style>
  .row-bg {
    margin: 10px 0;
  }
</style>