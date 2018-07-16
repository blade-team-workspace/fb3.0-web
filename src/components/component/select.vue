<template>
  <BpmFormItem :prop="item.name" >
  <i-select  :value="componentValue" style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
    <i-option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</i-option>
  </i-select>
  </BpmFormItem>
</template>

<script>
//  import store from '../../store/store'
import BpmFormItem from './local-form-item'
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
      eventTrigger (v) {

        console.log('select 事件触发');
        console.log(v);
//        var name = this.itemData.name;
//        var rules = store.state.rules;
//        $.each(rules ,  (index , rule)=> {
//
//          if(rule.trigger === name) {
//             this.$emit('eventTrigger' , {
//               "trigger":name,
//               "valueResps":rule.valueResps,
//               "value":v,
//               "type":'valueChangeShowHide'
//             })
//          }
//        })
        this.$emit('input',v)
     }
    },
    components : {
      BpmFormItem
    }
  }

</script>
