<template>
  <div v-if="!isRead">
  <BpmFormItem :prop="item.name" :title="item.label">
  <i-input  v-model="componentValue" type="textarea" style="width: 300px" :name="item.name"  @on-blur="eventBlur" ></i-input>
  </BpmFormItem>
  </div>
  <div v-else>
    <bpmRead
      :value="componentValue">

    </bpmRead>
  </div>
</template>

<script>
  import BpmFormItem from './local-form-item'
  import bpmRead from './read'
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

      },
      isRead :{
        default : false
      }

    },
    computed : {


    },
    methods : {

      eventBlur(e) {

        this.$emit('input',e.target.value)
      },
      initData () {

      }
    },
    components:{
      BpmFormItem,bpmRead
    }
  }

</script>
