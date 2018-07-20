<template>
  <form :class="classes" :autocomplete="autocomplete"><slot></slot></form>
</template>
<script>
  // https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue
  import { oneOf } from 'iview/src/utils/assist';

  const prefixCls = 'ivu-form';

  export default {
    name: 'iForm',
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      },
      groupRules: {
        type: Object
      },
      labelWidth: {
        type: Number
      },
      labelPosition: {
        validator (value) {
          return oneOf(value, ['left', 'right', 'top']);
        },
        default: 'right'
      },
      inline: {
        type: Boolean,
        default: false
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      autocomplete: {
        validator (value) {
          return oneOf(value, ['on', 'off']);
        },
        default: 'off'
      }
    },
    provide() {
      return { form : this };
    },
    data () {
      return {
        fields: []
      };
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          `${prefixCls}-label-${this.labelPosition}`,
          {
            [`${prefixCls}-inline`]: this.inline
          }
        ];
      }
    },
    methods: {
      resetFields() {
        this.fields.forEach(field => {
          field.resetField();
        });
      },
      validate(callback) {
        return new Promise(resolve => {
          let valid = true;
          let count = 0;
          this.fields.forEach(field => {
            field.validate('', errors => {
              if (errors) {
                valid = false;
              }
              if (++count === this.fields.length) {
                // all finish
                resolve(valid);
                if (typeof callback === 'function') {
                  callback(valid);
                }
              }
            });
          });
        });
      },
      validateRequiredAtLeastOne (callback) {

        var groupRulesRequiredList = this.groupRules.requireAtLeastOne;
        groupRulesRequiredList.forEach(rule => { //['a','b']
          const field = this.fields.filter(field => field.prop === rule[0])[0];//只去每个rules的第一位做校验
          field.validateRequireAtLeastOne('',valid =>{

            console.log('============')
            console.log(valid);
          })


        })
      },
      validateRequired (callback) {
        return new Promise(resolve => {
        var groupRulesRequiredList = this.groupRules.requireAtLeastOne;
        var fieldList = [];
        groupRulesRequiredList.forEach(rule => { //['a','b']
          var ruleList = [];
          rule.forEach(item => {
            const field = this.fields.filter(field => field.prop === item)[0];
            ruleList.push(field)
          })
          fieldList.push(ruleList)
        })
        console.log('fieldList')
        console.log(fieldList)
        var valid_total = false;
        fieldList.forEach(rulesList => {
          console.log(rulesList)
          rulesList.forEach(field => {
            var  count = 0;
            var valid = false;
            field.validateRequire("123", errors => {
              if (errors) {
              } else {
                valid = true;
              }
              if (++count === rulesList.length) {
                if(!valid) {
                  console.log('====================')
                  rulesList.forEach(a =>{
                    a.validateState = 'error';
                    a.validateMessage = '几项选一';
                    a.validateDisabled = false;
                  })
                } else {
                  rulesList.forEach (a => {
                    a.resetField()
                  });
                }
                // all finish
                resolve(valid);
                if (typeof callback === 'function') {
                  callback(valid);
                }
              }
            })
          })
        })
      })
      },

      validateSingleRule (rule) {

//        rule:['a','b']
        var valid = true;
        //找一个组件校验即可
        const field = this.fields.filter(field => field.prop === rule[0])[0];
        field.validateRequireAtLeastOne (error =>{
          if(error){
            valid = false;
          }
        });
        return valid;
      },
      validateField(prop, cb) {
        const field = this.fields.filter(field => field.prop === prop)[0];
        if (!field) { throw new Error('[iView warn]: must call validateField with valid prop string!'); }

        field.validate('', cb);
      }
    },
    watch: {
      rules() {
        this.validate();
      }
    },
    created () {
      this.$on('on-form-item-add', (field) => {
        if (field) this.fields.push(field);
        return false;
      });
      this.$on('on-form-item-remove', (field) => {
        if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
        return false;
      });
    }
  };
</script>
