<template>
<i-form  :id="formData.url"  >

  <div class="container" v-for="containerData in formData.items" >
   <fromGroup v-if="containerData.type=='form-group'" :containerData="containerData"></fromGroup>



  </div>
</i-form>

</template>

<script>
  import fromGroup  from '../baseComponents/FormGroup.vue'
  export default {
    created(){
      console.log(this.formData)
    },
    props: {
      formData : {
        type:Object,
        required: true
      }
    },

    components : {
      fromGroup
    },
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>
