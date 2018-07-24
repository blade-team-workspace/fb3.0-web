const debug = process.env.NODE_ENV !== 'production'

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
