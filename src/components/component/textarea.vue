<template>
  <FormItem :prop="item.name" >
  <i-input  type="textarea" style="width: 300px" :name="item.name" ></i-input>
  </FormItem>
</template>

<script>
  export default {

    created() {


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
    computed : {


    },
    methods : {

      initData () {

      }
    }
  }

</script>
