'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Octicon = _interopDefault(require('octicons-vue/lib/Octicon'));

const chunk = (arr, size) => {
  if (!size) {
    size = arr.length;
  }

  let result = [];
  for (let i = 0, len = arr.length; i < len; i += size) { result.push(arr.slice(i, i + size)); }
  return result
};

const orderBy = (arr, field, order) => {
  let copy = [...arr];
  /*copy.sort((a, b) => {
    if (order === 'desc') {
      return dotGet(a, field) < dotGet(b, field)
    }

    return dotGet(a, field) > dotGet(b, field)
  });
*/
  return _.sortBy(copy, field, order)
};

const filter = (items, filtering) => {
  return items.filter(item => {
    for (let i = 0; i < filtering.fields.length; i++) {
      let field = filtering.fields[i];
      let value = dotGet(item, field);

      if (!value) {
        continue
      }

      if (`${value}`.toLowerCase().indexOf(filtering.query) === -1) {
        continue
      }

      return true
    }

    return false
  })
};

const load = (data, filtering, sorting, paging) => {
  let filtered = (!filtering || !filtering.query) ? data : filter(data, filtering);
  if (!filtered || !filtered.length) {
    return {
      items: [],
      total: 0
    }
  }

  let ordered = orderBy(filtered, sorting.by, sorting.order);
  let chunked = chunk(ordered, paging.perPage);
  let items = chunked[paging.page - 1];
  if (!items) {
    return {
      items: [],
      total: filtered.length
    }
  }

  return {
    items,
    total: filtered.length
  }
};

const defaultProps = (options, data) => {
  let props = {};
  for (let key in options) {
    if (data[key] !== undefined) {
      props[key] = data[key];
      continue
    }

    if (typeof options[key].default === 'function') {
      props[key] = options[key].default();
      continue
    }

    props[key] = options[key].default;
  }

  return props
};

const dotGet = (obj, path) => {
  return path.split('.').reduce((o, i) => o[i], obj)
};

const dotSet = (obj, path, val) => {
  let parts = path.split('.');
  return parts.reduce((o, i, idx) => {
    if (idx === parts.length - 1) {
      o[i] = val;
      return o[i]
    }

    if (!o.hasOwnProperty(i)) {
      o[i] = {};
    }

    return o[i]
  }, obj)
};

const paginate = (currentPage, total) => {
  let showing = 3;
  let eachSide = 2;
  if (total <= showing + eachSide) {
    return paginationValueOrThreeDots(Array.from({ length: total }, (e, i) => i + 1))
  }

  let pages = [];

  for (let i = 0; i < eachSide; i++) {
    pages.push(i + 1);
    pages.push(total - i);
  }

  for (let i = 0; i < Math.ceil(showing / 2); i++) {
    if (currentPage - i > 1) {
      pages.push(currentPage - i);
    }

    if (currentPage + i < total) {
      pages.push(currentPage + i);
    }
  }

  return paginationValueOrThreeDots([...new Set(pages)].sort((a, b) => a - b))
};

const paginationValueOrThreeDots = pages => {
  const dots = '...';
  for (let i = 0; i < pages.length - 1; i++) {
    if (pages[i + 1] - pages[i] > 1) {
      pages.splice(i + 1, 0, dots);
    }
  }

  pages = pages.map(page => {
    return {
      value: page,
      disabled: page === dots
    }
  });

  return pages
};

var DataTableCell = {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.field) {
      let value = dotGet(props.item, props.column.field);
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }

      if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
        return h('td', data, props.column.scopedSlots.default({ value, item: props.item, column: props.column }))
      }

      return h('td', data, value)
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props))
    }

    return h('td', data, props.column.children)
  }
};

