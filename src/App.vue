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
      order: {
        name: "",
        phoneNumber: "",
        orderedLessons: [],
        lessonIds: [],
        numberOfSpaces: {},
      },
      testConsole: true,
      showTestConsole: true,
      lessons: [],
      imageBaseURL: "https://cw2afterschoolapp-env.eba-4rnh2pp6.eu-west-2.elasticbeanstalk.com/",
      serverURL: "https://cw2afterschoolapp-env.eba-4rnh2pp6.eu-west-2.elasticbeanstalk.com/lessons"
    }
  },
  components: { Lesson, Checkout },
  created: function () {
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.register("service-worker.js");
    // }
    let webstore = this;
    fetch(
      this.serverURL
    ).then(function (response) {
      response.json().then(function (json) {
        webstore.lessons = json;
      });
    });
  },
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
    },
    addItemToCart(aLesson) {
      aLesson.availability--;
      this.cart.push(aLesson.id);
    },
    removeItemFromCart(aLesson) {
      const lessonIdToRemove = this.cart.find((elem) => {
        return elem === aLesson.id;
      });
      const lessonIndexToRemove = this.cart.indexOf(lessonIdToRemove);
      this.cart.splice(lessonIndexToRemove, 1);
      this.lessons.forEach((elem) => {
        if (elem.id === lessonIdToRemove) {
          elem.availability++;
        }
      });
      if (this.cart.length === 0) {
        console.log("There is no product to checkout")
        this.currentView = Lesson;
      }
    },
  },
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
    isCheckoutDisabled() {
      return this.cart.length == 0;
    },
    lessonsToCheckout() {
      const lessonsToCheckout = [];
      /* filtering lesson objects from lessons array that are to checkout*/
      this.lessons.forEach((lesson) =>
        this.cart.forEach((element) => {
          if (lesson.id === element) {
            lessonsToCheckout.push(lesson);
          }
        })
      );
      this.order.orderedLessons = lessonsToCheckout;
      /* filtering lessons ids that are to checkout */
      const lessonIdsToCheckout = lessonsToCheckout.filter(
        (lesson, index) =>
          lessonsToCheckout.findIndex((item) => item.id === lesson.id) ===
          index
      );
      lessonIdsToCheckout.forEach((lesson) => {
        this.order.lessonIds.push(lesson.id);
      });
      /* counting total number of specific lessons that are to checkout */
      lessonsToCheckout.forEach((lesson) => {
        this.order.numberOfSpaces[lesson.title] =
          (this.order.numberOfSpaces[lesson.title] || 0) + 1;
      });
      return lessonsToCheckout;
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
        <button class="btn btn-primary" @click="toggle" v-else>
          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          <span>&nbsp Checkout &nbsp</span>
          <span class="badge text-bg-danger">{{ cartItemCount }}</span>
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
      <component :is="currentView" :lessons="lessons" :baseURL="imageBaseURL" :lessonsToCheckout="lessonsToCheckout"
        @add-item-to-cart="addItemToCart" @remove-item-from-cart="removeItemFromCart">
      </component>
    </main>
  </div>
</template>

<style scoped></style>
