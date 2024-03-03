<script>
import Lesson from "./components/Lesson.vue"
import Checkout from "./components/Checkout.vue"
export default {
  name: 'app',
  data() {
    return {
      sitename: "After School Lessons",
      currentView: Lesson
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
    }
  },
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
  }
}
</script>

<template>
  <div id="app">
    <header>
      <div>
        <h1>{{ sitename }}</h1>
      </div>
      <button @click="toggle">Checkout</button>
      <font-awesome-icon icon="fa-solid fa-cart-shopping" />
    </header>
    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<style scoped></style>
