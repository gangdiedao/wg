(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25e45ef5"],{"09f4":function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function n(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(e,t,a){var o=r(),l=e-o,s=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=s;var r=Math.easeInOutQuad(u,o,l,t);n(r),u<t?i(e):a&&"function"===typeof a&&a()};c()}},"61c9":function(e,t,a){"use strict";var i={zh:{guide:{field:{keyword:"关键字",name:"姓名",id:"导游编号",insideId:"内部代码",arranger:"排团经理",idCard:"护照号/身份证号",nationality:"国籍",guideId:"导游证号",phone:"联系电话",wechat:"微信号",email:"邮箱",sex:"性别",birthday:"出生日期",level:"等级",workStatus:"出团状态",guideImage:"导游证照片",badRecord:"不良记录",passportImage:"护照",remark:"备注",historicalDeposit:"历史押金",deposit:"新押金",totalDeposit:"总押金",log:"操作记录",actions:"操作",createDate:"创建日期",guide:"导游",settlementStatus:"结单状态",payable:"应付金额",deposit2:"押金",account:"已结金额",balance:"结算结果",type:"类型",payType:"支付方式",number:"支票号",numberDate:"支票日期",payDate:"支付日期",credentials:"相关凭证",depositDoc:"押金单",reviewer:"审核人",date:"日期",groupNumber:"团号",yuzhihao:"预支号",amount:"金额"},status:{open:"已激活",close:"已锁定",all:"全部"},button:{add:"添加",search:"搜索"}}},en:{guide:{}}},n="guide";t["a"]={created:function(){this.$i18n.getLocaleMessage("zh")[n]||(this.$i18n.mergeLocaleMessage("en",i.en),this.$i18n.mergeLocaleMessage("zh",i.zh))},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},methods:{setTabOptions:function(){return[{key:"1",label:this.$t("guide.status.open")},{key:"2",label:this.$t("guide.status.close")}]}}}},6724:function(e,t,a){"use strict";a("8d41");var i="@@wavesContext";function n(e,t){function a(a){var i=Object.assign({},t.value),n=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),r=n.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),l=r.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",r.appendChild(l)),n.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(a.pageY-o.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(a.pageX-o.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=n.color,l.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=a:e[i]={removeHandle:a},a}var r={bind:function(e,t){e.addEventListener("click",n(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",n(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},o=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;t["a"]=r},"8a36":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{staticClass:"filter-container",attrs:{type:"flex"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},model:{value:e.listQuery.date_type,callback:function(t){e.$set(e.listQuery,"date_type",t)},expression:"listQuery.date_type"}},e._l([{id:1,label:"支票日期"},{id:2,label:"支付日期"},{id:3,label:"创建日期"}],(function(e){return a("el-option",{key:e.id,attrs:{label:e.label,value:e.id}})})),1),e._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:e.$t("guide.field.keyword")+e.$t("actions.search")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.keyword,callback:function(t){e.$set(e.listQuery,"keyword",t)},expression:"listQuery.keyword"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      "+e._s(e.$t("guide.button.search"))+"\n    ")])],1),e._v(" "),a("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"start"}},[a("el-col",{attrs:{span:12}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.handleCreate}},[e._v(e._s(e.$t("actions.create")))]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini",disabled:!e.multipleSelection.length},on:{click:e.setStatusAll}},[e._v(e._s(e.$t("actions.delete")))])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{"margin-top":"15px"},attrs:{data:e.list,stripe:"",border:"",fit:"","highlight-current-row":"","summary-method":e.getSummaries,"show-summary":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.date"),prop:"bill_date",width:"150px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.guide"),width:"140px"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",{staticClass:"link-type"},[e._v(e._s(i.guide.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.groupNumber"),prop:"group_code",width:"180px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.amount"),prop:"amount",width:"140px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.yuzhihao"),prop:"advance_no",width:"180px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.credentials"),width:"140px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("viewer",{attrs:{images:t.row.imagesArr}},[a("el-row",{staticStyle:{"overflow-x":"auto"},attrs:{type:"flex"}},e._l(t.row.imagesArr,(function(e){return a("div",{key:e.url,staticStyle:{"margin-right":"10px",width:"80px"}},[a("el-avatar",{attrs:{fit:"cover",shape:"square",src:e.url}})],1)})),0)],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.remark"),prop:"remark",width:"140px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.reviewer"),width:"180px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){e.row}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.log"),width:"140px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){e.row}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("guide.field.actions"),fixed:"right",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(i)}}},[e._v("\n          "+e._s(e.$t("actions.edit"))+"\n        ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"success"}},[e._v("\n          "+e._s(e.$t("actions.reviewer"))+"\n        ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.setStatus(i)}}},[e._v("\n          "+e._s(e.$t("actions.delete"))+"\n        ")])]}}])})],1),e._v(" "),a("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"space-between"}},[a("el-col",{attrs:{span:12}}),e._v(" "),a("el-col",{attrs:{span:12}},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}})],1)],1),e._v(" "),a("edit-advance",{attrs:{show:e.showEditAdvance,item:e.advanceItem},on:{"update:show":function(t){e.showEditAdvance=t},success:e.getList}})],1)},n=[],r=a("6724"),o=a("333d"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"destroy-on-close":!0,center:""},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"180px"}},[a("el-form-item",{attrs:{label:"选择导游",prop:"foundation_guide_id"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入关键词","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.ruleForm.foundation_guide_id,callback:function(t){e.$set(e.ruleForm,"foundation_guide_id",t)},expression:"ruleForm.foundation_guide_id"}},e._l(e.guideUserList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"日期",prop:"bill_date"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.ruleForm.bill_date,callback:function(t){e.$set(e.ruleForm,"bill_date",t)},expression:"ruleForm.bill_date"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"金额"}},[a("el-input",{attrs:{type:"number"},model:{value:e.ruleForm.amount,callback:function(t){e.$set(e.ruleForm,"amount",t)},expression:"ruleForm.amount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"预支号"}},[a("el-input",{model:{value:e.ruleForm.advance_no,callback:function(t){e.$set(e.ruleForm,"advance_no",t)},expression:"ruleForm.advance_no"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"相关凭证"}},[a("upload",{attrs:{accept:e.$config.imageAccept,"list-type":"picture-card",files:e.ruleForm.imagesArr},on:{"update:files":function(t){return e.$set(e.ruleForm,"imagesArr",t)}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("\n      "+e._s(e.$t("actions.cancel"))+"\n    ")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v("\n      "+e._s(e.$t("actions.confirm"))+"\n    ")])],1)],1)},s=[],u=a("c7f0"),c=a("db47"),d={components:{upload:u["a"]},props:{show:{type:Boolean,default:!1},item:""},watch:{dialogFormVisible:function(e){e||this.$emit("update:show",!1)},show:function(e){this.dialogFormVisible=e,e&&(this.item?(Object.assign(this.ruleForm,this.item),this.dialogStatus="update"):(this.ruleForm={id:void 0,foundation_guide_id:"",bill_date:"",amount:"",advance_no:"",imagesArr:[],remark:""},this.dialogStatus="create"))}},created:function(){this.init()},data:function(){return{loading:!1,guideUserList:[],fileList:[],dialogFormVisible:this.show,dialogStatus:this.item?"update":"create",textMap:{update:"".concat(this.$t("actions.edit")),create:"".concat(this.$t("actions.create"))},ruleForm:{id:void 0,foundation_guide_id:"",bill_date:"",amount:"",advance_no:"",imagesArr:[],remark:""},rules:{foundation_guide_id:[{required:!0,message:"required",trigger:"blur"}],bill_date:[{required:!0,message:"required",trigger:"blur"}]}}},methods:{init:function(){var e=this;Object(c["g"])({page:1,limit:1e3}).then((function(t){e.guideUserList=t.data.data}))},remoteMethod:function(e){var t=this;""!==e?(this.loading=!0,Object(c["g"])({page:1,limit:100,keyword:e}).then((function(e){t.guideUserList=e.data.data})).finally((function(){t.loading=!1}))):this.guideUserList=[]},createData:function(){var e=this;Object(c["a"])(this.ruleForm).then((function(){e.$message({message:"success",type:"success"}),e.$emit("success"),e.dialogFormVisible=!1}))},updateData:function(){var e=this;Object(c["e"])(this.ruleForm).then((function(){e.$message({message:"success",type:"success"}),e.$emit("success"),e.dialogFormVisible=!1}))}}},m=d,p=a("2877"),f=Object(p["a"])(m,l,s,!1,null,null,null),g=f.exports,h=a("61c9"),v={mixins:[h["a"]],name:"settlement",components:{Pagination:o["a"],EditAdvance:g},directives:{waves:r["a"]},data:function(){return{showEditAdvance:!1,advanceItem:"",multipleSelection:[],activeName:"open",tableKey:0,list:null,total:0,listLoading:!1,listQuery:{page:1,limit:10,keyword:""}}},computed:{lang:{get:function(){return this.$store.state.app.language}}},watch:{activeName:function(e){this.$router.push("".concat(this.$route.path,"?tab=").concat(e))},lang:function(){}},created:function(){var e=this.$route.query.tab;e&&(this.activeName=e),this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(c["c"])(this.listQuery).then((function(t){e.total=t.data.count,e.list=t.data.data})).finally((function(){e.listLoading=!1}))},handleSelectionChange:function(e){this.multipleSelection=e},handleFilter:function(){this.listQuery.page=1,this.getList()},handleCreate:function(){this.advanceItem="",this.showEditAdvance=!0},handleUpdate:function(e){this.advanceItem=e,this.showEditAdvance=!0},setStatusAll:function(){var e=this.multipleSelection.map((function(e){return{id:e.id,is_delete:2}}));this.updateStatus({listData:e})},setStatus:function(e){this.updateStatus({listData:[{id:e.id,is_delete:2}]})},updateStatus:function(e){var t=this;this.$confirm("确定要删除该数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(c["h"])(e).then((function(){t.$message({type:"success",message:"success!"}),t.getList()}))}))},getSummaries:function(e){e.columns,e.data;var t=[];return t}}},b=v,y=Object(p["a"])(b,i,n,!1,null,null,null);t["default"]=y.exports},"8d41":function(e,t,a){},db47:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"g",(function(){return r})),a.d(t,"f",(function(){return o})),a.d(t,"j",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"i",(function(){return u})),a.d(t,"a",(function(){return c})),a.d(t,"c",(function(){return d})),a.d(t,"e",(function(){return m})),a.d(t,"h",(function(){return p}));var i=a("b775");function n(e){return Object(i["a"])({url:"/admin/factordata/guide/add",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/admin/factordata/guide/search",method:"get",params:e})}function o(e){return Object(i["a"])({url:"/admin/factordata/guide/edit",method:"post",data:e})}function l(e){return Object(i["a"])({url:"/admin/factordata/guide/batsave",method:"post",data:e})}function s(e){return Object(i["a"])({url:"/admin/factordata/guidedeposit/search",method:"get",params:e})}function u(e){return Object(i["a"])({url:"/admin/factordata/guidedeposit/batsave",method:"post",data:e})}function c(e){return Object(i["a"])({url:"/admin/factordata/guideadvance/add",method:"post",data:e})}function d(e){return Object(i["a"])({url:"/admin/factordata/guideadvance/search",method:"get",params:e})}function m(e){return Object(i["a"])({url:"/admin/factordata/guideadvance/edit",method:"post",data:e})}function p(e){return Object(i["a"])({url:"/admin/factordata/guideadvance/batsave",method:"post",data:e})}}}]);