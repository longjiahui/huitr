import { Descriptor } from './src/directives/gsap'
import type gsap from 'gsap'
import { Directive, DefineComponent } from 'vue'

export const TheTimeline = DefineComponent<{
    id?: string
    default?: Parameters<gsap.core.Timeline>[0]
    leavePosition?: string
    enterPosition?: string
    leaveIndex?: number | string
    enterIndex?: number | string
}>
export const gsapEnterDirective = Directive
export const gsapLeaveDirective = Directive

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        HuitrTimeline: DefineComponent<{
            id?: string
            default?: gsap.TimelineVars
            leavePosition?: string
            enterPosition?: string
            leaveIndex?: number | string
            enterIndex?: number | string
        }>
    }
    type directive = Directive<
        Element & {
            contextId: string
        },
        Descriptor | undefined
    >
    export interface ComponentCustomProperties {
        vHuitrEnter: directive
        vHuitrLeave: directive
    }
}
