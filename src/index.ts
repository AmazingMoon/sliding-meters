import SlidingMeters from "./components/SlidingMeters.vue"
import { App } from "vue"

SlidingMeters.install = (vue: App): void => {
    vue.component(SlidingMeters.name, SlidingMeters)
};

export default SlidingMeters