<template>
  <div>
    <div class="form" v-for="form in forms">
      <bpmForm
        :form="form"
        >
      </bpmForm>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import bpmForm from './container/form'
  import $ from 'jquery'
  import logger from '../utils/logger'
//  import app from '../main'
  export default {

     created() {

       this.init();
       logger.debug('------- 表单数据 ----------')
       logger.debug(this.$store.state.form)
       logger.debug(this.forms)

     },
    computed :{


    },
    data () {
      return {
        forms : ''
      }
    },
    components:{
      bpmForm
    },

    methods: {

      init() {
        this.forms = this.$store.state.form;

        // 扩展array类型原生方法，添加obj如果是array，就让其元素合并，否则直接加入
        Array.prototype.add = function(obj) {
          var arrList = this;
          if ($.isArray(obj)) {
            $.each(obj, function(_idx) {
              arrList.push(obj[_idx]);
            });
          } else {
            arrList.push(obj);
          }
        }

        // 扩展array类型原生方法，添加如果array中含有obj，那么返回true
        Array.prototype.contains = function (obj) {
          var i = this.length;
          while (i--) {
            if (this[i] === obj) {
              return true;
            }
          }
          return false;
        }
      }
    }

  }

</script>
