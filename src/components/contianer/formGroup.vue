<!--单组件 左右排列 左label 右组件-->

<template>



  <div class="from-group" v-if="showOrhide">
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
        :item="container.items[0]">
      </bpmText>

      <bpmTextArea
        ref="component"
        v-if="container.items[0].type ==='textArea' "
        :item="container.items[0]">
      </bpmTextArea>

      <bpmSelect
        ref="component"
        v-if="container.items[0].type ==='select' "
        v-model="values[container.items[0].name]"
        :item="container.items[0]">
      </bpmSelect>

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

      }
    },
    computed: {

      componentShow: function () {
        return this.$store.state.status.class[this.container.items[0].name]
      }
    },
    components: {
      bpmText, bpmSelect, bpmLabel , bpmTextArea
    },
    methods: {
      showChildComponent() {

        if (!this.isRead) {
          console.log('showChildComponent')
          this.$refs.component.showOrHide = true;

        }
      }
    }

  }

</script>
<style scoped>


</style>
