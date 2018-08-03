<template>
  <div v-if="!isRead">
  <BpmFormItem  :prop="item.name"  :title="item.label" >
    <DatePicker type="date"  v-model="value" placeholder="Select date" format= "yyyy年MM月dd日" value="MM/dd/yy" style="width: 200px" @on-change="change"></DatePicker>
  </BpmFormItem>
  </div>
  <div v-else>
    <bpmRead
     :value="componentValue">

    </bpmRead>
  </div>
</template>

<script>
  import BpmFormItem from './local-form-item'
  import bpmRead from './read'

  export  default {


components : {
  BpmFormItem,bpmRead
},
  props : {
    item : {
   },
    initFormValue : {

    },
    isRead :{
      default : false
    }
  },
  data () {
    return {
      componentValue : this.initFormValue[this.item.name],
      value : ""
    }
  },
  created () {
  this.value = this.componentValue
    this.$bus.emit('addValues',{
      name:this.item.name,
      value:this.componentValue
    });
  },
  methods : {
    change (val ,type) {
       this.componentValue = val;
       this.$emit('input',this.componentValue)
    }
  }
}
</script>
