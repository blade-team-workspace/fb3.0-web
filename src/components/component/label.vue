<template>
<div class="label123" > {{value}}</div>
</template>

<script>
export  default  {
  created: function () {
  },
  props : {
    value:{
      type:String,
      default:''
    }
  }
}
</script>
