<template>
    <SlidingMeters
        init-cursor="170"
        min-height="160"
        :duration="350"
        @accepted="xxx"
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SlidingMeters from "../dist/index.esm.js";
// import SlidingMeters from "./components/SlidingMeters.vue";

export default defineComponent({
    name: "App",
    components: {
        SlidingMeters,
    },
    setup() {
        let xxx = (val: string) => {
            console.log(val);
        };
        return {
            xxx,
        };
    },
});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
