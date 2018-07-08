
// initial state
const state = {
  form:{
    label: "测试表单",
    url: "class",
    type: "form",
    isRead:false,
    items:[
      // {
      //   isShow:true,
      //   type:"stream",
      //   groupId: "group0",
      //   items: [{
      //
      //     name: "stream_read1",
      //     type: "stream-label",
      //     label: "轻轻地,我走了"
      //   },
      //     {
      //       name: "stream_read",
      //       type: "text"
      //     }
      //
      //   ]
      // },
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
        label: "单行文本input",
        type: "form-group",
        groupId: "group0",
        items: [{
          name: "text1",
          type: "text"
        }]
      },
      {
        isShow:true,
        label: "多行文本textArea",
        type: "form-group",
        groupId: "group0",
        items: [{
          name: "textArea1",
          type: "textArea"
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
    ],
    rules : {
      text1 :[{ required: true, message: 'The name cannot be empty', trigger: 'blur'},
      ],
      select1222:[{ required: true, message: 'The select cannot be empty', trigger: 'change',type:'number'}]
    },
    groupRules: {
      requireAtLeastOne: [
        ["multimedia_text", "multimedia_select"]
      ]
    },
      events : [
      {
      eventType: "valueChangeShowHide",
      trigger: "select1222",
      valueResps: {
        1: "",
        2: "",
        3: ["text1"]
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