//
var script = {
	name: 'DataTableBody',
	components: {
		DataTableCell
	},
	props: {
		items: {
			type: Array,
			required: true
		},
		columns: {
			type: Array,
			required: true
		}
	}
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "tbody",
    _vm._l(_vm.items, function(d, index) {
      return _c(
        "tr",
        {
          key: index,
          class: [
            "datatable__row",
            {
              "datatable__row--odd": index % 2 === 1,
              "datatable__row--last": index === _vm.items.length - 1
            }
          ]
        },
        _vm._l(_vm.columns, function(column, columnIndex) {
          return _c("data-table-cell", {
            key: columnIndex,
            class: [
              "datatable__cell",
              {
                "datatable__cell--last-column":
                  columnIndex === _vm.columns.length - 1,
                "datatable__cell--last-row": index === _vm.items.length - 1
              }
            ],
            attrs: { item: d, column: column }
          })
        })
      )
    })
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-80e54054_0", { source: ".datatable__row {\n  background-color: #fff; }\n  .datatable__row--odd {\n    background-color: #e9ecef; }\n\n.datatable__cell {\n  position: relative;\n  padding: .3em .5em;\n  border-right: 1px solid #dee2e6;\n  border-bottom: 1px solid #dee2e6;\n  vertical-align: middle;\n  text-align: left; }\n  .datatable__cell--last-column {\n    border-right: 0; }\n  .datatable__cell--last-row {\n    border-bottom: 0; }\n\n/*# sourceMappingURL=DataTableBody.vue.map */", map: {"version":3,"sources":["DataTableBody.vue","/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableBody.vue"],"names":[],"mappings":"AAAA;EACE,uBAAuB,EAAE;EACzB;IC8CF,0BAAA,EAAA;;AD3CA;ECgDA,mBAAA;EACA,mBAAA;EACA,gCAAA;EACA,iCAAA;EACA,uBAAA;ED9CE,iBAAiB,EAAE;EACnB;ICiDF,gBAAA,EAAA;ED/CE;ICmDF,iBAAA,EAAA;;ADhDA,6CAA6C","file":"DataTableBody.vue","sourcesContent":[".datatable__row {\n  background-color: #fff; }\n  .datatable__row--odd {\n    background-color: #e9ecef; }\n\n.datatable__cell {\n  position: relative;\n  padding: .3em .5em;\n  border-right: 1px solid #dee2e6;\n  border-bottom: 1px solid #dee2e6;\n  vertical-align: middle;\n  text-align: left; }\n  .datatable__cell--last-column {\n    border-right: 0; }\n  .datatable__cell--last-row {\n    border-bottom: 0; }\n\n/*# sourceMappingURL=DataTableBody.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTableBody = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

function octicon(c,o,r,s,t){var l=function(t,e){e.label?t["aria-label"]=e.label:t["aria-hidden"]=!0,e.class?t.class="octicon octicon-"+c+" "+e.class:t.class="octicon octicon-"+c;var i=0===e.scale?0:parseFloat(e.scale)||1,n=i*parseInt(t.width),a=i*parseInt(t.height);return t.width=Number(n.toFixed(2)),t.height=Number(a.toFixed(2)),t},u=function(e){return Object.keys(e).map(function(t){return t+'="'+e[t]+'"'}).join(" ").trim()};return {name:c,data:{width:o,height:r,path:s,keywords:t},svg:function(t,e){void 0===e&&(e=document);var i,n,a,c=e.createElement("div");return c.innerHTML="<svg "+(i=t,n=Object.assign({},{scale:1,label:null,class:null},i),a=l({version:"1.1",width:o,height:r,viewBox:"0 0 "+o+" "+r},n),u(a))+">"+s+"</svg>",c.firstChild}}}var octicon_1=octicon;

// This is an auto-generated ES2015 icon from the modularize script. Please do not modify this file.
var triangleDown = octicon_1('triangle-down', 12, 16, "<path fill-rule=\"evenodd\" d=\"M0 5l6 6 6-6H0z\"></path>", ["arrow","point","direction"]);

var triangleDown_1 = triangleDown;

// This is an auto-generated ES2015 icon from the modularize script. Please do not modify this file.
var triangleUp = octicon_1('triangle-up', 12, 16, "<path fill-rule=\"evenodd\" d=\"M12 11L6 5l-6 6h12z\"></path>", ["arrow","point","direction"]);

var triangleUp_1 = triangleUp;

// This is an auto-generated ES2015 icon from the modularize script. Please do not modify this file.
var threeBars = octicon_1('three-bars', 12, 16, "<path fill-rule=\"evenodd\" d=\"M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z\"></path>", ["hamburger","menu","dropdown"]);

var threeBars_1 = threeBars;

const capitalize = str => {
  if (!str) {
    return
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
};

const icon = (column, active, sortDesc) => {
  if (active) {
    return sortDesc ? triangleDown_1 : triangleUp_1
  }

  return threeBars_1
};

var DataTableHeadContent = {
  functional: true,
  props: {
    column: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    sortDesc: {
      type: Boolean,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.scopedSlots && props.column.scopedSlots.header) {
      return h('span', {
        on: {
          click ($event) {
            $event.stopPropagation();
          }
        }
      }, props.column.scopedSlots.header(props))
    }

    let children = [ h('span', {
      attrs: {
        class: 'datatable__column-text'
      }
    }, capitalize(props.column.label || props.column.field)) ];
    if (props.column.sortable) {
      children.push(h(Octicon, {
        props: {
          icon: icon(props.column, props.active, props.sortDesc),
          className: 'datatable__column-icon'
        }
      }));
    }
    return children
  }
};

//

var script$1 = {
  name: 'DataTableHead',
  components: { DataTableHeadContent },
  props: {
    columns: {
      type: Array,
      required: true
    },
    sortBy: {
      type: String,
      default: ''
    },
    sortDesc: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isActive (column) {
      return !!(column.sortable) && this.isSortedBy(column.field)
    },
    isSortedBy (field) {
      return this.sortBy === field
    },
    updateSort (field, sortable) {
      if (!field) {
        return
      }

      if (!sortable) {
        return
      }

      if (this.isSortedBy(field)) {
        this.$emit('update:sortDesc', !this.sortDesc);
        return
      }

      this.$emit('update:sortBy', field);
    }
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("thead", { staticClass: "datatable__head" }, [
    _vm.columns.length
      ? _c(
          "tr",
          _vm._l(_vm.columns, function(column, index) {
            return _c(
              "th",
              _vm._b(
                {
                  key: column.field + column.label,
                  class: [
                    "datatable__column",
                    {
                      "datatable__column--custom":
                        column.scopedSlots && column.scopedSlots.header,
                      "datatable__column--sortable": column.sortable,
                      "datatable__column--active": _vm.isActive(column),
                      "datatable__column--last":
                        index === _vm.columns.length - 1
                    },
                    column.staticClass,
                    column.dynamicClass
                  ],
                  attrs: { scope: "col" },
                  on: {
                    click: function($event) {
                      $event.preventDefault();
                      _vm.updateSort(column.field, column.sortable);
                    }
                  }
                },
                "th",
                column.attrs,
                false
              ),
              [
                _c("data-table-head-content", {
                  attrs: {
                    column: column,
                    active: _vm.isActive(column),
                    "sort-desc": _vm.sortDesc
                  }
                })
              ],
              1
            )
          })
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-00c7bb28_0", { source: ".datatable__column {\n  position: relative;\n  padding: .5em;\n  padding-right: 1.75em;\n  min-width: 1em;\n  vertical-align: middle;\n  text-align: left;\n  line-height: 1;\n  white-space: nowrap;\n  border-right: 1px solid #dee2e6;\n  border-bottom: 1px solid #dee2e6;\n  box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.1);\n  background-color: #fff;\n  font-weight: bold; }\n  .datatable__column--last {\n    border-right: 0; }\n  .datatable__column--active {\n    background-color: #f0f0f0; }\n  .datatable__column--sortable {\n    cursor: pointer; }\n  .datatable__column--custom {\n    padding-right: .5em; }\n\n.datatable__column-icon {\n  position: absolute;\n  top: 8px;\n  right: .5em; }\n\n.datatable__column-text {\n  display: inline-block;\n  vertical-align: middle;\n  margin-top: 2px; }\n\n/*# sourceMappingURL=DataTableHead.vue.map */", map: {"version":3,"sources":["DataTableHead.vue","/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableHead.vue"],"names":[],"mappings":"AAAA;ECmEA,mBAAA;EACA,cAAA;EACA,sBAAA;EACA,eAAA;EACA,uBAAA;EACA,iBAAA;EACA,eAAA;EACA,oBAAA;EACA,gCAAA;EACA,iCAAA;EACA,kDAAA;EACA,uBAAA;EDjEE,kBAAkB,EAAE;EACpB;ICoEF,gBAAA,EAAA;EDlEE;ICsEF,0BAAA,EAAA;EDpEE;ICwEF,gBAAA,EAAA;EDtEE;IC0EF,oBAAA,EAAA;;ADvEA;EC4EA,mBAAA;EACA,SAAA;EACA,YAAA,EAAA;;ADzEA;EC6EA,sBAAA;EACA,uBAAA;EACA,gBAAA,EAAA;;AD1EA,6CAA6C","file":"DataTableHead.vue","sourcesContent":[".datatable__column {\n  position: relative;\n  padding: .5em;\n  padding-right: 1.75em;\n  min-width: 1em;\n  vertical-align: middle;\n  text-align: left;\n  line-height: 1;\n  white-space: nowrap;\n  border-right: 1px solid #dee2e6;\n  border-bottom: 1px solid #dee2e6;\n  box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.1);\n  background-color: #fff;\n  font-weight: bold; }\n  .datatable__column--last {\n    border-right: 0; }\n  .datatable__column--active {\n    background-color: #f0f0f0; }\n  .datatable__column--sortable {\n    cursor: pointer; }\n  .datatable__column--custom {\n    padding-right: .5em; }\n\n.datatable__column-icon {\n  position: absolute;\n  top: 8px;\n  right: .5em; }\n\n.datatable__column-text {\n  display: inline-block;\n  vertical-align: middle;\n  margin-top: 2px; }\n\n/*# sourceMappingURL=DataTableHead.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableHead.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTableHead = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__$1,
    undefined
  );

//
var script$2 = {
	name: 'DataTablePagination',
	props: {
		total: {
			type: Number,
			required: true
		},
		perPage: {
			type: Number,
			required: true
		},
		page: {
			type: Number,
			required: true
		}
	},
	computed: {
		pages() {
			return paginate(this.page, this.totalPages)
		},
		totalPages() {
			return Math.ceil(this.total / (this.perPage || 1))
		},
		reachedFirst() {
			return this.page === 1
		},
		reachedLast() {
			return this.page >= this.totalPages
		}
	},
	watch: {
		page: 'isLast',
		totalPages: 'isLast'
	},
	methods: {
		isActive(page) {
			return !page.disabled && this.page === page.value
		},
		isLast() {
			return this.page > this.totalPages && this.load(this.page - 1)
		},
		load(page, disabled) {
			if (disabled) {
				return
			}

			if (page < 1) {
				return
			}

			if (page > this.totalPages) {
				return
			}

			this.$emit('update:page', page);
		}
	}
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", { staticClass: "datatable__pagination" }, [
    _c(
      "ul",
      { staticClass: "datatable__plist" },
      [
        _c("li", { staticClass: "datatable__pitem" }, [
          _c(
            "a",
            {
              class: [
                "datatable__plink datatable__pprev",
                { "datatable__plink--disabled": _vm.reachedFirst }
              ],
              attrs: { href: "#", "aria-label": "Previous" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  _vm.load(_vm.page - 1);
                }
              }
            },
            [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("«")])]
          )
        ]),
        _vm._v(" "),
        _vm._l(_vm.pages, function(page, index) {
          return _c("li", { key: index, staticClass: "datatable__pitem" }, [
            _c(
              "a",
              {
                class: [
                  "datatable__plink",
                  {
                    "datatable__plink--active": _vm.isActive(page),
                    "datatable__plink--disabled": page.disabled
                  }
                ],
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    _vm.load(page.value, page.disabled);
                  }
                }
              },
              [_vm._v(_vm._s(page.value))]
            )
          ])
        }),
        _vm._v(" "),
        _c("li", { staticClass: "datatable__pitem" }, [
          _c(
            "a",
            {
              class: [
                "datatable__plink datatable__pnext",
                { "datatable__plink--disabled": _vm.reachedLast }
              ],
              attrs: { href: "#", "aria-label": "Next" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  _vm.load(_vm.page + 1);
                }
              }
            },
            [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("»")])]
          )
        ])
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-4803eccc_0", { source: ".datatable__pagination {\n  display: block; }\n\n.datatable__plist {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  margin-top: .5em;\n  border-radius: 4px; }\n\n.datatable__pitem {\n  display: inline; }\n\n.datatable__plink {\n  position: relative;\n  float: left;\n  padding: .3em .6em;\n  margin-left: -1px;\n  color: #337ab7;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #dee2e6; }\n  .datatable__plink--active {\n    z-index: 3;\n    color: #fff !important;\n    cursor: default;\n    background-color: #337ab7 !important;\n    border-color: #337ab7 !important; }\n  .datatable__plink--disabled {\n    color: #777 !important;\n    cursor: not-allowed;\n    background-color: #f0f0f0 !important; }\n  .datatable__plink:focus, .datatable__plink:hover {\n    z-index: 2;\n    background-color: #eee; }\n\n/*# sourceMappingURL=DataTablePagination.vue.map */", map: {"version":3,"sources":["DataTablePagination.vue","/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTablePagination.vue"],"names":[],"mappings":"AAAA;EC2FA,eAAA,EAAA;;ADxFA;EC4FA,sBAAA;EACA,UAAA;EACA,WAAA;EACA,iBAAA;EACA,mBAAA,EAAA;;ADzFA;EC6FA,gBAAA,EAAA;;AD1FA;EC8FA,mBAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,sBAAA;EACA,uBAAA;ED5FE,0BAA0B,EAAE;EAC5B;IC+FF,WAAA;IACA,uBAAA;IACA,gBAAA;IACA,qCAAA;IACA,iCAAA,EAAA;ED7FE;ICiGF,uBAAA;IACA,oBAAA;IACA,qCAAA,EAAA;EAGA;IAEA,WAAA;IACA,uBAAA,EACA;;ADlGA,mDAAmD","file":"DataTablePagination.vue","sourcesContent":[".datatable__pagination {\n  display: block; }\n\n.datatable__plist {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n  margin-top: .5em;\n  border-radius: 4px; }\n\n.datatable__pitem {\n  display: inline; }\n\n.datatable__plink {\n  position: relative;\n  float: left;\n  padding: .3em .6em;\n  margin-left: -1px;\n  color: #337ab7;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #dee2e6; }\n  .datatable__plink--active {\n    z-index: 3;\n    color: #fff !important;\n    cursor: default;\n    background-color: #337ab7 !important;\n    border-color: #337ab7 !important; }\n  .datatable__plink--disabled {\n    color: #777 !important;\n    cursor: not-allowed;\n    background-color: #f0f0f0 !important; }\n  .datatable__plink:focus, .datatable__plink:hover {\n    z-index: 2;\n    background-color: #eee; }\n\n/*# sourceMappingURL=DataTablePagination.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTablePagination.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTablePagination = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    __vue_create_injector__$2,
    undefined
  );

//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'DataTableFilter',
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    update (filter) {
      this.$emit('update:filter', filter);
    },
    clear () {
      this.$emit('update:filter', '');
    }
  }
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "datatable__filter" }, [
    _c("input", {
      staticClass: "datatable__input",
      attrs: { type: "text", placeholder: "Filter table data" },
      domProps: { value: _vm.filter },
      on: {
        input: function($event) {
          _vm.update($event.target.value);
        }
      }
    }),
    _vm._v(" "),
    _vm.filter
      ? _c(
          "div",
          {
            staticClass: "datatable__clear",
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.clear($event)
              }
            }
          },
          [
            _c(
              "a",
              {
                staticClass: "datatable__x",
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.clear($event)
                  }
                }
              },
              [_vm._v("×")]
            )
          ]
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-f952a454_0", { source: ".datatable__filter {\n  position: relative; }\n\n.datatable__input {\n  width: 100%;\n  padding: .3rem 1.5rem .3rem .75rem;\n  font-size: 1em;\n  line-height: 1.5;\n  border: 1px solid #dee2e6;\n  border-radius: .25rem; }\n  .datatable__input:focus {\n    outline: 0;\n    border-color: #999;\n    box-shadow: 0 0 0 0.2rem rgba(100, 100, 100, 0.25); }\n\n.datatable__clear {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: inline-block;\n  height: 100%;\n  border: 1px solid transparent;\n  cursor: pointer;\n  vertical-align: middle; }\n  .datatable__clear:hover {\n    font-weight: bold; }\n  .datatable__clear:active {\n    font-weight: bold;\n    text-shadow: 0px 0px 2px #969696; }\n\n.datatable__x {\n  padding: .25em .75em;\n  color: inherit !important;\n  text-decoration: none;\n  display: inline-block;\n  vertical-align: middle; }\n\n/*# sourceMappingURL=DataTableFilter.vue.map */", map: {"version":3,"sources":["DataTableFilter.vue","/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableFilter.vue"],"names":[],"mappings":"AAAA;ECkCA,mBAAA,EAAA;;AD/BA;ECmCA,YAAA;EACA,mCAAA;EACA,eAAA;EACA,iBAAA;EACA,0BAAA;EDjCE,sBAAsB,EAAE;ECoC1B;IACA,WAAA;IACA,mBAAA;IACA,mDAAA,EACA;;ADlCA;ECsCA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,sBAAA;EACA,aAAA;EACA,8BAAA;EACA,gBAAA;EACA,uBAAA,EAAA;EACA;IACA,kBAAA,EAAA;EAGA;IACA,kBAAA;IACA,iCAAA,EACA;;ADtCA;EC0CA,qBAAA;EACA,0BAAA;EACA,sBAAA;EACA,sBAAA;EACA,uBAAA,EAAA;;ADvCA,+CAA+C","file":"DataTableFilter.vue","sourcesContent":[".datatable__filter {\n  position: relative; }\n\n.datatable__input {\n  width: 100%;\n  padding: .3rem 1.5rem .3rem .75rem;\n  font-size: 1em;\n  line-height: 1.5;\n  border: 1px solid #dee2e6;\n  border-radius: .25rem; }\n  .datatable__input:focus {\n    outline: 0;\n    border-color: #999;\n    box-shadow: 0 0 0 0.2rem rgba(100, 100, 100, 0.25); }\n\n.datatable__clear {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: inline-block;\n  height: 100%;\n  border: 1px solid transparent;\n  cursor: pointer;\n  vertical-align: middle; }\n  .datatable__clear:hover {\n    font-weight: bold; }\n  .datatable__clear:active {\n    font-weight: bold;\n    text-shadow: 0px 0px 2px #969696; }\n\n.datatable__x {\n  padding: .25em .75em;\n  color: inherit !important;\n  text-decoration: none;\n  display: inline-block;\n  vertical-align: middle; }\n\n/*# sourceMappingURL=DataTableFilter.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableFilter.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$3() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTableFilter = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__$3,
    undefined
  );

