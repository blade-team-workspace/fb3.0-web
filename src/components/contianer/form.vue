<template>
<iForm  ref="formValidate" :id="url" :model="formValues" :rules="rules" :groupRules="groupRules" >
  <FormItem>
    <Button type="primary" @click="handleSubmit">Submit</Button></FormItem>
  <Button type="primary" @click="tes">tes</Button></FormItem>
  <div class="container"  v-for="item in containers">
    <fromGroup  v-if="item.type == 'form-group'"
                ref="container"
                :label="item.label"
                :initialFormValue="initialValue"
                :container="item"
                :url="url"
                :values="formValues"
                :isRead="isRead"
    >
    </fromGroup>
    <multiMedia  v-if="item.type == 'multimedia'"
                 ref="container"
                 :label="item.label"
                 :url="url"
                 :initialFormValue="initialValue"
                 :container="item"
                 :isRead="isRead"
                 :values="formValues"
    >
    </multiMedia>
    <stream  v-if="item.type == 'stream'"
             ref="container"
             :container="item"
             :url="url"
             :initialFormValue="initialValue"
             :isRead="isRead"
             :values="formValues"
    >
    </stream>
  </div>
</iForm>

</template>

<script>
  import logger from '../../utils/logger'
  import Schema from 'async-validator';
  import iForm from './local-form.vue'
  import fromGroup from './formGroup.vue'
  import multiMedia from './multiMedia.vue'
  import stream from './stream.vue'
  import { mapState, mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    data() {

      return {
        formValues : {},
        fields:[],
        url:this.form.url,
        containers:this.form.items,
        isRead:this.form.isRead,
        events:this.form.events,
        rules:this.form.rules,
        groupRules:this.form.groupRules,
        initialValue:''

      }
    },
    components:{
      fromGroup,multiMedia,stream,iForm
    },
//    computed :{ ...mapState('form',{
//      url:state=>state.form.url,
//      containers:state=>state.form.items,
//      isRead : state=>state.form.isRead,
//      events : state=> state.form.events,
//      rules : state=>state.form.rules,
//      groupRules : state=>state.form.groupRules
//    })
//
//
//    },
    props : {
      form : {

      }
    },
    created() {

      //事件绑定初始化走一遍
      this.eventDispatch(this.events);
      this.initialValue = this.findValue(this.url)
      console.log(this.initialValue)

      this.$bus.on('triggerEvents', this.eventDispatchForTrigger);
      this.$bus.on('addValues',this.addValues)
      console.log()
    },
    methods : {
      tes() {

        var values = {};
        this.$refs['formValidate'].$children.forEach(item => {
          console.log(item.$refs['component']);
          if(item.$refs['component']!== undefined){
            if($.isArray(item.$refs['component'])){

            item.$refs['component'].forEach(aa =>{
//              console.log(aa.item.name);
              values[aa.item.name] = aa.componentValue;
//              console.log(aa.componentValue);

            })
          }else {
//              console.log(item.$refs['component'].item.name)
//              console.log('=============');
              values[item.$refs['component'].item.name] = item.$refs['component'].componentValue;
//              console.log(item.$refs['component'].componentValue)
            }
          }

        })
        logger.debug(' -------- form表单值 ------')
        logger.debug(values)
      },

      handleSubmit () {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {

             this.$refs['formValidate'].validateRequiredAtLeastOne (valid =>{
               this.$Message.success('Success!');
             });
          } else {
            this.$Message.error('Fail!');
          }
        })
//        console.log(this.$refs[name].groupValidate)
//        this.$refs[name].validateRequired((valid) =>{
//
//        })

      },
      getValue () {
        this.$refs['formValidate'].getFormValues();
      },
      addValues (obj) {
        this.formValues[obj.name] = obj.value;
      },
      eventDispatch (events) {
        logger.debug('------- 初始化事件 -------')
        $.each (events, (index , event) => {
          if(event.eventType === 'valueChangeShowHide' ){
            this.valueChangeShowHide(event);
          }
        })

        logger.debug('------- 初始化事件结束 -------')
      },
      eventDispatchForTrigger (event,value ) {

        if(event.eventType === 'valueChangeShowHide' ){
          this.valueChangeShowHide(event,value);
        }
      },
      valueChangeShowHide ( event , value) {
        logger.debug('---- 组件' +event.trigger + ' 联动开始 ----')
        var trigger = event.trigger;
        var allResp = [];	// 所有层
        var valueResps = [];//value层
        allResp =  this.getAllResp(event.valueResps);
        logger.debug('所有关联组件:');
        logger.debug(allResp)
        var target = value!== undefined?value:this.$store.state.values[trigger]
        valueResps =  this.getValueReps(event,value!== undefined?value:this.$store.state.values[trigger])
        logger.debug('当前选项:' + target + '' + ' 当前选项关联组件 ：');
        console.log(valueResps);
        $.each(allResp , (index , value ) => {
          console.log('9999999')
          console.log(allResp)
          if(valueResps.contains(value)) {

            this.convertComponentStatus({
              form:this.form.url,
              name :value,
              isShow :true
            });
            logger.debug(value + '显示')
          } else {

            this.convertComponentStatus({
              form:this.form.url,
              name :value,
              isShow :false
            });
            logger.debug(value + '隐藏')
          }
        })
        logger.debug('---- 组件' +event.trigger + ' 联动结束 ----')
      },
      getAllResp (reps) {
        var allResp = [];
        $.each(reps , function (index ,valueResp) {
          if($.isArray(this)) {
            console.log('22222');
            console.log(this);
            $.each(this, function(_idx) {
              if(  !allResp.contains(this.toString()) && this.toString() !== '') {
                allResp.add(this.toString());
              }
            });

          } else {
            if( !allResp.contains(this) && this.toString() !== '') {
              allResp.add(this.toString());
            }
          }
        })

        return allResp;
      },
      getValueReps (event ,values) { // 根据value来查找去重对应的
        var repsValues = [];
        if(values!==undefined) {
          if($.isArray(values)) {
            $.each(values , function (index, value) {
              var triggerValue = event.valueResps[value];
              if(triggerValue!==null && triggerValue !== undefined) {

                if($.isArray(triggerValue)) {

                  $.each(triggerValue,function (i,v) {
                    if(!repsValues.contains(v) && v!=='') {
                      repsValues.add(v)
                    }
                  })

                } else {
                  if(!repsValues.contains(triggerValue) && triggerValue!=='') {
                    repsValues.add(triggerValue)
                  }
                }
              }

            })
          } else {
            var triggerValue = event.valueResps[values];
            if(triggerValue!==null && triggerValue !== undefined) {

              if($.isArray(triggerValue)) {

                $.each(triggerValue,function (i,v) {
                  if(!repsValues.contains(v) && v!=='') {
                    repsValues.add(v)
                  }
                })

              } else {
                if(!repsValues.contains(triggerValue) && triggerValue!=='') {
                  repsValues.add(triggerValue)
                }
              }
            }

          }
          return repsValues;
        } else {
          return [];
        }
      },
      convertComponentStatus ( payload ) {

        this.$store.commit('status/convertStatus',payload)

      },
      findValue ( url ) {
        var target = undefined
        this.$store.state.values.forEach(item=>{
          if( item.url === url ) {
            target = item.value;
          }
        });
        return target;
      }
    }
  }
</script>
