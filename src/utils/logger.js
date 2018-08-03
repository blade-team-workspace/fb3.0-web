const debug = process.env.NODE_ENV !== 'dev'

export  default {

  debug(obj) {
    if(debug) {
      console.log(obj);
    }
  },
  normal(obj) {
    console.log(obj)
  }
}
