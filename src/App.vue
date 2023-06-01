<template>
    <router-view v-slot="{ Component }">
        <huitr-timeline :default="{ duration: 0.55 }">
            <Component
                v-huitr-leave:-e0d5:100="{ opacity: 0, duration: 0.55 }"
                v-huitr-enter::-1="{
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                }"
                :is="Component"
            ></Component>
        </huitr-timeline>
    </router-view>
</template>
