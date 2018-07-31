<!--单组件 左右排列 左label 右组件-->

<template>


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
          v-if="item.type ==='text'  && status.status[item.name]"
          v-model="values[item.name]"
          :url="url"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmText>

        <bpmTextArea
          ref="component"
          v-if="item.type ==='textArea'&& status.status[item.name] "
          v-model="values[item.name]"
          :url="url"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmTextArea>

        <bpmSelect
          ref="component"
          v-model="values[item.name]"
          v-if="item.type ==='select' && status.status[item.name] "
          :url="url"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmSelect>

        <bpmMultiSelect
          ref="component"
          v-if="item.type ==='multiSelect' && status.status[item.name] "
          v-model="values[item.name]"
          :item="item"
          :initFormValue="initialFormValue"
          :url="url">

        </bpmMultiSelect>

        <bpmImage
          ref="component"
          v-if="item.type ==='image' && status.status[item.name] "
          v-model="values[item.name]"
          :url="url"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmImage>

        <bpmDate
          ref="component"
          v-if="item.type ==='date' && status.status[item.name] "
          v-model="values[item.name]"
          :item="item"
          :initFormValue="initialFormValue"
          :url="url">
        </bpmDate>

        <bpmNumber
          ref="component"
          v-if="item.type ==='number' && status.status[item.name]"
          v-model="values[item.name]"
          :url="url"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmNumber>
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
  import bpmNumber from '../component/number'
  import bpmImage from '../component/image'
  import bpmMultiSelect from '../component/multi-select'
  import bpmDate from '../component/date'
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

      },
      url : {

      },
      initialFormValue:{

      }
    },components :{
      bpmText,bpmTextArea,bpmSelect,bpmLabel,bpmRead,bpmNumber,bpmImage,bpmMultiSelect,bpmDate
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
      },
      status : function() {
        var a = undefined;
        this.$store.state.status.forEach(aa => {
          if(aa.url === this.url) {
            a = aa;
          }

        })
        return a;
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
