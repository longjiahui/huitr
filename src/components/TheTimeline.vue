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
import { searchParentTimeline } from '@/scripts/utils'
import gsap from 'gsap'
import shortid from 'shortid'
import { computed, nextTick } from 'vue'

const props = withDefaults(
    defineProps<{
        id?: string
        default?: object
        leavePosition?: string
        enterPosition?: string
        leaveIndex?: number | string
        enterIndex?: number | string
    }>(),
    {
        id: undefined,
        default: () => ({}),
        leavePosition: '0',
        enterPosition: '0',
        leaveIndex: 0,
        enterIndex: 0,
    },
)

const finalId = computed(() => props.id || shortid.generate())
const finalEnterIndex = computed(() =>
    isNaN(+props.enterIndex) ? 0 : +props.enterIndex,
)
const finalLeaveIndex = computed(() =>
    isNaN(+props.leaveIndex) ? 0 : +props.leaveIndex,
)

function resolveTimeline(
    groupFactory: typeof getEnterGroup,
): gsap.core.Timeline {
    const contexts = groupFactory(finalId.value)
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
            context.processor(timeline, context.el)
        }
    }
    timeline.then(() => {
        for (const i of Object.keys(indexedContexts)) {
            for (const context of indexedContexts[i]) {
                context.el.isEntered = true
            }
        }
    })
    return timeline
}

function resolveEnterTimeline() {
    return resolveTimeline(getEnterGroup)
}

function resolveLeaveTimeline() {
    return resolveTimeline(getLeaveGroup)
}

function handleMounted(el: Element) {
    el.timelineId = finalId.value
    nextTick(() => {
        // 查找到父 timelineID 并添加相关context
        const parentTimeline = searchParentTimeline(el)
        if (parentTimeline) {
            const parentTimelineId = parentTimeline.timelineId
            getEnterGroup(parentTimelineId).create(
                shortid.generate(),
                el,
                (tl) => {
                    tl.add(resolveEnterTimeline(), props.enterPosition)
                },
                finalEnterIndex.value,
            )
            getLeaveGroup(parentTimelineId).create(
                shortid.generate(),
                el,
                (tl) => {
                    tl.add(resolveLeaveTimeline(), props.leavePosition)
                },
                finalLeaveIndex.value,
            )
            if (parentTimeline.isEntered) {
                nextTick(() => {
                    resolveEnterTimeline()
                })
            }
        } else {
            // 最外层
            nextTick(() => {
                resolveEnterTimeline()
            })
        }
    })
}

async function handleLeave(_: any, done: () => void) {
    const timeline = await resolveLeaveTimeline()
    return timeline.then(() => done())
}
</script>
