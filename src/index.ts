import TheTimeline from './components/TheTimeline.vue'
import {
    gsapLeaveDirective,
    gsapEnterDirective,
    gsapEnterAndLeaveDirective,
} from './directives/gsap'
import * as $huitr from './scripts/huitrUtils'
import { Plugin } from 'vue'

export { TheTimeline }
export { gsapLeaveDirective, gsapEnterDirective, gsapEnterAndLeaveDirective }
export { default as gsap } from 'gsap'

export * from './scripts/huitrUtils'

export default () =>
    ({
        install(app) {
            app.component('HuitrTimeline', TheTimeline)
            app.directive('huitr-leave', gsapLeaveDirective)
            app.directive('huitr-enter', gsapEnterDirective)
            app.directive('huitr', gsapEnterAndLeaveDirective)
            app.config.globalProperties.$huitr = $huitr
        },
    } as Plugin)
