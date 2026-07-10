<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from '@lucide/vue'

import { Button } from '@/components/ui/button'

const open = ref(false)

const links = [
  { to: '/', label: 'Home' }
]

const toggleMenu = () => {
  open.value = !open.value
}

const closeMenu = () => {
  open.value = false
}
</script>

<template>
  <header
    class="sticky top-6 z-50 w-full bg-transparent flex justify-center items-center"
  >
    <nav
      class="flex h-16 items-center justify-between px-6 lg:px-12 bg-neutral-100 w-[80%] backdrop-blur-md rounded-4xl"
    >
      <RouterLink
        to="/"
        class="text-xl font-bold tracking-tight text-foreground"
      >
        Brand
      </RouterLink>

      <ul class="hidden items-center gap-8 md:flex">
        <li
          v-for="link in links"
          :key="link.to"
        >
          <RouterLink
            :to="link.to"
            :class="({ isActive }: {isActive: boolean}) => [
              'text-sm font-medium transition-colors hover:text-foreground',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground'
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="hidden md:block">
        <Button size="sm" class="rounded-4xl">
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
      class="overflow-hidden border-t border-border transition-[max-height] duration-300 md:hidden"
      :class="open ? 'max-h-96' : 'max-h-0'"
    >
      <ul class="flex flex-col gap-1 px-6 py-4">
        <li
          v-for="link in links"
          :key="link.to"
        >
          <RouterLink
            :to="link.to"
            @click="closeMenu"
            :class="({ isActive }: { isActive: boolean }) => [
              'text-sm font-medium transition-colors hover:text-foreground',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground'
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </li>

        <li class="pt-2">
          <Button
            size="sm"
            class="w-full"
            @click="closeMenu"
          >
            Get Started
          </Button>
        </li>
      </ul>
    </div>
  </header>
</template>