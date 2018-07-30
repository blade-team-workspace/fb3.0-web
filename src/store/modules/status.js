const state = [

  {
    url:'class',
    status :{
      text1:true,
      textArea1:true,
      select1222:true,
      multimedia_text:true,
      multimedia_select:true,
      image11:true,
      stream_read1:true,
      stream_read:true,
      text1444:true,
      b22:true,
      select1444:true,
      date111:true
    }

  },
  {
    url:'student',
    status:{
      text1:true,
      textArea1:true,
      select1222:true,
      multimedia_text:true,
      multimedia_select:true,
      image11:true,
      stream_read1:true,
      stream_read:true,
      text1444:true,
      b22:true,
      select1444:true,
      date111:true
    }

  }

]

const mutations = {
  convertStatus(state  , payload) {

    state.forEach(item => {
      if(item.url === payload.form){
        console.log('asdads')
        item.status[payload.name] = payload.isShow
      }
    })


  }
}

const getters = {
  // getStatusForList ( state  , payload) {
  //   var statusList = {};
  //
  //   for (var item in payload.items) {
  //     statusList[item.name] = state.class[item.name]
  //   }
  //   return statusList;
  // }
}
export  default {
  namespaced:true,
  state,
  mutations,
  getters
}
