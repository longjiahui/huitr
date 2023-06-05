<template>
    <div class="h-full w-full">
        <huitr-timeline>
            <div
                v-if="toggle"
                v-huitr-enter="{ from: { opacity: 0 }, to: { opacity: 1 } }"
                v-huitr-leave="{ opacity: 0 }"
                class="fixed h-full w-full bg-gradient-to-b from-sky-200 to-rose-400"
            ></div>
            <div
                v-else
                v-huitr-enter="{ from: { opacity: 0 }, to: { opacity: 1 } }"
                v-huitr-leave="{ opacity: 0 }"
                class="fixed h-full w-full bg-gradient-to-b from-sky-800 to-blue-400"
            ></div>
        </huitr-timeline>
        <huitr-timeline>
            <div
                v-if="toggle"
                v-huitr-enter="{
                    from: { translateX: '25vw', translateY: '-25vw' },
                    to: { translateX: 0, translateY: 0 },
                }"
                v-huitr-leave="{ translateX: '25vw', translateY: '-25vw' }"
                class="fixed right-[-20vw] top-[-20vw] h-[50vw] w-[50vw] rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-4"
            ></div>
            <div
                v-else
                v-huitr-enter="{
                    from: { translateX: '25vw', translateY: '-25vw' },
                    to: { translateX: 0, translateY: 0 },
                }"
                v-huitr-leave="{ translateX: '25vw', translateY: '-25vw' }"
                class="fixed right-[-20vw] top-[-20vw] h-[50vw] w-[50vw] rounded-full bg-gradient-to-l from-sky-900 to-purple-500 p-4"
            ></div>
        </huitr-timeline>
        <div
            v-huitr-enter="
                (tl: gsap.core.Timeline, el:Element) => {
                    tl.fromTo(
                        el.children,
                        {
                            translateY: 90,
                            opacity: 0,
                        },
                        {
                            translateY: 0,
                            opacity: 1,
                            stagger: 0.2,
                        },
                    )
                }
            "
            v-huitr-leave="
                (tl: gsap.core.Timeline, el:Element) =>
                    tl.to(el.children, {
                        translateY: 90,
                        opacity: 0,
                        stagger: 0.2,
                    })
            "
            class="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center space-y-4"
        >
            <button
                @click="toggle = !toggle"
                class="cursor-pointer rounded bg-sky-500 p-4 text-3xl font-bold tracking-widest text-white shadow-lg transition-none duration-300 hover:opacity-70"
            >
                Toggle
            </button>
            <button
                @click="$router.push('/test')"
                class="cursor-pointer rounded bg-sky-500 p-4 text-3xl font-bold tracking-widest text-white shadow-lg transition-none duration-300 hover:opacity-70"
            >
                Go
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let toggle = ref(true)
</script>
