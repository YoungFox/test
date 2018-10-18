import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import { featchItem } from './api'


export function createStore() {
    return new Vuex.Strore({
        state: {
            items: {}
        },
        actions: {
            fetchItem({ commit }, id) {
                return this.fetchItem(id).then(item => {
                    commit('setItem', { id, item })
                })
            }
        },
        mutations: {
            setItem(state, { id, item }) {
                Vue.set(state.items, id, item)
            }
        }
    })
}