<template>
  <section>
    <b-tabs v-model="activeTab">
        <b-tab-item label="Grid" icon="th-large">
          <div class="columns is-flex-wrap-wrap -px-4">
            <div v-for="product in products" v-bind:key="product.slug" @click="handleSelectedModal(product)" class="is-one-third column">
              <div class="card">
                <div class="card-content">
                  <div class="content has-text-left">
                    <b-image
                      src="https://cdn.narrative.io/data-studio/images/narrative-placeholder-primary.svg"
                      alt="Icon"
                      class="product-image"
                    />
                    <h3 class="is-size-6 is-capitalized has-text-weight-medium has-text-grey-darker">{{ product.name }}</h3>
                    <b-taglist>
                      <b-tag type="is-dark" rounded>${{ product.price }}.00</b-tag>
                      <span class="is-size-7 mb-2"> Per 1k</span>
                    </b-taglist>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="List" icon="list">
          <div v-for="product in products" v-bind:key="product.slug" class="mb-2" @click="handleSelectedModal(product)">
            <div class="card">
              <div class="card-content">
                <div class="content is-align-items-center has-text-left columns">
                  <b-image
                    src="https://cdn.narrative.io/data-studio/images/narrative-placeholder-primary.svg"
                    alt="Icon"
                    class="list-product-image has-text-left column"
                  />
                  <h3 class="is-size-6 is-capitalized has-text-weight-medium has-text-grey-dark column">{{ product.name }}</h3>
                  <b-taglist class="column">
                    <b-tag type="is-dark" rounded>${{ product.price }}.00</b-tag>
                    <span class="is-size-7 mb-2"> Per 1k</span>
                  </b-taglist>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
    </b-tabs>
    <b-modal v-model="isCardModalActive" v-if="selectedProduct" :width="640" scroll="keep">
        <div class="card">
            <div class="card-content">
                <div class="content">
                  <b-image
                    src="https://cdn.narrative.io/data-studio/images/narrative-placeholder-primary.svg"
                    alt="Icon"
                    class="product-modal-image"
                  />
                  <h2>{{selectedProduct.name}}</h2>
                  <h4 class="is-size-7 has-text-weight-medium has-text-grey-darker is-uppercase mb-1">cost per thousand</h4>
                  <h4>${{ selectedProduct.price }}.00</h4>
                  <form v-if="updateForm" class="mt-4" @submit="handleUpdateProduct">
                    <b-field label="Name">
                        <b-input
                          placeholder="Product name"
                          type="text"
                          required
                          v-model="name"></b-input>
                    </b-field>
                    <b-field label="Price">
                        <b-numberinput min="1" v-model="price"></b-numberinput>
                    </b-field>
                    <b-field
                        label="Type">
                        <b-select required placeholder="Select package type" v-model="type" expanded>
                            <option v-for="(t, index)  in types" v-bind:key="index" :value="t">{{ t }}</option>
                        </b-select>
                    </b-field>
                    <div class="buttons mt-6 is-justify-content-center">
                        <b-button type="is-success" native-type="submit" v-bind:class="[updating ? 'is-loading' : '', 'px-6']">Update</b-button>
                        <b-button class="px-6" @click="handleShowUpdate()">Cancel</b-button>
                    </div>
                  </form>
                  <div v-if="isMerchant" class="action-buttons buttons mt-6 is-flex-direction-row is-justify-content-space-between buttons is-align-content-center">
                    <b-button type="is-success is-light" @click="handleShowUpdate()">Update</b-button>
                    <b-button type="is-danger is-light" @click="handleDeleteProduct()" v-bind:class="[deleting ? 'is-loading' : '', 'px-6']">Delete</b-button>
                  </div>
                  <div v-else class="action-buttons buttons mt-6 is-flex-direction-row is-justify-content-space-between buttons is-align-content-center">
                    <b-button type="is-success is-light">Buy</b-button>
                  </div>
                </div>
            </div>
        </div>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { sanitizeTitle } from '../utils';

export default {
  name: 'Home',
  props: {
    isMerchant: Boolean
  },
  data() {
    return {
      name: '',
      price: '',
      type: '',
      types: ['Device Location', 'Device Behavior', 'ID Mapping'],
      activeTab: 0,
      deleting: false,
      updating: false,
      updateForm: false,
      selectedProduct: null,
      isCardModalActive: false,
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'updateProduct', 'deleteProduct']),
    handleSelectedModal(product) {
      this.isCardModalActive = true;
      this.selectedProduct = product
    },

    handleDeleteProduct() {
      const { id } = this.selectedProduct;
      this.deleting = true;
      setTimeout(() => {
        this.deleteProduct(id);
        this.deleting = false;
        this.isCardModalActive = false;
        this.success('Product removed successfully!!!');
      }, 1000)
    },
    handleShowUpdate() {
      const { name, price, type } = this.selectedProduct;
      if (!this.updateForm) {
        this.name = name;
        this.price = price;
        this.type = type;
      } else {
        this.name = '';
        this.price = '';
        this.type = '';
      }
      this.updateForm = !this.updateForm;
    },
    handleUpdateProduct(e) {
      e.preventDefault();

      const { name, price, type } = this;
      const data = {
        ...this.selectedProduct,
        name,
        price,
        type,
        slug: sanitizeTitle(name),
        updatedAt: new Date(),
      };
      
      this.updating = true;
      this.updateProduct(data);
      setTimeout(() => {
          this.selectedProduct = data;
          this.updating = false;
          this.updateForm = false;
          this.name = '';
          this.price = '';
          this.type = '';
          this.success('Product successfully updated!');
      }, 1000);
    },
    success(message) {
      this.$buefy.toast.open({
          message,
          type: 'is-success'
      })
    },
  },
  computed: mapGetters(["products"]),
  created() {
    this.fetchProducts();
  },
  watch: {
    isCardModalActive: function(_value) {
      if (!_value) {
        this.selectedProduct = null;
        this.updateForm = false;
      }
    } 
  }
}
</script>


<style lang="scss">
  .product-image {
    width: 60px;
    margin: 0 !important;

    img {
      border-radius: 10px;
    }
  }

  .product-modal-image {
    width: 100px;
    margin: 0 auto !important;

    img {
      border-radius: 10px;
    }
  }
  .list-product-image {
    margin-left: 0 !important;
    margin-bottom: 0 !important;

    img {
      width: 60px !important;
      border-radius: 10px;
    }
  }

  .card {
    cursor: pointer;
  }
</style>