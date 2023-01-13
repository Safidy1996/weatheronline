import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import camelCase from 'voca/camel_case'

Vue.use(Vuex)

const requireModule = require.context('.', true, /index.ts$/)
const modules: {[k: string]: Store<any>} = {};

requireModule.keys().forEach(fileName => {
  if (fileName === './index.ts') return

  const moduleName = camelCase(fileName.replace(/(\.\/|\/index.ts)/g, ''))
  // eslint-disable-next-line
  modules[moduleName] = requireModule(fileName).default
})


export default new Vuex.Store({ modules })