<template>
  <div v-if="!isRead">
  <BpmFormItem :prop="item.name" :title="item.label">
<i-input   v-model="componentValue" style="width: 60%" :name="item.name"  @on-blur="eventBlur"   >

</i-input>
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

    this.$bus.emit('addValues',{
      name:this.item.name,
      value:this.componentValue
    });


  },
  mounted() {
//    this.$bus.emit('addField',this)
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
  methods : {
    eventBlur(e) {

       this.$emit('input',e.target.value)
     }
  },
  components:{
    BpmFormItem,bpmRead
  }
}

</script>
