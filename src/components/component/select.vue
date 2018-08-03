<template>
  <div v-if="!isRead">
  <BpmFormItem :prop="item.name" :title="item.label">
  <i-select  :value="componentValue" style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
    <i-option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</i-option>
  </i-select>
  </BpmFormItem>

  </div>
  <div v-else>
    <bpmRead
      :value="componentValue">

    </bpmRead>
  </div>
</template>

<script>
//  import store from '../../store/store'
import BpmFormItem from './local-form-item'
import logger from '../../utils/logger'
import $ from 'jquery'
import bpmRead from './read'
  export default {

    created() {
      this.$bus.emit('addValues',{
        name:this.item.name,
        value:this.componentValue
      });



    },
    data() {
      return {
        option: this.item.options,
        componentValue:this.initFormValue[this.item.name],
        events: this.findSelfEvent()
      }
    },
    props : {
      item: {
        type: Object,
        required: true
      },
      url:{

      },
      initFormValue : {

      },
      isRead :{
        default : false
      }


    },
    computed: {


    },
    methods : {
      findSelfEvent() {
        var  value = undefined;
        this.$store.state.form.forEach(aa=> {

          if(aa.url === this.url) {
//            var events = aa.events

            var name = this.item.name

//            aa.events.forEach(event => {
//              if(event.trigger === name) {
//                value = event
//              }
//            })
            aa.events.forEach(item=>{
              if(item.trigger === name) {
                value = item
              }
            })

          }
        })

        return value;
      },
      eventTrigger (v) {

        this.componentValue = v;
        this.$emit('input',v)
//        console.log(this.events)
        this.findSelfEvent();
         if(this.events !== undefined){
          logger.debug(this.item.name + '事件触发');
          logger.debug('event:' );
          logger.debug(this.events)
          logger.debug('value:' + this.componentValue)
          this.$bus.emit('triggerEvents',this.events ,this.componentValue);
        }
     }
    },
    components : {
      BpmFormItem,bpmRead
    }
  }

</script>
