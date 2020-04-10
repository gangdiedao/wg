<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('organization.roleModules.field.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.roleModules.field.nameEn')">
        <el-input v-model="ruleForm.name_en"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.roleModules.field.mark')" prop="slug">
        <el-input v-model="ruleForm.slug"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.roleModules.field.remark')">
        <el-input type="textarea" v-model="ruleForm.describe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>功能权限</div>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              node-key="id"
              :data="roleMenu"
              :show-checkbox="true"
              :default-checked-keys="ruleForm.menu_id"
              :props="{
                children: 'childs',
                label: 'title'
              }"
              :filter-node-method="filterNode"
              @check="handleClickMenu"
              style="height: 260px; overflow-y: auto;"
              ref="tree">
            </el-tree>
          </el-col>
          <el-col :span="12">
            <div>数据权限</div>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterDataText">
            </el-input>
            <el-tree
              class="filter-tree"
              node-key="id"
              :data="deptList"
              :show-checkbox="true"
              :default-checked-keys="ruleForm.department_id"
              :props="{
                children: 'childs',
                label: 'name'
              }"
              :filter-node-method="filterNode"
              @check="handleClickDept"
              style="height: 260px; overflow-y: auto;"
              ref="treedata">
            </el-tree>
          </el-col>
        </el-row>
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
import mixin from '../mixin'
import { mapGetters } from 'vuex'
import { createRole, updateRole } from '@/api/organization'
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
      if (bool) {
        if (this.item) {
          this.ruleForm = this.assign(this.ruleForm, this.item)
          this.dialogStatus = 'update'
        } else {
          this.ruleForm = {
            id: undefined,
            name: '',
            name_en: '',
            describe: '',
            slug: '',
            menu_id: [],
            department_id: []
          }
          this.dialogStatus = 'create'
        }
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    filterDataText(val) {
      this.$refs.treedata.filter(val);
    }
  },
  computed: {
    ...mapGetters(['deptList', 'roleMenu'])
  },
  created() {
    if (!this.deptList.length) {
      this.$store.dispatch('organization/getDeptList', {page: 1, limit: 500})
    }
    if (!this.roleMenu.length) {
      this.$store.dispatch('organization/getMenus')
    }
  },
  data() {
    return {
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: undefined,
        name: '',
        name_en: '',
        describe: '',
        slug: '',
        menu_id: [],
        department_id: []
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: '请输入标识', trigger: 'blur' }
        ]
      },
      filterText: '',
      filterDataText: ''
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleClickDept(data, { checkedKeys }) {
      this.ruleForm.department_id = checkedKeys
    },
    handleClickMenu(data, { checkedKeys }) {
      this.ruleForm.menu_id = checkedKeys
    },
    close() {
      this.dialogFormVisible = false
    },
    createData() {
      createRole(this.ruleForm).then(() => {
        this.$message({
          message: '创建角色成功',
          type: 'success'
        })
        this.$emit('success')
        this.close()
      })
    },
    updateData() {
      updateRole(this.ruleForm).then(() => {
        this.$message({
          message: '修改角色成功',
          type: 'success'
        })
        this.$emit('success')
        this.close()
      })
    }
  }
}
</script>

<style>

</style>