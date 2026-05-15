<script setup>
import aboutImg from '../assets/images/aboute.jpeg'
</script>

<template>
  <div class="min-h-screen bg-white pt-40 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <!-- Image -->
        <div class="hidden md:block relative h-[550px] lg:h-[600px] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#8B3A3A]/10 p-2 bg-white/50">
          <div class="w-full h-full rounded-2xl overflow-hidden">
            <img :src="aboutImg" class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Pembuat Bunga (Florist)" />
          </div>
        </div>

        <!-- Content -->
        <div>
          <span class="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-800 text-sm font-semibold tracking-wider mb-4 border border-rose-200">
            ABOUT US
          </span>
          <h1 class="text-4xl md:text-5xl font-serif text-[#4A2525] mb-6">The Story Behind Kokorokara</h1>
          <p class="text-lg text-stone-600 mb-6 font-light leading-relaxed">
            Welcome to Kokorokara, established since 2023, where poetry meets flower petals. Founded with a passion to bring nature's most beautiful masterpieces into your most important moments, we believe that every bouquet tells its own story.
          </p>
          <p class="text-lg text-stone-600 mb-8 font-light leading-relaxed">
            Starting from a small dream of arranging beauty, Kokorokara has blossomed into a beloved boutique that prioritizes quality, creativity, and the joy of sharing. Every stem in our collection is selected with precision and arranged with love.
          </p>
          <p class="text-lg text-stone-600 mb-8 font-light leading-relaxed">
            We specialize in curating delicate and meaningful arrangements, combining elegant color palettes with premium craftsmanship. Each of our creations is designed to convey emotions that words sometimes cannot express, celebrating both grand milestones and everyday affections.
          </p>
          
          <div class="grid grid-cols-2 gap-8 mb-10">
            <div class="bg-white/50 p-6 rounded-3xl border border-[#8B3A3A]/10 text-center">
              <h3 class="text-4xl font-serif text-[#8B3A3A] mb-2 drop-shadow-sm">1k+</h3>
              <p class="text-stone-500 text-xs uppercase tracking-widest font-bold">Satisfied Customers</p>
            </div>
            <div class="bg-white/50 p-6 rounded-3xl border border-[#8B3A3A]/10 text-center">
              <h3 class="text-4xl font-serif text-[#8B3A3A] mb-2 drop-shadow-sm">100%</h3>
              <p class="text-stone-500 text-xs uppercase tracking-widest font-bold">Handcrafted</p>
            </div>
          </div>

          <button class="bg-[#8B3A3A] hover:bg-[#682a2a] text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-all shadow-xl shadow-[#8B3A3A]/30 w-full sm:w-auto">
            Meet Our Florist Team
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
