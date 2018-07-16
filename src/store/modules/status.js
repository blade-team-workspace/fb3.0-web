const state = {

  class:{
    text1:true,
    textArea1:true,
    select1222:true,
    multimedia_text:true,
    multimedia_select:true
  }

}

const mutations = {
  convertStatus(state  , payload) {

    state.class[payload.name] = payload.isShow;

  }
}

const getters = {
  getStatusForList ( state  , payload) {
    var statusList = {};

    for (var item in payload.items) {
      statusList[item.name] = state.class[item.name]
    }
    return statusList;
  }
}
export  default {
  namespaced:true,
  state,
  mutations,
  getters
}