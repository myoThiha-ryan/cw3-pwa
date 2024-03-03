<script>
import Lesson from "./components/Lesson.vue"
import Checkout from "./components/Checkout.vue"
export default {
  name: 'app',
  data() {
    return {
      sitename: "After School Lessons",
      currentView: Lesson,
      cart: [],
      testConsole: true,
      showTestConsole: true,
      serverURL: "https://cw2afterschoolapp-env.eba-4rnh2pp6.eu-west-2.elasticbeanstalk.com/lessons"
    }
  },
  components: { Lesson, Checkout },
  methods: {
    toggle() {
      if (this.currentView == Lesson) {
        this.currentView = Checkout
      } else {
        this.currentView = Lesson
      }
    },
    toggleShowTestConsole() {
      this.showTestConsole = !this.showTestConsole;
    },
    deleteAllCaches() {
      caches.keys().then(function (names) {
        for (let name of names)
          caches.delete(name);
      });
      console.log("All Cache deleted")
    },
    reloadPage() {
      window.location.reload()
    },
    unRegisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister()
        }
      })
      console.log("Service Workers Unregistered")
    }
  },
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
    isCheckoutDisabled() {
      return this.cart.length == 0;
    },
  }
}
</script>

<template>
  <div id="app" class="pt-3 pe-4 ms-5">
    <header class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1>{{ sitename }}</h1>
      </div>
      <div>
        <button class="btn btn-info" v-if="testConsole" @click="toggleShowTestConsole">
          <font-awesome-icon icon="fas fa-text-height" />
          Test Console
        </button>
      </div>
      <div>
        <button class="disabledBtn" disabled v-if="isCheckoutDisabled">
          <font-awesome-icon icon="fa-solid fa-cart-shopping">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartItemCount }}
            </span>
          </font-awesome-icon>
          <span>Checkout</span>
        </button>
        <button class="btn btn-primary" @click="togglePage" v-else>
          <font-awesome-icon icon="fa-solid fa-cart-shopping">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartItemCount }}
            </span>
          </font-awesome-icon>
          <span>&nbsp Checkout</span>
        </button>
      </div>
    </header>
    <div class="d-flex justify-content-between align-items-center mt-3 mb-3" v-if="testConsole && showTestConsole">
      <button @click="deleteAllCaches" class="btn btn-info">
        <font-awesome-icon icon="fas fa-trash" />
        Delete All Caches
      </button>
      <button @click="reloadPage" class="btn btn-info">
        <font-awesome-icon icon="fas fa-sync" />
        Reload Page
      </button>
      <div>
        <strong>HTTP Test: </strong>
        <a v-bind:href="serverURL" target="_blank">link</a>
      </div>
      <button @click="unRegisterAllServiceWorkers" class="btn btn-info">
        <font-awesome-icon icon="fab fa-uniregistry" />
        Unregister All ServiceWorkers
      </button>
    </div>
    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<style scoped></style>
