/// <reference types="../../node_modules/.pnpm/@vue+language-core@3.3.7/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/.pnpm/@vue+language-core@3.3.7/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import Button from '@/components/ui/button/Button.vue';
import { Menu, X } from '@lucide/vue';
import { ref } from 'vue';
import heroImage from "@/assets/hero.png";
import heroImage2 from "@/assets/hero2.png";
import one from "@/assets/1.png";
import two from "@/assets/2.png";
import three from "@/assets/3.png";
import four from "@/assets/4.png";
import five from "@/assets/5.png";
import football from "@/assets/football.png";
import basketball from "@/assets/basketball.png";
import tennisBall from "@/assets/tennis.png";
import phone1 from "@/assets/phone1.png";
import phone2 from "@/assets/phone2.png";
import phone3 from "@/assets/phone3.png";
import phone4 from "@/assets/phone4.png";
import { Plus, Minus } from "@lucide/vue";
import playbudzSports from "@/assets/playbudzSports.png";
import instagram from "@/assets/ig.svg";
import facebook from "@/assets/fb.svg";
import x from "@/assets/x.svg";
import tiktok from "@/assets/tiktok.svg";
import success from "@/assets/success.png";
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'reka-ui';
import { db } from '@/config/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Motion } from "motion-v";
const activeIndex = ref(null);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const images = [one, two, three, four, five];
const carouselImages = [...images, ...images];
const open = ref(false);
const openModal = ref(false);
const type = ref("");
const fn = ref("");
const ln = ref("");
const email = ref("");
const selectedSport = ref("");
const message = ref("");
const openSuccess = ref(false);
const isLoading = ref(false);
const errorMsg = ref("");
let errorTimeout;
const showError = (message) => {
    errorMsg.value = message;
    if (errorTimeout) {
        clearTimeout(errorTimeout);
    }
    errorTimeout = setTimeout(() => {
        errorMsg.value = "";
    }, 4000);
};
const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Volleyball",
];
const links = [
    { to: 'features', label: 'Features' },
    { to: 'faq', label: 'FAQs' },
    { to: '', label: 'Contact Us' }
];
const toggleMenu = () => {
    open.value = !open.value;
};
const closeMenu = () => {
    open.value = false;
};
const toggle = (index) => {
    activeIndex.value =
        activeIndex.value === index ? null : index;
};
const phoneContent = [
    {
        title: "Find Game Events",
        image: phone1,
        subTitle: "Find the best game events based on your skills in sports.",
        lighter: "#f8f7ff",
        firstColor: "#F2F0FF",
        secondColor: "#DAD4FF"
    },
    {
        title: "Create Your Game Event",
        image: phone2,
        subTitle: "Create, invite your friends to a game play.",
        lighter: "#fff7fb",
        firstColor: "#FFF0F7",
        secondColor: "#FFCEE4"
    },
    {
        title: "Connect With Sport Players",
        image: phone3,
        subTitle: "Chat and invite sport players to your game.",
        lighter: "#f7fffb",
        firstColor: "#F0FFF9",
        secondColor: "#CFFFEC"
    },
    {
        title: "Locate the Right Games Close to You",
        image: phone4,
        subTitle: "In Playbudz, you can view active games on the map.",
        lighter: "#fafffa",
        firstColor: "#F6FFF6",
        secondColor: "#B0FFAB"
    }
];
const faqs = [
    {
        question: "Is Play Budz free to use?",
        answer: "Yes. Play Budz is free to download and use. Some premium features may be introduced in the future.",
    },
    {
        question: "How do I find games near me?",
        answer: "Enable your location or search by city to discover nearby games and players.",
    },
    {
        question: "What sports are supported?",
        answer: "Play Budz supports football, basketball, volleyball, tennis, badminton, pickleball, and many more.",
    },
    {
        question: "Can I host my own game?",
        answer: "Absolutely. You can create a game, choose the location and time, and invite other players to join.",
    },
    {
        question: "How does Play Budz keep games safe?",
        answer: "We encourage verified profiles, community reporting, and moderation tools to help keep the community safe.",
    },
];
const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    closeMenu();
};
const socials = [
    {
        name: 'ig',
        icon: instagram,
        link: ''
    },
    {
        name: 'fb',
        icon: facebook,
        link: ''
    },
    {
        name: 'x',
        icon: x,
        link: ''
    },
    {
        name: 'tiktok',
        icon: tiktok,
        link: ''
    }
];
const handleNavClick = (link) => {
    if (link.label === "Contact Us") {
        type.value = "contact";
        openModal.value = true;
        closeMenu();
        return;
    }
    scrollToSection(link.to);
};
const handleOpenWaitlist = () => {
    type.value = "waitlist";
    openModal.value = true;
    closeMenu();
};
const handleCloseSuccess = () => {
    openSuccess.value = false;
};
const handleSubmitWaitList = async () => {
    const normalizedEmail = email.value.trim().toLowerCase();
    errorMsg.value = "";
    if (!normalizedEmail) {
        errorMsg.value = "Please enter your email address.";
        return;
    }
    if (!emailRegex.test(normalizedEmail)) {
        errorMsg.value = "Please enter a valid email address.";
        return;
    }
    isLoading.value = true;
    try {
        const emailDocumentId = encodeURIComponent(normalizedEmail);
        const waitlistRef = doc(db, "waitlist", emailDocumentId);
        const existingEntry = await getDoc(waitlistRef);
        if (existingEntry.exists()) {
            showError("You are already on the waitlist. Thank you.");
            return;
        }
        await setDoc(waitlistRef, {
            email: normalizedEmail,
            createdAt: serverTimestamp(),
        });
        email.value = "";
        fn.value = "";
        ln.value = "";
        selectedSport.value = "";
        openSuccess.value = true;
        openModal.value = false;
    }
    catch (error) {
        console.error("Waitlist subscription error:", error);
        showError("Something went wrong. Please try again.");
    }
    finally {
        isLoading.value = false;
    }
};
const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.value.trim().toLowerCase();
    errorMsg.value = "";
    if (!normalizedEmail) {
        errorMsg.value = "Please enter your email address.";
        return;
    }
    if (!emailRegex.test(normalizedEmail)) {
        errorMsg.value = "Please enter a valid email address.";
        return;
    }
    isLoading.value = true;
    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", "0712f490-bae9-4b1f-8a57-eadf90218db8");
    formData.append("subject", "New Contact Message");
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        if (result.success) {
            openModal.value = false;
            openSuccess.value = true;
            form.reset();
        }
        else {
            showError("Something went wrong. Please try again.");
        }
    }
    catch (error) {
        showError("Something went wrong. Please try again.");
        console.log(error);
    }
    finally {
        isLoading.value = false;
    }
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['carousel-track']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-track']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "fixed top-6 left-0 right-0 z-50 flex justify-center md:flex-row flex-col items-center" },
});
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-6']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "shadow-sm flex h-20.5 w-[95%] items-center justify-between rounded-4xl bg-[#EBEBEB80] px-6 backdrop-blur-sm md:w-[70%]" },
});
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[95%]']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#EBEBEB80]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[70%]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[22.21px] font-extrabold" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['text-[22.21px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "hidden items-center gap-12 md:flex" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-12']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
for (const [link] of __VLS_vFor((__VLS_ctx.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (link.to),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                return (__VLS_ctx.handleNavClick(link));
                // @ts-ignore
                [links, handleNavClick,];
            } },
        type: "button",
        ...{ class: "cursor-pointer text-[16px] font-normal hover:text-muted-foreground transition-colors text-[#4E4E4E]" },
    });
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[#4E4E4E]']} */ ;
    (link.label);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hidden md:block" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
const __VLS_0 = Button || Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.handleOpenWaitlist),
};
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['h-13.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-37.75']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[handleOpenWaitlist,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggleMenu) },
    'aria-label': "Toggle menu",
    ...{ class: "text-foreground md:hidden" },
});
/** @type {__VLS_StyleScopedClasses['text-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
if (__VLS_ctx.open) {
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.X} */
    X;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
}
else {
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.Menu} */
    Menu;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overflow-hidden transition-[max-height] duration-300 md:hidden" },
    ...{ class: (__VLS_ctx.open ? 'mt-2 w-[95%] rounded-2xl backdrop-blur-xs bg-[#EBEBEB80] shadow-sm' : 'max-h-0') },
});
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-[max-height]']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "flex flex-col gap-4 px-6 py-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
for (const [link] of __VLS_vFor((__VLS_ctx.links))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (link.to),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                return (__VLS_ctx.handleNavClick(link));
                // @ts-ignore
                [links, handleNavClick, toggleMenu, open, open,];
            } },
        type: "button",
        ...{ class: "cursor-pointer text-[22px] font-normal hover:text-muted-foreground transition-colors text-[#4E4E4E]" },
    });
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[22px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[#4E4E4E]']} */ ;
    (link.label);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "pt-2" },
});
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
const __VLS_18 = Button || Button;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ 'onClick': {} },
    ...{ class: "rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75" },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onClick': {} },
    ...{ class: "rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = {
    /** @type {typeof __VLS_23.click} */
    onClick: (__VLS_ctx.handleOpenWaitlist),
};
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['h-13.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-37.75']} */ ;
const { default: __VLS_25 } = __VLS_21.slots;
// @ts-ignore
[handleOpenWaitlist,];
var __VLS_21;
var __VLS_22;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.DialogRoot | typeof __VLS_components.DialogRoot} */
DialogRoot;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    open: (__VLS_ctx.openModal),
}));
const __VLS_28 = __VLS_27({
    open: (__VLS_ctx.openModal),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_31 } = __VLS_29.slots;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.DialogPortal | typeof __VLS_components.DialogPortal} */
