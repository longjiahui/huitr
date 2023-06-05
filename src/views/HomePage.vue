<template>
    <div class="h-full w-full bg-gradient-to-b from-sky-500 to-indigo-500">
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
            class="flex h-full w-full flex-col items-center justify-center space-y-4"
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
        <huitr-timeline>
            <div
                v-if="toggle"
                v-huitr-enter="
                    (tl: gsap.core.Timeline, el:Element) =>
                        tl.fromTo(
                            el.children,
                            {
                                translateX: 90,
                                opacity: 0,
                            },
                            {
                                translateX: 0,
                                opacity: 1,
                                stagger: 0.2,
                            },
                        )
                "
                v-huitr-leave="
                    (tl: gsap.core.Timeline, el:Element) =>
                        tl.to(el.children, {
                            translateX: 90,
                            opacity: 0,
                            stagger: 0.2,
                        })
                "
                class="fixed right-4 top-4 flex flex-col items-end"
            >
                <span
                    class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-8xl font-bold text-transparent"
                >
                    Hello
                </span>
                <span
                    class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent"
                    >world</span
                >
            </div>
        </huitr-timeline>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let toggle = ref(true)
</script>
