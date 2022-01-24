import Vue from 'vue'
import Vuex from 'vuex';

const PRODUCTS_IDENTIFIER = 'NARRATIVE/PRODUCTS';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts: (state, products) => (state.products = products),
    add: (state, product) => {
      const allProducts = state.products.concat(product)
      localStorage.setItem(PRODUCTS_IDENTIFIER, JSON.stringify(allProducts));
      state.products = allProducts;
      return allProducts;
    },
    update: (state, product) => {
      const clone = state.products.slice();
      const index = clone.findIndex(prod => prod.id === product.id);

      if (index !== -1) {
        state.products.splice(index, 1, product);
        localStorage.setItem(PRODUCTS_IDENTIFIER, JSON.stringify(state.products));
      }

      return state.products;
    },
    remove: (state, id) => {
      const products = state.products.filter(product => product.id !== id)
      localStorage.setItem(PRODUCTS_IDENTIFIER, JSON.stringify(products));
      state.products = products;

      return products;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      const data = localStorage.getItem(PRODUCTS_IDENTIFIER);

      commit('setProducts', data ? JSON.parse(data) : []);
    },

    addProduct({ commit }, data) {
      commit('add', data)
    },

    updateProduct({ commit }, data) {
      commit('update', data)
    },

    deleteProduct({ commit }, id) {
      commit('remove', id);
    }
  },
  getters: {
    products: (state) => {
      return state.products
    }
  }
})