DialogPortal;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.DialogOverlay} */
DialogOverlay;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ class: "fixed inset-0 bg-black/50" },
}));
const __VLS_40 = __VLS_39({
    ...{ class: "fixed inset-0 bg-black/50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    ...{ class: "z-999 mt-8 fixed left-1/2 top-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F9F8F8] p-4" },
}));
const __VLS_45 = __VLS_44({
    ...{ class: "z-999 mt-8 fixed left-1/2 top-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F9F8F8] p-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
/** @type {__VLS_StyleScopedClasses['z-999']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#F9F8F8]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
const { default: __VLS_48 } = __VLS_46.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-end items-end" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.X} */
X;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}));
const __VLS_51 = __VLS_50({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_54;
const __VLS_55 = {
    /** @type {typeof __VLS_54.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.openModal = false);
        // @ts-ignore
        [openModal, openModal,];
    },
};
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
var __VLS_52;
var __VLS_53;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-center justify-center" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-4xl font-extrabold" },
});
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
(__VLS_ctx.type === "contact" ? "Contact Us" : "Join Waitlist");
if (__VLS_ctx.type === 'contact') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[#4E4E4E] font-normal text-sm text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[#4E4E4E]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
}
if (__VLS_ctx.type === 'contact') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: "flex flex-col gap-2 items-center justify-center w-full mt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-2 items-center justify-center w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "First Name",
        value: (__VLS_ctx.fn),
        name: "First Name",
        type: "text",
        ...{ class: "bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "Last Name",
        value: (__VLS_ctx.ln),
        name: "Last Name",
        type: "text",
        ...{ class: "bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "Email",
        value: (__VLS_ctx.email),
        name: "Email",
        type: "text",
        ...{ class: "w-full bg-white rounded-[12px] border border-[#EBEBF0] h-10 px-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
        value: (__VLS_ctx.message),
        rows: "4",
        placeholder: "Enter your message...",
        ...{ class: "w-full rounded-[12px] border text-sm border-[#EBEBF0] bg-white p-4 outline-none transition focus:border-primary" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        type: "submit",
        disabled: (__VLS_ctx.isLoading),
        ...{ class: "bg-primary h-10 rounded-3xl text-white w-full mt-4 text-sm flex justify-center items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    if (__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" },
        });
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-t-transparent']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
}
if (__VLS_ctx.type === 'waitlist') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col gap-2 items-center justify-center w-full mt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-2 items-center justify-center w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "First Name",
        value: (__VLS_ctx.fn),
        name: "First Name",
        type: "text",
        ...{ class: "bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "Last Name",
        value: (__VLS_ctx.ln),
        name: "Last Name",
        type: "text",
        ...{ class: "bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-2 items-center justify-center w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        placeholder: "Email",
        value: (__VLS_ctx.email),
        name: "email",
        type: "text",
        ...{ class: "bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
        value: (__VLS_ctx.selectedSport),
        ...{ class: "w-full rounded-[12px] border h-10 border-[#EBEBF0] bg-white px-4 outline-none focus:border-primary text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[12px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#EBEBF0]']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        disabled: true,
        value: "",
    });
    for (const [sport] of __VLS_vFor((__VLS_ctx.sports))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            key: (sport),
            value: (sport),
        });
        (sport);
        // @ts-ignore
        [type, type, type, type, handleSubmit, fn, fn, ln, ln, email, email, message, isLoading, isLoading, selectedSport, sports,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleSubmitWaitList) },
        disabled: (__VLS_ctx.isLoading),
        ...{ class: "mt-2 flex h-10 w-full items-center justify-center rounded-3xl bg-primary text-sm text-white disabled:cursor-not-allowed disabled:opacity-70" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-70']} */ ;
    if (__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" },
        });
        /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-t-transparent']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-center items-center" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-center text-sm font-light text-primary mt-2" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
(__VLS_ctx.errorMsg);
// @ts-ignore
[isLoading, isLoading, handleSubmitWaitList, errorMsg,];
var __VLS_46;
// @ts-ignore
[];
var __VLS_35;
// @ts-ignore
[];
var __VLS_29;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.DialogRoot | typeof __VLS_components.DialogRoot} */
DialogRoot;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    open: (__VLS_ctx.openSuccess),
}));
const __VLS_58 = __VLS_57({
    open: (__VLS_ctx.openSuccess),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.DialogPortal | typeof __VLS_components.DialogPortal} */
DialogPortal;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({}));
const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.DialogOverlay} */
DialogOverlay;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    ...{ class: "fixed inset-0 bg-black/50" },
}));
const __VLS_70 = __VLS_69({
    ...{ class: "fixed inset-0 bg-black/50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/50']} */ ;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    ...{ class: "z-999 mt-8 fixed left-1/2 top-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F9F8F8] p-4" },
}));
const __VLS_75 = __VLS_74({
    ...{ class: "z-999 mt-8 fixed left-1/2 top-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F9F8F8] p-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
/** @type {__VLS_StyleScopedClasses['z-999']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#F9F8F8]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
const { default: __VLS_78 } = __VLS_76.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-end items-end" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.X} */
X;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}));
const __VLS_81 = __VLS_80({
    ...{ 'onClick': {} },
    ...{ class: "cursor-pointer" },
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_84;
const __VLS_85 = {
    /** @type {typeof __VLS_84.click} */
    onClick: (__VLS_ctx.handleCloseSuccess),
};
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
var __VLS_82;
var __VLS_83;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-col items-center justify-center" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.success),
    alt: "success",
    ...{ class: "h-30 w-30 object-cover my-4" },
});
/** @type {__VLS_StyleScopedClasses['h-30']} */ ;
/** @type {__VLS_StyleScopedClasses['w-30']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[18px] font-semibold" },
});
/** @type {__VLS_StyleScopedClasses['text-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
(__VLS_ctx.type === 'contact' ? 'Thank you for contacting us' : 'Thank you for Joining the Wait List');
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[14px] font-light text-[#4E4E4E] text-center mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#4E4E4E]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
(__VLS_ctx.type === 'contact'
    ? 'Our team has received your message and will get back to you as soon as possible.'
    : 'You will be the first to know, when we are live.');
// @ts-ignore
[type, type, openSuccess, handleCloseSuccess, success,];
var __VLS_76;
// @ts-ignore
[];
var __VLS_65;
// @ts-ignore
[];
var __VLS_59;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "relative overflow-hidden h-120" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-120']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-cover bg-center bg-no-repeat" },
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.heroImage})` }) },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-no-repeat']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-white/40" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 pointer-events-none overflow-hidden z-20" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.football),
    ...{ class: "ball ball-1" },
});
/** @type {__VLS_StyleScopedClasses['ball']} */ ;
/** @type {__VLS_StyleScopedClasses['ball-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.basketball),
    ...{ class: "ball ball-2" },
});
/** @type {__VLS_StyleScopedClasses['ball']} */ ;
/** @type {__VLS_StyleScopedClasses['ball-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.tennisBall),
    ...{ class: "ball ball-3" },
});
/** @type {__VLS_StyleScopedClasses['ball']} */ ;
/** @type {__VLS_StyleScopedClasses['ball-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10 flex flex-col items-center" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-center items-center pt-20 flex-col w-full md:w-[60%] mt-20 px-4 md:px-0" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[60%]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-0']} */ ;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.Motion | typeof __VLS_components.Motion} */
Motion;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    initial: ({ opacity: 0, y: 60 }),
    animate: ({ opacity: 1, y: 0 }),
    transition: ({
        duration: 0.7,
        ease: 'easeOut'
    }),
}));
const __VLS_88 = __VLS_87({
    initial: ({ opacity: 0, y: 60 }),
    animate: ({ opacity: 1, y: 0 }),
    transition: ({
        duration: 0.7,
        ease: 'easeOut'
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const { default: __VLS_91 } = __VLS_89.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-6xl md:text-[72px] font-extrabold text-center" },
});
/** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[72px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
// @ts-ignore
[heroImage, football, basketball, tennisBall,];
var __VLS_89;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-center font-medium md:text-[24px] text-xl text-shadow-white mt-4 leading-6 md:leading-tight" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-shadow-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:leading-tight']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "relative overflow-hidden w-full hidden md:block" },
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.heroImage2})` }) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "animate-float-x flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['animate-float-x']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
for (const [image, index] of __VLS_vFor((__VLS_ctx.carouselImages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        key: (index),
        src: (image),
        ...{ class: "h-70 w-55 rounded-[20px]" },
    });
    /** @type {__VLS_StyleScopedClasses['h-70']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-55']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[20px]']} */ ;
    // @ts-ignore
    [heroImage2, carouselImages,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pointer-events-none absolute inset-y-0 left-0 w-34 bg-linear-to-r from-white to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-34']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-linear-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pointer-events-none absolute inset-y-0 right-0 w-34 bg-linear-to-l from-white to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-34']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-linear-to-l']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "relative w-full overflow-hidden block md:hidden" },
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.heroImage2})` }) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "carousel-track flex w-max items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['carousel-track']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-max']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
for (const [image, index] of __VLS_vFor((__VLS_ctx.images))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        key: (`first-${index}`),
        src: (image),
        alt: "sport",
        ...{ class: "h-50 w-35 shrink-0 rounded-[20px] object-cover" },
    });
    /** @type {__VLS_StyleScopedClasses['h-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-35']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[20px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    // @ts-ignore
    [heroImage2, images,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
for (const [image, index] of __VLS_vFor((__VLS_ctx.images))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        key: (`second-${index}`),
        src: (image),
        alt: "sport",
        ...{ class: "h-50 w-35 shrink-0 rounded-[20px] object-cover" },
    });
    /** @type {__VLS_StyleScopedClasses['h-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-35']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[20px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    // @ts-ignore
    [images,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-linear-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-linear-to-l']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "flex flex-col items-center md:px-12 px-6 scroll-mt-16" },
    id: "features",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-mt-16']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[40px] md:text-[52px] font-extrabold mt-12 text-center leading-10 md:leading-15" },
});
/** @type {__VLS_StyleScopedClasses['text-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[52px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-10']} */ ;
/** @type {__VLS_StyleScopedClasses['md:leading-15']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 gap-6 md:grid-cols-2 mt-12" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-12']} */ ;
for (const [item, index] of __VLS_vFor((__VLS_ctx.phoneContent))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (`item-${index}`),
        ...{ class: "flex h-130 md:h-185 w-full flex-col rounded-[50px] px-6 md:px-10 shadow-sm justify-end overflow-hidden" },
        ...{ style: ({
                background: `linear-gradient(to bottom, ${item.lighter} 20%, ${item.firstColor} 35%, ${item.secondColor} 100%)`,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-130']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-185']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[50px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col h-[20%] mt-0 md:mt-6" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[20%]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:mt-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-left text-2xl md:text-[32px] font-extrabold leading-16md:leading-15" },
    });
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-[32px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-16md:leading-15']} */ ;
    (item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-left text-[18px] text-[#4E4E4E] font-light" },
    });
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[#4E4E4E]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-light']} */ ;
    (item.subTitle);
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (item.image),
        alt: "phone-image",
        ...{ class: "h-auto w-123 object-cover md:mt-0 mt-6" },
    });
    /** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-123']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:mt-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    // @ts-ignore
    [phoneContent,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-center items-center flex-col mt-8 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[24px] text-center font-semibold" },
});
/** @type {__VLS_StyleScopedClasses['text-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
const __VLS_92 = Button || Button;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    ...{ 'onClick': {} },
    ...{ class: "rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75" },
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    ...{ class: "rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75" },
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = {
    /** @type {typeof __VLS_97.click} */
    onClick: (__VLS_ctx.closeMenu),
};
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['h-13.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-37.75']} */ ;
const { default: __VLS_99 } = __VLS_95.slots;
// @ts-ignore
[closeMenu,];
var __VLS_95;
var __VLS_96;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "flex flex-col items-center md:px-12 px-6 bg-[#fcf9f9] py-12 mt-12 scroll-mt-16" },
    id: "faq",
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#fcf9f9]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-mt-16']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[52px] font-extrabold text-center mb-8" },
});
/** @type {__VLS_StyleScopedClasses['text-[52px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto w-full max-w-4xl space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
for (const [faq, index] of __VLS_vFor((__VLS_ctx.faqs))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (index),
        ...{ class: "overflow-hidden rounded-[30px] border border-[#E7E7E7] bg-white " },
    });
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-[30px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[#E7E7E7]']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                return (__VLS_ctx.toggle(index));
                // @ts-ignore
                [faqs, toggle,];
            } },
        ...{ class: "flex w-full items-center justify-between px-6 py-5 text-left" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[20px] font-extrabold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[20px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
    (faq.question);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex h-9 w-9 items-center justify-center rounded-full bg-[#EFEFEF]" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[#EFEFEF]']} */ ;
    if (__VLS_ctx.activeIndex === index) {
        let __VLS_100;
        /** @ts-ignore @type { | typeof __VLS_components.Minus} */
        Minus;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
            ...{ class: "h-5 w-5 cursor-pointer" },
        }));
        const __VLS_102 = __VLS_101({
            ...{ class: "h-5 w-5 cursor-pointer" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    }
    else {
        let __VLS_105;
        /** @ts-ignore @type { | typeof __VLS_components.Plus} */
        Plus;
        // @ts-ignore
        const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
            ...{ class: "h-5 w-5 cursor-pointer" },
        }));
        const __VLS_107 = __VLS_106({
            ...{ class: "h-5 w-5 cursor-pointer" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_106));
        /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    }
    let __VLS_110;
    /** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
    Transition;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
        name: "accordion",
    }));
    const __VLS_112 = __VLS_111({
        name: "accordion",
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
    const { default: __VLS_115 } = __VLS_113.slots;
    if (__VLS_ctx.activeIndex === index) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "px-6 pb-6 text-gray-600" },
        });
        /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['pb-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
        (faq.answer);
    }
    // @ts-ignore
    [activeIndex, activeIndex,];
    var __VLS_113;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "flex flex-col items-center md:px-12 px-6 mb-12 justify-center" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[52px] font-extrabold text-center mt-8 leading-15" },
});
/** @type {__VLS_StyleScopedClasses['text-[52px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-15']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-2xl font-light text-center mt-4 text-[#4E4E4E]" },
});
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#4E4E4E]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (`${__VLS_ctx.playbudzSports}`),
    alt: "playbudz-sports",
    ...{ class: "h-auto w-180 shrink-0 rounded-[20px] object-cover mt-10" },
});
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-180']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "flex flex-col items-center md:px-12 px-6 justify-center bg-primary py-14 h-59.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['py-14']} */ ;
/** @type {__VLS_StyleScopedClasses['h-59.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[46.82px] font-extrabold text-white" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['text-[46.82px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-center items-center gap-4 mt-8" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
for (const [social] of __VLS_vFor((__VLS_ctx.socials))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        key: (social.name),
        href: (social.link),
        target: "_blank",
        rel: "noopener noreferrer",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (social.icon),
        alt: (social.name),
        ...{ class: "h-6 w-6 cursor-pointer transition-transform duration-200 hover:scale-110" },
    });
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:scale-110']} */ ;
    // @ts-ignore
    [playbudzSports, socials,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
