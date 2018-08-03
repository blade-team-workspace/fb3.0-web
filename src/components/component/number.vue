<template>
  <div v-if="!isRead">
  <BpmFormItem :prop="item.name" :title="item.label">
    <i-select  :value="componentValue" style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
      <i-option v-for="item in option" :value="item" :key="item">{{ item }}</i-option>
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
  import logger from '../../utils/logger'
  import BpmFormItem from './local-form-item'
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
        componentValue: this.initFormValue[this.item.name],
        events: this.findSelfEvent()
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      url: {

      },
      initFormValue : {

      },
      isRead :{
        default : false
      }
    },
    computed: {

      option: function () {

        var valueList = [];
        if (this.item.sort === 'asc') {

          var i = this.item.minValue;
          while (i <= this.item.maxValue) {
            valueList.push(i);
            i += this.item.stepValue;
          }
        } else {
          var i = this.item.maxValue;
          while (i >= this.item.minValue) {
            valueList.push(i);
            i -= this.item.stepValue;

          }
        }
        return valueList

      }
    },
      methods: {
        eventTrigger(v) {
          this.componentValue = v;
          this.$emit('input',v)
          if(this.events !== undefined){
            logger.debug(this.item.name + '事件触发');
            logger.debug('event:' );
            logger.debug(this.events)
            logger.debug('value:' + this.componentValue)
            this.$bus.emit('triggerEvents',this.events ,this.componentValue);
          }
        },
        findSelfEvent() {
          var  value = undefined;
          this.$store.state.form.forEach(aa=> {
            if(aa.url === this.url) {
              var events = aa.events


              var name = this.item.name
              $.each(events, (index, event) => {
                if (event.trigger === name) {

                  value = event;
                }
              })
            }
          })
          return value;
        }
      },
      components: {
        BpmFormItem,bpmRead
      },
      created () {

      }
    }

</script>
