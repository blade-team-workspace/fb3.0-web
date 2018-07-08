<!--单组件 左右排列 左label 右组件-->

<template>
  <!--<div class="form-group" v-if="showOrhide ">-->
  <!--<Row>-->
  <!--<Col span="8"> <bpmLabel :value="containerData.label"></bpmLabel></Col>-->
  <!--<Col span="16">-->
  <!--<template v-if="!isRead">-->


  <!--<bpmtext   @initCount="initCount" v-if="containerData.items[0].type=='text' && containerData.items[0].isShow" :itemData="containerData.items[0]" v-model="modelValue[containerData.items[0].name]"  > </bpmtext>-->

  <!--<bpmtextArea  @initCount="initCount" v-if="containerData.items[0].type=='textArea'&& containerData.items[0].isShow" :itemData="containerData.items[0]"   v-model="modelValue[containerData.items[0].name]" ></bpmtextArea>-->
  <!--<bpmSelect   @eventTrigger="eventTrigger" @initCount="initCount" v-if="containerData.items[0].type=='select'&& containerData.items[0].isShow" :itemData="containerData.items[0]" :bpmValue="bpmValue"  v-model="modelValue[containerData.items[0].name]"  ></bpmSelect>-->
  <!--</template>-->
  <!--<template v-else>-->

  <!--<bpmRead v-if="readValue!==''" :value="readValue"></bpmRead>-->
  <!--</template>-->
  <!--</Col>-->

  <!--</Row>-->
  <!--</div>-->


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
