<template>
    <div
        @click="$router.push('/test')"
        class="flex h-full w-full flex-col items-center justify-center bg-sky-100"
    >
        <div
            v-huitr-leave::-1="{
                opacity: 0,
                translateX: 24,
                scale: 5,
            }"
            v-huitr-enter::1:R="{
                from: { scale: 2, opacity: 0 },
                to: { scale: 1, opacity: 1 },
            }"
            class="text-7xl font-bold"
        >
            hello
        </div>
        <div v-huitr-leave::2="{ opacity: 0, translateX: 24 }">HTLJSLDKFJl</div>
        <div v-huitr-leave:r:3="{ opacity: 0, translateX: 24 }">
            sdlfkjalsdkfj
        </div>
        <test-component
            v-huitr-leave:l:3="{ opacity: 0, translateX: 24, duration: 1 }"
        ></test-component>

        <huitr-timeline id="test" :default="{ duration: 0.5 }">
            <div
                v-if="test"
                v-huitr-leave:-e0d5:100:test="{ opacity: 0, duration: 0.5 }"
                v-huitr-enter:::test="{
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                }"
                class="flex flex-col"
            >
                <div v-huitr-leave:r::test="{ opacity: 0 }">lsdkjfl</div>
                <div v-huitr-leave:r::test="{ opacity: 0 }">lsdkjfl</div>
                <div v-huitr-leave:r::test="{ opacity: 0 }">lsdkjfl</div>
                <div v-huitr-leave:r::test="{ opacity: 0 }">lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
                <div>lsdkjfl</div>
            </div>
        </huitr-timeline>
        <button @click.stop="test = !test">toggle</button>
    </div>
</template>
<script setup lang="ts">
import TestComponent from '@/components/TestComponent.vue'
import { ref } from 'vue'

const test = ref(true)
</script>
