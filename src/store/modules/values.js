const state = {
  select1:3,
  textArea1:"",
  text1:"",
  select3:"",
  textArea_multi:"",
  select1222:"",
  multimedia_text:"",
  multimedia_select:2
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
