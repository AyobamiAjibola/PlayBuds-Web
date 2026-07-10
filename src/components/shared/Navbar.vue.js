/// <reference types="../../../node_modules/.pnpm/@vue+language-core@3.3.7/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../node_modules/.pnpm/@vue+language-core@3.3.7/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Menu, X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
const open = ref(false);
const links = [
    { to: '/', label: 'Home' }
];
const toggleMenu = () => {
    open.value = !open.value;
};
const closeMenu = () => {
    open.value = false;
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "sticky top-6 z-50 w-full bg-transparent flex justify-center items-center" },
});
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-6']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "flex h-16 items-center justify-between px-6 lg:px-12 bg-neutral-100 w-[80%] backdrop-blur-md rounded-4xl" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-100']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[80%]']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "text-xl font-bold tracking-tight text-foreground" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "text-xl font-bold tracking-tight text-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['text-foreground']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "hidden items-center gap-8 md:flex" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
for (const [link] of __VLS_vFor((__VLS_ctx.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (link.to),
    });
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        to: (link.to),
        ...{ class: (({ isActive }) => [
                'text-sm font-medium transition-colors hover:text-foreground',
                isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
            ]) },
    }));
    const __VLS_8 = __VLS_7({
        to: (link.to),
        ...{ class: (({ isActive }) => [
                'text-sm font-medium transition-colors hover:text-foreground',
                isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    (link.label);
    // @ts-ignore
    [links,];
    var __VLS_9;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hidden md:block" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    size: "sm",
    ...{ class: "rounded-4xl" },
}));
const __VLS_14 = __VLS_13({
    size: "sm",
    ...{ class: "rounded-4xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
// @ts-ignore
[];
var __VLS_15;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggleMenu) },
    'aria-label': "Toggle menu",
    ...{ class: "text-foreground md:hidden" },
});
/** @type {__VLS_StyleScopedClasses['text-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
if (__VLS_ctx.open) {
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.X} */
    X;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_20 = __VLS_19({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
}
else {
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.Menu} */
    Menu;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_25 = __VLS_24({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overflow-hidden border-t border-border transition-[max-height] duration-300 md:hidden" },
    ...{ class: (__VLS_ctx.open ? 'max-h-96' : 'max-h-0') },
});
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-[max-height]']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "flex flex-col gap-1 px-6 py-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
for (const [link] of __VLS_vFor((__VLS_ctx.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (link.to),
    });
    let __VLS_28;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        to: (link.to),
        ...{ class: (({ isActive }) => [
                'text-sm font-medium transition-colors hover:text-foreground',
                isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
            ]) },
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        to: (link.to),
        ...{ class: (({ isActive }) => [
                'text-sm font-medium transition-colors hover:text-foreground',
                isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_33;
    const __VLS_34 = {
        /** @type {typeof __VLS_33.click} */
        onClick: (__VLS_ctx.closeMenu),
    };
    const { default: __VLS_35 } = __VLS_31.slots;
    (link.label);
    // @ts-ignore
    [links, toggleMenu, open, open, closeMenu,];
    var __VLS_31;
    var __VLS_32;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "pt-2" },
});
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    size: "sm",
    ...{ class: "w-full" },
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    size: "sm",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = {
    /** @type {typeof __VLS_41.click} */
    onClick: (__VLS_ctx.closeMenu),
};
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
const { default: __VLS_43 } = __VLS_39.slots;
// @ts-ignore
[closeMenu,];
var __VLS_39;
var __VLS_40;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
