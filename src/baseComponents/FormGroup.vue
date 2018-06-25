<!--单组件 左右排列 左label 右组件-->

<template>
<div class="form-group" v-if="showOrhide ">
  <Row>
    <Col span="8"> <bpmLabel :value="containerData.label"></bpmLabel></Col>
    <Col span="16">
    <template v-if="!isRead">


        <bpmtext   @initCount="initCount" v-if="containerData.items[0].type=='text' && containerData.items[0].isShow" :itemData="containerData.items[0]" v-model="modelValue[containerData.items[0].name]"  > </bpmtext>

      <bpmtextArea  @initCount="initCount" v-if="containerData.items[0].type=='textArea'&& containerData.items[0].isShow" :itemData="containerData.items[0]"   v-model="modelValue[containerData.items[0].name]" ></bpmtextArea>
      <bpmSelect   @eventTrigger="eventTrigger" @initCount="initCount" v-if="containerData.items[0].type=='select'&& containerData.items[0].isShow" :itemData="containerData.items[0]" :bpmValue="bpmValue"  v-model="modelValue[containerData.items[0].name]"  ></bpmSelect>
    </template>
    <template v-else>

      <bpmRead v-if="readValue!==''" :value="readValue"></bpmRead>
    </template>
    </Col>

  </Row>
</div>
</template>

<script>
  import bpmtext from '../components/Text'
  import bpmtextArea from '../components/TextArea'
  import bpmSelect from '../components/Select'
  import bpmLabel from './Label'
  import bpmRead from '../components/Read'
  import store from '../store/store'
  export default  {
    created(){


      this.readValue = this.bpmValue[this.containerData.items[0].name];
    },
    props: {
      containerData: {
        type: Object,
        required: true,
        validator: function (value) {
          return value.items.length == 1  //items只许有一个
        }

      },
      isRead : {

      },
      modelValue : {
        type: Object
      },
      bpmValue : {

        type:Object,
        required:true
      }
    },components :{
      bpmtext,bpmtextArea,bpmSelect,bpmLabel,bpmRead
    },
    computed : {
      showOrhide:function () {
        if(this.isRead) {
          return ( this.readValue !== '')
        } else {
          return this.containerData.items[0].isShow;
        }
      }
    },
      data() {
        return {
          count :0,
          readValue : ''
        }
      },
    methods : {

      initCount(){ // 初始化组件数量
        this.count++;
        console.log(this.count);
      },

      eventTrigger(data){

        this.$emit('eventTrigger',data);
      },



    }

}

</script>
<style scoped>


</style>
