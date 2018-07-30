
<template>
<div class="stream"  v-if="true">

  <div class="components" v-for="(item,index) in container.items">

    <streamLabel
      v-if="item.type == 'stream-label'"
      :label="item.label">
    </streamLabel>

    <bpmText
      ref="component"
      v-if="item.type ==='text'||item.type ==='textArea' "
      v-model="values[item.name]"
      :item="item">
    </bpmText>



    <bpmSelect
      ref="component"
      v-if="item.type ==='select' "
      v-model="values[item.name]"
      :item="item">
    </bpmSelect>



    <bpmNumber
      ref="component"
      v-if="item.type ==='number' "
      v-model="values[item.name]"
      :item="item">
    </bpmNumber>


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
  import $ from 'jquery'

  export default {
    created () {


  },
  computed : {

    componentShows () {
      var statusList = []


      $.each( this.container.items , (index ,item) =>{

        statusList.push(this.$store.state.status.class[item.name])
      })

      return statusList;
    },

    allShow () {

      var tag = false;
      $.each(this.componentShows,(index , value ) =>{
        if(value) {
          tag = true;
        }
      })
      return true
    }

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
    initialFormValue:{

    }
  },
  methods : {
    componentClick ( index ) {
      this.$refs.component[index].showOrHide = true;
      this.popupVisible = false;
    }
  },
  components : {
    bpmText,streamLabel
  }
}
</script>
