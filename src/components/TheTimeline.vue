<template>
    <Transition
        :css="false"
        @after-enter="handleMounted"
        @leave="handleLeave"
        mode="out-in"
        appear
    >
        <slot></slot>
    </Transition>
</template>

<script lang="ts" setup>
import { getLeaveGroup, getEnterGroup } from '@/directives/gsap'
import gsap from 'gsap'
import { nextTick } from 'vue'

const props = withDefaults(
    defineProps<{
        id?: string
        default?: object
    }>(),
    {
        id: undefined,
        default: () => ({}),
    },
)

async function resolveTimeline(groupFactory: typeof getEnterGroup) {
    const contexts = groupFactory(props.id)
        .consume()
        .sort((a, b) => (a.index || 0) - (b.index || 0))
    const indexedContexts = contexts.reduce<Record<string, typeof contexts>>(
        (t, c) => {
            if (!(t[c.index] instanceof Array)) {
                t[c.index] = []
            }
            t[c.index].push(c)
            return t
        },
        {},
    )
    const timeline = gsap.timeline(props.default)
    for (const i of Object.keys(indexedContexts)) {
        for (const context of indexedContexts[i]) {
            const ret = context.processor(timeline, context.el)
            if (ret instanceof Promise) {
                await ret
            }
        }
    }
    return timeline
}

function handleMounted() {
    nextTick(() => resolveTimeline(getEnterGroup))
}

async function handleLeave(_: any, done: () => void) {
    const timeline = await resolveTimeline(getLeaveGroup)
    return timeline.then(() => done())
}
</script>