const us = {
	showing: "Showing",
	to: "to",
	of: "of",
	records: "records",
	no_records: "No records",
};

const es = {
	showing: "Mostrando",
	to: "a",
	of: "de",
	records: "registros",
	no_records: "Sin registros"
};

var languages = {
	en: us,
	es: es
};

//
var script$4 = {
	props: {
		from: {
			type: Number,
			required: true
		},
		to: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		options: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			locales: languages["en"],
		}
	},
	created () {
		this.loadLocales();
	},
	methods: {
		loadLocales(){
			if (this.options.lang instanceof Object){
				this.locales = this.options.lang;
			}else{
				if(Object.keys(languages).indexOf(this.options.lang) != -1){
					this.locales = languages[this.options.lang];
				}else{
					this.locales = languages["en"];
				}
			}
		},
	}
};

/* script */
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "datatable__unit datatable__text" }, [
    _vm.total
      ? _c("span", [
          _vm._v("\n\t\t" + _vm._s(_vm.locales.showing) + " "),
          _c("span", {
            domProps: {
              textContent: _vm._s(
                _vm.from === _vm.to && _vm.to === _vm.total
                  ? "the last entry"
                  : _vm.from + " " + _vm.locales.to + " " + _vm.to
              )
            }
          }),
          _vm._v(
            " " +
              _vm._s(_vm.locales.of) +
              " " +
              _vm._s(_vm.total) +
              " " +
              _vm._s(_vm.locales.records) +
              "\n\t"
          )
        ])
      : _c("span", [_vm._v(_vm._s(_vm.locales.no_records))])
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTableInfo.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableInfo = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
var script$5 = {
	name: 'DataTable',
	components: {
		DataTableBody,
		DataTableHead,
		DataTablePagination,
		DataTableFilter,
		DataTableInfo
	},
	props: {
		items: {
			type: [Array, Function],
			required: true
		},
		perPage: {
			type: Number,
			default: 10
		},
		sortBy: {
			type: String,
			default: ''
		},
		sortDesc: {
			type: Boolean,
			default: false
		},
		filter: {
			type: String,
			default: ''
		},
		lang: {
			type: [String, Object],
			default: 'es'
		},
		showFilters: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			actualItems: [],
			vnodes: [],
			total: 0,
			page: 1,
			locales: languages["en"],
			options: {
				sortBy: this.sortBy,
				sortDesc: this.sortDesc,
				filter: this.filter,
				lang: this.lang,
			}
		}
	},
	computed: {
		identifier() {
			return `by:${this.sorting.by}|order:${this.sorting.order}|filter:${this.options.filter}|page:${this.page}|per_page:${this.perPage}`
		},
		asynchronous() {
			return this.items instanceof Function
		},
		columns() {
			return this.vnodes.map(vnode => {
				let {
					componentOptions: {
						Ctor: {
							options: {
								props
							}
						},
						propsData,
						children
					},
					data: {
						scopedSlots,
						attrs,
						class: dynamicClass,
						staticClass
					}
				} = vnode;
				let {
					field,
					label,
					sortable,
					filterable,
					render
				} = defaultProps(props, propsData);
				return {
					field,
					label,
					sortable,
					filterable,
					render,
					scopedSlots,
					children,
					attrs,
					dynamicClass,
					staticClass
				}
			})
		},
		filterable() {
			return this.columns
				.filter(column => {
					return column.filterable
				})
				.map(column => {
					return column.field
				})
				.filter(field => field)
		},
		filtering() {
			return {
				query: this.options.filter.toLowerCase(),
				fields: this.filterable
			}
		},
		paging() {
			return {
				page: this.page,
				perPage: this.perPage
			}
		},
		sorting() {
			return {
				by: this.options.sortBy,
				order: !this.options.sortDesc ? 'asc' : 'desc'
			}
		},
		from() {
			return (this.page - 1) * this.perPage + 1
		},
		to() {
			let x = this.page * this.perPage;
			return this.total < x ? this.total : x
		}
	},
	watch: {
		items: 'loadItems',
		identifier: 'loadItems',
		sortBy: {
			immediate: true,
			handler(val) {
				this.$set(this.options, 'sortBy', val);
			}
		},
		sortDesc: {
			immediate: true,
			handler(val) {
				this.$set(this.options, 'sortDesc', val);
			}
		},
		filter: {
			immediate: true,
			handler(val) {
				this.$set(this.options, 'filter', val);
			}
		},
		'options.sortBy'(val) {
			this.$emit('update:sortBy', val);
		},
		'options.sortDesc'(val) {
			this.$emit('update:sortDesc', val);
		},
		'options.filter'(val) {
			this.$emit('update:filter', val);
		}
	},
	created() {
		this.loadLocales();
		this.loadSlots();
		this.loadItems();
	},
	methods: {
		loaded(data) {
			let items = JSON.parse(JSON.stringify(data.items));
			this.actualItems = items.map(item => {
				this.columns.filter(column => typeof column.render === 'function').forEach(column => {
					let parts = column.field.split('.');
					let originalField = parts.reduce((a, b, index) => {
						if (index === parts.length - 1) {
							return `${a}.$_${b}`
						}

						return `${a}.${b}`
					});
					if (parts.length === 1) {
						originalField = `$_${originalField}`;
					}

					dotSet(item, originalField, dotGet(item, column.field));
					dotSet(item, column.field, column.render(dotGet(item, column.field)));
				});

				return item
			});
			this.total = data.total;

			this.$emit('loaded', {
				items: this.actualItems,
				total: data.total
			});
		},
		loadLocales() {
			if (this.options.lang instanceof Object) {
				this.locales = this.options.lang;
			} else {
				if (Object.keys(languages).indexOf(this.options.lang) != -1) {
					this.locales = languages[this.options.lang];
				} else {
					this.locales = languages["en"];
				}
			}
		},
		loadSlots() {
			// $slots is not reactive
			this.vnodes = !this.$slots.default ? [] : this.$slots.default.filter(vnode => vnode.componentOptions);
		},
		loadItems() {
			this.load(this.items, this.filtering, this.sorting, this.paging);
		},
		async load(items, filtering, sorting, paging) {
			if (this.asynchronous) {
				this.loaded(await items(filtering, sorting, paging));
				return
			}

			this.loaded(load(items, filtering, sorting, paging));
		}
	}
};

