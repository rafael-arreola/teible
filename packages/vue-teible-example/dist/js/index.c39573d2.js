!function(e){function t(t){for(var s,i,o=t[0],c=t[1],l=t[2],u=0,m=[];u<o.length;u++)i=o[u],r[i]&&m.push(r[i][0]),r[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);for(d&&d(t);m.length;)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(s=!1)}s&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={index:0},n=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/teible/";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var d=c;n.push([0,"chunk-vendors"]),a()}({0:function(e,t,a){e.exports=a("56d7")},"0cb2":function(e,t,a){"use strict";var s=a("acb7");a.n(s).a},"56d7":function(e,t,a){"use strict";a.r(t);var s=a("9869"),r=a("0ab6"),n={name:"Demo",components:{DataTable:r.b,DataColumn:r.a},props:{items:{type:[Array,Function],required:!0}},data:()=>({sortBy:"",sortDesc:!1,perPage:4,filter:"",checked:[],loadedItems:[]}),computed:{loadedNames(){return this.loadedItems.map(e=>e.name)},perPageNumber(){return parseInt(this.perPage)},checkedAll:{get(){return this.contains(this.checked,this.loadedNames)},set(e){this.checked=e?[...new Set(this.checked.concat(this.loadedNames))]:this.exclude(this.checked,this.loadedNames)}}},methods:{formatName:e=>`Yo ${e}`,exclude:(e,t)=>e.filter(e=>-1===t.indexOf(e)),contains(e,t){if(!e.length)return!1;for(let a of t)if(-1===e.indexOf(a))return!1;return!0},action(e,t){for(let a=0;a<t;a++)e.item.name+=" Yo"},destroy(e){this.items instanceof Array&&(this.items=this.items.filter(t=>t.id!==e.id))},loaded(e){this.loadedItems=e.items}}},i=(a("0cb2"),a("2be6")),o={components:{Demo:Object(i.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._t("default"),a("div",{staticClass:"demo__info"},[a("p",{staticClass:"demo__line"},[e._v("Items per page: "),a("span",{staticClass:"demo__value"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.perPage,expression:"perPage"}],staticClass:"demo__control",attrs:{type:"range",min:"1",max:"10",step:"1"},domProps:{value:e.perPage},on:{__r:function(t){e.perPage=t.target.value}}}),e._v(" "+e._s(e.perPage))])]),a("p",{staticClass:"demo__line"},[e._v("Filter: "),a("span",{staticClass:"demo__value"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filter,expression:"filter"}],staticClass:"demo__control",attrs:{type:"text"},domProps:{value:e.filter},on:{input:function(t){t.target.composing||(e.filter=t.target.value)}}})])]),a("p",{staticClass:"demo__line"},[e._v("Sort By: "),a("span",{staticClass:"demo__value"},[e._v(e._s(e.sortBy))])]),a("p",{staticClass:"demo__line"},[e._v("Descending: "),a("span",{staticClass:"demo__value"},[e._v(e._s(e.sortDesc))])]),a("p",{staticClass:"demo__line"},[e._v("Selected: "),a("span",{staticClass:"demo__value"},[e._v(e._s(e.checked))])])]),a("hr"),a("data-table",{attrs:{items:e.items,"per-page":e.perPageNumber,"sort-desc":e.sortDesc,"sort-by":e.sortBy,filter:e.filter},on:{"update:sortDesc":function(t){e.sortDesc=t},"update:sortBy":function(t){e.sortBy=t},"update:filter":function(t){e.filter=t},loaded:e.loaded}},[a("data-column",{attrs:{field:"id",label:"ID",width:"15%"}}),a("data-column",{attrs:{render:e.formatName,field:"name",label:"Name",width:"40%"}}),a("data-column",{attrs:{sortable:!1,label:"Action"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("button",{on:{click:function(a){a.preventDefault(),e.action(t,1)}}},[e._v("Yo")]),a("button",{on:{click:function(a){a.preventDefault(),e.destroy(t.item)}}},[e._v("Delete")])]}}])}),a("data-column",{attrs:{sortable:!1,label:"Text"}},[e._v("Hello")]),a("data-column",{attrs:{sortable:!1,label:"Select"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedAll,expression:"checkedAll"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.checkedAll)?e._i(e.checkedAll,null)>-1:e.checkedAll},on:{change:function(t){var a=e.checkedAll,s=t.target,r=!!s.checked;if(Array.isArray(a)){var n=e._i(a,null);s.checked?n<0&&(e.checkedAll=a.concat([null])):n>-1&&(e.checkedAll=a.slice(0,n).concat(a.slice(n+1)))}else e.checkedAll=r}}})]}},{key:"default",fn:function(t){return[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox"},domProps:{value:t.item.name,checked:Array.isArray(e.checked)?e._i(e.checked,t.item.name)>-1:e.checked},on:{change:function(a){var s=e.checked,r=a.target,n=!!r.checked;if(Array.isArray(s)){var i=t.item.name,o=e._i(s,i);r.checked?o<0&&(e.checked=s.concat([i])):o>-1&&(e.checked=s.slice(0,o).concat(s.slice(o+1)))}else e.checked=n}}})]}}])})],1)],2)},[],!1,null,null,null).exports},data:()=>({itemsArr:JSON.parse('[ { "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" } }, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" } }, { "id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "address": { "street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771", "geo": { "lat": "-43.9509", "lng": "-34.4618" } }, "phone": "010-692-6593 x09125", "website": "anastasia.net", "company": { "name": "Deckow-Crist", "catchPhrase": "Proactive didactic contingency", "bs": "synergize scalable supply-chains" } }, { "id": 3, "name": "Clementine Bauch", "username": "Samantha", "email": "Nathan@yesenia.net", "address": { "street": "Douglas Extension", "suite": "Suite 847", "city": "McKenziehaven", "zipcode": "59590-4157", "geo": { "lat": "-68.6102", "lng": "-47.0653" } }, "phone": "1-463-123-4447", "website": "ramiro.info", "company": { "name": "Romaguera-Jacobson", "catchPhrase": "Face to face bifurcated interface", "bs": "e-enable strategic applications" } }, { "id": 4, "name": "Patricia Lebsack", "username": "Karianne", "email": "Julianne.OConner@kory.org", "address": { "street": "Hoeger Mall", "suite": "Apt. 692", "city": "South Elvis", "zipcode": "53919-4257", "geo": { "lat": "29.4572", "lng": "-164.2990" } }, "phone": "493-170-9623 x156", "website": "kale.biz", "company": { "name": "Robel-Corkery", "catchPhrase": "Multi-tiered zero tolerance productivity", "bs": "transition cutting-edge web services" } }, { "id": 5, "name": "Chelsey Dietrich", "username": "Kamren", "email": "Lucio_Hettinger@annie.ca", "address": { "street": "Skiles Walks", "suite": "Suite 351", "city": "Roscoeview", "zipcode": "33263", "geo": { "lat": "-31.8129", "lng": "62.5342" } }, "phone": "(254)954-1289", "website": "demarco.info", "company": { "name": "Keebler LLC", "catchPhrase": "User-centric fault-tolerant solution", "bs": "revolutionize end-to-end systems" } }, { "id": 6, "name": "Mrs. Dennis Schulist", "username": "Leopoldo_Corkery", "email": "Karley_Dach@jasper.info", "address": { "street": "Norberto Crossing", "suite": "Apt. 950", "city": "South Christy", "zipcode": "23505-1337", "geo": { "lat": "-71.4197", "lng": "71.7478" } }, "phone": "1-477-935-8478 x6430", "website": "ola.org", "company": { "name": "Considine-Lockman", "catchPhrase": "Synchronised bottom-line interface", "bs": "e-enable innovative applications" } }, { "id": 7, "name": "Kurtis Weissnat", "username": "Elwyn.Skiles", "email": "Telly.Hoeger@billy.biz", "address": { "street": "Rex Trail", "suite": "Suite 280", "city": "Howemouth", "zipcode": "58804-1099", "geo": { "lat": "24.8918", "lng": "21.8984" } }, "phone": "210.067.6132", "website": "elvis.io", "company": { "name": "Johns Group", "catchPhrase": "Configurable multimedia task-force", "bs": "generate enterprise e-tailers" } }, { "id": 8, "name": "Nicholas Runolfsdottir V", "username": "Maxime_Nienow", "email": "Sherwood@rosamond.me", "address": { "street": "Ellsworth Summit", "suite": "Suite 729", "city": "Aliyaview", "zipcode": "45169", "geo": { "lat": "-14.3990", "lng": "-120.7677" } }, "phone": "586.493.6943 x140", "website": "jacynthe.com", "company": { "name": "Abernathy Group", "catchPhrase": "Implemented secondary concept", "bs": "e-enable extensible e-tailers" } }, { "id": 9, "name": "Glenna Reichert", "username": "Delphine", "email": "Chaim_McDermott@dana.io", "address": { "street": "Dayna Park", "suite": "Suite 449", "city": "Bartholomebury", "zipcode": "76495-3109", "geo": { "lat": "24.6463", "lng": "-168.8889" } }, "phone": "(775)976-6794 x41206", "website": "conrad.com", "company": { "name": "Yost and Sons", "catchPhrase": "Switchable contextually-based project", "bs": "aggregate real-time technologies" } }, { "id": 10, "name": "Clementina DuBuque", "username": "Moriah.Stanton", "email": "Rey.Padberg@karina.biz", "address": { "street": "Kattie Turnpike", "suite": "Suite 198", "city": "Lebsackbury", "zipcode": "31428-2261", "geo": { "lat": "-38.2386", "lng": "57.2232" } }, "phone": "024-648-3804", "website": "ambrose.net", "company": { "name": "Hoeger LLC", "catchPhrase": "Centralized empowering task-force", "bs": "target end-to-end models" } } ]')}),methods:{async itemsFunc(e,t,a){let s=0,r=new URL("https://jsonplaceholder.typicode.com/users");r.searchParams.append("q",e.query),r.searchParams.append("_sort",t.by),r.searchParams.append("_order",t.order),r.searchParams.append("_page",a.page),r.searchParams.append("_limit",a.perPage);const n=await fetch(r).then(e=>(s=parseInt(e.headers.get("x-total-count")),e.json()));return{total:s,items:n}}}},c=(a("5c0b"),Object(i.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e._m(0),a("main",[a("div",{staticClass:"demos"},[a("demo",{staticClass:"demo",attrs:{items:e.itemsFunc}},[a("h2",{staticClass:"demo__title"},[e._v("Function as items")]),a("p",{staticClass:"demo__subtitle"},[e._v("Searching fields will be ignored because "),a("a",{attrs:{href:"https://jsonplaceholder.typicode.com/",title:"typicode"}},[e._v("typicode")]),e._v(" does not support them.")])]),a("div",{staticClass:"demo demo__gut"}),a("demo",{staticClass:"demo",attrs:{items:e.itemsArr}},[a("h2",{staticClass:"demo__title"},[e._v("Array as items")]),a("p",{staticClass:"demo__subtitle"},[e._v("Searching using `indexOf` with queries in lowercase.")])])],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"hero"},[t("h1",{staticClass:"hero__title"},[this._v("Vue Teible Example")]),t("h3",{staticClass:"hero__subtitle"},[this._v("Example for "),t("a",{staticClass:"hero__link",attrs:{href:"https://github.com/hiendv/teible/tree/master/packages/vue-teible",title:"vue-teible"}},[this._v("vue-teible")])]),t("p",{staticStyle:{"text-align":"center"}},[t("iframe",{attrs:{src:"https://ghbtns.com/github-btn.html?user=hiendv&repo=teible&type=star&count=true&size=large&v=2",frameborder:"0",scrolling:"0",width:"115px",height:"30px"}})])])}],!1,null,null,null).exports);s.a.config.productionTip=!1,new s.a({render:e=>e(c)}).$mount("#app")},"5c0b":function(e,t,a){"use strict";var s=a("bac5");a.n(s).a},acb7:function(e,t,a){},bac5:function(e,t,a){}});