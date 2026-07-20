<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { Menu, X } from '@lucide/vue'
import { ref } from 'vue'
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
import playbudzSports from "@/assets/playbudzSports.png"
import instagram from "@/assets/ig.svg"
import facebook from "@/assets/fb.svg"
import x from "@/assets/x.svg"
import tiktok from "@/assets/tiktok.svg"
import success from "@/assets/success.png"
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'reka-ui';
import { db } from '@/config/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Motion } from "motion-v";

const activeIndex = ref<number | null>(null);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const images = [one, two, three, four, five];
const carouselImages = [...images, ...images];

const open = ref(false)
const openModal = ref(false);
const type = ref("");
const fn = ref("");
const ln = ref("");
const email = ref("");
const selectedSport = ref("");
const message = ref("")
const openSuccess = ref(false);
const isLoading = ref(false)
const errorMsg = ref("");

let errorTimeout: ReturnType<typeof setTimeout> | undefined;

const showError = (message: string) => {
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
]

const toggleMenu = () => {
  open.value = !open.value
}

const closeMenu = () => {
  open.value = false
}

const toggle = (index: number) => {
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
]

const faqs = [
  {
    question: "Is Play Budz free to use?",
    answer:
      "Yes. Play Budz is free to download and use. Some premium features may be introduced in the future.",
  },
  {
    question: "How do I find games near me?",
    answer:
      "Enable your location or search by city to discover nearby games and players.",
  },
  {
    question: "What sports are supported?",
    answer:
      "Play Budz supports football, basketball, volleyball, tennis, badminton, pickleball, and many more.",
  },
  {
    question: "Can I host my own game?",
    answer:
      "Absolutely. You can create a game, choose the location and time, and invite other players to join.",
  },
  {
    question: "How does Play Budz keep games safe?",
    answer:
      "We encourage verified profiles, community reporting, and moderation tools to help keep the community safe.",
  },
];

const scrollToSection = (id: string) => {
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
]

const handleNavClick = (link: { label: string; to: string }) => {
  if (link.label === "Contact Us") {
    type.value = "contact"
    openModal.value = true;
    closeMenu();
    return;
  }

  scrollToSection(link.to);
};

const handleOpenWaitlist = () => {
    type.value = "waitlist"
    openModal.value = true
    closeMenu();
}

const handleCloseSuccess = () => {
    openSuccess.value = false
}

const handleSubmitWaitList = async () => {
    const normalizedEmail = email.value.trim().toLowerCase();

    errorMsg.value = "";

    if (!normalizedEmail) {
        errorMsg.value = "Please enter your email address.";
        return;
    }

    if(!emailRegex.test(normalizedEmail)) {
        errorMsg.value = "Please enter a valid email address.";
        return;
    }

    isLoading.value = true;

    try {
        const emailDocumentId = encodeURIComponent(normalizedEmail);

        const waitlistRef = doc(
            db,
            "waitlist",
            emailDocumentId,
        );

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
        selectedSport.value = ""
        openSuccess.value = true;
        openModal.value = false;
    } catch (error) {
        console.error("Waitlist subscription error:", error);
        showError( "Something went wrong. Please try again.");
    } finally {
        isLoading.value = false;
    }
};

const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const normalizedEmail = email.value.trim().toLowerCase();

    errorMsg.value = "";

    if (!normalizedEmail) {
        errorMsg.value = "Please enter your email address.";
        return;
    }

    if(!emailRegex.test(normalizedEmail)) {
        errorMsg.value = "Please enter a valid email address.";
        return;
    }

    isLoading.value = true;

    const form = e.target as HTMLFormElement;
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
        openModal.value = false
        openSuccess.value = true
        form.reset();
      } else {
        showError("Something went wrong. Please try again.");
      }
    } catch (error: unknown) {
       showError("Something went wrong. Please try again.");
      console.log(error)
    } finally {
      isLoading.value = false;
    }
};

