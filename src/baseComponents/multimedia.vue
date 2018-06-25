<!--单组件 左右排列 左label 右组件-->

<template>
  <div class="multimedia" v-if="showOrhide ">
    <Row>
      <Col span="8"> <bpmLabel :value="containerData.label"></bpmLabel></Col>
      <Col span="16">
      <template v-if="!isRead">

        <div class="component" v-for="(item,index) in containerData.items">
          <bpmtext   @initCount="initCount" v-if="item.type=='text' && item.isShow" :itemData="item" v-model="modelValue[item.name]"  > </bpmtext>

          <bpmtextArea  @initCount="initCount" v-if="item.type=='textArea'&& containerData.items[0].isShow" :itemData="item"   v-model="modelValue[item.name]" ></bpmtextArea>
          <bpmSelect   @eventTrigger="eventTrigger" @initCount="initCount" v-if="item.type=='select'&& item.isShow" :itemData="item" :bpmValue="bpmValue"  v-model="modelValue[item.name]"  ></bpmSelect>
        </div>


      </template>
      <template v-else>
        <div class="read" v-for="(item,index) in containerData.items">
        <bpmRead v-if="readValue[item.name]!==undefined && readValue[item.name]!==''" :value="readValue[item.name]"></bpmRead>
        </div>
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
      console.log('multimedia')


        this.readValue = {}
        $.each(this.containerData.items , (index , item) => {
          var targetValue = this.bpmValue[item.name];
          if(targetValue!== '') {
            this.readValue[item.name] = targetValue;
        }
      })
      console.log(this.readValue)
      console.log(this.showOrhide)

    },
    data() {
      readValue :{}
    },
    props: {
      containerData: {
        type: Object,
        required: true,
        validator: function (value) {
          return value.items.length !==1  //items只许有一个
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

        var tag = false;
        console.log('showOrhide');
        if(this.isRead) {
          $.each(this.containerData.items, (index, item) => {
            console.log(this.bpmValue)

            if (this.bpmValue[item.name] !== '') {
              console.log('true');
              tag =  true;
            } else {

            }
          });

          return tag;
        } else {
          $.each(this.containerData.items , (index , item) => {

            if(item.isShow) {
              console.log('true');
              tag =  true;
            } else {

            }

          })


          return tag;
        }

      }
    },
    data() {
      return {
        count :0,
        hasValue : ''
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
