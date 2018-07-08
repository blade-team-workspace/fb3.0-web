<template>
<i-form  ref="formValidate" :id="url" :model="formValues" :rules="rules" >
  <FormItem>
    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button></FormItem>
  <Button type="primary" @click="tes">test</Button></FormItem>
  <div class="container" v-for="item in containers">
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
    >
    </stream>
  </div>
</i-form>

</template>

<script>
  import fromGroup from './formGroup.vue'
  import multiMedia from './multiMedia.vue'
  import stream from './stream.vue'
  import { mapState, mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    data() {

      return {
        formValues:{
        }
      }
    },
    components:{
      fromGroup,multiMedia,stream
    },
    computed :{ ...mapState('form',{
      url:state=>state.form.url,
      containers:state=>state.form.items,
      isRead : state=>state.form.isRead,
      events : state=> state.form.events,
      rules : state=>state.form.rules
    })
//      formValues : function () {
//
//      console.log(this.$store.state.values)
//        return this.$store.state.values;
//      }

    },
    created() {

//      this.formValues = this.$store.state.values;
//      console.log(this.formValues)
      this.eventDispatch(this.events);
      this.$bus.on('addValues', this.addValues);

      this.$bus.on('triggerEvents', this.eventDispatchForTrigger);
    },
    methods : {
      tes() {
        console.log(this.formValues)
      },
      addValues(ob) {
        this.formValues[ob.name] = ob.value;
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      eventDispatch (events) {
        $.each (events, (index , event) => {
          if(event.eventType === 'valueChangeShowHide' ){
            this.valueChangeShowHide(event);
          }
        })
      },
      eventDispatchForTrigger (event,value ) {
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
