export default [
{
  label: "测试表单",
    url: "class",
  type: "form",
  isRead:false,
  items:[

  {

    label: "测试2场",
    type: "multimedia",
    groupId: "group0",
    items: [{

      label:'多选123',
      name: "multimedia_text",
      type: "text"
    },{
      name: "multimedia_select",
      type: "multiSelect",
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
  // {
  //   isShow:true,
  //   label: "日期选择",
  //   type: "form-group",
  //   groupId: "group0",
  //   items: [ {
  //     "label": "日期",
  //     "name": "date111",
  //     "type": "date",
  //
  //   }]
  // },
  {
    isShow:true,
    label: "多行文本textArea",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"文本1",
      name: "text1",
      type: "textArea"
    }]
  },
  {
    isShow:true,
    label: "select单选",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"单选1222",
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
    label: "多行文本textAr222ea",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"文本1444",
      name: "text1444",
      type: "text"
    }]
  },
  {
    isShow:true,
    label: "select单选",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"单选1444",
      name: "select1444",
      type: "select",
      options: [{
        label: "选项111222",
        value: 1
      }, {
        label: "选项2222",
        value: 2
      }, {
        label: "选项333",
        value: 3
      }]
    }]
  },
  {
    isShow:true,
    label: "图片选择",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"图片",
      name: "image11",
      type: "image",
      maxLength:'3'
    }]
  }
],
  rules : {
  // textArea1:[{ required: true, message: 'The multi cannot be empty', trigger: 'blur'}],
  b22:[{ required: true, message: 'The date cannot be empty', trigger: 'change',type:'number'}],
    multiSelect:[{ required: true, message: 'The multiSelect cannot be empty', trigger: 'change',type:'array'}],
    select1444:[{ required: true, message: 'The select1 cannot be empty', trigger: 'change',type:'number'}],
    date111:[{ required: true, message: 'The date111 cannot be empty', trigger: 'change'}],
    image11:[{ required: true, message: 'The image cannot be empty', trigger: 'change',type:'array'}],

},
  groupRules: {
    requireAtLeastOne: [
      ["select1222", "multimedia_text"],
      ['text1444',"select1444"]
    ]
  },
  events : [
    {
      eventType: "valueChangeShowHide",
      trigger: "multimedia_select",
      valueResps: {
        1: "",
        2: "",
        3: ["image11","multimedia_text"]
      }
    }

  ]

}
,
{
  label: "测试表单plus",
    url: "student",
  type: "form",
  isRead:false,
  items:[
  //
  // {
  //   isShow:true,
  //   label: "multimedia-测试",
  //   type: "multimedia",
  //   groupId: "group0",
  //   items: [{
  //
  //     label:'多选123',
  //     name: "multimedia_text",
  //     type: "text"
  //   },{
  //     name: "multimedia_select",
  //     type: "select",
  //     options: [{
  //       label: "选项1multi",
  //       value: 1
  //     }, {
  //       label: "选项2multi",
  //       value: 2
  //     }, {
  //       label: "选项3multi",
  //       value: 3
  //     }]
  //   }]
  // },
  {
    isShow:true,
    label: "number",
    type: "form-group",
    groupId: "group0",
    items: [ {
      label: "任务",
      name: "b22",
      type: "number",
      minValue: 0,
      maxValue: 10,
      stepValue: 0.5
    }]
  },
  {
    isShow:true,
    label: "日期选择",
    type: "form-group",
    groupId: "group0",
    items: [ {
      "label": "日期",
      "name": "date111",
      "type": "date",

    }]
  },
  {
    isShow:true,
    label: "多行文本textArea",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"文本1",
      name: "text1",
      type: "textArea"
    }]
  },
  {
    isShow:true,
    label: "select单选",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"单选1222",
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
    label: "多行文本textArea",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"文本1444",
      name: "text1444",
      type: "text"
    }]
  },
  {
    isShow:true,
    label: "select单选",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"单选1444",
      name: "select1444",
      type: "select",
      options: [{
        label: "选项1112323",
        value: 1
      }, {
        label: "选项2222",
        value: 2
      }, {
        label: "选项333",
        value: 3
      }]
    }]
  },
  {
    isShow:true,
    label: "图片选择",
    type: "form-group",
    groupId: "group0",
    items: [{
      label:"图片",
      name: "image11",
      type: "image",
      maxLength:'3'
    }]
  }
],
  rules : {
  // textArea1:[{ required: true, message: 'The multi cannot be empty', trigger: 'blur'}],
  date111:[{ required: true, message: 'The date cannot be empty', trigger: 'change'}]

},
  groupRules: {
    requireAtLeastOne: [
      // ["select1222", "multimedia_text"],
      // ['text1444',"select1444"]
    ]
  },
  events : [
    //   {
    //   eventType: "valueChangeShowHide",
    //   trigger: "select1222",
    //   valueResps: {
    //     1: "",
    //     2: "",
    //     3: ["multimedia_select","multimedia_text"]
    //   }
    // }

  ]

}
]

