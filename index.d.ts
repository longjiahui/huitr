import {
  Descriptor,
  EnterAndLeaveDescriptors,
  gsapEnterAndLeaveDirective,
  gsapEnterDirective,
  gsapLeaveDirective,
} from "./src/directives/gsap";
import gsap from "gsap";
import { DefineComponent, Directive } from "vue";
export { TheTimeline } from "./src";

export * from "./src/scripts/huitrUtils";

export declare const gsapEnterDirective: typeof gsapEnterDirective;
export declare const gsapLeaveDirective: typeof gsapLeaveDirective;
export declare const gsapEnterAndLeaveDirective:
  typeof gsapEnterAndLeaveDirective;
