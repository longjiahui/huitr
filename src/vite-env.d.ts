/// <reference types="vite/client" />
import * as $const from '@/const'
import * as models from '@/models'
import router from '@/router'
import * as utils from '@/scripts/utils'

declare module 'vue' {
    interface ComponentCustomProperties {
        $const: typeof $const
        $router: typeof router
        $utils: typeof utils
        $model: typeof models
    }
}

declare module 'events' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type EventMap = Record<string, any[]>
    type EventKey<T extends EventMap> = string & keyof T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type EventListener<T extends any[]> = (...rest: T) => void

    export class EventEmitter<Events extends EventMap> {
        on<Key extends keyof Events>(
            type: Key,
            listener: EventListener<Events[Key]>,
        ): this
        emit<Key extends keyof Events>(
            type: Key,
            ...params: Events[Key]
        ): boolean
        listeners<Key extends keyof Events>(
            type: Key,
        ): EventListener<Events[Key]>[]
    }
}
