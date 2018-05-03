<template>
  <i-select  style="width:200px">
    <i-option v-for="item in itemData.options" :value="item.value" :key="item.value">{{ item.label }}</i-option>
  </i-select>
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
