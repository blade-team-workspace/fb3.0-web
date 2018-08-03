<template>
  <div v-if="!isRead">
  <BpmFormItem :prop="item.name" :title="item.label">
    <i-select  :value="componentValue" multiple  style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
      <i-option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</i-option>
    </i-select>
  </BpmFormItem>
  </div>
  <div v-else>
    <bpmRead
      :value="value">

    </bpmRead>
  </div>
</template>

<script>
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
//      this.componentValue = this.value
      this.value.forEach (item=>{
        this.componentValue.push(item)
      })




    },
    data() {
      return {
        option: this.item.options,
        value:this.initFormValue[this.item.name],
        events: this.findSelfEvent(),
        componentValue:[]
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
            $.each(aa.events, (index, event) => {
              if (event.trigger === name) {

                value = event;
              }
            })
          }
        })
        return value;
      },
      eventTrigger (v) {

        this.componentValue = v;
//        this.$emit('input',v)
//        logger.debug('value:' + this.value)
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
