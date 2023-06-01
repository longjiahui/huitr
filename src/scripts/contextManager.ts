export interface Context {
    // context id
    id: string
}

export const defaultGroupId = '__defaultGroup'

export type ContextFactory<T extends Context, Rest extends any[] = any[]> = (
    id: string,
    ...rest: Rest
) => T

type getFactoryRestType<FactoryType extends ContextFactory<any>> =
    FactoryType extends (
        id: string,
        ...rest: infer R
    ) => ReturnType<FactoryType>
        ? R
        : any[]

export class ContextManager<
    ContextType extends Context,
    F extends ContextFactory<ContextType>,
> {
    // public contexts: Record<string, ContextType | undefined> = {}
    public contexts: {
        [groupId: string]: { [id: string]: ContextType | undefined } | undefined
    } = {}
    public factory: F

    constructor(f: F) {
        this.factory = f
    }

    group(_groupId?: string, ...rest: string[]) {
        let groupId = _groupId || defaultGroupId
        groupId = groupId + rest.join('')

        const ctx = {
            _register: (context: ContextType) => {
                if (!this.contexts[groupId]) {
                    this.contexts[groupId] = {}
                }
                this.contexts[groupId]![context.id] = context
            },
            get: () => {
                return this.contexts[groupId]
            },
            getContext: (id: string) => {
                return ctx.get()?.[id]
            },
            create: (id: string, ...rest: getFactoryRestType<F>) => {
                const context = this.factory(id, ...rest)
                ctx._register(context)
                return context
            },
            consume: () => {
                const contexts = this.contexts[groupId] || {}
                this.contexts[groupId] = {}
                return Object.values(contexts).filter(
                    (d) => !!d,
                ) as ContextType[]
            },
        }
        return ctx
    }
}

export type ContextGroup<
    ContextType extends Context,
    F extends ContextFactory<ContextType>,
> = ReturnType<InstanceType<typeof ContextManager<ContextType, F>>['group']>
