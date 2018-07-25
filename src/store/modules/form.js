
// initial state
const state = {
  form:{
    label: "测试表单",
    url: "class",
    type: "form",
    isRead:false,
    items:[

      {
        isShow:true,
        label: "multimedia-测试",
        type: "multimedia",
        groupId: "group0",
        items: [{

          name: "multimedia_text",
          type: "text"
        },{
          name: "multimedia_select",
          type: "select",
          options: [{
            label: "选项1multi",
            value: 1
          }, {
            label: "选项2multi",
            value: 2
          }, {
            label: "选项3multi",
            value: 3
          }]
        }]
      },
      {
        isShow:true,
        label: "number",
        type: "form-group",
        groupId: "group0",
        items: [ {
          "label": "任务",
          "name": "b22",
          "type": "number",
          "minValue": 0,
          "maxValue": 10,
          "stepValue": 0.5
        }]
      },
      {
        isShow:true,
        label: "多行文本textArea",
        type: "form-group",
        groupId: "group0",
        items: [{
          name: "text1",
          type: "text"
        }]
      },
      {
        isShow:true,
        label: "select单选",
        type: "form-group",
        groupId: "group0",
        items: [{
          name: "select1222",
          type: "select",
          options: [{
            label: "选项111",
            value: 1
          }, {
            label: "选项2222",
            value: 2
          }, {
            label: "选项333",
            value: 3
          }]
        }]
      }
      ,
      {
        isShow:true,
        label: "图片选择",
        type: "form-group",
        groupId: "group0",
        items: [{
          name: "image11",
          type: "image"
        }]
      }
    ],
    rules : {

      textArea1:[{ required: true, message: 'The multi cannot be empty', trigger: 'blur'}]
    },
    groupRules: {
      requireAtLeastOne: [
         ["select1222", "multimedia_text"]
      ]
    },
      events : [
      {
      eventType: "valueChangeShowHide",
      trigger: "select1222",
      valueResps: {
        1: "",
        2: "",
        3: ["multimedia_select，multimedia_text"]
      }
    }

    ]

  }


}


const getters = {

/*  containerGetter: (state, getters ) => {
    return function( label ) {
      for ( let container in state.form.items) {
        if(container.label === label) {
          return container;
        }
      }
      return undefined
    }
  }*/
}
const mutations = {
  convertTextToTextArea (state) {  // 将text全部转化为textarea
    for( let container of state.form.items ) { // container
      for (let component of container.items) { // component
        if(component.type === "text") {
          component.type = "textArea"
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
