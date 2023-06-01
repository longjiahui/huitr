import {
    ContextFactory,
    ContextManager,
    Context,
} from '@/scripts/contextManager'
import gsap from 'gsap'
import shortid from 'shortid'
import { Directive } from 'vue'

type Processor = (timeline: Timeline, el: HTMLElement) => any

class GsapProcessorContext implements Context {
    constructor(
        public id: string,
        public el: HTMLElement,
        public processor: Processor,
        public index: number,
    ) {}
}

type GsapProcessorContextFactory = ContextFactory<
    GsapProcessorContext,
    [HTMLElement, Processor, number?]
>
const gsapProcessorContextFactory: GsapProcessorContextFactory = (
    id: string,
    el: HTMLElement,
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

type Descriptor = FromTo | Processor | gsap.TweenVars

function isFromTo(descriptor: Descriptor): descriptor is FromTo {
    return 'from' in descriptor && 'to' in descriptor
}
function isProcessor(descriptor: Descriptor): descriptor is Processor {
    return descriptor instanceof Function
}

const gsapDirective = (
    groupFactory: (
        timelineId?: string,
    ) => ReturnType<typeof gsapProcessorContextManager.group>,
) =>
    ({
        mounted(el, binding) {
            const value = binding.value
            const [_position, _index, timelineId] =
                binding.arg?.split(':').map((d) => d.trim()) || []
            const index = isNaN(+_index) ? 0 : +_index
            const position =
                (_position &&
                    _position
                        .replaceAll('d', '.')
                        .replaceAll('E', '=')
                        .replaceAll('e', '=')
                        .replaceAll('R', '>')
                        .replaceAll('r', '>')
                        .replaceAll('L', '<')
                        .replaceAll('l', '<')) ||
                '0'
            console.debug(position, _position, index, timelineId, el)
            let processor: Processor
            if (value) {
                if (isFromTo(value)) {
                    processor = (tl: Timeline) =>
                        tl.fromTo(el, value.from, value.to, position)
                } else if (isProcessor(value)) {
                    processor = value
                } else {
                    processor = (tl: Timeline) => tl.to(el, value, position)
                }
                const context = groupFactory(timelineId).create(
                    shortid.generate(),
                    el,
                    processor,
                    index,
                )
                el.contextId = context.id
            }
        },
    } as Directive<
        HTMLElement & {
            contextId: string
        },
        Descriptor | undefined
    >)

export const gsapEnterDirective = gsapDirective(getEnterGroup)
export const gsapLeaveDirective = gsapDirective(getLeaveGroup)
