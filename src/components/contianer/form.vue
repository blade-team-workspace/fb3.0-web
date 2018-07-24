<template>
<iForm  ref="formValidate" :id="url" :model="formValues" :rules="rules" :groupRules="groupRules" >
  <FormItem>
    <Button type="primary" @click="handleSubmit">Submit</Button></FormItem>
  <Button type="primary" @click="tes">test</Button></FormItem>
  <div class="container"  v-for="item in containers">
    <fromGroup  v-if="item.type == 'form-group'"
                ref="container"
                :label="item.label"
                :container="item"
                :values="formValues"
                :isRead="isRead"
    >
    </fromGroup>
    <multiMedia  v-if="item.type == 'multimedia'"
                 ref="container"
                 :label="item.label"
                 :container="item"
                 :isRead="isRead"
                 :values="formValues"
    >
    </multiMedia>
    <stream  v-if="item.type == 'stream'"
             ref="container"
             :container="item"
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
        formValues:{
          select1:3,
          textArea1:"",
          text1:"",
          select3:"",
          textArea_multi:"",
          select1222:"",
          multimedia_text:"",
          multimedia_select:2,
          image11:[{url:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:123},
          ],
          stream_read1: "",
          stream_read:""
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


    },
    created() {

      console.log(this.formValues)
      //事件绑定初始化走一遍
      this.eventDispatch(this.events);

      this.$bus.on('triggerEvents', this.eventDispatchForTrigger);
    },
    methods : {
      tes() {

        console.log(this.$refs['formValidate'].$children.length);
        this.$refs['formValidate'].$children.forEach(item => {
          console.log(item.$refs['component']);
          if(item.$refs['component']!== undefined){
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

        this.$store.commit('status/convertStatus',payload)

      }
    }
  }
</script>
