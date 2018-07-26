const state = {
  select1:3,
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
  text1444 :"",
  select1444:""
}

const getters = {


}

const mutations = {
  setValue (state , payload) {
    state[payload.name] = payload.value;
  }
}
export default {
  namespaced:true,
  state,
  getters,
  mutations
}