/* script */
            const __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "datatable" }, [
    _c(
      "div",
      { staticClass: "datatable__wrapper" },
      [
        _c(
          "div",
          { staticClass: "datatable__heading" },
          [
            _vm.showFilters
              ? _c("data-table-filter", {
                  staticClass: "datatable__unit",
                  attrs: { filter: _vm.options.filter },
                  on: {
                    "update:filter": function($event) {
                      _vm.$set(_vm.options, "filter", $event);
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.showFilters
              ? _c("data-table-info", {
                  attrs: {
                    from: _vm.from,
                    to: _vm.to,
                    total: _vm.total,
                    options: _vm.options
                  }
                })
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "datatable__screen" }, [
          _c(
            "table",
            {
              staticClass: "datatable__content",
              attrs: { cellspacing: "0", cellpadding: "0" }
            },
            [
              _c("data-table-head", {
                attrs: {
                  columns: _vm.columns,
                  "sort-by": _vm.options.sortBy,
                  "sort-desc": _vm.options.sortDesc
                },
                on: {
                  "update:sortBy": function($event) {
                    _vm.$set(_vm.options, "sortBy", $event);
                  },
                  "update:sortDesc": function($event) {
                    _vm.$set(_vm.options, "sortDesc", $event);
                  }
                }
              }),
              _vm._v(" "),
              _c("data-table-body", {
                attrs: { columns: _vm.columns, items: _vm.actualItems }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c("data-table-pagination", {
          attrs: { "per-page": _vm.perPage, page: _vm.page, total: _vm.total },
          on: {
            "update:page": function($event) {
              _vm.page = $event;
            }
          }
        })
      ],
      1
    )
  ])
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-686a81d0_0", { source: "*,\n*::after,\n*::before {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.datatable {\n  color: #495057;\n  font: 1em/1.5 -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n  .datatable__screen {\n    display: block;\n    width: 100%; }\n  .datatable__wrapper {\n    position: relative;\n    display: block;\n    text-align: left;\n    width: 100%; }\n  .datatable__heading {\n    margin-bottom: .5em;\n    display: table;\n    table-layout: fixed;\n    width: 100%; }\n  .datatable__unit {\n    margin-bottom: .5em; }\n  @media (min-width: 768px) {\n    .datatable__unit {\n      width: 50%;\n      display: table-cell; }\n    .datatable__text {\n      padding-left: 1em; } }\n  .datatable__content {\n    min-width: 100%;\n    border: solid 1px #dee2e6;\n    table-layout: fixed; }\n\n/*# sourceMappingURL=DataTable.vue.map */", map: {"version":3,"sources":["/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTable.vue","DataTable.vue"],"names":[],"mappings":"AA2QA;;;EAGA,+BAAA;EACA,uBAAA,EAAA;;AAGA;EACA,eAAA;EACA,gJAAA;EACA,oCAAA;EC3QE,mCAAmC,EAAE;EACrC;ID8QF,eAAA;IACA,YAAA,EAAA;EC5QE;IDgRF,mBAAA;IACA,eAAA;IACA,iBAAA;IACA,YAAA,EAAA;EC9QE;IDkRF,oBAAA;IACA,eAAA;IACA,oBAAA;IACA,YAAA,EAAA;EChRE;IDoRF,oBAAA,EAAA;EAGA;ICpRI;MDsRJ,WAAA;MACA,oBAAA,EAAA;ICpRI;MDwRJ,kBAAA,EAAA,EAAA;ECtRE;ID2RF,gBAAA;IACA,0BAAA;IACA,oBAAA,EAAA;;ACxRA,yCAAyC","file":"DataTable.vue","sourcesContent":[null,"*,\n*::after,\n*::before {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.datatable {\n  color: #495057;\n  font: 1em/1.5 -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n  .datatable__screen {\n    display: block;\n    width: 100%; }\n  .datatable__wrapper {\n    position: relative;\n    display: block;\n    text-align: left;\n    width: 100%; }\n  .datatable__heading {\n    margin-bottom: .5em;\n    display: table;\n    table-layout: fixed;\n    width: 100%; }\n  .datatable__unit {\n    margin-bottom: .5em; }\n  @media (min-width: 768px) {\n    .datatable__unit {\n      width: 50%;\n      display: table-cell; }\n    .datatable__text {\n      padding-left: 1em; } }\n  .datatable__content {\n    min-width: 100%;\n    border: solid 1px #dee2e6;\n    table-layout: fixed; }\n\n/*# sourceMappingURL=DataTable.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/rafael-arreola/sites/teible/packages/vue-teible/src/DataTable.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$4() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTable = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    __vue_create_injector__$4,
    undefined
  );

var DataColumn = {
  name: 'DataColumn',
  props: {
    label: {
      type: String,
      required: true
    },
    field: {
      type: String,
      default: ''
    },
    sortable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    render: {
      type: Function
    }
  }
};

exports.default = DataTable;
exports.DataTable = DataTable;
exports.DataColumn = DataColumn;
