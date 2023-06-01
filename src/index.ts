import TheTimelineVue from './components/TheTimeline.vue'
import { gsapLeaveDirective, gsapEnterDirective } from './directives/gsap'
import { Plugin } from 'vue'

export default () =>
    ({
        install(app) {
            app.component('HuitrTimeline', TheTimelineVue)
            app.directive('huitr-leave', gsapLeaveDirective)
            app.directive('huitr-enter', gsapEnterDirective)
        },
    } as Plugin)
