(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16885eba"],{"09f4":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function n(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(e,t,a){var r=o(),l=e-r,s=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=s;var o=Math.easeInOutQuad(u,r,l,t);n(o),u<t?i(e):a&&"function"===typeof a&&a()};c()}},2423:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var i=a("b775");function n(e){return Object(i["a"])({url:"/vue-element-admin/article/list",method:"get",params:e})}},6724:function(e,t,a){"use strict";a("8d41");var i="@@wavesContext";function n(e,t){function a(a){var i=Object.assign({},t.value),n=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),o=n.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),l=o.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",o.appendChild(l)),n.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(a.pageY-r.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(a.pageX-r.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=n.color,l.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=a:e[i]={removeHandle:a},a}var o={bind:function(e,t){e.addEventListener("click",n(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",n(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t["a"]=o},"8d41":function(e,t,a){},d088:function(e,t,a){"use strict";var i={zh:{i18nView:{information:{hotel:"酒店",keyword:"关键字",search:"搜索",add:"添加",export:"导出",id:"序号",name:"名称",company:"公司名称",infoType:"信息类型",icon:"图标",pic:"图片",url:"网址",price:"价格",valuationMethod:"计价方式",telePhone:"联系电话",fax:"传真",contacts:"联系人",city:"城市",hotelType:"酒店类别",hotelLevel:"酒店级别",address:"地址",email:"邮箱",website:"官网",payType:"支付类型",creator:"创建人",files:"附件",remarks:"备注",modifier:"修改者",actions:"操作",edit:"编辑",delete:"删除",team:"团队/TEAM",fit:"自由行/FIT",cancel:"取消",confirm:"确定",save:"保存",introduce:"介绍",detailIntroduce:"详细介绍",AccountBookRemark:"账本备注",unitPrice:"单价",packagePrice:"套餐价",UKey:"UKey",returnType:"返佣类型",level:"等级",category:"类别",startTime:"开始时间",endTime:"结束时间",type:"类型",childPrice:"小孩价格",costPrice:"成本价",childCostPrice:"小孩成本价",otherInfo:"其他信息",maskInfo:"备注信息",shop:"购物店",taxRate:"税率",twoTaxRate:"二次税率",shopspot:"购物点",companyRoyalty:"公司提成",companySecondRoyalty:"公司二次提成",tourGuideRoyalty:"导游提成",leaderRoyalty:"领队提成",calculationType:"计算方式",showType:"显示方式",commissionType:"佣金类型",englishName:"英文名称",fullName:"全称",key:"key",companyManager:"公司经理",operationsManager:"操作经理",charger:"负责人",groupNumberPrefix:"团号前缀",businessLicenseNo:"营业执照号",companyAddress:"公司地址",code:"编码",touristDestination:"客源地",success:"成功",upload:"上传",uploadTip:"上传文件格式只能为{format}",uploadSize:"上传文件大小不能大于{format}"},areas:{all:"全部",bangkok:"曼谷",pattaya:"芭提雅",samed:"沙美岛",rayong:"罗勇",ayutthaya:"大城",huahin:"华欣",kanchanaburi:"北碧",samui:"苏梅岛",surat:"SURAT",kohchang:"象岛"},status:{publish:"开启",draft:"关闭",all:"全部"},payTypeList:{pay:"公司支出(VOUCHER)",charges:"公司收费",revenue:"公司收入",tourGuidePays:"导游支出",pays:"公司支出",tourGuidePay:"导游支出(VOUCHER)"},creatorList:{zhangshan:"张山",liudehua:"刘德华",zhangxueyou:"张学友",zhoujielun:"周杰伦"},returnTypeList:{noReturn:"无返佣",fixedReturn:"固定返佣",consumptionPercentage:"按照消费百分比返佣",groupFinancialStaff:"按团财务人数返佣",adultsAndChildren:"按大人小孩数返佣",fixedValue:"固定值",returnedCommissionPercentage:"返佣百分比",everyoneReturns:"每人返佣",everyAdultReturns:"每大人返佣",everyChildReturns:"每小孩返佣"}}},en:{i18nView:{information:{hotel:"Hotel",keyword:"keyword",search:"search",add:"add",export:"export",id:"序号",name:"HotelName",company:"company",infoType:"信息类型",icon:"icon",pic:"image",url:"url",valuationMethod:"valuationMethod",price:"price",telePhone:"telePhone",fax:"fax",contacts:"contacts",city:"city",hotelType:"hotelType",hotelLevel:"hotelLevel",address:"address",email:"email",website:"website",payType:"payType",creator:"creator",files:"files",remarks:"remark",modifier:"修改者",actions:"actions",edit:"edit",delete:"delete",team:"TEAM",fit:"FIT",cancel:"cancel",confirm:"confirm"},areas:{all:"All",bangkok:"bangkok",pattaya:"pattaya",samed:"samed",rayong:"rayong",ayutthaya:"ayutthaya",huahin:"huahin",kanchanaburi:"kanchanaburi",samui:"samui",surat:"SURAT",kohchang:"kohchang"},status:{publish:"开启",draft:"关闭",all:"全部"},payTypeList:{pay:"公司支出(VOUCHER)",charges:"公司收费",revenue:"公司收入",tourGuidePays:"导游支出",pays:"公司支出",tourGuidePay:"导游支出(VOUCHER)"},creatorList:{zhangshan:"张山",liudehua:"刘德华",zhangxueyou:"张学友",zhoujielun:"周杰伦"}}}},n="i18nView";t["a"]={created:function(){this.$i18n.getLocaleMessage("zh")[n]||(this.$i18n.mergeLocaleMessage("en",i.en),this.$i18n.mergeLocaleMessage("zh",i.zh))},methods:{setCityOptions:function(){return[{key:"all",label:this.$t("i18nView.areas.all")},{key:"bangkok",label:this.$t("i18nView.areas.bangkok")},{key:"pattaya",label:this.$t("i18nView.areas.pattaya")},{key:"samed",label:this.$t("i18nView.areas.samed")},{key:"rayong",label:this.$t("i18nView.areas.rayong")},{key:"ayutthaya",label:this.$t("i18nView.areas.ayutthaya")},{key:"huahin",label:this.$t("i18nView.areas.huahin")},{key:"kanchanaburi",label:this.$t("i18nView.areas.kanchanaburi")},{key:"samui",label:this.$t("i18nView.areas.samui")},{key:"surat",label:this.$t("i18nView.areas.surat")},{key:"kohchang",label:this.$t("i18nView.areas.kohchang")}]},setHotelTypeOptions:function(){return[{key:"hotel",label:"HOTEL"},{key:"seaSide",label:"Sea side/海边"},{key:"city",label:"City/市区"},{key:"villa",label:"Villa/别墅"},{key:"resident",label:"Resident/民宿"},{key:"resort",label:"Resort/度假村"},{key:"poolVilla",label:"pool villa/泳池别墅"},{key:"poolAccess",label:"pool Access"}]},setPayOptions:function(){return[{key:"1",label:"公司支出(VOUCHER)"},{key:"2",label:"公司收费"},{key:"3",label:"公司收入"},{key:"4",label:"导游支出"},{key:"5",label:"公司支出"},{key:"6",label:"导游支出(VOUCHER)"}]},payTypeListData:function(){return[{id:0,name:this.$t("i18nView.payTypeList.pay")},{id:1,name:this.$t("i18nView.payTypeList.charges")},{id:2,name:this.$t("i18nView.payTypeList.revenue")},{id:3,name:this.$t("i18nView.payTypeList.tourGuidePays")},{id:4,name:this.$t("i18nView.payTypeList.pays")},{id:5,name:this.$t("i18nView.payTypeList.tourGuidePay")}]},returnTypeListData:function(){return[{id:0,name:this.$t("i18nView.returnTypeList.noReturn")},{id:1,name:this.$t("i18nView.returnTypeList.fixedReturn")},{id:2,name:this.$t("i18nView.returnTypeList.consumptionPercentage")},{id:3,name:this.$t("i18nView.returnTypeList.groupFinancialStaff")},{id:4,name:this.$t("i18nView.returnTypeList.adultsAndChildren")}]},valuationMethodListData:function(){return[{id:0,name:this.$t("i18nView.information.unitPrice")},{id:1,name:this.$t("i18nView.information.packagePrice")}]},infoTypeListData:function(){return[{id:0,name:this.$t("i18nView.information.team")},{id:1,name:this.$t("i18nView.information.fit")}]}}}},d1e0:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:e.$t("i18nView.information.keyword")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},on:{change:e.handleFilter},model:{value:e.listQuery.sort,callback:function(t){e.$set(e.listQuery,"sort",t)},expression:"listQuery.sort"}},e._l(e.sortOptions,(function(e){return a("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      "+e._s(e.$t("i18nView.information.search"))+"\n    ")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreateUpdate}},[e._v("\n      "+e._s(e.$t("i18nView.information.add"))+"\n    ")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("\n      "+e._s(e.$t("i18nView.information.export"))+"\n    ")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"",border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.id"),prop:"id",sortable:"custom",align:"center",width:"80","class-name":e.getSortClass("id")},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.name"),width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(e._f("parseTime")(i.timestamp,"{y}-{m}-{d} {h}:{i}")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.infoType"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.icon"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.pic"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.url"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.fullName"),"min-width":"250px"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",{staticClass:"link-type"},[e._v(e._s(i.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.code"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.touristDestination"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.telePhone"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.fax"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.contacts"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.city"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.address"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.email"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.creator"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.files"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.remarks"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.modifier"),width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.author))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("i18nView.information.actions"),fixed:"right",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row,n=t.$index;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleCreateUpdate(i)}}},[e._v("\n          "+e._s(e.$t("i18nView.information.edit"))+"\n        ")]),e._v(" "),"deleted"!=i.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(i,n)}}},[e._v("\n          "+e._s(e.$t("i18nView.information.delete"))+"\n        ")]):e._e()]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),a("partnerAddOrUpdate",{ref:"partnerAddOrUpdate"})],1)},n=[],o=(a("55dd"),a("2423")),r=a("6724"),l=a("ed08"),s=a("333d"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.visible,title:e.dataForm.id?e.$t("i18nView.information.edit"):e.$t("i18nView.information.add"),"close-on-click-modal":!1,"close-on-press-escape":!1,center:""},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"120px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmitHandle()}}},[a("el-form-item",{attrs:{prop:"selectData",label:e.$t("i18nView.information.infoType")}},[a("el-select",{attrs:{placeholder:"请选择"+e.$t("i18nView.information.infoType")},model:{value:e.dataForm.selectData,callback:function(t){e.$set(e.dataForm,"selectData",t)},expression:"dataForm.selectData"}},e._l(e.infoTypeList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"name",label:e.$t("i18nView.information.name")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.name")},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"icon",label:e.$t("i18nView.information.icon")}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"string","show-file-list":!1,"http-request":e.UploadImage,"before-upload":e.onBeforeUploadImage}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-upload2"}},[e._v("添加图标")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"pic",label:e.$t("i18nView.information.pic")}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"string","show-file-list":!1,"http-request":e.UploadImage,"before-upload":e.onBeforeUploadImage}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-upload2"}},[e._v("添加图片")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"url",label:e.$t("i18nView.information.url")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.url")},model:{value:e.dataForm.url,callback:function(t){e.$set(e.dataForm,"url",t)},expression:"dataForm.url"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"introduce",label:e.$t("i18nView.information.introduce")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.introduce"),type:"textarea",rows:2},model:{value:e.dataForm.introduce,callback:function(t){e.$set(e.dataForm,"introduce",t)},expression:"dataForm.introduce"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"fullName",label:e.$t("i18nView.information.fullName")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.fullName")},model:{value:e.dataForm.fullName,callback:function(t){e.$set(e.dataForm,"fullName",t)},expression:"dataForm.fullName"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"code",label:e.$t("i18nView.information.code")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.code")},model:{value:e.dataForm.code,callback:function(t){e.$set(e.dataForm,"code",t)},expression:"dataForm.code"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"address",label:e.$t("i18nView.information.address")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.address")},model:{value:e.dataForm.address,callback:function(t){e.$set(e.dataForm,"address",t)},expression:"dataForm.address"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"contacts",label:e.$t("i18nView.information.contacts")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.contacts")},model:{value:e.dataForm.contacts,callback:function(t){e.$set(e.dataForm,"contacts",t)},expression:"dataForm.contacts"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"telePhone",label:e.$t("i18nView.information.telePhone")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.telePhone")},model:{value:e.dataForm.telePhone,callback:function(t){e.$set(e.dataForm,"telePhone",t)},expression:"dataForm.telePhone"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"fax",label:e.$t("i18nView.information.fax")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.fax")},model:{value:e.dataForm.fax,callback:function(t){e.$set(e.dataForm,"fax",t)},expression:"dataForm.fax"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"touristDestination",label:e.$t("i18nView.information.touristDestination")}},[a("el-select",{attrs:{placeholder:"请选择"+e.$t("i18nView.information.touristDestination")},model:{value:e.dataForm.touristDestination,callback:function(t){e.$set(e.dataForm,"touristDestination",t)},expression:"dataForm.touristDestination"}},e._l(e.valuationMethodList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"creator",label:e.$t("i18nView.information.creator")}},[a("el-select",{attrs:{placeholder:"请选择"+e.$t("i18nView.information.creator")},model:{value:e.dataForm.creator,callback:function(t){e.$set(e.dataForm,"creator",t)},expression:"dataForm.creator"}},e._l(e.creatorList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"email",label:e.$t("i18nView.information.email")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.email")},model:{value:e.dataForm.email,callback:function(t){e.$set(e.dataForm,"email",t)},expression:"dataForm.email"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"files",label:e.$t("i18nView.information.files")}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"string","show-file-list":!1,"http-request":e.UploadImage,"before-upload":e.onBeforeUploadImage}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-upload2"}},[e._v("添加文件")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"remarks",label:e.$t("i18nView.information.remarks")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.remarks"),type:"textarea",rows:2},model:{value:e.dataForm.remarks,callback:function(t){e.$set(e.dataForm,"remarks",t)},expression:"dataForm.remarks"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"AccountBookRemark",label:e.$t("i18nView.information.AccountBookRemark")}},[a("el-input",{attrs:{placeholder:"请输入"+e.$t("i18nView.information.AccountBookRemark"),type:"textarea",rows:2},model:{value:e.dataForm.AccountBookRemark,callback:function(t){e.$set(e.dataForm,"AccountBookRemark",t)},expression:"dataForm.AccountBookRemark"}})],1)],1),e._v(" "),a("template",{slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v(e._s(e.$t("i18nView.information.cancel")))]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmitHandle()}}},[e._v(e._s(e.$t("i18nView.information.save")))])],1)],2)},c=[],d=(a("96cf"),a("3b8d")),m=a("d088"),p={mixins:[m["a"]],data:function(){var e=this;return{visible:!1,currentDate:"",daterange:"",innerVisible:!1,dataForm:{selectData:"",name:"",url:"",introduce:"",company:"",city:"",address:"",contacts:"",telePhone:"",fax:"",valuationMethod:"",email:"",payType:"",creator:"",files:"",remarks:"",detailIntroduce:"",AccountBookRemark:"",UKey:"",returnType:"",fixedValue:"",returnedCommissionPercentage:""},returnTypeFlag:0,dataRule:{},infoTypeList:[],cityList:[{id:0,name:this.$t("i18nView.areas.bangkok")},{id:1,name:this.$t("i18nView.areas.pattaya")},{id:3,name:this.$t("i18nView.areas.samed")},{id:4,name:this.$t("i18nView.areas.rayong")},{id:5,name:this.$t("i18nView.areas.ayutthaya")},{id:6,name:this.$t("i18nView.areas.huahin")},{id:7,name:this.$t("i18nView.areas.kanchanaburi")},{id:8,name:this.$t("i18nView.areas.samui")},{id:9,name:this.$t("i18nView.areas.surat")},{id:10,name:this.$t("i18nView.areas.kohchang")}],valuationMethodList:[],creatorList:[{id:0,name:this.$t("i18nView.creatorList.zhangshan")},{id:1,name:this.$t("i18nView.creatorList.liudehua")},{id:2,name:this.$t("i18nView.creatorList.zhangxueyou")},{id:3,name:this.$t("i18nView.creatorList.zhoujielun")}],returnTypeList:[],payTypeList:[],pickerOptions:{disabledDate:function(t){return new Date(new Date(e.currentDate).setHours(0)).getTime()>new Date(t).getTime()}}}},computed:{},created:function(){this.payTypeList=this.payTypeListData(),this.returnTypeList=this.returnTypeListData(),this.valuationMethodList=this.valuationMethodListData(),this.infoTypeList=this.infoTypeListData()},methods:{init:function(e){var t=this;this.visible=!0,this.$nextTick((function(){e&&(t.dataForm=e)}))},onBeforeUploadImage:function(e){if("image/jpg"!==e.type&&"image/jpeg"!==e.type&&"image/png"!==e.type&&"image/gif"!==e.type)return this.$message.error(this.$t("upload.tip",{format:"jpg、png、gif"})),!1},UploadImage:function(e){var t=this,a=new FormData;a.append("file",e.file),this.$http.post("/school/student/import",a).then((function(e){var a=e.data;0===a.code?(t.$message({message:"导入成功",type:"success"}),t.query()):t.$message.error(a.msg||"导入失败")})).catch((function(e){t.$message.error(e.msg||"导入失败")}))},returnTypeChange:function(e){this.returnTypeFlag=e},handleCaledar:function(e,t){this.currentDate=t,this.daterange=[e,e],this.innerVisible=!0},handleChangeDate:function(e){console.log(e)},dataFormSubmitHandle:function(){var e=this;this.$refs["dataForm"].validate(function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=10;break}return t.prev=1,t.next=4,e.$http[e.dataForm.id?"put":"post"]("/sys/mailtemplate",e.dataForm,{headers:{"content-type":"application/x-www-form-urlencoded"}});case 4:e.$message({message:e.$t("prompt.success"),type:"success",duration:500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),e.$message.error(t.t0.msg);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}())}}},f=p,h=a("2877"),y=Object(h["a"])(f,u,c,!1,null,null,null),w=y.exports,v={name:"HotelMange",components:{Pagination:s["a"],partnerAddOrUpdate:w},directives:{waves:r["a"]},filters:{},data:function(){return{tabMapOptions:[],activeName:"all",tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},importanceOptions:[1,2,3],sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},computed:{lang:{get:function(){return this.$store.state.app.language}}},watch:{activeName:function(e){this.$router.push("".concat(this.$route.path,"?tab=").concat(e))},lang:function(){this.setOptions()}},created:function(){var e=this.$route.query.tab;e&&(this.activeName=e),this.setOptions(),this.getList()},methods:{setOptions:function(){this.tabMapOptions=[{key:"all",label:this.$t("i18nView.areas.all")},{key:"bangkok",label:this.$t("i18nView.areas.bangkok")},{key:"pattaya",label:this.$t("i18nView.areas.pattaya")},{key:"samed",label:this.$t("i18nView.areas.samed")},{key:"rayong",label:this.$t("i18nView.areas.rayong")},{key:"ayutthaya",label:this.$t("i18nView.areas.ayutthaya")},{key:"huahin",label:this.$t("i18nView.areas.huahin")},{key:"kanchanaburi",label:this.$t("i18nView.areas.kanchanaburi")},{key:"samui",label:this.$t("i18nView.areas.samui")},{key:"surat",label:this.$t("i18nView.areas.surat")},{key:"kohchang",label:this.$t("i18nView.areas.kohchang")}]},getList:function(){var e=this;this.listLoading=!0,Object(o["a"])(this.listQuery).then((function(t){e.list=t.data.items,e.total=t.data.total,setTimeout((function(){e.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"操作成功",type:"success"}),e.status=t},sortChange:function(e){var t=e.prop,a=e.order;"id"===t&&this.sortByID(a)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},handleCreateUpdate:function(e){this.$refs.partnerAddOrUpdate.init(e?JSON.parse(JSON.stringify(e)):e)},handleDelete:function(e,t){var a=this;this.$confirm("确定要删除该数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.$message({type:"success",message:"删除成功!"}),a.list.splice(t,1)})).catch((function(){}))},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([a.e("chunk-5bdd67a2"),a.e("chunk-2d3eea4a"),a.e("chunk-581b2547")]).then(a.bind(null,"4bf8d")).then((function(t){var a=["timestamp","title","type","importance","status"],i=["timestamp","title","type","importance","status"],n=e.formatJson(i);t.export_json_to_excel({header:a,data:n,filename:"table-list"}),e.downloadLoading=!1}))},formatJson:function(e){return this.list.map((function(t){return e.map((function(e){return"timestamp"===e?Object(l["f"])(t[e]):t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}},b=v,g=Object(h["a"])(b,i,n,!1,null,null,null);t["default"]=g.exports}}]);