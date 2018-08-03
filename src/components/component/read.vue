<template>
  <BpmFormItem v-if="showValue">


  <span> {{label}} </span>
  </BpmFormItem>
</template>


<script>
  import BpmFormItem from './local-form-item'
  import $ from 'jquery'
export  default {
  created : function() {

  },
  data() {
    return {

    }
  },
  props : {

    value:{

      required:true
    }
  },
  components : {
    BpmFormItem
  },
  computed: {
    showValue:function () {
      if($.isArray(this.value)) {
        if(this.value.length !== 0) {
          return true;
        } else {
          return false;
        }
      } else if(this.value !== '' ) {
          return true;
      } else {
        return false
      }
    },
    label : function () {
      if($.isArray(this.value)) {
        return this.value.join(',')
      } else {
        return this.value
      }
    }
  }

}

</script>
