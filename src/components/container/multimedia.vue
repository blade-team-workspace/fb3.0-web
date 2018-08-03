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
          :isRead="isRead"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmText>

        <bpmTextArea
          ref="component"
          v-if="item.type ==='textArea'&& status.status[item.name] "
          v-model="values[item.name]"
          :url="url"
          :isRead="isRead"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmTextArea>

        <bpmSelect
          ref="component"
          v-model="values[item.name]"
          v-if="item.type ==='select' && status.status[item.name] "
          :url="url"
          :isRead="isRead"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmSelect>

        <bpmMultiSelect
          ref="component"
          v-if="item.type ==='multiSelect' && status.status[item.name] "
          v-model="values[item.name]"
          :item="item"
          :isRead="isRead"
          :initFormValue="initialFormValue"
          :url="url">

        </bpmMultiSelect>

        <bpmImage
          ref="component"
          v-if="item.type ==='image' && status.status[item.name] "
          v-model="values[item.name]"
          :url="url"
          :isRead="isRead"
          :initFormValue="initialFormValue"
          :item="item">
        </bpmImage>

        <bpmDate
          ref="component"
          v-if="item.type ==='date' && status.status[item.name] "
          v-model="values[item.name]"
          :item="item"
          :isRead="isRead"
          :initFormValue="initialFormValue"
          :url="url">
        </bpmDate>

        <bpmNumber
          ref="component"
          v-if="item.type ==='number' && status.status[item.name]"
          v-model="values[item.name]"
          :url="url"
          :isRead="isRead"
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
  import $ from 'jquery'
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
        var tag = false;

        if(this.isRead) {  //只读状态只需要判断是否有值即可
          this.container.items.forEach(item =>{
            var  value =this.initialFormValue[item.name];
            if ($.isArray(value) ){
              if(value.length!==0){
                tag = true;
              }else {

              }
            } else if( value !== '') {
              tag = true;
            }else {

            }
          })

        } else { // 判断status

          this.$store.state.status.forEach(status => {
            if(status.url === this.url) {
              this.container.items.forEach(item => {

                if(status.status[item.name]) {
                  tag = true;
                }
              });
            }
          })

        }

        return tag
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
