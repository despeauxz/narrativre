<template>
  <div id="app">
      <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://cdn.narrative.io/data-studio/images/narrative-placeholder-primary.svg"
                    alt="Narrative"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button type="is-success" @click="isMerchant = !isMerchant" outlined>
                        <span v-if="!isMerchant">Switch to Merchant</span>
                        <span v-else>Switch to buyer</span>
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    <div class="container is-fluid mt-6">
        <div class="columns">
            <div class="column is-one-quarter mt-6">
                <div v-if="isMerchant" class="mb-6">
                    <b-button type="is-primary is-light" expanded @click="isCardModalActive = true">Create Product</b-button>
                </div>
                <b-menu>
                    <b-menu-list>
                        <b-menu-item icon="information-outline" label="Info"></b-menu-item>
                        <b-menu-item icon="settings" :active="isActive" expanded>
                            <template #label="props">
                                Administrator
                            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-up' : 'menu-down'"></b-icon>
                            </template>
                            <b-menu-item icon="account" label="Users"></b-menu-item>
                            <b-menu-item icon="cellphone-link">
                            <template #label>
                                Devices
                                <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                                    <template #trigger>
                                        <b-icon icon="dots-vertical"></b-icon>
                                    </template>
                                    <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                                </b-dropdown>
                            </template>
                            </b-menu-item>
                            <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
                        </b-menu-item>
                        <b-menu-item icon="account" label="My Account">
                            <b-menu-item label="Account data"></b-menu-item>
                            <b-menu-item label="Addresses"></b-menu-item>
                        </b-menu-item>
                        </b-menu-list>
                        <b-menu-list>
                        </b-menu-list>
                        <b-menu-list label="Actions">
                        <b-menu-item label="Logout"></b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
            <div class="column is-three-quarters">
                <router-view :isMerchant="isMerchant" />
            </div>
        </div>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h3 class="is-size-5 has-text-weight-normal mb-6">Create Product</h3>
                    <form class="mt-4" @submit="handleSubmit">
                        <b-field label="Name">
                            <b-input placeholder="Product name"
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
                                <option v-for="t in types" v-bind:key="t" :value="t">{{ t }}</option>
                            </b-select>
                        </b-field>
                        <div class="buttons mt-6 is-justify-content-center">
                            <b-button type="is-success" native-type="submit" v-bind:class="[loading ? 'is-loading' : '', 'px-6']">Save</b-button>
                            <b-button class="px-6" @click="isCardModalActive = false">Cancel</b-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </b-modal>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { sanitizeTitle } from './utils';
    
    export default {
        data() {
            return {
                name: '',
                price: '',
                type: '',
                types: ['Device Location', 'Device Behavior', 'ID Mapping'],
                loading: false,
                isActive: false,
                isMerchant: true,
                isCardModalActive: false
            }
        },
        methods: {
            ...mapActions(['addProduct']),
            handleSubmit(e) {
                e.preventDefault();

                const { name, price, type } = this;
                const data = {
                    id: this.products.length + 1,
                    name,
                    price,
                    type,
                    slug: sanitizeTitle(name),
                    createdAt: new Date(),
                    updatedAt: null
                };
                
                this.loading = true;
                this.addProduct(data);
                setTimeout(() => {
                    this.loading = false;
                    this.isCardModalActive = false;
                    this.name = '';
                    this.price = '';
                    this.type = '';
                    this.success('Product added successfully!');
                }, 1500);
            },
            success(message) {
                this.$buefy.toast.open({
                    message,
                    type: 'is-success'
                })
            },
        },
        computed: mapGetters(["products"]),
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;
        }
    }

    label {
        text-align: left;
    }

    .b-numberinput {
        button {
            color: white;
        }
    }
</style>
