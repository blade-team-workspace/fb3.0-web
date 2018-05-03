 var datalist=[{
  "label": "测试表单",
  "url": "class",
  "type": "form",
  "items": [{
    "label": "单行文本input",
    "type": "form-group",
    "groupId": "group0",
    "items": [{
      "name": "text1",
      "type": "text"
    }]
  },{
    "label": "多行文本textArea",
    "type": "form-group",
    "groupId": "group0",
    "items": [{
      "name": "textArea1",
      "type": "textArea"
    }]
  },{
    "label": "下拉单选-1",
    "type": "form-group",
    "groupId": "group0",
    "items": [
      {
        "name": "select1",
        "type": "select",
        "options": [{
          "label": "选项1",
          "value": 1
        }, {
          "label": "选项2",
          "value": 2
        }, {
          "label": "选项3",
          "value": 3
        }]
      }
    ]
  }]
}]
 export default datalist

