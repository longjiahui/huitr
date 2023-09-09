import TheTimeline from './components/TheTimeline.vue'
import { gsapLeaveDirective, gsapEnterDirective } from './directives/gsap'
import { Plugin } from 'vue'

export { TheTimeline }
export { gsapLeaveDirective, gsapEnterDirective }
export { default as gsap } from 'gsap'

export default () =>
    ({
        install(app) {
            app.component('HuitrTimeline', TheTimeline)
            app.directive('huitr-leave', gsapLeaveDirective)
            app.directive('huitr-enter', gsapEnterDirective)
        },
    } as Plugin)
