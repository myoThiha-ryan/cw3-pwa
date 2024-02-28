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
    </header>
    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<style scoped></style>
