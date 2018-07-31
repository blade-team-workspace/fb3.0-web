<template>
  <div :class="classes">
    <label :class="[prefixCls + '-label']" :for="labelFor" :style="labelStyles" v-if="label || $slots.label"><slot name="label">{{ label }}</slot></label>
    <div :class="[prefixCls + '-content']" :style="contentStyles">
      <slot></slot>
      <transition name="fade">
        <div :class="[prefixCls + '-error-tip']" v-if="validateState === 'error' && showMessage && form.showMessage">{{ validateMessage }}</div>
      </transition>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import Emitter from 'iview/src/mixins/emitter';

  import logger from '../../utils/logger'
  const prefixCls = 'ivu-form-item';

  function getPropByPath(obj, path) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    let keyArr = path.split('.');
    let i = 0;

    for (let len = keyArr.length; i < len - 1; ++i) {
      let key = keyArr[i];
      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        throw new Error('[iView warn]: please transfer a valid prop path to form item!');
      }
    }
    return {
      o: tempObj,
      k: keyArr[i],
      v: tempObj[keyArr[i]]
    };
  }

  export default {
    name: 'FormItem',
    mixins: [ Emitter ],
    props: {
      label: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: Number
      },
      prop: {
        type: String
      },
      title :{

      },
      required: {
        type: Boolean,
        default: false
      },
      rules: {
        type: [Object, Array]
      },
      error: {
        type: String
      },
      validateStatus: {
        type: Boolean
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      labelFor: {
        type: String
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        isRequired: false,
        validateState: '',
        validateMessage: '',
        validateDisabled: false,
        validator: {}
      };
    },
    watch: {
      error (val) {
        this.validateMessage = val;
        this.validateState = val === '' ? '' : 'error';
      },
      validateStatus (val) {
        this.validateState = val;
      }
    },
    inject: ['form'],
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-required`]: this.required || this.isRequired,
            [`${prefixCls}-error`]: this.validateState === 'error',
            [`${prefixCls}-validating`]: this.validateState === 'validating'
          }
        ];
      },
      // form() {
      //    let parent = this.$parent;
      //    while (parent.$options.name !== 'iForm') {
      //        parent = parent.$parent;
      //    }
      //    return parent;
      // },
      fieldValue: {
        cache: false,
        get() {
          const model = this.form.model;
          if (!model || !this.prop) { return; }

          let path = this.prop;
          if (path.indexOf(':') !== -1) {
            path = path.replace(/:/, '.');
          }

          return getPropByPath(model, path).v;
        }
      },
      labelStyles () {
        let style = {};
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          style.width = `${labelWidth}px`;
        }
        return style;
      },
      contentStyles () {
        let style = {};
        const labelWidth = this.labelWidth || this.form.labelWidth;
        if (labelWidth) {
          style.marginLeft = `${labelWidth}px`;
        }
        return style;
      }
    },
    methods: {
      getRules () {
        let formRules = this.form.rules;
        const selfRules = this.rules;

        formRules = formRules ? formRules[this.prop] : [];

        return [].concat(selfRules || formRules || []);
      },
      validateRequireAtLeastOne(unused,callback = function(){}){
        if(typeof arguments[arguments.length-1] !== 'function'){
          callback = function(){}
        }
        logger.debug('------- 组校验开始 -------')
        var rule = this.getFilterGroupRules();
        if(rule === undefined) {
          logger.debug(this.prop + '没有组校验')
          logger.debug('------- 组校验结束 -------')
          callback();
          return true;
        }
        var fields =[];
        logger.debug(this.prop + '组校验规则 ：');
        logger.debug(rule);
        rule.forEach(item => {
          const field = this.form.fields.filter(field => field.prop === item)[0];
          if(field !== undefined)
          fields.push(field)
        });
        var hasValue = false;
        var message = [];
        fields.forEach(field => {
          console.log(field);
          message.push(field.title);
          if(field.fieldValue === '' || field.fieldValue ===[]){
              //  没值
            logger.debug(field.prop + '没值');
          } else {
              //  有值
              hasValue = true;
            logger.debug(field.prop + '有值，值为：' )
            logger.debug(field.fieldValue);
          }
        })

        if(!hasValue) {
            logger.debug('校验失败')
            fields.forEach(field => {

            field.validateState = 'error';
            field.validateMessage = message.join(',') + '必填一项';
            field.validateDisabled = false;
          });

        } else {
            logger.debug('校验成功')
            fields.forEach(field => {
              field.validateState = '';
              field.validateMessage = '';
            })
        }
        callback(hasValue);
        logger.debug('------- 组校验结束 -------')
      },
      getFilterGroupRules() {
        var rule;
        var requireAtLeastOneList = this.form.groupRules.requireAtLeastOne;
        requireAtLeastOneList.forEach(list =>{
          if(list.indexOf(this.prop)!== -1) {
            rule = list ;
          }
        });
        return rule;
      },
      getFilteredRule (trigger) {
        const rules = this.getRules();

        return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
      },
      validate(trigger, callback = function () {}) {
        logger.debug('----- rule校验开始 ------')
        const rules = this.getFilteredRule(trigger);
        if (!rules || rules.length === 0) {
          callback();
          logger.debug(this.prop + '没有校验规则')
          logger.debug('----- rule校验结束  ------')
          return true;
        }

        this.validateState = 'validating';

        let descriptor = {};
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        let model = {};

        model[this.prop] = this.fieldValue;

        validator.validate(model, { firstFields: true }, errors => {


          this.validateState = !errors ? 'success' : 'error';
          logger.debug(this.prop + ':validate :' );
          logger.debug(errors)
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage);
        });
        this.validateDisabled = false;
        logger.debug('----- rule校验结束  ------')
      },
      resetField () {
        this.validateState = '';
        this.validateMessage = '';

        let model = this.form.model;
        let value = this.fieldValue;
        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        let prop = getPropByPath(model, path);

//                if (Array.isArray(value) && value.length > 0) {
//                    this.validateDisabled = true;
//                    prop.o[prop.k] = [];
//                } else if (value !== this.initialValue) {
//                    this.validateDisabled = true;
//                    prop.o[prop.k] = this.initialValue;
//                }
        if (Array.isArray(value)) {
          this.validateDisabled = true;
          prop.o[prop.k] = [].concat(this.initialValue);
        } else {
          this.validateDisabled = true;
          prop.o[prop.k] = this.initialValue;
        }
      },
      onFieldBlur() {
        this.validate('blur');

      },
      onFieldChange() {
        if (this.validateDisabled) {
          this.validateDisabled = false;
          return;
        }

        this.validate('change');

      }
    },
    mounted () {
      if (this.prop) {
        this.dispatch('iForm', 'on-form-item-add', this);

        Object.defineProperty(this, 'initialValue', {
          value: this.fieldValue
        });

        let rules = this.getRules();

        if (rules.length) {
          rules.every(rule => {
            if (rule.required) {
              this.isRequired = true;
              return false;
            }
          });
          this.$on('on-form-blur', this.onFieldBlur);
          this.$on('on-form-change', this.onFieldChange);
        }
      }
//      if(this.getFilterGroupRules() === undefined) {
//
//      } else {
      this.$on('on-form-blur', this.validateRequireAtLeastOne);
      this.$on('on-form-change', this.validateRequireAtLeastOne);
//      }
    },
    beforeDestroy () {
      this.dispatch('iForm', 'on-form-item-remove', this);
    }
  };
</script>
