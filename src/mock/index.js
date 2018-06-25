import dataList from '../server/data.json'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'


export default {
  init() {
    let mock = new MockAdapter(axios);
    mock.onGet('/class').reply(config => {

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dataList: dataList
          }])
        }, 100)
      })
    });
  }

}
