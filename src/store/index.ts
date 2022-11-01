import { createStore } from 'vuex'
import getters from "./getters"
import user from './modules/user'
import basic from './modules/basic'

const store = createStore({
  getters,
  modules: {
    user,
    basic
  }
})
export default store