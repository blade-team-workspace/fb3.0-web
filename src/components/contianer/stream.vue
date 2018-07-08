
<template>
<div class="stream"  v-if="allShow">

  <div class="components" v-for="(item,index) in container.items">

0    <bpmText
      ref="component"
      v-if="item.type ==='textArea'"
      :item="item">

    </bpmText>
  </div>
</div>
</template>


<script>
//  import streamLabel from '../component/stream-label'
  import bpmText from '../component/text'

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
    }
  },
  methods : {
    componentClick ( index ) {
      this.$refs.component[index].showOrHide = true;
      this.popupVisible = false;
    }
  },
  components : {
    bpmText
  }
}
</script>
