<template>
    <hr />
    <div class="caption">
        <div class="icon4"></div>
        <span
            >身高<strong>{{ height }}</strong
            >cm</span
        >
    </div>
    <div class="cursor-bg">
        <div class="both-sides"></div>
        <div class="cursor-bg-center">
            <div class="cursor"></div>
        </div>
        <div class="both-sides"></div>
    </div>

    <div id="wrapper">
        <div id="scroller">
            <ul>
                <li v-for="(item, index) in unitArr" :key="'cm' + index">
                    <div class="scale">
                        <div class="scale-line-short"></div>
                        <div class="scale-space"></div>
                        <div class="scale-line-short"></div>
                        <div class="scale-space"></div>
                        <div class="scale-line" :id="item"></div>
                        <div class="scale-space"></div>
                        <div class="scale-line-short"></div>
                        <div class="scale-space"></div>
                    </div>
                    <div>{{ item }}</div>
                </li>
            </ul>
        </div>
    </div>
    <hr />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import BScroll from "better-scroll";
import { ease } from "@better-scroll/shared-utils";
interface offsetItem {
    id: string;
    diff: number;
}
interface scrollOffset {
    x: number;
    y: number;
}
function offSetBodyLeft(curEl: HTMLElement) {
    let parEl: HTMLElement = curEl.offsetParent as HTMLElement;
    let totalLeft = curEl.offsetLeft;
    if (parEl) totalLeft += offSetBodyLeft(parEl);
    return totalLeft;
}
export default defineComponent({
    name: "SlidingMeters",
    props: {
        minHeight: { type: String, default: "140" },
        initCursor: { type: String, default: "160" },
        duration: { type: Number, default: 300 },
    },
    emits: ["accepted"],
    setup(props, { emit }) {
        let unitNumber = 61;
        let unitArr: string[] = [];
        let height = ref("0");
        for (let i = 0; i < unitNumber; i++) {
            unitArr.push(String(Number(props.minHeight) + i));
        }
        let bsScroll: BScroll;
        let initBScroll = () => {
            height.value = props.initCursor;
            bsScroll = new BScroll("#wrapper", {
                scrollX: true,
                scrollY: false,
                freeScroll: true,
            });
            let initEl: HTMLElement = document.getElementById(
                props.initCursor
            ) as HTMLElement;
            bsScroll.scrollToElement(initEl, 0, true, false, ease.swipe);
            let cursorEl: HTMLElement = document.getElementsByClassName(
                "cursor"
            )[0] as HTMLElement;
            let cursorElWidth = cursorEl.offsetLeft;

            bsScroll.on("scrollEnd", (res: scrollOffset) => {
                let offsetDiff: offsetItem[] = [];
                unitArr.forEach((item) => {
                    let itemEl: HTMLElement = document.getElementById(
                        item
                    ) as HTMLElement;
                    let diff = Math.abs(
                        cursorElWidth - (offSetBodyLeft(itemEl) + res.x)
                    );
                    offsetDiff.push({
                        id: item,
                        diff: diff,
                    });
                });
                offsetDiff.sort((a, b) => a.diff - b.diff);
                let endEl: HTMLElement = document.getElementById(
                    offsetDiff[0].id
                ) as HTMLElement;
                bsScroll.scrollToElement(
                    endEl,
                    props.duration,
                    true,
                    false,
                    ease.swipeBounce
                );
                height.value = offsetDiff[0].id;
            });
        };
        watch(height, (newVal) => {
            emit("accepted", newVal);
        });
        onMounted(initBScroll);
        return {
            height,
            unitNumber,
            unitArr,
            ...props,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/main.css";
</style>
