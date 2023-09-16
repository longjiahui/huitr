import {
    ContextFactory,
    ContextManager,
    Context,
} from '../scripts/contextManager'
import { searchTimelineId } from '../scripts/utils'
import gsap from 'gsap'
import shortid from 'shortid'
import { Directive, nextTick } from 'vue'

type Processor = (timeline: Timeline, el: Element) => any

class GsapProcessorContext implements Context {
    constructor(
        public id: string,
        public el: Element,
        public processor: Processor,
        public index: number,
    ) {}
}

type GsapProcessorContextFactory = ContextFactory<
    GsapProcessorContext,
    [Element, Processor, number?]
>
const gsapProcessorContextFactory: GsapProcessorContextFactory = (
    id: string,
    el: Element,
    processor: Processor,
    index = 0,
) => {
    return new GsapProcessorContext(id, el, processor, index)
}

type Timeline = ReturnType<typeof gsap.timeline>

export class GsapProcessorContextManager extends ContextManager<
    GsapProcessorContext,
    GsapProcessorContextFactory
> {}

interface FromTo {
    from: gsap.TweenVars
    to: gsap.TweenVars
}

export class LeaveContextManager extends GsapProcessorContextManager {
    constructor(f: GsapProcessorContextFactory) {
        super(f)
    }
}
export const gsapProcessorContextManager = new GsapProcessorContextManager(
    gsapProcessorContextFactory,
)
export const getLeaveGroup = (timeline?: string) =>
    gsapProcessorContextManager.group(timeline, 'leave')
export const getEnterGroup = (timeline?: string) =>
    gsapProcessorContextManager.group(timeline, 'enter')

export type Descriptor = FromTo | Processor | gsap.TweenVars

function isFromTo(descriptor: Descriptor): descriptor is FromTo {
    return 'from' in descriptor && 'to' in descriptor
}
function isProcessor(descriptor: Descriptor): descriptor is Processor {
    return descriptor instanceof Function
}

function parsePosition(position: string | undefined) {
    return (
        (position &&
            position
                .replaceAll('d', '.')
                .replaceAll('E', '=')
                .replaceAll('e', '=')
                .replaceAll('R', '>')
                .replaceAll('r', '>')
                .replaceAll('L', '<')
                .replaceAll('l', '<')) ||
        '0'
    )
}

function parseArg(arg: string | undefined) {
    const [_position, _index, timelineId] =
        arg?.split(':').map((d) => d.trim()) || []
    const index = isNaN(+_index) ? 0 : +_index
    return { position: parsePosition(_position), index, timelineId }
}

function getProcessor<T extends Element>(
    el: T,
    descriptor: Descriptor,
    position?: string,
) {
    let processor: Processor
    if (isFromTo(descriptor)) {
        processor = (tl: Timeline) =>
            tl.fromTo(el, descriptor.from, descriptor.to, position)
    } else if (isProcessor(descriptor)) {
        processor = descriptor
    } else {
        processor = (tl: Timeline) => tl.to(el, descriptor, position)
    }
    return processor
}

const gsapDirective = (
    groupFactory: (
        timelineId?: string,
    ) => ReturnType<typeof gsapProcessorContextManager.group>,
) =>
    ({
        mounted(el, binding) {
            // 等待timeline设置 timelineID 后再初始化
            nextTick(() => {
                const { position, timelineId, index } = parseArg(binding.arg)
                if (binding.value) {
                    // 如果没有指定timelineId 需要在dom树往上查找timeline
                    const finalTimelineId = timelineId || searchTimelineId(el)
                    groupFactory(finalTimelineId).create(
                        shortid.generate(),
                        el,
                        getProcessor(el, binding.value, position),
                        index,
                    )
                }
            })
        },
    } as Directive<Element, Descriptor | undefined>)

export interface EnterAndLeaveDescriptors {
    enter?: Descriptor
    leave?: Descriptor
    enterArg?: string
    leaveArg?: string
}

export const gsapEnterDirective = gsapDirective(getEnterGroup)
export const gsapLeaveDirective = gsapDirective(getLeaveGroup)
export const gsapEnterAndLeaveDirective = {
    mounted(el, binding) {
        // 等待timeline设置 timelineID 后再初始化
        nextTick(() => {
            if (binding.value) {
                const { enter, leave, enterArg, leaveArg } = binding.value
                if (enter) {
                    const { position, timelineId, index } = parseArg(
                        enterArg || binding.arg,
                    )
                    const finalTimelineId = timelineId || searchTimelineId(el)
                    getEnterGroup(finalTimelineId).create(
                        shortid.generate(),
                        el,
                        getProcessor(el, enter, position),
                        index,
                    )
                }
                if (leave) {
                    const { position, timelineId, index } = parseArg(
                        leaveArg || binding.arg,
                    )
                    const finalTimelineId = timelineId || searchTimelineId(el)
                    getLeaveGroup(finalTimelineId).create(
                        shortid.generate(),
                        el,
                        getProcessor(el, leave, position),
                        index,
                    )
                }
            }
        })
    },
} as Directive<Element, EnterAndLeaveDescriptors | undefined>
