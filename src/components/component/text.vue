<template>
  <BpmFormItem :prop="item.name" :title="item.label">
<i-input   v-model="componentValue" style="width: 300px" :name="item.name"  @on-blur="eventBlur"   >

</i-input>
  </BpmFormItem>
</template>

<script>
import BpmFormItem from './local-form-item'
export default {

  created() {

    this.$bus.emit('addValues',{
      name:this.item.name,
      value:this.componentValue
    });


  },
  mounted() {
//    this.$bus.emit('addField',this)
  },
  data () {
    return {
      componentValue:this.$store.state.values[this.item.name]
    }
  },
  props : {
    item:{
      type:Object,
      required:true
    }

  },
  methods : {
    eventBlur(e) {

      console.log('eventBlur_text');
      console.log(e)
      console.log(e.target.value);

       this.$emit('input',e.target.value)
     }
  },
  components:{
    BpmFormItem
  }
}

</script>
