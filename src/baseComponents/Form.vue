<template>
<i-form  ref="formData.values" :id="formData.url" :model="formData.values" :rules="formData.rules">
  <FormItem>
    <Button type="primary" @click="handleSubmit('formData.values')">Submit</Button></FormItem>
  <div class="container" v-for="containerData in formData.items" >

   <fromGroup v-if="containerData.type==='form-group'" :bpmValue="formData.values" @eventTrigger="eventTrigger"  :containerData="containerData" :modelValue="formData.values" :isRead="formData.isRead"></fromGroup>
   <multiMedia  v-if="containerData.type=='multimedia'" :bpmValue="formData.values" @eventTrigger="eventTrigger"  :containerData="containerData" :modelValue="formData.values" :isRead="formData.isRead"></multiMedia>


  </div>
</i-form>

</template>

<script>
  import fromGroup  from '../baseComponents/FormGroup'
  import store from '../store/store'
  import  multiMedia from '../baseComponents/multimedia'

  export default {
    created(){
      this.eventDispatch()
    },

    props: {
      formData : {
        type:Object,
        required: true
      },
      bpmRules: {


      },
      bpmValue: {

      }
    },

    components : {
      fromGroup,multiMedia
    },
    data(){
      return {

        renderData: ''


      }
    },
    methods:{
      valueChangeShowHide(rule ,value){ // 组件隐藏

        var trigger = rule.trigger;
        var allResp = [];	// 所有层
        var valueResps = [];//value层
        allResp =  this.getAllResp(rule.valueResps);

        console.log(' ----- allResp ----- ');
        console.log(allResp);
//
//
        valueResps =  this.getValueReps(rule,value!== undefined?value:store.state.values[trigger])
        console.log(' ----- valueResps ----- ')
        console.log(valueResps);

        $.each(allResp , (index , value ) => { //当前全部显示，其他全部隐藏
          if(valueResps.contains(value)) {
            var component = this.findComponent(value);
            if(component !== undefined) {
              component.isShow = true;
            } else {
              console.log("没找到对应component");
            }
          } else {
            var component = this.findComponent(value);
            if(component !== undefined) {
              component.isShow = false;
            } else {
              console.log("没找到对应component");
            }
          }

        })
        console.log(' ---- items -----')
        console.log(store.state.items);


      },

      eventDispatch () {  //
        var rules = store.state.rules;

        $.each(rules, (index,rule)=>{
          console.log(' ----- rule ----- ')

          if (rule.eventType === 'valueChangeShowHide' ) {
            console.log(' ----- valueChangeShowHide ----- ');
            console.log(rule);
            this.valueChangeShowHide(rule);
          }

        })
      },
      handleSubmit (name) {
        console.log(this.$refs)
        this.$refs[name].validate((valid) => {
          if (valid) {
           console.log('----true -----')
          } else {
            console.log('----false -----')
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

      getValueReps (rule ,values) { // 根据value来查找去重对应的
``
        var repsValues = [];
        if(values!==undefined) {
           if($.isArray(values)) {
              $.each(values , function (index, value) {
              var triggerValue = rule.valueResps[value];
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
          var triggerValue = rule.valueResps[values];
          if(triggerValue!==null && triggerValue !== undefined && triggerValue !== '') {

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
          return repsValues;
        }
      } else {
          return [];
        }
      },

      findComponent (name) {
        var target = undefined;
        $.each ( store.state.items , function ( index , container) {
          $.each(container.items , function ( _index , component) {
            if(name === component.name) {
              target = component
            }
          })
        });
        return target;
      },
      eventTrigger(data) {
        console.log(data)
        if(data.type === 'valueChangeShowHide') {

          this.valueChangeShowHide(data,data.value);
        }
      }







    }
  }
</script>
