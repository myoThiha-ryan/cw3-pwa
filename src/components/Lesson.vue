<script>
export default {
    name: "Lesson",
    props: ["lessons", "baseURL"],
    data() {
        return {}
    },
    methods: {
        isAddToCartDisabled(aLesson) {
            return aLesson.availability == 0;
        },
        addToCart(aLesson) {
            this.$emit("add-item-to-cart", aLesson)
        }
    }
}
</script>

<template>
    <div class="row column-gap-5 row-gap-3">
        <div class="card column" style="width: 18rem" v-for="lesson in lessons">
            <img class="card-img-top" v-bind:src="baseURL + lesson.image" v-bind:alt="lesson.altImage" />
            <div class="card-body">
                <h5 class="card-title">{{ lesson.title }}</h5>
                <p class="card-text">{{ lesson.description }}</p>
                <p class="card-text">Fees: &#163;{{ lesson.price }}</p>
                <p class="card-text">Location: {{ lesson.location }}</p>
                <p class="card-text">Available: {{ lesson.availability }}</p>
                <button class="disabledBtn" disabled v-if="isAddToCartDisabled(lesson)">
                    Add to Cart
                </button>
                <button class="btn btn-primary" v-on:click="addToCart(lesson)" v-else>
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>