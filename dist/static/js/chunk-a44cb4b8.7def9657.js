(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a44cb4b8"],{"6bba":function(e,t,a){},de53:function(e,t,a){"use strict";var i=a("6bba"),s=a.n(i);s.a},ecac:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[e.user?a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-card",[a("account",{attrs:{user:e.data}})],1)],1)],1)],1):e._e()])},s=[],r=a("db72"),o=a("2f62"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",[a("el-form-item",{attrs:{label:e.$t("profile.field.username")}},[a("div",{on:{click:function(t){e.imagecropperShow=!0}}},[a("el-avatar",{attrs:{size:48,src:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"}})],1),e._v(" "),a("image-cropper",{directives:[{name:"show",rawName:"v-show",value:e.imagecropperShow,expression:"imagecropperShow"}],key:e.imagecropperKey,attrs:{width:300,height:300,url:"https://httpbin.org/post","lang-type":"en"},on:{close:e.close,"crop-upload-success":e.cropSuccess}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("profile.field.name")}},[a("el-input",{model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name","string"===typeof t?t.trim():t)},expression:"formData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("profile.field.nameEn")}},[a("el-input",{model:{value:e.formData.name_en,callback:function(t){e.$set(e.formData,"name_en","string"===typeof t?t.trim():t)},expression:"formData.name_en"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("profile.field.email")}},[a("el-input",{model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email","string"===typeof t?t.trim():t)},expression:"formData.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("profile.field.phone")}},[a("el-input",{attrs:{type:"number"},model:{value:e.formData.phone,callback:function(t){e.$set(e.formData,"phone","string"===typeof t?t.trim():t)},expression:"formData.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("profile.field.address")}},[a("el-input",{model:{value:e.formData.address,callback:function(t){e.$set(e.formData,"address","string"===typeof t?t.trim():t)},expression:"formData.address"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{loading:e.submitLoading,type:"primary"},on:{click:e.submit}},[e._v(e._s(e.$t("actions.update")))]),e._v(" "),a("el-button",{on:{click:function(t){return e.$closeTag()}}},[e._v(e._s(e.$t("actions.closePage")))])],1)],1)},l=[],c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"vue-image-crop-upload"},[a("div",{staticClass:"vicp-wrap"},[a("div",{staticClass:"vicp-close",on:{click:e.off}},[a("i",{staticClass:"vicp-icon4"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.step,expression:"step == 1"}],staticClass:"vicp-step1"},[a("div",{staticClass:"vicp-drop-area",on:{dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,click:e.handleClick,drop:e.handleChange}},[a("i",{directives:[{name:"show",rawName:"v-show",value:1!=e.loading,expression:"loading != 1"}],staticClass:"vicp-icon1"},[a("i",{staticClass:"vicp-icon1-arrow"}),e._v(" "),a("i",{staticClass:"vicp-icon1-body"}),e._v(" "),a("i",{staticClass:"vicp-icon1-bottom"})]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:1!==e.loading,expression:"loading !== 1"}],staticClass:"vicp-hint"},[e._v(e._s(e.lang.hint))]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.isSupported,expression:"!isSupported"}],staticClass:"vicp-no-supported-hint"},[e._v(e._s(e.lang.noSupported))]),e._v(" "),1==e.step?a("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileinput",attrs:{type:"file"},on:{change:e.handleChange}}):e._e()]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[a("i",{staticClass:"vicp-icon2"}),e._v("\n        "+e._s(e.errorMsg)+"\n      ")]),e._v(" "),a("div",{staticClass:"vicp-operate"},[a("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.off))])])]),e._v(" "),2==e.step?a("div",{staticClass:"vicp-step2"},[a("div",{staticClass:"vicp-crop"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-left"},[a("div",{staticClass:"vicp-img-container"},[a("img",{ref:"img",staticClass:"vicp-img",style:e.sourceImgStyle,attrs:{src:e.sourceImgUrl,draggable:"false"},on:{drag:e.preventDefault,dragstart:e.preventDefault,dragend:e.preventDefault,dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,drop:e.preventDefault,touchstart:e.imgStartMove,touchmove:e.imgMove,touchend:e.createImg,touchcancel:e.createImg,mousedown:e.imgStartMove,mousemove:e.imgMove,mouseup:e.createImg,mouseout:e.createImg}}),e._v(" "),a("div",{staticClass:"vicp-img-shade vicp-img-shade-1",style:e.sourceImgShadeStyle}),e._v(" "),a("div",{staticClass:"vicp-img-shade vicp-img-shade-2",style:e.sourceImgShadeStyle})]),e._v(" "),a("div",{staticClass:"vicp-range"},[a("input",{attrs:{type:"range",step:"1",min:"0",max:"100"},domProps:{value:e.scale.range},on:{input:e.zoomChange}}),e._v(" "),a("i",{staticClass:"vicp-icon5",on:{mousedown:e.startZoomSub,mouseout:e.endZoomSub,mouseup:e.endZoomSub}}),e._v(" "),a("i",{staticClass:"vicp-icon6",on:{mousedown:e.startZoomAdd,mouseout:e.endZoomAdd,mouseup:e.endZoomAdd}})]),e._v(" "),e.noRotate?e._e():a("div",{staticClass:"vicp-rotate"},[a("i",{on:{mousedown:e.startRotateLeft,mouseout:e.endRotate,mouseup:e.endRotate}},[e._v("↺")]),e._v(" "),a("i",{on:{mousedown:e.startRotateRight,mouseout:e.endRotate,mouseup:e.endRotate}},[e._v("↻")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-right"},[a("div",{staticClass:"vicp-preview"},[e.noSquare?e._e():a("div",{staticClass:"vicp-preview-item"},[a("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),e._v(" "),a("span",[e._v(e._s(e.lang.preview))])]),e._v(" "),e.noCircle?e._e():a("div",{staticClass:"vicp-preview-item vicp-preview-item-circle"},[a("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),e._v(" "),a("span",[e._v(e._s(e.lang.preview))])])])])]),e._v(" "),a("div",{staticClass:"vicp-operate"},[a("a",{on:{click:function(t){return e.setStep(1)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),e._v(" "),a("a",{staticClass:"vicp-operate-btn",on:{click:e.prepareUpload,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.save))])])]):e._e(),e._v(" "),3==e.step?a("div",{staticClass:"vicp-step3"},[a("div",{staticClass:"vicp-upload"},[a("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-loading"},[e._v(e._s(e.lang.loading))]),e._v(" "),a("div",{staticClass:"vicp-progress-wrap"},[a("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-progress",style:e.progressStyle})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[a("i",{staticClass:"vicp-icon2"}),e._v("\n          "+e._s(e.errorMsg)+"\n        ")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2===e.loading,expression:"loading === 2"}],staticClass:"vicp-success"},[a("i",{staticClass:"vicp-icon3"}),e._v("\n          "+e._s(e.lang.success)+"\n        ")])]),e._v(" "),a("div",{staticClass:"vicp-operate"},[a("a",{on:{click:function(t){return e.setStep(2)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),e._v(" "),a("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.close))])])]):e._e(),e._v(" "),a("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas",attrs:{width:e.width,height:e.height}})])])},u=[],h=(a("456d"),a("ac6a"),a("7618")),p=(a("c5f6"),a("b775")),d={zh:{hint:"点击，或拖动图片至此处",loading:"正在上传……",noSupported:"浏览器不支持该功能，请使用IE10以上或其他现在浏览器！",success:"上传成功",fail:"图片上传失败",preview:"头像预览",btn:{off:"取消",close:"关闭",back:"上一步",save:"保存"},error:{onlyImg:"仅限图片格式",outOfSize:"单文件大小不能超过 ",lowestPx:"图片最低像素为（宽*高）："}},"zh-tw":{hint:"點擊，或拖動圖片至此處",loading:"正在上傳……",noSupported:"瀏覽器不支持該功能，請使用IE10以上或其他現代瀏覽器！",success:"上傳成功",fail:"圖片上傳失敗",preview:"頭像預覽",btn:{off:"取消",close:"關閉",back:"上一步",save:"保存"},error:{onlyImg:"僅限圖片格式",outOfSize:"單文件大小不能超過 ",lowestPx:"圖片最低像素為（寬*高）："}},en:{hint:"Click or drag the file here to upload",loading:"Uploading…",noSupported:"Browser is not supported, please use IE10+ or other browsers",success:"Upload success",fail:"Upload failed",preview:"Preview",btn:{off:"Cancel",close:"Close",back:"Back",save:"Save"},error:{onlyImg:"Image only",outOfSize:"Image exceeds size limit: ",lowestPx:"Image's size is too low. Expected at least: "}},ro:{hint:"Atinge sau trage fișierul aici",loading:"Se încarcă",noSupported:"Browser-ul tău nu suportă acest feature. Te rugăm încearcă cu alt browser.",success:"S-a încărcat cu succes",fail:"A apărut o problemă la încărcare",preview:"Previzualizează",btn:{off:"Anulează",close:"Închide",back:"Înapoi",save:"Salvează"},error:{onlyImg:"Doar imagini",outOfSize:"Imaginea depășește limita de: ",loewstPx:"Imaginea este prea mică; Minim: "}},ru:{hint:"Нажмите, или перетащите файл в это окно",loading:"Загружаю……",noSupported:"Ваш браузер не поддерживается, пожалуйста, используйте IE10 + или другие браузеры",success:"Загрузка выполнена успешно",fail:"Ошибка загрузки",preview:"Предпросмотр",btn:{off:"Отменить",close:"Закрыть",back:"Назад",save:"Сохранить"},error:{onlyImg:"Только изображения",outOfSize:"Изображение превышает предельный размер: ",lowestPx:"Минимальный размер изображения: "}},"pt-br":{hint:"Clique ou arraste o arquivo aqui para carregar",loading:"Carregando…",noSupported:"Browser não suportado, use o IE10+ ou outro browser",success:"Sucesso ao carregar imagem",fail:"Falha ao carregar imagem",preview:"Pré-visualizar",btn:{off:"Cancelar",close:"Fechar",back:"Voltar",save:"Salvar"},error:{onlyImg:"Apenas imagens",outOfSize:"A imagem excede o limite de tamanho: ",lowestPx:"O tamanho da imagem é muito pequeno. Tamanho mínimo: "}},fr:{hint:"Cliquez ou glissez le fichier ici.",loading:"Téléchargement…",noSupported:"Votre navigateur n'est pas supporté. Utilisez IE10 + ou un autre navigateur s'il vous plaît.",success:"Téléchargement réussit",fail:"Téléchargement echoué",preview:"Aperçu",btn:{off:"Annuler",close:"Fermer",back:"Retour",save:"Enregistrer"},error:{onlyImg:"Image uniquement",outOfSize:"L'image sélectionnée dépasse la taille maximum: ",lowestPx:"L'image sélectionnée est trop petite. Dimensions attendues: "}},nl:{hint:"Klik hier of sleep een afbeelding in dit vlak",loading:"Uploaden…",noSupported:"Je browser wordt helaas niet ondersteund. Gebruik IE10+ of een andere browser.",success:"Upload succesvol",fail:"Upload mislukt",preview:"Voorbeeld",btn:{off:"Annuleren",close:"Sluiten",back:"Terug",save:"Opslaan"},error:{onlyImg:"Alleen afbeeldingen",outOfSize:"De afbeelding is groter dan: ",lowestPx:"De afbeelding is te klein! Minimale afmetingen: "}},tr:{hint:"Tıkla veya yüklemek istediğini buraya sürükle",loading:"Yükleniyor…",noSupported:"Tarayıcı desteklenmiyor, lütfen IE10+ veya farklı tarayıcı kullanın",success:"Yükleme başarılı",fail:"Yüklemede hata oluştu",preview:"Önizle",btn:{off:"İptal",close:"Kapat",back:"Geri",save:"Kaydet"},error:{onlyImg:"Sadece resim",outOfSize:"Resim yükleme limitini aşıyor: ",lowestPx:"Resmin boyutu çok küçük. En az olması gereken: "}},"es-MX":{hint:"Selecciona o arrastra una imagen",loading:"Subiendo...",noSupported:"Tu navegador no es soportado, porfavor usa IE10+ u otros navegadores mas recientes",success:"Subido exitosamente",fail:"Sucedió un error",preview:"Vista previa",btn:{off:"Cancelar",close:"Cerrar",back:"Atras",save:"Guardar"},error:{onlyImg:"Unicamente imagenes",outOfSize:"La imagen excede el tamaño maximo:",lowestPx:"La imagen es demasiado pequeño. Se espera por lo menos:"}},de:{hint:"Klick hier oder zieh eine Datei hier rein zum Hochladen",loading:"Hochladen…",noSupported:"Browser wird nicht unterstützt, bitte verwende IE10+ oder andere Browser",success:"Upload erfolgreich",fail:"Upload fehlgeschlagen",preview:"Vorschau",btn:{off:"Abbrechen",close:"Schließen",back:"Zurück",save:"Speichern"},error:{onlyImg:"Nur Bilder",outOfSize:"Das Bild ist zu groß: ",lowestPx:"Das Bild ist zu klein. Mindestens: "}},ja:{hint:"クリック・ドラッグしてファイルをアップロード",loading:"アップロード中...",noSupported:"このブラウザは対応されていません。IE10+かその他の主要ブラウザをお使いください。",success:"アップロード成功",fail:"アップロード失敗",preview:"プレビュー",btn:{off:"キャンセル",close:"閉じる",back:"戻る",save:"保存"},error:{onlyImg:"画像のみ",outOfSize:"画像サイズが上限を超えています。上限: ",lowestPx:"画像が小さすぎます。最小サイズ: "}}},m={jpg:"image/jpeg",png:"image/png",gif:"image/gif",svg:"image/svg+xml",psd:"image/photoshop"},g=(a("34ef"),a("28a5"),function(e,t){e=e.split(",")[1],e=window.atob(e);for(var a=new Uint8Array(e.length),i=0;i<e.length;i++)a[i]=e.charCodeAt(i);return new Blob([a],{type:t})}),f=function(e,t){var a=Object.assign({ele:e.target,type:"hit",bgc:"rgba(0, 0, 0, 0.15)"},t),i=a.ele;if(i){var s=i.getBoundingClientRect(),r=i.querySelector(".e-ripple");switch(r?r.className="e-ripple":(r=document.createElement("span"),r.className="e-ripple",r.style.height=r.style.width=Math.max(s.width,s.height)+"px",i.appendChild(r)),a.type){case"center":r.style.top=s.height/2-r.offsetHeight/2+"px",r.style.left=s.width/2-r.offsetWidth/2+"px";break;default:r.style.top=e.pageY-s.top-r.offsetHeight/2-document.body.scrollTop+"px",r.style.left=e.pageX-s.left-r.offsetWidth/2-document.body.scrollLeft+"px"}return r.style.backgroundColor=a.bgc,r.className="e-ripple z-active",!1}},v={props:{field:{type:String,default:"avatar"},ki:{type:Number,default:0},value:{type:Boolean,default:!0},url:{type:String,default:""},params:{type:Object,default:null},headers:{type:Object,default:null},width:{type:Number,default:200},height:{type:Number,default:200},noRotate:{type:Boolean,default:!0},noCircle:{type:Boolean,default:!1},noSquare:{type:Boolean,default:!1},maxSize:{type:Number,default:10240},langType:{type:String,default:"zh"},langExt:{type:Object,default:null},imgFormat:{type:String,default:"png"},withCredentials:{type:Boolean,default:!1}},data:function(){var e=this.imgFormat,t=this.langType,a=this.langExt,i=this.width,s=this.height,r=!0,o=["jpg","png"],n=-1===o.indexOf(e)?"jpg":e,l=d[t]?d[t]:d["en"],c=m[n];return this.imgFormat=n,a&&Object.assign(l,a),"function"!==typeof FormData&&(r=!1),{mime:c,lang:l,isSupported:r,isSupportTouch:document.hasOwnProperty("ontouchstart"),step:1,loading:0,progress:0,hasError:!1,errorMsg:"",ratio:i/s,sourceImg:null,sourceImgUrl:"",createImgUrl:"",sourceImgMouseDown:{on:!1,mX:0,mY:0,x:0,y:0},previewContainer:{width:100,height:100},sourceImgContainer:{width:240,height:184},scale:{zoomAddOn:!1,zoomSubOn:!1,range:1,rotateLeft:!1,rotateRight:!1,degree:0,x:0,y:0,width:0,height:0,maxWidth:0,maxHeight:0,minWidth:0,minHeight:0,naturalWidth:0,naturalHeight:0}}},computed:{progressStyle:function(){var e=this.progress;return{width:e+"%"}},sourceImgStyle:function(){var e=this.scale,t=this.sourceImgMasking,a=e.y+t.y+"px",i=e.x+t.x+"px";return{top:a,left:i,width:e.width+"px",height:e.height+"px",transform:"rotate("+e.degree+"deg)","-ms-transform":"rotate("+e.degree+"deg)","-moz-transform":"rotate("+e.degree+"deg)","-webkit-transform":"rotate("+e.degree+"deg)","-o-transform":"rotate("+e.degree+"deg)"}},sourceImgMasking:function(){var e=this.width,t=this.height,a=this.ratio,i=this.sourceImgContainer,s=i,r=s.width/s.height,o=0,n=0,l=s.width,c=s.height,u=1;return a<r&&(u=s.height/t,l=s.height*a,o=(s.width-l)/2),a>r&&(u=s.width/e,c=s.width/a,n=(s.height-c)/2),{scale:u,x:o,y:n,width:l,height:c}},sourceImgShadeStyle:function(){var e=this.sourceImgMasking,t=this.sourceImgContainer,a=t,i=e,s=i.width===a.width?i.width:(a.width-i.width)/2,r=i.height===a.height?i.height:(a.height-i.height)/2;return{width:s+"px",height:r+"px"}},previewStyle:function(){var e=this.ratio,t=this.previewContainer,a=t,i=a.width,s=a.height,r=i/s;return e<r&&(i=a.height*e),e>r&&(s=a.width/e),{width:i+"px",height:s+"px"}}},watch:{value:function(e){e&&1!==this.loading&&this.reset()}},created:function(){document.addEventListener("keyup",this.closeHandler)},destroyed:function(){document.removeEventListener("keyup",this.closeHandler)},methods:{ripple:function(e){f(e)},off:function(){var e=this;setTimeout((function(){e.$emit("input",!1),e.$emit("close"),3===e.step&&2===e.loading&&e.setStep(1)}),200)},setStep:function(e){var t=this;setTimeout((function(){t.step=e}),200)},preventDefault:function(e){return e.preventDefault(),!1},handleClick:function(e){1!==this.loading&&e.target!==this.$refs.fileinput&&(e.preventDefault(),document.activeElement!==this.$refs&&this.$refs.fileinput.click())},handleChange:function(e){if(e.preventDefault(),1!==this.loading){var t=e.target.files||e.dataTransfer.files;this.reset(),this.checkFile(t[0])&&this.setSourceImg(t[0])}},checkFile:function(e){var t=this.lang,a=this.maxSize;return-1===e.type.indexOf("image")?(this.hasError=!0,this.errorMsg=t.error.onlyImg,!1):!(e.size/1024>a)||(this.hasError=!0,this.errorMsg=t.error.outOfSize+a+"kb",!1)},reset:function(){this.loading=0,this.hasError=!1,this.errorMsg="",this.progress=0},setSourceImg:function(e){var t=this,a=new FileReader;a.onload=function(e){t.sourceImgUrl=a.result,t.startCrop()},a.readAsDataURL(e)},startCrop:function(){var e=this,t=this.width,a=this.height,i=this.ratio,s=this.scale,r=this.sourceImgUrl,o=this.sourceImgMasking,n=this.lang,l=o,c=new Image;c.src=r,c.onload=function(){var r=c.naturalWidth,o=c.naturalHeight,u=r/o,h=l.width,p=l.height,d=0,m=0;if(r<t||o<a)return e.hasError=!0,e.errorMsg=n.error.lowestPx+t+"*"+a,!1;i>u&&(p=h/u,m=(l.height-p)/2),i<u&&(h=p*u,d=(l.width-h)/2),s.range=0,s.x=d,s.y=m,s.width=h,s.height=p,s.degree=0,s.minWidth=h,s.minHeight=p,s.maxWidth=r*l.scale,s.maxHeight=o*l.scale,s.naturalWidth=r,s.naturalHeight=o,e.sourceImg=c,e.createImg(),e.setStep(2)}},imgStartMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var t=e.targetTouches?e.targetTouches[0]:e,a=this.sourceImgMouseDown,i=this.scale,s=a;s.mX=t.screenX,s.mY=t.screenY,s.x=i.x,s.y=i.y,s.on=!0},imgMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var t=e.targetTouches?e.targetTouches[0]:e,a=this.sourceImgMouseDown,i=a.on,s=a.mX,r=a.mY,o=a.x,n=a.y,l=this.scale,c=this.sourceImgMasking,u=c,h=t.screenX,p=t.screenY,d=h-s,m=p-r,g=o+d,f=n+m;i&&(g>0&&(g=0),f>0&&(f=0),g<u.width-l.width&&(g=u.width-l.width),f<u.height-l.height&&(f=u.height-l.height),l.x=g,l.y=f)},startRotateRight:function(e){var t=this,a=this.scale;a.rotateRight=!0;var i=function e(){if(a.rotateRight){var i=++a.degree;t.createImg(i),setTimeout((function(){e()}),60)}};i()},startRotateLeft:function(e){var t=this,a=this.scale;a.rotateLeft=!0;var i=function e(){if(a.rotateLeft){var i=--a.degree;t.createImg(i),setTimeout((function(){e()}),60)}};i()},endRotate:function(){var e=this.scale;e.rotateLeft=!1,e.rotateRight=!1},startZoomAdd:function(e){var t=this,a=this.scale;a.zoomAddOn=!0;var i=function e(){if(a.zoomAddOn){var i=a.range>=100?100:++a.range;t.zoomImg(i),setTimeout((function(){e()}),60)}};i()},endZoomAdd:function(e){this.scale.zoomAddOn=!1},startZoomSub:function(e){var t=this,a=this.scale;a.zoomSubOn=!0;var i=function e(){if(a.zoomSubOn){var i=a.range<=0?0:--a.range;t.zoomImg(i),setTimeout((function(){e()}),60)}};i()},endZoomSub:function(e){var t=this.scale;t.zoomSubOn=!1},zoomChange:function(e){this.zoomImg(e.target.value)},zoomImg:function(e){var t=this,a=this.sourceImgMasking,i=this.scale,s=i.maxWidth,r=i.maxHeight,o=i.minWidth,n=i.minHeight,l=i.width,c=i.height,u=i.x,h=i.y,p=a,d=p.width,m=p.height,g=o+(s-o)*e/100,f=n+(r-n)*e/100,v=d/2-g/l*(d/2-u),w=m/2-f/c*(m/2-h);v>0&&(v=0),w>0&&(w=0),v<d-g&&(v=d-g),w<m-f&&(w=m-f),i.x=v,i.y=w,i.width=g,i.height=f,i.range=e,setTimeout((function(){i.range===e&&t.createImg()}),300)},createImg:function(e){var t=this.mime,a=this.sourceImg,i=this.scale,s=i.x,r=i.y,o=i.width,n=i.height,l=i.degree,c=this.sourceImgMasking.scale,u=this.$refs.canvas,h=u.getContext("2d");e&&(this.sourceImgMouseDown.on=!1),u.width=this.width,u.height=this.height,h.clearRect(0,0,this.width,this.height),h.fillStyle="#fff",h.fillRect(0,0,this.width,this.height),h.translate(.5*this.width,.5*this.height),h.rotate(Math.PI*l/180),h.translate(.5*-this.width,.5*-this.height),h.drawImage(a,s/c,r/c,o/c,n/c),this.createImgUrl=u.toDataURL(t)},prepareUpload:function(){var e=this.url,t=this.createImgUrl,a=this.field,i=this.ki;this.$emit("crop-success",t,a,i),"string"===typeof e&&e?this.upload():this.off()},upload:function(){var e=this,t=this.lang,a=this.imgFormat,i=this.mime,s=this.url,r=this.params,o=this.field,n=this.ki,l=this.createImgUrl,c=new FormData;c.append(o,g(l,i),o+"."+a),"object"===Object(h["a"])(r)&&r&&Object.keys(r).forEach((function(e){c.append(e,r[e])})),this.reset(),this.loading=1,this.setStep(3),Object(p["a"])({url:s,method:"post",data:c}).then((function(t){e.loading=2,e.$emit("crop-upload-success",t.data)})).catch((function(a){e.value&&(e.loading=3,e.hasError=!0,e.errorMsg=t.fail,e.$emit("crop-upload-fail",a,o,n))}))},closeHandler:function(e){!this.value||"Escape"!==e.key&&27!==e.keyCode||this.off()}}},w=v,b=(a("de53"),a("2877")),y=Object(b["a"])(w,c,u,!1,null,null,null),S=y.exports,x={components:{ImageCropper:S},props:{user:Object},data:function(){return{imagecropperShow:!1,imagecropperKey:0,image:"https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",formData:{name:"",name_en:"",email:"",phone:"",address:""}}},created:function(){Object.assign(this.formData,this.user)},methods:{submit:function(){var e=this;this.submitLoading=!0,this.$store.dispatch("user/update",this.formData).then((function(){e.$message({message:"User information has been updated successfully",type:"success"})})).catch((function(t){e.$message({message:t,type:"error"})})).finally((function(){e.submitLoading=!1}))},cropSuccess:function(e){this.imagecropperShow=!1,this.imagecropperKey=this.imagecropperKey+1,this.image=e.files.avatar},close:function(){this.imagecropperShow=!1}}},_=x,k=Object(b["a"])(_,n,l,!1,null,null,null),I=k.exports,C=a("eded"),z={mixins:[C["a"]],name:"Profile",components:{Account:I},data:function(){return{data:{}}},computed:Object(r["a"])({},Object(o["b"])(["user","roles"])),created:function(){this.getUser()},methods:{getUser:function(){this.data=Object(r["a"])({},this.user,{role:this.roles.join(" | ")})}}},D=z,O=Object(b["a"])(D,i,s,!1,null,null,null);t["default"]=O.exports},eded:function(e,t,a){"use strict";var i={zh:{profile:{field:{username:"用户名",name:"姓名",nameEn:"英文名",email:"邮箱",phone:"联系电话",address:"地址",password:"新密码",confirm:"确认密码",reset:"重置"}}},en:{profile:{field:{}}}},s="profile";t["a"]={created:function(){this.$i18n.getLocaleMessage("zh")[s]||(this.$i18n.mergeLocaleMessage("en",i.en),this.$i18n.mergeLocaleMessage("zh",i.zh))},methods:{}}}}]);