</script>
<template>

    <header
        class="fixed top-6 left-0 right-0 z-50 flex justify-center md:flex-row flex-col items-center"
    >
        <nav
            class="shadow-sm flex h-20.5 w-[95%] items-center justify-between rounded-4xl bg-white/70 px-6 backdrop-blur-sm md:w-[70%]"
        >
            <span 
                class="text-[22.21px] font-extrabold"
                style="font-family: 'Pacifico', cursive;"
            >
                PlayBudz
            </span>

            <ul class="hidden items-center gap-12 md:flex">
                <li
                    v-for="link in links"
                    :key="link.to"
                >
                     <button
                        type="button"
                        @click="handleNavClick(link)"
                        class="cursor-pointer text-[16px] font-normal hover:text-muted-foreground transition-colors text-[#4E4E4E]"
                    >
                        {{ link.label }}
                    </button>
                </li>
            </ul>

            <div class="hidden md:block">
                <Button 
                    @click="handleOpenWaitlist"
                    class="rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75">
                    Join Waitlist
                </Button>
            </div>

            <button
                aria-label="Toggle menu"
                class="text-foreground md:hidden"
                @click="toggleMenu"
            >
                <X
                    v-if="open"
                    class="h-6 w-6"
                />
                <Menu
                    v-else
                    class="h-6 w-6"
                />
            </button>
        </nav>

        <div
            class="overflow-hidden transition-[max-height] duration-300 md:hidden"
            :class="open ? 'mt-2 w-[95%] rounded-2xl backdrop-blur-xs bg-[#EBEBEB80] shadow-sm' : 'max-h-0'"
        >
            <ul class="flex flex-col gap-4 px-6 py-4">
                <li
                    v-for="link in links"
                    :key="link.to"
                >
                    <button
                        type="button"
                        @click="handleNavClick(link)"
                        class="cursor-pointer text-[22px] font-normal hover:text-muted-foreground transition-colors text-[#4E4E4E]"
                    >
                        {{ link.label }}
                    </button>
                </li>

                <li class="pt-2">
                    <Button
                        class="rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75"
                        @click="handleOpenWaitlist"
                    >
                        Join Waitlist
                    </Button>
                </li>
            </ul>
        </div>
    </header>

    <DialogRoot v-model:open="openModal">
        <DialogPortal>
            <DialogOverlay class="fixed inset-0 bg-black/50" />

            <DialogContent
                class="z-999 mt-8 fixed left-1/2 top-1/3 md:top-1/2 w-[85%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F9F8F8] p-4"
            >
                <div class="flex justify-end items-end">
                    <X
                        class="cursor-pointer"
                        @click="openModal = false"
                    />
                </div>

                <div class="flex flex-col items-center justify-center">
                    <span class="text-4xl font-extrabold">
                        {{ type === "contact" ? "Contact Us" : "Join Waitlist" }}
                    </span>
                    <span v-if="type === 'contact'"
                        class="text-[#4E4E4E] font-normal text-sm text-center"
                    >
                        Questions, feedback or partnership ideas? Drop us a 
                        line and the PlayBudz team will get back to you within one business day.
                    </span>

                    <form v-if="type === 'contact'" @submit.prevent="handleSubmit"
                        class="flex flex-col gap-2 items-center justify-center w-full mt-4"
                    >
                        <div class="flex gap-2 items-center justify-center w-full">
                            <input
                                placeholder="First Name"
                                v-model="fn"
                                name="First Name"
                                type="text"
                                class="bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm"
                            />
                            <input
                                placeholder="Last Name"
                                v-model="ln"
                                name="Last Name"
                                type="text"
                                class="bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm"
                            />
                        </div>
                        <input
                            placeholder="Email"
                            v-model="email"
                            name="Email"
                            type="text"
                            class="w-full bg-white rounded-[12px] border border-[#EBEBF0] h-10 px-4 text-sm"
                        />
                         <textarea
                            v-model="message"
                            rows="4"
                            placeholder="Enter your message..."
                            class="w-full rounded-[12px] border text-sm border-[#EBEBF0] bg-white p-4 outline-none transition focus:border-primary"
                        ></textarea>

                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="bg-primary h-10 rounded-3xl text-white w-full mt-4 text-sm flex justify-center items-center"
                        >
                            <div
                                v-if="isLoading"
                                class="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"
                            ></div>

                            <span v-else>
                                Send Message
                            </span>
                        </button>
                    </form>

                    <div v-if="type === 'waitlist'"
                        class="flex flex-col gap-2 items-center justify-center w-full mt-4"
                    >
                        <div class="flex gap-2 items-center justify-center w-full">
                            <input
                                placeholder="First Name"
                                v-model="fn"
                                name="First Name"
                                type="text"
                                class="bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm"
                            />
                            <input
                                placeholder="Last Name"
                                v-model="ln"
                                name="Last Name"
                                type="text"
                                class="bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm"
                            />
                        </div>
                        <div class="flex gap-2 items-center justify-center w-full">
                            <input
                                placeholder="Email"
                                v-model="email"
                                name="email"
                                type="text"
                                class="bg-white rounded-[12px] border border-[#EBEBF0] h-10 w-full px-4 text-sm"
                            />
                            <select
                                v-model="selectedSport"
                                class="w-full rounded-[12px] border h-10 border-[#EBEBF0] bg-white px-4 outline-none focus:border-primary text-sm"
                            >
                                <option disabled value="">
                                    Select a sport
                                </option>

                                <option
                                    v-for="sport in sports"
                                    :key="sport"
                                    :value="sport"
                                >
                                    {{ sport }}
                                </option>
                            </select>
                        </div>
                        <button
                            @click="handleSubmitWaitList"
                            :disabled="isLoading"
                            class="mt-2 flex h-10 w-full items-center justify-center rounded-3xl bg-primary text-sm text-white disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <div
                                v-if="isLoading"
                                class="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"
                            ></div>

                            <span v-else>
                                Join
                            </span>
                        </button>
                    </div>
                </div>

                <div class="flex justify-center items-center">
                    <span
                        class="text-center text-sm font-light text-primary mt-2"
                    >{{ errorMsg }}</span>
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>

    <DialogRoot v-model:open="openSuccess">
        <DialogPortal>
            <DialogOverlay class="fixed inset-0 bg-black/50" />

            <DialogContent
                class="z-999 mt-8 fixed left-1/2 top-1/2 w-[85%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#F9F8F8] p-4"
            >
                <div class="flex justify-end items-end">
                    <X
                        class="cursor-pointer"
                        @click="handleCloseSuccess"
                    />
                </div>
                <div class="flex flex-col items-center justify-center">
                    <img
                        :src="success"
                        alt="success"
                        class="h-30 w-30 object-cover my-4"
                    />
                    <span class="text-[18px] font-semibold">
                        {{ type === 'contact' ? 'Thank you for contacting us' : 'Thank you for Joining the Wait List' }}
                    </span>
                     <span class="text-[14px] font-light text-[#4E4E4E] text-center mb-2">
                        {{ type === 'contact' 
                            ? 'Our team has received your message and will get back to you as soon as possible.' 
                            : 'You will be the first to know, when we are live.' 
                        }}
                     </span>
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>

    <section class="relative overflow-hidden h-120" >
        <div 
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            :style="{ backgroundImage: `url(${heroImage})` }"
        ></div>

        <div class="absolute inset-0 bg-white/40"></div>
        
        <div class="absolute inset-0 pointer-events-none overflow-hidden z-20">
            <img
                :src="football"
                class="ball ball-1"
            />

            <img
                :src="basketball"
                class="ball ball-2"
            />

            <img
                :src="tennisBall"
                class="ball ball-3"
            />
        </div>

        <div class="relative z-10 flex flex-col items-center">
            <div class="flex justify-center items-center pt-20 flex-col w-full md:w-[60%] mt-15 md:mt-20 px-4 md:px-0">
                <div class="block md:hidden">
                    <Button 
                        @click="handleOpenWaitlist"
                        class="rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-10 w-32 mb-6">
                        Join Waitlist
                    </Button>
                </div>
                <h1 class="text-6xl md:text-[72px] font-extrabold text-center">
                    Find Your Game.
                </h1>
                <span class="text-center font-medium md:text-[24px] text-xl text-shadow-white mt-4 leading-6 md:leading-tight">
                    PlayBudz connects you with players and pickup games near you. 
                    Discover events, join a team, and never sit on the bench again — whatever sport you love.
                </span>
            </div>
        </div>
    </section>

    <section class="relative overflow-hidden w-full hidden md:block"
        :style="{ backgroundImage: `url(${heroImage2})` }"
    >
        <div class="animate-float-x flex items-center gap-2">
            <img
                v-for="(image, index) in carouselImages"
                :key="index"
                :src="image"
                class="h-70 w-55 rounded-[20px]"
            />
        </div>

        <div
            class="pointer-events-none absolute inset-y-0 left-0 w-34 bg-linear-to-r from-white to-transparent"
        ></div>

        <div
            class="pointer-events-none absolute inset-y-0 right-0 w-34 bg-linear-to-l from-white to-transparent"
        ></div>
    </section>

    <section class="relative w-full overflow-hidden block md:hidden"
        :style="{ backgroundImage: `url(${heroImage2})` }"
    >
        <div class="carousel-track flex w-max items-center gap-2">
            <div class="flex items-center gap-2">
                <img
                    v-for="(image, index) in images"
                    :key="`first-${index}`"
                    :src="image"
                    alt="sport"
                    class="h-50 w-35 shrink-0 rounded-[20px] object-cover"
                />
            </div>

            <div class="flex items-center gap-2" aria-hidden="true">
                <img
                    v-for="(image, index) in images"
                    :key="`second-${index}`"
                    :src="image"
                    alt="sport"
                    class="h-50 w-35 shrink-0 rounded-[20px] object-cover"
                />
            </div>
        </div>

        <div
            class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent"
        ></div>

        <div
            class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent"
        ></div>
    </section>

    <section class="flex flex-col items-center md:px-12 px-6 scroll-mt-16" id="features">
         <Motion
            :initial="{ opacity: 0, y: 60 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{
                duration: 0.7,
                ease: 'easeOut'
            }"
            class="flex justify-center items-center"
        >
            <span class="text-[30px] md:text-[52px] font-extrabold mt-12 text-center leading-10 md:leading-15">
                Everything You Need to <br/> Get on a Game
            </span>
        </Motion>
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 mt-12">
            <div
                v-for="(item, index) in phoneContent"
                :key="`item-${index}`"
                class="flex h-135 md:h-150 w-full md:w-110 flex-col rounded-[50px] px-6 md:px-10 shadow-sm justify-end overflow-hidden"
                :style="{
                    background: `linear-gradient(to bottom, ${item.lighter} 20%, ${item.firstColor} 35%, ${item.secondColor} 100%)`,
                }"
            >
                <div class="flex flex-col h-[20%] mt-0 md:mt-6">
                    <span
                        class="text-left text-2xl md:text-[32px] font-extrabold leading-16md:leading-15"
                    >
                        {{ item.title }}
                    </span>
                    <span
                        class="text-left text-[18px] text-[#4E4E4E] font-light"
                    >
                        {{ item.subTitle }}
                    </span>
                </div>

                <img
                    :src="item.image"
                    alt="phone-image"
                    class="h-auto w-123 object-contain md:mt-10 mt-6"
                />
            </div>
        </div>

        <div class="flex justify-center items-center flex-col mt-8 gap-4">
            <Motion
                :initial="{ opacity: 0, y: 60 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{
                    duration: 0.7,
                    ease: 'easeOut'
                }"
                class="flex justify-center items-center flex-col"
            >
                <span class="text-[24px] text-center font-semibold">
                    Join over 500+ early members.
                </span>
                <Button
                    class="rounded-4xl bg-primary text-white py-2.5 px-6 text-[16px] font-semibold h-13.5 w-37.75"
                    @click="handleOpenWaitlist"
                >
                    Join Waitlist
                </Button>
            </Motion>
        </div>
    </section>

    <section class="flex flex-col items-center md:px-12 px-6 bg-[#fcf9f9] py-12 mt-12 scroll-mt-16" id="faq">
        <span class="text-[52px] font-extrabold text-center mb-8">
            FAQs
        </span>

        <div class="mx-auto w-full max-w-4xl space-y-4">
            <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="overflow-hidden rounded-[30px] border border-[#E7E7E7] bg-white "
            >
                <button
                    class="flex w-full items-center justify-between px-6 py-5 text-left"
                    @click="toggle(index)"
                >
                    <span class="text-[20px] font-extrabold">
                        {{ faq.question }}
                    </span>

                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-full bg-[#EFEFEF]"
                    >
                        <Minus
                            v-if="activeIndex === index"
                            class="h-5 w-5 cursor-pointer"
                        />
                        <Plus
                            v-else
                            class="h-5 w-5 cursor-pointer"
                        />
                    </div>
                </button>

                <Transition name="accordion">
                    <div
                    v-if="activeIndex === index"
                    class="px-6 pb-6 text-gray-600"
                    >
                    {{ faq.answer }}
                    </div>
                </Transition>
            </div>
        </div>
    </section>

    <section class="flex flex-col items-center md:px-12 px-6 mb-12 justify-center">
        <span
            class="text-[52px] font-extrabold text-center mt-8 leading-15"
        >
            Stop waiting. <br/> Start playing.
        </span>
        <span
            class="text-2xl font-light text-center mt-4 text-[#4E4E4E]"
        >
            Be the first to know, when we are live.
        </span>

        <img
            :src="`${playbudzSports}`"
            alt="playbudz-sports"
            class="h-auto w-180 shrink-0 rounded-[20px] object-cover mt-10"
        />
    </section>

    <section class="flex flex-col items-center md:px-12 px-6 justify-center bg-primary py-14 h-59.5">
        <span 
            class="text-[46.82px] font-extrabold text-white"
            style="font-family: 'Pacifico', cursive;"
        >
            PlayBudz
        </span>
        <div class="flex justify-center items-center gap-4 mt-8">
            <a
                v-for="social in socials"
                :key="social.name"
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img
                    :src="social.icon"
                    :alt="social.name"
                    class="h-6 w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
            </a>
        </div>
    </section>

</template>

<style scoped>
.carousel-track {
  animation: infiniteCarousel 22s linear infinite;
  will-change: transform;
}

@keyframes infiniteCarousel {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 0.25rem));
  }
}

.carousel-track:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none;
  }
}
</style>