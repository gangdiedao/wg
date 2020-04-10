<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="720px" center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item :label="$t('organization.deptModules.field.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.deptModules.field.nameEn')" prop="name_en">
        <el-input v-model="ruleForm.name_en"></el-input>
      </el-form-item>
      <el-form-item :label="$t('organization.deptModules.field.parent')">
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
      <el-form-item>
        <span style="color: #909399">tips: 上级部门为空则默认是顶级部门</span>
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
import { createDept, updateDept } from '@/api/organization'
import { mapGetters } from 'vuex'
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
          this.ruleForm = this.assign(this.ruleForm, this.item)
          this.parentname = this.item.parent && this.item.parent.name + '/' + this.item.parent.name_en
          this.dialogStatus = 'update'
        } else {
          this.parentname = ''
          this.ruleForm = {
            id: undefined,
            name: '',
            name_en: '',
            parent_id: undefined
          }
          this.dialogStatus = 'create'
        }
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  computed: {
    ...mapGetters(['deptList'])
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
      parentname: '',
      ruleForm: {
        id: undefined,
        name: '',
        name_en: '',
        parent_id: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        name_en: [
          { required: true, message: '请输入部门英文名称', trigger: 'blur' }
        ]
      },
      filterText: '',
      defaultProps: {
        children: 'childs',
        label: (data) => {
          return data.name + '/' + data.name_en
        }
      }
    }
  },
  methods: {
    handleClickNode(data) {
      this.ruleForm.parent_id = data.id
      this.parentname = data.name + '/' + data.name_en
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
      createDept(this.ruleForm).then(() => {
        this.$message({
          message: '创建部门成功',
          type: 'success'
        })
        this.$emit('success')
        this.close()
      })
    },
    updateData() {
      updateDept(this.ruleForm).then(() => {
        this.$message({
          message: '修改部门成功',
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
  .parent-node-body {
    /* padding: 20px; */
    max-height: 500px;
    overflow-y: auto;
  }
  .filter-tree {
    margin-top: 10px;
  }
</style>