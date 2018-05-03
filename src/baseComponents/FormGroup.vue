<!--单组件 左右排列 左label 右组件-->

<template>
<div class="form-group">
  <Row>
    <Col  class="label" span="8">{{containerData.label}}</Col>
    <Col span="16">
    <bpmtext v-if="containerData.items[0].type=='text'" :itemData="containerData.items[0]"></bpmtext>
    <bpmtextArea v-if="containerData.items[0].type=='textArea'" :itemData="containerData.items[0]"></bpmtextArea>
    <bpmSelect v-if="containerData.items[0].type=='select'" :itemData="containerData.items[0]"></bpmSelect>
    </Col>

  </Row>
</div>
</template>

<script>
  import bpmtext from '../components/Text'
  import bpmtextArea from '../components/TextArea'
  import bpmSelect from '../components/Select'
  export default  {
    created(){
      console.log(this.containerData)
    },
    props: {
      containerData: {
        type: Object,
        required: true,
        validator: function (value) {
          return value.items.length == 1  //items只许有一个
        }

      }
    },components :{
      bpmtext,bpmtextArea,bpmSelect
    },
      data() {
        return {}
      }

}

</script>
<style scoped>


</style>
