const state = [
  {
    url:'class',
    value:{
      select1:3,
      textArea1:"",
      text1:"123123",
      select3:"",
      textArea_multi:"",
      select1222:"",
      multimedia_text:"",
      multimedia_select:2,
      image11:[{url:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:123},
      ],
      stream_read1: "",
      stream_read:"",
      b22:"",
      text1444 :"",
      select1444:"",
      date111:"2018年07月26日"
    }

  },
  {
    url:'student',
    value: {
      select1:2,
      textArea1:"",
      text1:"",
      select3:"",
      textArea_multi:"",
      select1222:"",
      multimedia_text:"",
      multimedia_select:2,
      image11:[{url:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:123},
      ],
      stream_read1: "",
      stream_read:"",
      b22:"",
      text1444 :"",
      select1444:"",
      date111:"2018年07月28日"
    }

  }

]

const getters = {


}

const mutations = {
  setValue (state , payload) {
    state.forEach(item => {
      if(item.url === payload.form){

        item.value[payload.name] = payload.value
      }
    })
    // var name = payload.name;
    // var form = payload.form;
    // var value = payload.value;
    // state[form][name]  = value;
  }
}
export default {
  namespaced:true,
  state,
  getters,
  mutations
}
