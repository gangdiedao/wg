(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35f669fc"],{"09f4":function(e,t,i){"use strict";i.d(t,"a",(function(){return s})),Math.easeInOutQuad=function(e,t,i,n){return e/=n/2,e<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function a(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,i){var s=o(),r=e-s,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var o=Math.easeInOutQuad(c,s,r,t);a(o),c<t?n(e):i&&"function"===typeof i&&i()};u()}},6724:function(e,t,i){"use strict";i("8d41");var n="@@wavesContext";function a(e,t){function i(i){var n=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var s=o.getBoundingClientRect(),r=o.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(s.width,s.height)+"px",o.appendChild(r)),a.type){case"center":r.style.top=s.height/2-r.offsetHeight/2+"px",r.style.left=s.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(i.pageY-s.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(i.pageX-s.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=a.color,r.className="waves-ripple z-active",!1}}return e[n]?e[n].removeHandle=i:e[n]={removeHandle:i},i}var o={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[n].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[n].removeHandle,!1),e[n]=null,delete e[n]}},s=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(s)),o.install=s;t["a"]=o},7514:function(e,t,i){"use strict";var n=i("5ca1"),a=i("0a49")(5),o="find",s=!0;o in[]&&Array(1)[o]((function(){s=!1})),n(n.P+n.F*s,"Array",{find:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")(o)},"8d41":function(e,t,i){},b94c:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-select",{staticClass:"filter-item",attrs:{placeholder:e.$t("i18nView.information.select")+e.$t("i18nView.information.shop")},on:{change:e.handleFilter},model:{value:e.listQuery.sort,callback:function(t){e.$set(e.listQuery,"sort",t)},expression:"listQuery.sort"}},e._l(e.infoTypeList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:e.$t("i18nView.information.input")+e.$t("i18nView.information.keyword")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}}),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      "+e._s(e.$t("i18nView.information.search"))+"\n    ")]),e._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){return e.handleCreateUpdate()}}},[e._v("\n      "+e._s(e.$t("i18nView.information.add"))+"\n    ")]),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("\n      "+e._s(e.$t("i18nView.information.export"))+"\n    ")]),e._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"danger",icon:"el-icon-lock"},on:{click:e.handleLock}},[e._v("\n      "+e._s(e.$t("i18nView.information.lock"))+"\n    ")]),e._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"success",icon:"el-icon-unlock"},on:{click:e.handleUnLock}},[e._v("\n      "+e._s(e.$t("i18nView.information.unLock"))+"\n    ")]),e._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"danger",icon:"el-icon-circle-close"},on:{click:function(t){return e.handleDelete()}}},[e._v("\n      "+e._s(e.$t("i18nView.information.delete"))+"\n    ")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"",border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.id"),type:"index",sortable:"custom",align:"center",width:"80","class-name":e.getSortClass("id")}}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.name"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.name))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.shop"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.shop.name))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.shopspot"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.shop_point.name))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.companyRoyalty"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.companyrate))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.tourGuideRoyalty"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.guiderate))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.leaderRoyalty"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.leaderrate))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.companySecondRoyalty"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.companyrate2))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.calculationType"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.money_type))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.showType"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.show_type))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.commissionType"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",[e._v(e._s(n.type))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.modifier"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("span",{staticClass:"link-type"},[e._v(e._s(n.updated_user_name))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("i18nView.information.actions"),fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(t){return e.handleCreateUpdate(n)}}},[e._v("\n          "+e._s(e.$t("i18nView.information.edit"))+"\n        ")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.handleDelete(n)}}},[e._v("\n          "+e._s(e.$t("i18nView.information.delete"))+"\n        ")])]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),i("commissionAddOrUpdate",{ref:"commissionAddOrUpdate",on:{callBcak:e.callBcak}})],1)},a=[],o=(i("55dd"),i("b775"));function s(e){return Object(o["a"])({url:"/admin/factordata/shoppointret/search",method:"get",params:e})}function r(e){return Object(o["a"])({url:"/admin/factordata/shoppoint/search",method:"get",params:e})}function l(e){return Object(o["a"])({url:"/admin/factordata/shoppointret/batsave",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/admin/factordata/shoppointret/add",method:"post",data:e})}function u(e){return Object(o["a"])({url:"/admin/factordata/shoppointret/edit",method:"post",data:e})}var d=i("6724"),m=i("ed08"),p=i("333d"),h=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.visible,title:e.dataForm.id?e.$t("i18nView.information.edit"):e.$t("i18nView.information.add"),"close-on-click-modal":!1,"close-on-press-escape":!1,center:""},on:{"update:visible":function(t){e.visible=t}}},[i("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"120px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmitHandle()}}},[i("el-form-item",{attrs:{prop:"foundation_shop_point_id",label:e.$t("i18nView.information.shopspot")}},[i("el-select",{attrs:{placeholder:this.$t("i18nView.information.select")+e.$t("i18nView.information.shopspot")},on:{change:e.shopSpotChange},model:{value:e.dataForm.foundation_shop_point_id,callback:function(t){e.$set(e.dataForm,"foundation_shop_point_id",t)},expression:"dataForm.foundation_shop_point_id"}},e._l(e.shopSpotListData,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{prop:"name",label:e.$t("i18nView.information.name")}},[i("el-input",{attrs:{placeholder:this.$t("i18nView.information.input")+e.$t("i18nView.information.name")},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"companyrate",label:e.$t("i18nView.information.companyRoyalty")}},[i("el-input",{attrs:{placeholder:this.$t("i18nView.information.input")+e.$t("i18nView.information.companyRoyalty"),type:"number"},model:{value:e.dataForm.companyrate,callback:function(t){e.$set(e.dataForm,"companyrate",t)},expression:"dataForm.companyrate"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"guiderate",label:e.$t("i18nView.information.tourGuideRoyalty")}},[i("el-input",{attrs:{placeholder:this.$t("i18nView.information.input")+e.$t("i18nView.information.tourGuideRoyalty"),type:"number"},model:{value:e.dataForm.guiderate,callback:function(t){e.$set(e.dataForm,"guiderate",t)},expression:"dataForm.guiderate"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"leaderrate",label:e.$t("i18nView.information.leaderRoyalty")}},[i("el-input",{attrs:{placeholder:this.$t("i18nView.information.input")+e.$t("i18nView.information.leaderRoyalty"),type:"number"},model:{value:e.dataForm.leaderrate,callback:function(t){e.$set(e.dataForm,"leaderrate",t)},expression:"dataForm.leaderrate"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"companyrate2",label:e.$t("i18nView.information.companySecondRoyalty")}},[i("el-input",{attrs:{placeholder:this.$t("i18nView.information.input")+e.$t("i18nView.information.companySecondRoyalty"),type:"number"},model:{value:e.dataForm.companyrate2,callback:function(t){e.$set(e.dataForm,"companyrate2",t)},expression:"dataForm.companyrate2"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"money_type",label:e.$t("i18nView.information.calculationType")}},[i("el-select",{attrs:{placeholder:this.$t("i18nView.information.select")+e.$t("i18nView.information.calculationType")},model:{value:e.dataForm.money_type,callback:function(t){e.$set(e.dataForm,"money_type",t)},expression:"dataForm.money_type"}},e._l(e.computedTypeList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{prop:"show_type",label:e.$t("i18nView.information.showType")}},[i("el-select",{attrs:{placeholder:this.$t("i18nView.information.select")+e.$t("i18nView.information.showType")},model:{value:e.dataForm.show_type,callback:function(t){e.$set(e.dataForm,"show_type",t)},expression:"dataForm.show_type"}},e._l(e.showTypeList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),i("el-form-item",{attrs:{prop:"type",label:e.$t("i18nView.information.commissionType")}},[i("el-select",{attrs:{placeholder:this.$t("i18nView.information.select")+e.$t("i18nView.information.commissionType")},model:{value:e.dataForm.type,callback:function(t){e.$set(e.dataForm,"type",t)},expression:"dataForm.type"}},e._l(e.commissionTypeList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),e._v(" "),i("template",{slot:"footer"},[i("el-button",{on:{click:function(t){e.visible=!1}}},[e._v(e._s(e.$t("i18nView.information.cancel")))]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.saveBtn},on:{click:function(t){return e.dataFormSubmitHandle()}}},[e._v(e._s(e.$t("i18nView.information.save")))])],1)],2)},y=[],f=(i("96cf"),i("3b8d")),w=(i("7514"),i("d088")),g={mixins:[w["a"]],data:function(){return{visible:!1,saveBtn:!1,dataForm:{foundation_shop_id:"",foundation_shop_point_id:"",name:"",status:1,money_type:"",companyrate:"0.00",guiderate:"0.00",leaderrate:"0.00",companyrate2:"0.00",show_type:"",type:""},listQuery:{page:1,limit:1e3,start_date:"",end_date:"",orderByColumn:"updated_at",orderByDirection:"desc",foundation_shop_id:"",name:"",status:"",comptaxrate:"",comptaxrate2:""},returnTypeFlag:0,dataRule:{foundation_shop_point_id:[{required:!0,message:this.$t("i18nView.information.select")+this.$t("i18nView.information.shopspot"),trigger:"blur"}],name:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.name"),trigger:"blur"}],companyrate:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.companyRoyalty"),trigger:"blur"}],guiderate:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.tourGuideRoyalty"),trigger:"blur"}],leaderrate:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.leaderRoyalty"),trigger:"blur"}],companyrate2:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.companySecondRoyalty"),trigger:"blur"}],money_type:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.calculationType"),trigger:"blur"}],show_type:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.showType"),trigger:"blur"}],type:[{required:!0,message:this.$t("i18nView.information.input")+this.$t("i18nView.information.commissionType"),trigger:"blur"}]},shopSpotListData:[],showTypeList:[],computedTypeList:[],commissionTypeList:[]}},computed:{},created:function(){this.computedTypeList=this.computedTypeListData(),this.showTypeList=this.showTypeListData(),this.commissionTypeList=this.commissionTypeListData()},methods:{init:function(e){var t=this;this.visible=!0,this.getShopList(),this.$nextTick((function(){t.dataForm=e||{foundation_shop_id:"",foundation_shop_point_id:"",name:"",status:1,money_type:"",companyrate:"0.00",guiderate:"0.00",leaderrate:"0.00",companyrate2:"0.00",show_type:"",type:""}}))},getShopList:function(){var e=this;r(this.listQuery).then((function(t){e.shopSpotListData=t.data.data}))},shopSpotChange:function(e){var t={};t=this.shopSpotListData.find((function(t){return t.id===e})),this.dataForm.foundation_shop_id=t.shop.id},dataFormSubmitHandle:function(){var e=this;this.$refs["dataForm"].validate(function(){var t=Object(f["a"])(regeneratorRuntime.mark((function t(i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:i&&(e.saveBtn=!0,e.dataForm.id?u(e.dataForm).then((function(t){2e3===t.code?e.$message({type:"success",duration:1e3,message:e.$t("i18nView.information.edit")+e.$t("i18nView.information.success"),onClose:function(){e.visible=!1,e.saveBtn=!1,e.$emit("callBcak","edit")}}):(e.$message.error(t.msg),e.saveBtn=!1)})):c(e.dataForm).then((function(t){2e3===t.code?e.$message({type:"success",duration:1e3,message:e.$t("i18nView.information.add")+e.$t("i18nView.information.success"),onClose:function(){e.visible=!1,e.saveBtn=!1,e.$emit("callBcak","add")}}):(e.$message.error(t.msg),e.saveBtn=!1)})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},v=g,_=i("2877"),$=Object(_["a"])(v,h,y,!1,null,null,null),b=$.exports,V={name:"HotelMange",components:{Pagination:p["a"],commissionAddOrUpdate:b},directives:{waves:d["a"]},filters:{},mixins:[w["a"]],data:function(){return{tabMapOptions:[],activeName:"all",tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,start_date:"",end_date:"",orderByColumn:"updated_at",orderByDirection:"desc",foundation_shop_id:"",foundation_shop_point_id:"",name:"",status:"",money_type:"",companyrate:"",guiderate:"",leaderrate:"",companyrate2:"",show_type:"",type:""},importanceOptions:[1,2,3],sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],infoTypeList:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1,listData:[]}},computed:{},watch:{},created:function(){this.getList()},methods:{callBcak:function(e){"add"===e?(this.listQuery.page=1,this.getList()):this.getList()},getList:function(){var e=this;this.listLoading=!0,s(this.listQuery).then((function(t){e.list=t.data.data,e.total=t.data.count,setTimeout((function(){e.listLoading=!1}),1500)}))},handleSelectionChange:function(e){var t=this;e.map((function(e){t.listData.push({id:e.id,status:e.status,is_delete:e.is_delete})}))},handleLock:function(){var e=this;0!==this.listData.length?(this.listData.map((function(e){e.status=2})),l({listData:this.listData}).then((function(t){2e3===t.code?e.$message({type:"success",duration:1e3,message:e.$t("i18nView.information.lock")+e.$t("i18nView.information.success"),onClose:function(){e.getList()}}):e.$message.error(t.msg)}))):this.$message({type:"warning",duration:1e3,message:this.$t("i18nView.information.pleaseCheckTheData")})},handleUnLock:function(){var e=this;0!==this.listData.length?(this.listData.map((function(e){e.status=1})),l({listData:this.listData}).then((function(t){2e3===t.code?e.$message({type:"success",duration:1e3,message:e.$t("i18nView.information.unLock")+e.$t("i18nView.information.success"),onClose:function(){e.getList()}}):e.$message.error(t.msg)}))):this.$message({type:"warning",duration:1e3,message:this.$t("i18nView.information.pleaseCheckTheData")})},handleFilter:function(){this.listQuery.page=1,this.getList()},sortChange:function(e){var t=e.prop,i=e.order;"id"===t&&this.sortByID(i)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},handleCreateUpdate:function(e){this.$refs.commissionAddOrUpdate.init(e?JSON.parse(JSON.stringify(e)):e)},handleDelete:function(e){var t=this;if(e)this.listData=[],this.listData.push({id:e.id,status:e.status,is_delete:e.is_delete});else if(0===this.listData.length)return void this.$message({type:"warning",duration:1e3,message:this.$t("i18nView.information.pleaseCheckTheData")});this.$confirm(this.$t("i18nView.information.areYouSureDeleteThisData"),this.$t("i18nView.information.tips"),{confirmButtonText:this.$t("i18nView.information.confirm"),cancelButtonText:this.$t("i18nView.information.cancel"),type:"warning"}).then((function(){t.listData.map((function(e){e.is_delete=2})),l({listData:t.listData}).then((function(e){2e3===e.code?t.$message({type:"success",duration:1e3,message:t.$t("i18nView.information.delete")+t.$t("i18nView.information.success"),onClose:function(){t.getList()}}):t.$message.error(e.msg)}))})).catch((function(e){t.$message.error(e.msg)}))},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([i.e("chunk-5bdd67a2"),i.e("chunk-2d3eea4a"),i.e("chunk-581b2547")]).then(i.bind(null,"4bf8d")).then((function(t){var i=["timestamp","title","type","importance","status"],n=["timestamp","title","type","importance","status"],a=e.formatJson(n);t.export_json_to_excel({header:i,data:a,filename:"table-list"}),e.downloadLoading=!1}))},formatJson:function(e){return this.list.map((function(t){return e.map((function(e){return"timestamp"===e?Object(m["f"])(t[e]):t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}},k=V,T=Object(_["a"])(k,n,a,!1,null,null,null);t["default"]=T.exports},d088:function(e,t,i){"use strict";var n={zh:{i18nView:{information:{hotel:"酒店",keyword:"关键字",search:"搜索",add:"添加",export:"导出",id:"Id",name:"名称",hotelName:"酒店名称",company:"公司名称",infoType:"信息类型",icon:"图标",pic:"图片",url:"网址",price:"价格",valuationMethod:"计价方式",telePhone:"联系电话",fax:"传真",contacts:"联系人",city:"城市",hotelType:"酒店类别",hotelLevel:"酒店级别",address:"地址",email:"邮箱",website:"官网",payType:"支付类型",creator:"创建人",files:"附件",remarks:"备注",modifier:"修改者",actions:"操作",edit:"编辑",delete:"删除",team:"团队/TEAM",fit:"自由行/FIT",cancel:"取消",confirm:"确定",save:"保存",introduce:"介绍",detailIntroduce:"详细介绍",AccountBookRemark:"账本备注",unitPrice:"单价",packagePrice:"套餐价",UKey:"UKey",returnType:"返佣类型",level:"等级",category:"类别",startTime:"开始时间",endTime:"结束时间",type:"类型",childPrice:"小孩价格",costPrice:"成本价",childCostPrice:"小孩成本价",otherInfo:"其他信息",maskInfo:"备注信息",shop:"购物店",taxRate:"税率",twoTaxRate:"二次税率",shopspot:"购物点",buy:"购物",selfcost:"自费",companyRoyalty:"公司提成",companySecondRoyalty:"公司二次提成",tourGuideRoyalty:"导游提成",leaderRoyalty:"领队提成",calculationType:"计算方式",showType:"显示方式",commissionType:"佣金类型",englishName:"英文名称",fullName:"全称",key:"key",companyManager:"公司经理",operationsManager:"操作经理",operator:"操作者",charger:"负责人",groupNumberPrefix:"团号前缀",businessLicenseNo:"营业执照号",companyAddress:"公司地址",code:"编码",touristDestination:"客源地",market:"市场",success:"成功",upload:"上传",uploadTip:"上传文件格式只能为{format}",uploadSize:"上传文件大小不能大于{format}",lock:"锁定",unLock:"激活",tips:"提示",select:"请选择",input:"请输入",plan_group:"团类",seller:"销售者",company_name:"组团社",calculationDays:"天数计算",systemSetup:"系统设置",countingDays:"算天数",countingNights:"算晚数",origin:"始发地",flight:"航班",firstPartyOperation:"甲方操作",tripDays:"行程天数",one_price:"人头费",passport:"过关",service_expense:"导游小费",leader_expense:"领队佣金",shopping_team_no:"进店团号",kingpower_team_no:"免税店团号",car_explain:"订车说明",room_explain:"订房说明",outlay:"团费备注",tourFee:"团费",pleaseCheckTheData:"请先勾选数据",areYouSureDeleteThisData:"确定要删除该数据?",status:"状态"},areas:{all:"全部",bangkok:"曼谷",pattaya:"芭提雅",samed:"沙美岛",rayong:"罗勇",ayutthaya:"大城",huahin:"华欣",kanchanaburi:"北碧",samui:"苏梅岛",surat:"SURAT",kohchang:"象岛"},status:{open:"激活",close:"锁定",all:"全部"},payTypeList:{pay:"公司支出(VOUCHER)",charges:"公司收费",revenue:"公司收入",tourGuidePays:"导游支出",pays:"公司支出",tourGuidePay:"导游支出(VOUCHER)"},creatorList:{zhangshan:"张山",liudehua:"刘德华",zhangxueyou:"张学友",zhoujielun:"周杰伦"},returnTypeList:{noReturn:"无返佣",fixedReturn:"固定返佣",consumptionPercentage:"按照消费百分比返佣",groupFinancialStaff:"按团财务人数返佣",adultsAndChildren:"按大人小孩数返佣",fixedValue:"固定值",returnedCommissionPercentage:"返佣百分比",everyoneReturns:"每人返佣",everyAdultReturns:"每大人返佣",everyChildReturns:"每小孩返佣"},computedType:{proportion:"按比例%",piece:"按件数(/件)",fixedValue:"定值",custom:"自定义"},showType:{royaltyRate:"有提成率时显示",shop:"有购物时显示",allShow:"始终显示"},commissionType:{default:"默认类型",company:"公司佣金",leader:"导游佣金"},common:{selectCity:"选择城市",selectHotelType:"选择酒店类别",selectPayType:"选择支付类型",selectDate:"选择日期",startDate:"开始日期",endDate:"结束日期",to:"至",upload:"点击上传",priceInfo:"价格信息",price:"成人价",kidPrice:"小孩价",num:"限预定数量"}}},en:{i18nView:{information:{hotel:"Hotel",hotelName:"Hotel",keyword:"keyword",search:"search",add:"add",export:"export",id:"ID",name:"HotelName",company:"company",infoType:"infoType",icon:"icon",pic:"image",url:"url",valuationMethod:"valuationMethod",price:"price",telePhone:"telePhone",fax:"fax",contacts:"contacts",city:"city",hotelType:"hotelType",hotelLevel:"hotelLevel",address:"address",email:"email",website:"website",payType:"payType",creator:"creator",files:"files",remarks:"remark",modifier:"修改者",actions:"action",edit:"edit",delete:"delete",team:"TEAM",fit:"FIT",cancel:"cancel",confirm:"confirm",status:"status"},areas:{all:"All",bangkok:"bangkok",pattaya:"pattaya",samed:"samed",rayong:"rayong",ayutthaya:"ayutthaya",huahin:"huahin",kanchanaburi:"kanchanaburi",samui:"samui",surat:"SURAT",kohchang:"kohchang"},status:{publish:"开启",draft:"关闭",all:"全部"},payTypeList:{pay:"公司支出(VOUCHER)",charges:"公司收费",revenue:"公司收入",tourGuidePays:"导游支出",pays:"公司支出",tourGuidePay:"导游支出(VOUCHER)"},creatorList:{zhangshan:"张山",liudehua:"刘德华",zhangxueyou:"张学友",zhoujielun:"周杰伦"}}}},a="i18nView";t["a"]={created:function(){this.$i18n.getLocaleMessage("zh")[a]||(this.$i18n.mergeLocaleMessage("en",n.en),this.$i18n.mergeLocaleMessage("zh",n.zh))},data:function(){return{statusOptions:[]}},methods:{setCityOptions:function(){return[{key:"all",label:this.$t("i18nView.areas.all")},{key:"bangkok",label:this.$t("i18nView.areas.bangkok")},{key:"pattaya",label:this.$t("i18nView.areas.pattaya")},{key:"samed",label:this.$t("i18nView.areas.samed")},{key:"rayong",label:this.$t("i18nView.areas.rayong")},{key:"ayutthaya",label:this.$t("i18nView.areas.ayutthaya")},{key:"huahin",label:this.$t("i18nView.areas.huahin")},{key:"kanchanaburi",label:this.$t("i18nView.areas.kanchanaburi")},{key:"samui",label:this.$t("i18nView.areas.samui")},{key:"surat",label:this.$t("i18nView.areas.surat")},{key:"kohchang",label:this.$t("i18nView.areas.kohchang")}]},getStatus:function(){this.statusOptions=[{key:"",name:this.$t("i18nView.status.all")},{key:1,name:this.$t("i18nView.status.open")},{key:2,name:this.$t("i18nView.status.close")}]},payTypeListData:function(){return[{id:0,name:this.$t("i18nView.payTypeList.pay")},{id:1,name:this.$t("i18nView.payTypeList.charges")},{id:2,name:this.$t("i18nView.payTypeList.revenue")},{id:3,name:this.$t("i18nView.payTypeList.tourGuidePays")},{id:4,name:this.$t("i18nView.payTypeList.pays")},{id:5,name:this.$t("i18nView.payTypeList.tourGuidePay")}]},returnTypeListData:function(){return[{id:0,name:this.$t("i18nView.returnTypeList.noReturn")},{id:1,name:this.$t("i18nView.returnTypeList.fixedReturn")},{id:2,name:this.$t("i18nView.returnTypeList.consumptionPercentage")},{id:3,name:this.$t("i18nView.returnTypeList.groupFinancialStaff")},{id:4,name:this.$t("i18nView.returnTypeList.adultsAndChildren")}]},valuationMethodListData:function(){return[{id:0,name:this.$t("i18nView.information.unitPrice")},{id:1,name:this.$t("i18nView.information.packagePrice")}]},infoTypeListData:function(){return[{id:0,name:this.$t("i18nView.information.team")},{id:1,name:this.$t("i18nView.information.fit")}]},computedTypeListData:function(){return[{id:1,name:this.$t("i18nView.computedType.proportion")},{id:2,name:this.$t("i18nView.computedType.piece")},{id:3,name:this.$t("i18nView.computedType.fixedValue")},{id:4,name:this.$t("i18nView.computedType.custom")}]},showTypeListData:function(){return[{id:1,name:this.$t("i18nView.showType.royaltyRate")},{id:2,name:this.$t("i18nView.showType.shop")},{id:3,name:this.$t("i18nView.showType.allShow")}]},commissionTypeListData:function(){return[{id:1,name:this.$t("i18nView.commissionType.default")},{id:2,name:this.$t("i18nView.commissionType.company")},{id:3,name:this.$t("i18nView.commissionType.leader")}]},prorateTypeListData:function(){return[{id:0,name:this.$t("i18nView.information.systemSetup")},{id:1,name:this.$t("i18nView.information.countingDays")},{id:2,name:this.$t("i18nView.information.countingNights")}]}}}}}]);