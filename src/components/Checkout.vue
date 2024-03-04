<script>
export default {
    name: "Checkout",
    props: ["lessonsToCheckout", "baseURL"],
    data() {
        return {}
    },
    methods: {
        removeFromCart(aLesson) {
            this.$emit("remove-item-from-cart", aLesson);
        }
    }
}
</script>

<template>
    <div>
        <h4>Welcome to Checkout Page</h4>
        <div class="row column-gap-5 row-gap-3 mb-5">
            <div class="card column" style="width: 18rem" v-for="lesson in lessonsToCheckout">
                <img class="card-img-top" v-bind:src="baseURL + lesson.image" v-bind:alt="lesson.altImage" />
                <div class="card-body">
                    <h5 class="card-title">{{ lesson.title }}</h5>
                    <p class="card-text">{{ lesson.description }}</p>
                    <p class="card-text">Fees: {{ lesson.price }}</p>
                    <p class="card-text">Location: {{ lesson.location }}</p>
                    <p class="card-text">Available: {{ lesson.availability }}</p>
                    <button class="btn btn-danger" v-on:click="removeFromCart(lesson)">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>