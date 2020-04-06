<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item :label="$t('organization.deptModules.field.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.deptModules.field.nameEn')" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.deptModules.field.parent')" prop="email">
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
              :data="data"
              :props="defaultProps"
              default-expand-all
              :highlight-current="true"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @node-click="handleClickNode"
              ref="tree">
            </el-tree>
          </div>
          <el-input slot="reference" v-model="ruleForm.parent" readonly></el-input>
       </el-popover>
      </el-form-item>
      <el-form-item :label="$t('organization.deptModules.field.sort')" prop="sort">
        <el-input type="number" v-model="ruleForm.phone"></el-input>
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
export default {
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
        this.open = false
        this.$emit('update:show', false)
      }
    },
    show(bool) {
      this.dialogFormVisible = bool
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      open: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: '',
        name: '',
        username: '',
        parent: '',
        email: '',
        phone: '',
        role: [],
        status: 1,
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度最少3个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请选正确的emial', trigger: 'blur' }
        ],
        phone: [
          { type: 'phone', message: '请填写正确的手机号', trigger: 'blur' }
        ]
      },
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleClickNode(data) {
      this.ruleForm.parent = data.label
      this.open = false
      console.log(data)
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    createData() {

    },
    updateData() {

    }
  }
}
</script>

<style>
  .parent-node-body {
    /* padding: 20px; */
    max-height: 500px;
    overflow-y: auto;
  }
  .filter-tree {
    margin-top: 10px;
  }
</style>