<template>
  <BpmFormItem :prop="item.name" >
    <i-select  :value="componentValue" style="width:200px" @on-change="eventTrigger($event)"  :name="item.name" >
      <i-option v-for="item in option" :value="item" :key="item">{{ item }}</i-option>
    </i-select>
  </BpmFormItem>
</template>

<script>
  //  import store from '../../store/store'
  import BpmFormItem from './local-form-item'
  export default {

    created() {
      this.$bus.emit('addValues', {
        name: this.item.name,
        value: this.componentValue
      });

    },
    data() {
      return {
        componentValue: this.$store.state.values[this.item.name],
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
    },
    computed: {

      option: function () {

        var valueList = [];
        if (this.item.sort === 'asc') {

          var i = this.item.minValue;
          while (i <= this.item.maxValue) {
            valueList.push(i);
            i += this.item.stepValue;
          }
        } else {
          var i = this.item.maxValue;
          while (i >= this.item.minValue) {
            valueList.push(i);
            i -= this.item.stepValue;

          }
        }
        return valueList

      }
    },
      methods: {
        eventTrigger(v) {
          this.componentValue = v;
          console.log('select 事件触发');
          console.log(v);
//        var name = this.itemData.name;
//        var rules = store.state.rules;
//        $.each(rules ,  (index , rule)=> {
//
//          if(rule.trigger === name) {
//             this.$emit('eventTrigger' , {
//               "trigger":name,
//               "valueResps":rule.valueResps,
//               "value":v,
//               "type":'valueChangeShowHide'
//             })
//          }
//        })
          this.$emit('input', v)
        }
      },
      components: {
        BpmFormItem
      },
      created () {
        console.log('=======')
        console.log(this.option)
      }
    }

</script>
