<template>
<iForm  ref="formValidate" :id="url" :model="formValues" :rules="rules" :groupRules="groupRules" >
  <FormItem>
    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button></FormItem>
  <Button type="primary" @click="tes">test</Button></FormItem>
  <div class="container" ref="asd" v-for="item in containers">
    <fromGroup  v-if="item.type == 'form-group'"
                :label="item.label"
                :container="item"
                :values="formValues"
                :isRead="isRead"
    >
    </fromGroup>
    <multiMedia  v-if="item.type == 'multimedia'"
                 :label="item.label"
                 :container="item"
                 :isRead="isRead"
                 :values="formValues"
    >
    </multiMedia>
    <stream  v-if="item.type == 'stream'"
             :container="item"
             :isRead="isRead"
             :values="formValues"
    >
    </stream>
  </div>
</iForm>

</template>

<script>
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
        formValues:{
        },
        fields:[]
      }
    },
    components:{
      fromGroup,multiMedia,stream,iForm
    },
    computed :{ ...mapState('form',{
      url:state=>state.form.url,
      containers:state=>state.form.items,
      isRead : state=>state.form.isRead,
      events : state=> state.form.events,
      rules : state=>state.form.rules,
      groupRules : state=>state.form.groupRules
    })
//      formValues : function () {
//
//      console.log(this.$store.state.values)
//        return this.$store.state.values;
//      }

    },
    created() {


       this.total(valid=>{
         console.log('totol')
         console.log(valid)
       })
//      this.formValues = this.$store.state.values;
//      console.log(this.formValues)
      this.eventDispatch(this.events);
      this.$bus.on('addValues', this.addValues);

      this.$bus.on('addField',this.addField)
      this.$bus.on('triggerEvents', this.eventDispatchForTrigger);
    },
    methods : {
      tes() {

        console.log(this.$refs['formValidate'].$children.length);
        this.$refs['formValidate'].$children.forEach(item => {
          console.log(item.$refs['component']);
          if(item.$refs['component']!== undefined  ){
            if($.isArray(item.$refs['component'])){

            item.$refs['component'].forEach(aa =>{
              console.log(aa.item.name);
              console.log('=============');
              console.log(aa.componentValue);

            })
          }else {
              console.log(item.$refs['component'].item.name)
              console.log('=============');
              console.log(item.$refs['component'].componentValue)
            }
          }

        })

      },
      total (callback) {
        return new Promise(resolve => {
        var values = [{key: 'name', value: '123'}, {key: 'age', value: 'asd'}]

        let count = 0;
        let valid = true;

        values.forEach(field => {
        /*  field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (++count === values.length) {
              // all finish
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          })*/
          this.aaa(field,function (errors){
            if (errors) {
              valid = false;
            }
            if (++count === values.length) {
              // all finish
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          })
        })
      })
      },
      aaa(data,callback = function(){}) {

        var rule = {};
        rule[data.key] = {required: true}
        const a = new Schema(rule);
        var value = {};
        value[data.key] = data.value;
        a.validate(value, (errors, fields) => {
          if (errors) {
            callback(data.key + ' :something worong')
          } else {
            callback()
          }
        })

      },
      addValues(ob) {
        this.formValues[ob.name] = ob.value;
      },
      addField(obj) {
//        console.log('addField')
        console.log(obj)
        this.fields.push(obj)
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

             this.$refs[name].validateRequiredAtLeastOne (valid =>{
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
      eventDispatch (events) {
        $.each (events, (index , event) => {
          if(event.eventType === 'valueChangeShowHide' ){
            this.valueChangeShowHide(event);
          }
        })
      },
      eventDispatchForTrigger (event,value ) {
        console.log('trigger_event')
        if(event.eventType === 'valueChangeShowHide' ){
          this.valueChangeShowHide(event,value);
        }
      },
      valueChangeShowHide ( event , value) {
        var trigger = event.trigger;
        var allResp = [];	// 所有层
        var valueResps = [];//value层
        allResp =  this.getAllResp(event.valueResps);
        console.log('valueChangeShowHide')
        console.log(allResp)
        valueResps =  this.getValueReps(event,value!== undefined?value:this.$store.state.values[trigger])
        console.log(' ----- valueResps ----- ')
        console.log(valueResps);
        $.each(allResp , (index , value ) => {
          if(valueResps.contains(value)) {

            this.convertComponentStatus({
              name :value,
              isShow :true
            });
          } else {

            this.convertComponentStatus({
              name :value,
              isShow :false
            });
          }
        })
      },
      getAllResp (reps) {
        var allResp = [];
        $.each(reps , function (index ,valueResp) {
          if($.isArray(this)) {
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
        console.log(values);
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

//        this.$store._mutations['status/convertStatus',payload];
        this.$store.commit('status/convertStatus',payload)

      }
    }
  }
</script>
