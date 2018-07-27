<template>
  <BpmFormItem :prop="item.name" :title="item.label">
  <i-select  :value="componentValue" style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
    <i-option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</i-option>
  </i-select>
  </BpmFormItem>
</template>

<script>
//  import store from '../../store/store'
import BpmFormItem from './local-form-item'
import logger from '../../utils/logger'
import $ from 'jquery'
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
        componentValue: this.$store.state.values[this.item.name],
        events: this.findSelfEvent()
      }
    },
    props : {
      item: {
        type: Object,
        required: true
      },



    },
    computed: {


    },
    methods : {
      findSelfEvent() {

        var events = this.$store.state.form.form.events

        var  value = undefined;
        var name = this.item.name
        $.each(events, (index, event) => {
          if (event.trigger === name) {

            value = event;
          }
        })

        return value;
      },
      eventTrigger (v) {

        this.componentValue = v;
        this.$emit('input',v)
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
      BpmFormItem
    }
  }

</script>
