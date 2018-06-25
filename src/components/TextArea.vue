<template>
  <FormItem :prop="itemData.name" >
  <i-input  type="textarea" style="width: 300px" :name="itemData.name" ></i-input>
  </FormItem>
</template>

<script>
  export default {

    created() {

      this.initData();
   },
    data(){
      return {
      }
    },
    props : {
      itemData:{
        type : Object,
        required: true
      }

    },
    computed : {


    },
    methods : {

      initData () {

      }
    },
    watch :{

    }
  }

</script>
