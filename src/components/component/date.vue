<template>
  <BpmFormItem :prop="item.name"  :title="item.label" >
    <DatePicker type="date"  v-model="value" placeholder="Select date" format= "yyyy年MM月dd日" value="MM/dd/yy" style="width: 200px" @on-change="change"></DatePicker>
  </BpmFormItem>
</template>

<script>
  import BpmFormItem from './local-form-item'
export  default {


components : {
  BpmFormItem
},
  props : {
    item : {
   }
  },
  data () {
    return {
      componentValue : this.$store.state.values[this.item.name],
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
       console.log(val);
       this.componentValue = val;
       this.$emit('input',this.componentValue)
    }
  }
}
</script>
