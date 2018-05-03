<template>
<i-input style="width: 300px" :name="itemData.name">

</i-input>
</template>

<script>
export default {

  created() {

  },
  props : {
    itemData:{
      type : Object,
      required: true
    }

  }
}

</script>
