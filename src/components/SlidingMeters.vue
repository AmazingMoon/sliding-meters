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
<style scoped>
body {
    color: #59595b;
    margin: 0;
    text-align: center;
}

.both-sides {
    background: white;
    opacity: 0.9;
    width: 10%;
    z-index: 5;
}

.cursor-bg {
    width: 100%;
    height: 35px;
    display: flex;
    position: absolute;
}

.caption {
    width: 100%;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 9px 0 9px;
}

.cursor-bg-center {
    width: 80%;
    display: flex;
    justify-content: center;
}

.cursor {
    width: 2px;
    background: #2fa5dc;
    z-index: 5;
}

/*
【CSS sprite多图拼合图标 —— 等比例缩放】
原来图标52 * 52，现要改为32 * 32，总的大图是200 *700。

52/32=1.6  200/1.6=125

*/
.icon4 {
    background: url("../assets/images/icon.jpg") -84px 0;
    width: 25px;
    height: 28px;
    background-size: 166px auto;
}

span {
    font-size: 14px;
}

strong {
    margin: 0 5px;
    font-size: 14px;
    color: red;
}

#scroller {
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: auto;
    height: 35px;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
}

#scroller ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
}

#scroller li {
    margin: 0;
    width: auto;
    height: 50px;
    background-color: #ffffff;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: column;
    z-index: -1;
}

.scale {
    display: flex;
    flex-direction: row;
}

.scale-line {
    width: 1px;
    height: 25px;
    background-color: black;
}

.scale-line-short {
    width: 1px;
    height: 15px;
    background-color: black;
}

.scale-space {
    width: 10px;
    height: 35px;
}

#wrapper {
    position: relative;
    z-index: 1;
    height: 50px;
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    margin-bottom: 9px;
}
</style>
