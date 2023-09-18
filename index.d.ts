import {
  Descriptor,
  EnterAndLeaveDescriptors,
  gsapEnterAndLeaveDirective,
  gsapEnterDirective,
  gsapLeaveDirective,
} from "./types/src/directives/gsap";
import gsap from "gsap";
import { DefineComponent, Directive, Plugin } from "vue";
export { TheTimeline } from "./types/src";

export * from "./src/scripts/huitrUtils";

export declare const gsapEnterDirective: typeof gsapEnterDirective;
export declare const gsapLeaveDirective: typeof gsapLeaveDirective;
export declare const gsapEnterAndLeaveDirective:
  typeof gsapEnterAndLeaveDirective;

declare const plugin: Plugin;
export default plugin;
