<!--单组件 左右排列 左label 右组件-->

<template>
  <!--<div class="multimedia" v-if="showOrhide ">-->
  <!--<Row>-->
  <!--<Col span="8"> <bpmLabel :value="containerData.label"></bpmLabel></Col>-->
  <!--<Col span="16">-->
  <!--<template v-if="!isRead">-->

  <!--<div class="component" v-for="(item,index) in containerData.items">-->
  <!--<bpmtext   @initCount="initCount" v-if="item.type=='text' && item.isShow" :itemData="item" v-model="modelValue[item.name]"  > </bpmtext>-->

  <!--<bpmtextArea  @initCount="initCount" v-if="item.type=='textArea'&& containerData.items[0].isShow" :itemData="item"   v-model="modelValue[item.name]" ></bpmtextArea>-->
  <!--<bpmSelect   @eventTrigger="eventTrigger" @initCount="initCount" v-if="item.type=='select'&& item.isShow" :itemData="item" :bpmValue="bpmValue"  v-model="modelValue[item.name]"  ></bpmSelect>-->
  <!--</div>-->


  <!--</template>-->
  <!--<template v-else>-->
  <!--<div class="read" v-for="(item,index) in containerData.items">-->
  <!--<bpmRead v-if="readValue[item.name]!==undefined && readValue[item.name]!==''" :value="readValue[item.name]"></bpmRead>-->
  <!--</div>-->
  <!--</template>-->
  <!--</Col>-->

  <!--</Row>-->
  <!--</div>-->

  <div class="multimedia" v-if="showOrhide">
    <Row>
      <Col span="8">
      <bpmLabel
        :value="container.label">
      </bpmLabel>
      </Col>
      <Col span="16">
      <div class="component" v-for="(item , index) in container.items">

        <bpmText
          ref="component"
          v-if="item.type ==='text'  && $store.state.status.class[item.name]"
          v-model="values[item.name]"
          :item="item">
        </bpmText>

        <bpmTextArea
          ref="component"
          v-if="item.type ==='textArea'&& $store.state.status.class[item.name] "
          v-model="values[item.name]"
          :item="item">
        </bpmTextArea>

        <bpmSelect
          ref="component"
          v-model="values[item.name]"
          v-if="item.type ==='select' && $store.state.status.class[item.name] "
          :item="item">
        </bpmSelect>

      </div>
      </Col>
    </Row>

  </div>
</template>

<script>
  import bpmText from '../component/text'
  import bpmTextArea from '../component/textarea'
  import bpmSelect from '../component/select'
  import bpmLabel from '../component/label'
  import bpmRead from '../component/read'
  export default  {
    created(){

    },
    data() {

    },
    props: {
      label: {
        type: String,
        required: true
      },
      container: {
        type: Object
      },
      isRead: {
        type: Boolean
      },
      values: {

      }
    },components :{
      bpmText,bpmTextArea,bpmSelect,bpmLabel,bpmRead
    },
    computed : {
      showOrhide:function () {
//
//        var tag = false;
//        console.log('showOrhide');
//        if(this.isRead) {
//          $.each(this.containerData.items, (index, item) => {
//            console.log(this.bpmValue)
//
//            if (this.bpmValue[item.name] !== '') {
//              console.log('true');
//              tag =  true;
//            } else {
//
//            }
//          });
//
//          return tag;
//        } else {
//          $.each(this.containerData.items , (index , item) => {
//
//            if(item.isShow) {
//              console.log('true');
//              tag =  true;
//            } else {
//
//            }
//
//          })
//
//
//          return tag;
//        }

        return true
      }
    },
    data() {
      return {

      }
    },
    methods : {

      eventTrigger(data){

        this.$emit('eventTrigger',data);
      },



    }

  }

</script>
<style scoped>


</style>
