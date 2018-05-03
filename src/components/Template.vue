<template>
  <div>
    <bpmForm v-for="formData in formsData"  :formData="formData">

    </bpmForm>
  </div>


</template>

<script>
  import axios from 'axios'

  import bpmForm from  '../baseComponents/Form'
  export default {

     created() {
       this.getFormData();
     },
    components:{
      bpmForm
    },
    data(){
      return {
        formsData:''

      }
    },
    methods: {
      /**
       * 请求数据
       */
       getFormData () {
         axios.get('/class')
              .then((res) => {
                console.log(res.data.dataList);
                this.formsData = res.data.dataList;
              })
       }
    }

  }

</script>
