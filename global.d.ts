import { Descriptor } from './types/src/directives/gsap'
import type {
    TheTimeline,
    gsapEnterDirective,
    gsapLeaveDirective,
    gsapEnterAndLeaveDirective,
} from './types/src/index.d.ts'
import * as $huitr from './types/src/scripts/huitrUtils'
import { Directive } from 'vue'

declare module 'vue' {
    export interface GlobalComponents {
        HuitrTimeline: typeof TheTimeline
    }
    type directive = Directive<Element, Descriptor | undefined>
    export interface ComponentCustomProperties {
        vHuitrEnter: typeof gsapEnterDirective
        vHuitrLeave: typeof gsapLeaveDirective
        vHuitr: typeof gsapEnterAndLeaveDirective
        $huitr: typeof $huitr
    }
}

export {}
