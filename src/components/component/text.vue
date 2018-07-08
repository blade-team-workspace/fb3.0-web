<template>
  <FormItem :prop="item.name" >
<i-input   v-model="componentValue" style="width: 300px" :name="item.name"  @on-blur="eventBlur"   >

</i-input>
  </FormItem>
</template>

<script>
export default {

  created() {

    this.$bus.emit('addValues',{
      name:this.item.name,
      value:this.componentValue
    });

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
      console.log(e.target.value);

       this.$emit('input',e.target.value)
     }
  }
}

</script>
