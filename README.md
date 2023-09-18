# HUITR 概览

这是一个跨 vue-router 页面的过渡动画设置库。动画部分使用 GSAP 库实现。

# 快速使用

## Install

```bash
npm i @anfo/huitr
```

## Usage

```ts
// main.ts / main.js
import App from './App.vue'
import HuitrPlugin from '@anfo/huitr'
import { createApp } from 'vue'

const app = createApp(App)

app.use(HuitrPlugin())
app.mount('#app')
```

```html
<!-- Some View.vue file -->
<template>
    <!-- like <transition> -->
    <huitr-timeline>
        <div
            v-if="toggle"
            v-huitr="$huitr.fade()"
            class="fixed h-full w-full bg-gradient-to-b from-sky-200 to-rose-400"
        ></div>
        <div
            v-else
            v-huitr="$huitr.fade()"
            class="fixed h-full w-full bg-gradient-to-b from-sky-800 to-blue-400"
        ></div>
    </huitr-timeline>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'

    let toggle = ref(true)
</script>
```

# API

## Component `huitr-timeline`

组件原理使用 transition 原生组件获得元素的 mount/unmount 事件，并触发 enter 和 leave 指令描述的动画。

timeline 组件之间可以相互嵌套

| Props         | 含义                                                                         |
| ------------- | ---------------------------------------------------------------------------- |
| default       | 默认的 GSAP Timeline 配置                                                    |
| leavePosition | 作为 nested timeline 的 leave 动画的 position 参数                           |
| leaveIndex    | 作为 nested timeline 的 leave 动画的 index 参数，表示 timeline step 执行顺序 |
| enterPosition | 作为 nested timeline 的 enter 动画的 position 参数                           |
| enterIndex    | 作为 nested timeline 的 enter 动画的 index 参数，表示 timeline step 执行顺序 |

## Directive `v-huitr-enter`

用来描述 enter 动画

### 使用 gsap 的 fromTo

```html
<huitr-timeline :default="{ duration: 0.55 }">
    <div
        v-huitr-enter::-1="{
        from: { opacity: 0 },
        to: { opacity: 1 },
    }"
    ></div>
</huitr-timeline>
```

### 使用 gsap 的 to

```html
<huitr-timeline :default="{ duration: 0.55 }">
    <div v-huitr-leave:-e0d5:100="{ opacity: 0, duration: 0.55 }"></div>
</huitr-timeline>
```

### 使用函数

```html
<huitr-timeline :default="{ duration: 0.55 }">
    <div
        v-huitr-leave:-e0d5:100="(tl: gsap.core.Timeline, el: Element)=>{ tl.to(el, {opacity: 0}) }"
    ></div>
</huitr-timeline>
```

## Directive `v-huitr-leave`

用来描述 leave 动画
