<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('organization.userModules.field.username')" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.nameEn')" prop="name_en">
        <el-input v-model="ruleForm.name_en"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.password')" :prop="dialogStatus == 'create' ? 'password' : ''">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.email')" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.phone')">
        <el-input type="number" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.deptname')">
        <el-popover
          v-model="open"
          placement="bottom"
          width="550">
          <div class="parent-node-body">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="deptList"
              :props="defaultProps"
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @node-click="handleClickNode"
              ref="tree">
            </el-tree>
          </div>
          <el-input slot="reference" v-model="parentname" readonly></el-input>
       </el-popover>
      </el-form-item>
      <el-form-item :label="$t('organization.userModules.field.role')">
        <el-select v-model="ruleForm.role_id" multiple filterable style="width: 100%" placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="$t('organization.userModules.field.status')">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item :label="$t('organization.userModules.field.remark')">
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
import mixin from '../mixin'
import { mapGetters } from 'vuex'
import { createUser, updateUser } from '@/api/organization'
export default {
  mixins: [mixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: '',
    deptId: Number,
    deptName: String
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    dialogFormVisible(bool) {
      if (!bool) {
        this.open = false
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.dialogFormVisible = bool
      if (bool) {
        if (this.item) {
          this.item.password = ''
          this.ruleForm = this.assign(this.ruleForm, this.item)
          this.ruleForm.role_id = []
          this.parentname = this.item.department && this.item.department.name
          this.ruleForm.role_id = this.item.roles.map(item => item.id)
          this.dialogStatus = 'update'
        } else {
          this.parentname = ''
          this.ruleForm = {
            id: undefined,
            name: '',
            name_en: '',
            username: '',
            email: '',
            phone: '',
            nationality_id: undefined,
            department_id: undefined,
            role_id: [],
            password: '',
            remark: ''
          }
          this.dialogStatus = 'create'
          if (this.deptId) {
            this.ruleForm.department_id = this.deptId
            this.parentname = this.deptName
          }
        }
      }
    }
  },
  data() {
    return {
      open: false,
      parentname: '',
      filterText: '',
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')} ${this.$t('organization.userModules.field.user')}`,
        create: `${this.$t('actions.create')} ${this.$t('organization.userModules.field.user')}`,
      },
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      ruleForm: {
        id: undefined,
        name: '',
        name_en: '',
        username: '',
        email: '',
        phone: '',
        nationality_id: undefined,
        department_id: undefined,
        role_id: [],
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请选正确的emial', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (!this.roleList.length) {
      this.$store.dispatch('organization/getRoleList', {page: 1, limit: 1000})
    }
  },
  computed: {
    ...mapGetters(['deptList', 'roleList'])
  },
  methods: {
    handleClickNode(data) {
      this.ruleForm.department_id = data.id
      this.parentname = data.name
      this.open = false
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    close() {
      this.dialogFormVisible = false
    },
    createData() {
      createUser(this.ruleForm).then(() => {
        this.$message({
          message: '创建用户成功',
          type: 'success'
        })
        this.$emit('success')
        this.close()
      })
    },
    updateData() {
      updateUser(this.ruleForm).then(() => {
        this.$message({
          message: '修改用户成功',
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