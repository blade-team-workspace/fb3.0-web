<template>
  <div>
    <Froms v-for="form in datas v-model:datas" >

    </Froms>
  </div>


</template>

<script>
  import axios from 'axios'

  import Froms from  '../baseComponents/Form.vue'
  export default {

     created() {
       console.log('111')
      this.getData1();
     },
    components:{
      Froms,

    },
    data(){
      return {
        datas:''

      }
    },
    methods: {
       getData1 () {
         axios.get('/class')
              .then((res) => {
                console.log(res.data.dataList);
                this.datas = res.data.dataList;

              })
       }
    }

  }

</script>
