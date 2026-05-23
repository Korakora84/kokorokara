<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()
// Hide visitor navbar and footer if the user is on the admin/dashboard routes
const isDashboardFlow = computed(() => {
  return route.path.startsWith('/admin') || route.path.startsWith('/dashboard')
})
</script>

<template>
  <div class="font-sans text-stone-900 bg-white min-h-screen flex flex-col">
    <!-- Navbar Component -->
    <Navbar v-if="!isDashboardFlow" />

    <!-- Main Content -->
    <main :class="[!isDashboardFlow ? 'flex-grow pt-8' : 'flex-grow']">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer v-if="!isDashboardFlow" class="bg-[#2A1515] text-[#EAD8D8] py-16 mt-auto">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#4A2525] pb-12"
      >
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <span class="font-serif text-3xl font-bold tracking-wider text-pink-50">
              KOKOROKARA
            </span>
          </div>
          <p class="max-w-sm text-[#D7BABA] leading-relaxed">
            From the heart of the city, we channel passion into every petal.
            <strong>Bali Blossom</strong> offers exclusive <strong>kokorokara</strong> collections
            and curates beautiful <strong>floral arrangements</strong> to perfect all your
            celebratory moments.
          </p>
        </div>
        <div>
          <h4 class="text-pink-50 font-bold mb-6 uppercase tracking-wider text-sm">
            Our Collections
          </h4>
          <ul class="space-y-4 text-[#D7BABA]">
            <li>
              <RouterLink to="/catalog" class="hover:text-rose-300 transition-colors"
                >All Bouquets</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/catalog?cat=roses" class="hover:text-rose-300 transition-colors"
                >Rose Collection</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/catalog?cat=fresh" class="hover:text-rose-300 transition-colors"
                >Fresh Flowers</RouterLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-pink-50 font-bold mb-6 uppercase tracking-wider text-sm">Information</h4>
          <ul class="space-y-4 text-[#D7BABA]">
            <li>
              <RouterLink to="/about" class="hover:text-rose-300 transition-colors"
                >About Us</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-rose-300 transition-colors"
                >Contact Us</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#A88B8B]"
      >
        <p>&copy; {{ new Date().getFullYear() }} Kokorokara. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-pink-50 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-pink-50 transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

html {
  font-family: 'Plus Jakarta Sans', sans-serif;
  scroll-behavior: smooth;
}
.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>
