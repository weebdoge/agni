webpackJsonp([1],{"7zck":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),a=n("Xxa5"),o=n.n(a),i=n("exGp"),s=n.n(i),l=n("mvHQ"),c=n.n(l),u=n("mtWM"),d=n.n(u),v={name:"Login",data:function(){return{dialog:!1,valid:!0,username:"",nameRules:[function(e){return!!e||"É necessário um username"}],password:"",passwordRules:[function(e){return!!e||"É necessária uma password"}],alert:!1,visibility:!1}},methods:{submit:function(){var e=this;return s()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$refs.form.validate()){t.next=16;break}return t.prev=1,t.next=4,d.a.post("/rest/login",{username:e.username,password:e.password});case 4:n=t.sent,console.log(n),localStorage.setItem("login_token",c()(n.data)),e.$emit("logged-in",n.data),e.dialog=!1,e.clear(),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(1),console.log(t.t0),e.alert=!0;case 16:case"end":return t.stop()}},t,e,[[1,12]])}))()},clear:function(){this.$refs.form.reset()}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("v-layout",{attrs:{row:"","justify-center":""}},[n("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-btn",{attrs:{slot:"activator",flat:"",color:"white"},slot:"activator"},[e._v("Login")]),e._v(" "),n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{dark:"",color:"primary"}},[n("v-toolbar-title",[e._v("Login")])],1),e._v(" "),n("v-card-text",[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-text-field",{attrs:{"prepend-icon":"person",label:"Username",rules:e.nameRules,required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"lock",label:"Password",rules:e.passwordRules,"append-icon":e.visibility?"visibility":"visibility_off","append-icon-cb":function(){return e.visibility=!e.visibility},type:e.visibility?"text":"password",required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:e.clear}},[e._v("Apagar")]),e._v(" "),n("v-btn",{attrs:{color:"primary",disabled:!e.valid},on:{click:e.submit}},[e._v("Login")])],1)],1),e._v(" "),n("v-snackbar",{attrs:{top:!0,"multi-line":!0,color:"error",timeout:2e3},model:{value:e.alert,callback:function(t){e.alert=t},expression:"alert"}},[e._v("\n        Username ou password errada\n        "),n("v-btn",{attrs:{flat:"",dark:""},on:{click:function(t){e.alert=!1}}},[e._v("Close")])],1)],1)],1)],1)},staticRenderFns:[]},m=n("VU/8")(v,p,!1,null,null,null).exports,_={name:"Login",data:function(){var e=this;return{dialog:!1,valid:!0,username:"",usernameRules:[function(e){return!!e||"É necessário um username"}],password:"",passwordRules:[function(e){return!!e||"É necessária uma password"}],confirmation:"",confirmationRules:[function(e){return!!e||"É necessário confirmar a password"},function(t){return t===e.password||"É necessário este campo ser igual à sua password"}],email:"",emailRules:[function(e){return!!e||"É necessário um email"},function(e){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"O email tem de ser válido"}],name:"",nameRules:[function(e){return!!e||"É necessário o seu nome completo"}],address:"",addressRules:[function(e){return!!e||"É necessário o seu endereço"}],address2:"",city:"",cityRules:[function(e){return!!e||"É necessário a sua localidade"}],postalCode:"",postalCodeMask:"####-###",role:"USER",roles:["USER","GBO","GS","OBE"],cellphone:null,cellphoneMask:"##-###-##-##",telephone:null,telephoneMask:"###-###-###",cc:null,ccMask:"########-N-NNN",nif:null,nifMask:"###-###-###",alert:!1,passwordVisibility:!1,confirmationVisibility:!1}},props:{source:String,isLogged:Boolean},methods:{submit:function(){var e=this;return s()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$refs.form.validate()){t.next=14;break}return t.prev=1,t.next=4,d.a.post("/rest/register",{username:e.username,password:e.password,confirmation:e.confirmation,name:e.name,email:e.email,role:e.role,cellphone:e.cellphone,telephone:e.telephone,address:e.address,addressExtra:e.address2,addressCity:e.city,addressPostalCode:e.postalCode,nif:e.nif,cc:e.cc});case 4:n=t.sent,console.log(n),e.dialog=!1,e.clear(),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(1),console.log(t.t0),e.alert=!0;case 14:case"end":return t.stop()}},t,e,[[1,10]])}))()},clear:function(){this.$refs.form.reset()}}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"register"},[n("v-layout",{attrs:{row:"","justify-center":""}},[n("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-btn",{attrs:{slot:"activator",flat:"",color:"white"},slot:"activator"},[e._v("Registar")]),e._v(" "),n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{dark:"",color:"primary"}},[n("v-toolbar-title",[e._v("Registar")])],1),e._v(" "),n("v-card-text",[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-text-field",{attrs:{"prepend-icon":"person",label:"Username",rules:e.usernameRules,required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"lock",label:"Password",rules:e.passwordRules,"append-icon":e.passwordVisibility?"visibility":"visibility_off","append-icon-cb":function(){return e.passwordVisibility=!e.passwordVisibility},type:e.passwordVisibility?"text":"password",required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"lock_outline",label:"Confirmação",rules:e.confirmationRules,"append-icon":e.confirmationVisibility?"visibility":"visibility_off","append-icon-cb":function(){return e.confirmationVisibility=!e.confirmationVisibility},type:e.confirmationVisibility?"text":"password",required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.confirmation,callback:function(t){e.confirmation=t},expression:"confirmation"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"email",label:"E-mail",rules:e.emailRules,required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"account_box",label:"Nome completo",rules:e.nameRules,required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"home",label:"Endereço do utilizador",rules:e.addressRules,required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}}),e._v(" "),n("v-text-field",{attrs:{label:"Endereço do utilizador (2ª linha)"},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.address2,callback:function(t){e.address2=t},expression:"address2"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"location_city",label:"Localidade do utilizador",rules:e.cityRules,required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.city,callback:function(t){e.city=t},expression:"city"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"location_on",label:"Código Postal do utilizador",mask:e.postalCodeMask,rules:[function(e){return!!e||"É necessário o código postal do utilizador"},function(e){return 7===e.length||"O código postal tem 7 digitos"}],required:""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.postalCode,callback:function(t){e.postalCode=t},expression:"postalCode"}}),e._v(" "),n("v-select",{attrs:{"prepend-icon":"face",label:"Tipo de utilizador",items:e.roles,rules:[function(e){return!!e||"É necessário escolher um tipo de utilizador"}],required:""},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"smartphone",label:"Telemóvel do utilizador",mask:e.cellphoneMask},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.cellphone,callback:function(t){e.cellphone=e._n(t)},expression:"cellphone"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"phone",label:"Telefone do utilizador",mask:e.telephoneMask},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.telephone,callback:function(t){e.telephone=e._n(t)},expression:"telephone"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"credit_card",label:"Cartão de Cidadão do utilizador",mask:e.ccMask},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.cc,callback:function(t){e.cc=t},expression:"cc"}}),e._v(" "),n("v-text-field",{attrs:{"prepend-icon":"credit_card",label:"NIF do utilizador",mask:e.nifMask},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.nif,callback:function(t){e.nif=e._n(t)},expression:"nif"}})],1)],1),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:e.clear}},[e._v("Clear")]),e._v(" "),n("v-btn",{attrs:{color:"primary",disabled:!e.valid},on:{click:e.submit}},[e._v("Registar")])],1)],1),e._v(" "),n("v-snackbar",{attrs:{top:!0,"multi-line":!0,color:"error",timeout:2e3},model:{value:e.alert,callback:function(t){e.alert=t},expression:"alert"}},[e._v("\n        Algo correu mal ao registar\n        "),n("v-btn",{attrs:{flat:"",dark:""},on:{click:function(t){e.alert=!1}}},[e._v("Close")])],1)],1)],1)],1)},staticRenderFns:[]},k={name:"App",data:function(){return{drawer:!1,isLogged:!1,loginToken:null}},components:{Login:m,Register:n("VU/8")(_,f,!1,null,null,null).exports},mounted:function(){this.loginToken=JSON.parse(localStorage.getItem("login_token")),this.loginToken&&(this.isLogged=!0)},methods:{login:function(e){this.loginToken=e,this.isLogged=!0},logout:function(){var e=this;return s()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.post("/rest/logout",{username:e.loginToken.username,tokenID:e.loginToken.tokenID,creationData:e.loginToken.creationData,expirationData:e.loginToken.expirationData});case 3:n=t.sent,console.log(n),e.loginToken=null,e.isLogged=!1,localStorage.removeItem("login_token"),e.$router.push("/"),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}},t,e,[[0,11]])}))()}}},b={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",[n("v-navigation-drawer",{attrs:{fixed:"",app:"",clipped:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",[n("v-subheader",[e._v("\n          Geral\n        ")]),e._v(" "),n("v-list-tile",{attrs:{to:"/"}},[n("v-list-tile-action",[n("v-icon",[e._v("home")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v("Página incial")])],1)],1),e._v(" "),e.isLogged?n("v-list-tile",{attrs:{to:"profile"}},[n("v-list-tile-action",[n("v-icon",[e._v("account_circle")])],1),e._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[e._v("Perfil de utilizador")])],1)],1):e._e(),e._v(" "),n("v-divider")],1)],1),e._v(" "),n("v-toolbar",{attrs:{color:"indigo",dark:"",fixed:"",app:"","clipped-left":""}},[n("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),e._v(" "),n("v-toolbar-title",[e._v("Agni")]),e._v(" "),n("v-spacer"),e._v(" "),e.isLogged?e._e():n("register"),e._v(" "),e.isLogged?e._e():n("login",{on:{"logged-in":function(t){e.login(t)}}}),e._v(" "),e.isLogged?n("v-btn",{attrs:{flat:"",color:"white"},on:{click:e.logout}},[e._v("Logout")]):e._e()],1),e._v(" "),n("v-content",[n("router-view")],1),e._v(" "),n("v-footer",{attrs:{color:"indigo",app:"",inset:"",height:"auto"}},[n("v-layout",{attrs:{"justify-center":""}},[n("v-card",{staticClass:"indigo white--text text-xs-center",attrs:{flat:"",tile:""}},[n("v-card-text",{staticClass:"white--text"},[e._v("\n            © "+e._s((new Date).getFullYear())+" — "),n("strong",[e._v("Software Elementalists")])])],1)],1)],1)],1)],1)},staticRenderFns:[]},g=n("VU/8")(k,b,!1,null,null,null).exports,h=n("/ocq"),y={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"home"},[t("v-container",[t("img",{attrs:{src:"https://scontent.flis3-1.fna.fbcdn.net/v/t34.0-12/29020058_1750972128296648_1404646256_n.png?_nc_cat=0&oh=3454802569b77483d7542a10f57461e4&oe=5AC6696D"}}),this._v(" "),t("v-jumbotron",{attrs:{src:"https://i.pinimg.com/originals/78/fd/36/78fd36fe252042ca41392971e599eebe.jpg",gradient:this.gradient,dark:""}},[t("v-container",{attrs:{"fill-height":""}},[t("v-layout",{attrs:{"align-center":""}},[t("v-flex",{attrs:{"text-xs-center":""}},[t("h3",{staticClass:"display-3",attrs:{align:"center"}},[this._v("Bem vindo a Agni")])])],1)],1)],1)],1)],1)},staticRenderFns:[]},x=n("VU/8")({name:"HelloWorld",data:function(){return{gradient:"to top right, rgba(63,81,181, .3), rgba(25,32,72, .3)"}}},y,!1,null,null,null).exports,w={name:"ProfileInformation",data:function(){return{username:null,name:null,email:null,address:null,city:null,postalCode:null,cellphone:null,telephone:null,address2:null,role:null,nif:null,cc:null,userCreationTime:null}},mounted:function(){var e=this;return s()(o.a.mark(function t(){var n,r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=JSON.parse(localStorage.getItem("login_token")),t.next=4,d.a.post("/rest/profile",{username:n.username,token:n});case 4:r=t.sent,console.log(r),a=r.data,e.username=n.username,e.nif=a.user_nif,e.address2=a.user_address_extra,e.address=a.user_address,e.telephone=a.user_telephone,e.city=a.user_address_city,e.email=a.user_email,e.postalCode=a.user_address_postal_code,e.cellphone=a.user_cellphone,e.name=a.user_name,e.cc=a.user_cc,e.role=a.user_role,e.userCreationTime=a.user_creation_time,t.next=25;break;case 22:t.prev=22,t.t0=t.catch(0),console.log(t.t0);case 25:case"end":return t.stop()}},t,e,[[0,22]])}))()},props:{source:String,isLogged:Boolean}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"profile"},[e.username?n("v-container",[n("h1",{staticClass:"ma-1"},[e._v("Perfil de utilizador de "+e._s(e.username))]),e._v(" "),n("v-subheader",[e._v("Nome")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.name))]),e._v(" "),n("v-subheader",[e._v("Email")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.email))]),e._v(" "),n("v-subheader",[e._v("Endereço")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.address))]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.address2))]),e._v(" "),n("v-subheader",[e._v("Localidade")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.city))]),e._v(" "),n("v-subheader",[e._v("Código-postal")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.postalCode))]),e._v(" "),e.cellphone?n("v-subheader",[e._v("Telemóvel")]):e._e(),e._v(" "),e.cellphone?n("p",{staticClass:"mx-5"},[e._v(e._s(e.cellphone))]):e._e(),e._v(" "),e.telephone?n("v-subheader",[e._v("Telefone")]):e._e(),e._v(" "),e.telephone?n("p",{staticClass:"mx-5"},[e._v(e._s(e.telephone))]):e._e(),e._v(" "),n("v-subheader",[e._v("Tipo de utilizador")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.role))]),e._v(" "),e.cc?n("v-subheader",[e._v("CC")]):e._e(),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.cc))]),e._v(" "),e.nif?n("v-subheader",[e._v("NIF")]):e._e(),e._v(" "),e.nif?n("p",{staticClass:"mx-5"},[e._v(e._s(e.nif))]):e._e(),e._v(" "),n("v-subheader",[e._v("Data da criação da conta de utilizador")]),e._v(" "),n("p",{staticClass:"mx-5"},[e._v(e._s(e.userCreationTime))])],1):e._e()],1)},staticRenderFns:[]},E=n("VU/8")(w,C,!1,null,null,null).exports;r.a.use(h.a);var R=new h.a({routes:[{path:"/",name:"home",component:x},{path:"/profile",name:"profile",component:E}]}),z=n("3EgV"),L=n.n(z);n("7zck");r.a.use(L.a),r.a.config.productionTip=!1,new r.a({el:"#app",router:R,components:{App:g},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.672593da0c61a1a61672.js.map