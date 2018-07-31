<!--单组件 左右排列 左label 右组件-->

<template>



  <div class="from-group" v-if="componentShow">
    <Row>
      <Col span="8">

      <bpmLabel
        :value="label">
      </bpmLabel>

      </Col>
      <Col span="16">

      <bpmText
        ref="component"
        v-if="container.items[0].type ==='text' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">
      </bpmText>

      <bpmTextArea
        ref="component"
        v-if="container.items[0].type ==='textArea' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">
      </bpmTextArea>

      <bpmSelect
        ref="component"
        v-if="container.items[0].type ==='select' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">
      </bpmSelect>

      <bpmImage
        ref="component"
        v-if="container.items[0].type ==='image' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">
      </bpmImage>

      <bpmNumber
        ref="component"
        v-if="container.items[0].type ==='number' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">
      </bpmNumber>

      <bpmDate
        ref="component"
        v-if="container.items[0].type ==='date' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">
      </bpmDate>

      <bpmMultiSelect
        ref="component"
        v-if="container.items[0].type ==='multiSelect' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]"
        :initFormValue="initialFormValue"
        :url="url">

      </bpmMultiSelect>
      </Col>
    </Row>
  </div>

</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  import bpmText from '../component/text'
  import bpmSelect from '../component/select'
  import bpmLabel from '../component/label'
  import bpmTextArea from '../component/textarea'
  import bpmImage from '../component/image'
  import bpmNumber from '../component/number'
  import bpmDate from '../component/date'
  import bpmMultiSelect from '../component/multi-select'

  export default {
    created() {

    },
    data() {

      return {
        showOrhide: true
      }
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
      url:{

      },
      initialFormValue:{

      }
    },
    computed: {

      componentShow: function () {
        var  a = true;
        this.$store.state.status.forEach(as => {
          if(as.url === this.url) {
            return a = as.status[this.container.items[0].name];
          }
        })

        return a
      }
    },
    components: {
      bpmText, bpmSelect, bpmLabel , bpmTextArea ,bpmImage ,bpmNumber,bpmDate,bpmMultiSelect
    },
    methods: {
      showChildComponent() {

        if (!this.isRead) {
          this.$refs.component.showOrHide = true;

        }
      }
    }

  }

</script>
<style scoped>


</style>
