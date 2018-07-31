
<template>
<div class="stream"  v-if="true">

  <div class="components" v-for="(item,index) in container.items">

    <streamLabel
      v-if="item.type == 'stream-label'"
      :label="item.label">
    </streamLabel>

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

    <bpmNumber
      ref="component"
      v-if="item.type ==='number' && status.status[item.name]"
      v-model="values[item.name]"
      :url="url"
      :initFormValue="initialFormValue"
      :item="item">
    </bpmNumber>

    <bpmNumber
      ref="component"
      v-if="item.type ==='number' "
      v-model="values[item.name]"
      :item="item">
    </bpmNumber>

    <bpmDate
      ref="component"
      v-if="item.type ==='date' && status.status[item.name] "
      v-model="values[item.name]"
      :item="item"
      :initFormValue="initialFormValue"
      :url="url">
    </bpmDate>

  </div>
</div>
</template>


<script>
//  import streamLabel from '../component/stream-label'
import bpmText from '../component/text'
import bpmSelect from '../component/select'
import bpmLabel from '../component/label'
import bpmTextArea from '../component/textarea'
import bpmImage from '../component/image'
import bpmNumber from '../component/number'
import streamLabel from '../component/stream-label'
import bpmRead from '../component/read'
import bpmMultiSelect from '../component/multi-select'
import bpmDate from '../component/date'
  import $ from 'jquery'

export default  {
  created(){
    console.log(this.status);
  },
  data() {

  },
  props: {

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
    streamLabel,bpmText,bpmTextArea,bpmSelect,bpmLabel,bpmRead,bpmNumber,bpmImage,bpmMultiSelect,bpmDate
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
