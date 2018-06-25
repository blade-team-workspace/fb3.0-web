<template>
  <FormItem :prop="itemData.name" >
  <i-select  style="width:200px" @on-change="eventTrigger($event)" :value="value" :name="itemData.name"  :rules="{required: true, message: 'Item can not be empty', trigger: 'change'}">
    <i-option v-for="item in itemData.options" :value="item.value" :key="item.value">{{ item.label }}</i-option>
  </i-select>
  </FormItem>
</template>

<script>
  import store from '../store/store'
  export default {

    created() {



    },
    data() {
      return {

      }
    },
    props : {
      itemData:{
        type : Object,
        required: true
      },
      bpmValue:{

      },
      value: {

      }


    },
    computed : {

    },
    methods : {
      eventTrigger (v) {

        console.log('select 事件触发');
        console.log(v);
        var name = this.itemData.name;
        var rules = store.state.rules;
        $.each(rules ,  (index , rule)=> {

          if(rule.trigger === name) {
             this.$emit('eventTrigger' , {
               "trigger":name,
               "valueResps":rule.valueResps,
               "value":v,
               "type":'valueChangeShowHide'
             })
          }
        })
        this.$emit('input',v)
     }
    }
  }

</script>
