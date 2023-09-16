import { EnterAndLeaveDescriptors } from '../directives/gsap'

export function fade(): EnterAndLeaveDescriptors {
    return {
        enter: {
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
        },
        leave: {
            opacity: 0,
        },
    }
}

export function fadeX(x: number): EnterAndLeaveDescriptors {
    return {
        enter: {
            from: {
                opacity: 0,
                translateX: x,
            },
            to: {
                opacity: 1,
                translateX: 0,
            },
        },
        leave: {
            opacity: 0,
            translateX: x,
        },
    }
}

export function fadeY(y: number): EnterAndLeaveDescriptors {
    return {
        enter: {
            from: {
                opacity: 0,
                translateY: y,
            },
            to: {
                opacity: 1,
                translateY: 0,
            },
        },
        leave: {
            opacity: 0,
            translateY: y,
        },
    }
}

export function scale(scale: number): EnterAndLeaveDescriptors {
    return {
        enter: {
            from: {
                opacity: 0,
                scale,
            },
            to: {
                opacity: 1,
                scale: 1,
            },
        },
        leave: {
            opacity: 0,
            scale,
        },
    }
}
