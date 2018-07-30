<template>
  <BpmFormItem :prop="item.name" :title="item.label">
  <i-input  v-model="componentValue" type="textarea" style="width: 300px" :name="item.name"  @on-blur="eventBlur" ></i-input>
  </BpmFormItem>
</template>

<script>
  import BpmFormItem from './local-form-item'
  export default {

    created() {


   },
    data () {
      return {
        componentValue:this.initFormValue[this.item.name]
      }
    },
    props : {
      item:{
        type:Object,
        required:true
      },
      initFormValue : {

      }

    },
    computed : {


    },
    methods : {

      eventBlur(e) {

        console.log('eventBlur_text');
        console.log(e.target.value);

        this.$emit('input',e.target.value)
      },
      initData () {

      }
    },
    components:{
      BpmFormItem
    }
  }

</script>
