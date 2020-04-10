<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :destroy-on-close="true" width="520px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item :label="$t('organization.menuModules.field.nodeType')">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">权限</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('organization.menuModules.field.nodeName')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.menuModules.field.parentNode')">
        <el-select v-model="ruleForm.parentNode" style="width: 100%">
          <div class="parent-node-body" slot="empty">
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
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 1" :label="$t('organization.menuModules.field.icon')" prop="email">
        <el-popover
          placement="bottom"
          width="400">
          <el-row :gutter="10" class="popper-menu-icon">
            <el-col :span="4" v-for="item in elementIcons" :key="item">
              <el-button><i :class="'el-icon-' + item"></i></el-button>
            </el-col>
          </el-row>
          <el-input slot="reference" v-model="ruleForm.email" readonly></el-input>
       </el-popover>
        <!-- <el-tooltip v-model="showTooltip" effect="light" placement="bottom" :visible-arrow="false" :manual="true">
          <div slot="content">多行信息<br/>第二行信息</div>
          <el-input v-model="ruleForm.email" readonly></el-input>
        </el-tooltip> -->
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 1" :label="$t('organization.menuModules.field.router')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 1" :label="$t('organization.menuModules.field.filepath')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" :label="$t('organization.menuModules.field.auth')" prop="phone">
        <el-cascader
          placeholder="搜索"
          :options="options"
          :props="{ multiple: true, emitPath: false }"
          :show-all-levels="false"
          filterable
          @change="handleChangeCascader"
          style="width: 100%">
        </el-cascader>
      </el-form-item>
      <el-form-item :label="$t('organization.menuModules.field.sort')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
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
import elementIcons from './element-icons'
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
      elementIcons,
      showTooltip: false,
      dialogFormVisible: this.show,
      dialogStatus: this.item ? 'update' : 'create',
      textMap: {
        update: `${this.$t('actions.edit')}`,
        create: `${this.$t('actions.create')}`,
      },
      ruleForm: {
        id: '',
        type: 1,
        name: '',
        parentNode: 'sdfd',
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
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }]
        }]
      }],
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
    handleChangeCascader(data) {
      console.log(data)
    },
    handleClickNode(data) {
      this.ruleForm.parentNode = data.label
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
    padding: 20px;
  }
  .filter-tree {
    margin-top: 10px;
  }
  .popper-menu-icon {
    height: 300px; overflow-y: auto;
  }
  .popper-menu-icon .el-button {
    margin-bottom: 10px;
    height: 40px;
    width: 100%;
    padding: 0;
  }
</style>