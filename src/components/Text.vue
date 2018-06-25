<template>
  <FormItem :prop="itemData.name" >
<i-input   style="width: 300px" :name="itemData.name" :value="value" @on-blur="eventBlur($event)"   >

</i-input>
  </FormItem>
</template>

<script>
export default {

  created() {


  },
  props : {
    itemData:{
      type : Object,
      required: true
    },
    value : {
      type:String

    }

  },
  methods : {
    eventBlur(e) {

       this.$emit('input',e.target.value)
     }
  }
}

</script>
