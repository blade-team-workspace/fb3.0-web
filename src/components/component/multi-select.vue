<template>
  <BpmFormItem :prop="item.name" :title="item.label">
    <i-select  :value="componentValue" multiple  style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
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
        componentValue: this.initFormValue[this.item.name],
      }
    },
    props : {
      item: {
        type: Object,
        required: true
      },
    initFormValue : {

    }


    },
    computed: {


    },
    methods : {
      eventTrigger (v) {
        this.componentValue = v;
        console.log('select 事件触发');
        console.log(v);

        this.$emit('input',v)
      }
    },
    components : {
      BpmFormItem
    }
  }

</script>
