<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../supabase'
import home1 from '../assets/images/home1.jpeg'
import home2 from '../assets/images/home2.jpeg'

const homeCategories = ref([])
const homeProducts = ref([])
const isLoading = ref(true)
const selectedProduct = ref(null)
const personalNote = ref('')
const settings = ref({ whatsapp_number: '6281227419667' })

const fetchHomeData = async () => {
  isLoading.value = true
  try {
    const { data: catData, error: catErr } = await supabase
      .from('categories')
      .select('*')
      .eq('is_home', true)

    if (catErr) throw catErr

    const { data: prodData, error: prodErr } = await supabase
      .from('products')
      .select('*')
      .eq('is_home', true)
      .eq('is_available', true)

    if (prodErr) throw prodErr

    if (catData) homeCategories.value = catData
    if (prodData) homeProducts.value = prodData
  } catch (err) {
    console.error('Failed to fetch home data:', err)
  } finally {
    isLoading.value = false
  }
}

const fetchSettings = async () => {
  try {
    const { data, error } = await supabase.from('settings').select('*').limit(1).single()
    if (!error && data) {
      settings.value = data
    }
  } catch (err) {
    console.error('Failed to fetch settings:', err)
  }
}

onMounted(() => {
  fetchHomeData()
  fetchSettings()
})

const openProductDetail = (product) => {
  selectedProduct.value = product
  personalNote.value = ''
}

const closeProductDetail = () => {
  selectedProduct.value = null
}

const checkoutWhatsapp = () => {
  if (!selectedProduct.value) return
  const p = selectedProduct.value
  let total = p.price

  let msg = `Hello Kokorokara, I would like to order:\n`
  msg += `*Bouquet*: ${p.name}\n`
  if (p.flowers) {
    msg += `*Flower Type*: ${p.flowers}\n`
  }
  if (personalNote.value) {
    msg += `*Personal Note*: ${personalNote.value}\n`
  }
  msg += `*Total Price*: ${formatPrice(total)}\n\n`
  msg += `Can this be delivered?`

  const encodedMsg = encodeURIComponent(msg)
  const phone = settings.value.whatsapp_number || '6281227419667'
  window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank')
}

const formatPrice = (price) => {
  if (!price) return ''
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}
</script>

<template>
  <div class="min-h-screen bg-transparent">
    <!-- Transparent to inherit App gradient -->
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Content Grid Layout -->
      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12 pt-20"
      >
        <!-- Text Content -->
        <div class="flex-1 text-center md:text-left">
          <span
            class="inline-block py-1 px-3 rounded-full bg-rose-200 text-rose-900 text-sm font-semibold tracking-wider mb-6 border border-rose-300"
          >
            PREMIUM FLOWERS QUALITY
          </span>
          <h1 class="text-5xl md:text-6xl font-serif text-[#4A2525] mb-6 leading-tight">
            <!-- Maroon/Dark Brown text -->
            Let the Flowers <br />
            <span class="text-rose-600 italic text-4xl md:text-[3.5rem] mt-2 inline-block"
              >tells a Story</span
            >
          </h1>
          <p
            class="text-lg md:text-xl text-stone-600 mb-10 font-light max-w-lg mx-auto md:mx-0 leading-relaxed border-l-4 border-rose-200 pl-4"
          >
            Handcrafted flower bouquets with elegant soft colors, ready to perfect your every
            special moment.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <RouterLink
              to="/catalog"
              class="bg-[#8B3A3A] hover:bg-[#682a2a] text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-[#8B3A3A]/30 w-full sm:w-auto"
            >
              Explore Collection
            </RouterLink>
            <RouterLink
              to="/about"
              class="bg-white/80 hover:bg-white backdrop-blur-sm border-2 border-rose-100 text-[#8B3A3A] px-8 py-4 rounded-full text-lg font-bold transition-all w-full sm:w-auto shadow-sm"
            >
              Our Story
            </RouterLink>
          </div>
        </div>

        <!-- Image Gallery (Kekinian Layout) -->
        <div class="flex-1 relative w-full h-[500px] hidden md:block">
          <div
            class="absolute top-10 left-0 w-64 h-80 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[-6deg] z-10 hover:rotate-0 hover:z-30 transition-transform duration-500"
          >
            <img
              :src="home1"
              class="w-full h-full object-cover"
              alt="Mawar Merah Muda"
            />
          </div>
          <div
            class="absolute bottom-10 right-10 w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[4deg] z-20 hover:rotate-0 hover:z-30 transition-transform duration-500"
          >
            <img
              :src="home2"
              class="w-full h-full object-cover"
              alt="Buket Warna Pastel"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Categories Section -->
    <section
      class="py-24 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] relative z-20"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div v-if="isLoading" class="text-center py-20 text-stone-500">
          <svg
            class="animate-spin h-8 w-8 text-[#8B3A3A] mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading best collections...
        </div>

        <template v-else>
          <div v-if="homeCategories.length === 0" class="text-center py-20 text-stone-500">
            Collections are being updated. Please visit our catalog page!
          </div>

          <div v-for="category in homeCategories" :key="category.id">
            <!-- Category Header -->
            <div class="text-center mb-16">
              <h2 class="text-4xl font-serif text-[#4A2525] mb-4">{{ category.name }}</h2>
              <p class="text-stone-500 max-w-2xl mx-auto">
                {{
                  category.description ||
                  'Temukan desain khas kami, dikurasi khusus untuk melengkapi momen spesial Anda.'
                }}
              </p>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                v-for="product in homeProducts.filter((p) => p.category_id === category.id)"
                :key="product.id"
                class="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group"
              >
                <div class="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer">
                  <img
                    v-if="product.image_url"
                    :src="product.image_url"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400"
                  >
                    No Photo
                  </div>
                </div>

                <div class="p-6 flex flex-col flex-grow">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-serif text-[#4A2525] leading-tight pr-4 font-semibold">
                      {{ product.name }}
                    </h3>
                    <div class="text-right flex-shrink-0">
                      <p
                        v-if="product.original_price"
                        class="text-xs text-stone-400 line-through mb-0.5"
                      >
                        {{ formatPrice(product.original_price) }}
                      </p>
                      <div v-else class="h-4 mb-0.5"></div>
                      <p class="text-[15px] font-bold text-[#C57474]">
                        {{ formatPrice(product.price) }}
                      </p>
                    </div>
                  </div>

                  <p
                    v-if="product.flowers"
                    class="text-[11px] text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md font-bold mb-4 uppercase tracking-wide inline-block max-w-fit line-clamp-1"
                  >
                    {{ product.flowers }}
                  </p>

                  <p class="text-sm text-stone-500 mb-6 leading-relaxed line-clamp-2">
                    {{ product.description || 'Crafted with premium materials.' }}
                  </p>

                  <div class="mt-auto flex items-center justify-center w-full pt-2">
                    <!-- Order Now button -->
                    <button
                      @click="openProductDetail(product)"
                      class="flex items-center justify-center h-[40px] px-6 w-max bg-[#B88B8B] hover:bg-[#9D6C6C] text-white rounded-full transition-all duration-300 shadow-sm shadow-[#B88B8B]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span class="font-semibold text-sm"> Order Now </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="homeProducts.filter((p) => p.category_id === category.id).length === 0"
              class="text-center text-stone-400 py-10"
            >
              No featured products in this category yet.
            </div>

            <div class="text-center mt-12">
              <RouterLink
                to="/catalog"
                class="inline-flex items-center text-[#8B3A3A] font-bold hover:text-rose-500 transition-colors"
              >
                view all collections
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </RouterLink>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Delivery Areas Section -->
    <section class="py-24 bg-transparent relative z-10 border-t border-rose-100/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          class="inline-block py-1 px-3 border border-[#C1838A] text-[#8B3A3A] text-xs font-bold uppercase tracking-wider mb-6 bg-rose-50/50 rounded-md"
          >ISLAND-WIDE DELIVERY</span
        >
        <h2 class="text-3xl md:text-4xl font-serif text-[#4A2525] mb-6">
          Swift & Reliable Delivery Throughout Bali
        </h2>
        <p class="text-stone-500 leading-relaxed mb-12 text-lg mx-auto font-light max-w-2xl">
          From the beautiful beaches of Uluwatu to the serene landscapes of Ubud, we ensure your
          flowers arrive in perfect condition. Place your order before 1 PM to enjoy prompt same-day
          delivery.
        </p>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-rose-50 shadow-sm"
        >
          <div class="border-l-2 border-[#C1838A] pl-5">
            <h4 class="font-bold text-[#4A2525] mb-2 text-lg">Same-Day Delivery</h4>
            <p class="text-stone-500">Order by 1 PM for same-day delivery</p>
          </div>
          <div class="border-l-2 border-[#C1838A] pl-5">
            <h4 class="font-bold text-[#4A2525] mb-2 text-lg">Hand-Delivered</h4>
            <p class="text-stone-500">Each bouquet delivered with utmost care</p>
          </div>
          <div class="border-l-2 border-[#C1838A] pl-5">
            <h4 class="font-bold text-[#4A2525] mb-2 text-lg">Freshness Guaranteed</h4>
            <p class="text-stone-500">100% fresh flowers or your money back</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Detail Modal Overlay -->
    <div
      v-if="selectedProduct"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-rose-100 relative"
      >
        <!-- Close Button (Absolute against modal) -->
        <button
          @click="closeProductDetail"
          class="absolute top-4 right-4 z-10 text-stone-400 hover:text-[#4A2525] bg-white/50 hover:bg-white backdrop-blur-sm shadow-sm p-2 rounded-full transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Left: Image -->
        <div class="w-full md:w-1/2 h-64 md:h-auto bg-stone-100 relative shrink-0">
          <img
            v-if="selectedProduct.image_url"
            :src="selectedProduct.image_url"
            :alt="selectedProduct.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-stone-400">
            No Photo
          </div>
          <!-- PO Tag inside image -->
          <span
            v-if="selectedProduct.is_preorder"
            class="absolute top-4 left-4 px-3 py-1 bg-yellow-100/90 backdrop-blur text-yellow-800 rounded-lg text-xs font-bold border border-yellow-200/50 shadow-sm"
          >
            Available for Pre-Order ({{ selectedProduct.estimated_days }} Days)
          </span>
        </div>

        <!-- Right: Information -->
        <div class="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div class="mb-4 border-b border-rose-100 pb-6">
            <span
              class="px-3 py-1 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg text-xs font-bold mb-4 inline-block tracking-wide uppercase"
              >{{
                homeCategories.find((c) => c.id === selectedProduct.category_id)?.name || 'Category'
              }}</span
            >
            <h2 class="text-3xl font-serif text-[#4A2525] leading-tight font-semibold mb-2">
              {{ selectedProduct.name }}
            </h2>

            <div class="flex items-center gap-3">
              <p class="text-2xl font-bold text-[#C57474]">
                {{ formatPrice(selectedProduct.price) }}
              </p>
              <p v-if="selectedProduct.original_price" class="text-sm text-stone-400 line-through">
                {{ formatPrice(selectedProduct.original_price) }}
              </p>
            </div>
          </div>

          <div class="mb-6 flex-1">
            <p class="text-stone-500 leading-relaxed text-sm whitespace-pre-line">
              {{
                selectedProduct.description || 'No detailed description available for this product.'
              }}
            </p>
          </div>

          <!-- Delivery Info -->
          <div class="mb-6 border-t border-rose-100 pt-6">
            <div class="mb-5">
              <div class="flex items-center mb-3">
                <div class="w-2 h-2 bg-[#8B3A3A] mr-3 rounded-full"></div>
                <h4 class="font-bold text-[#4A2525] text-sm">Priority Delivery</h4>
              </div>
              <div class="flex flex-wrap gap-2 ml-5">
                <span
                  class="px-4 py-2 bg-[#C1838A] text-white text-sm font-semibold rounded-lg shadow-sm"
                  >Kuta</span
                >
                <span
                  class="px-4 py-2 bg-[#C1838A] text-white text-sm font-semibold rounded-lg shadow-sm"
                  >Seminyak</span
                >
                <span
                  class="px-4 py-2 bg-[#C1838A] text-white text-sm font-semibold rounded-lg shadow-sm"
                  >Canggu</span
                >
                <span
                  class="px-4 py-2 bg-[#C1838A] text-white text-sm font-semibold rounded-lg shadow-sm"
                  >Sanur</span
                >
              </div>
            </div>
            <div>
              <div class="flex items-center mb-3">
                <div class="w-2 h-2 bg-[#8B3A3A] mr-3 rounded-full"></div>
                <h4 class="font-bold text-[#4A2525] text-sm">Extended Coverage</h4>
              </div>
              <div class="flex flex-wrap gap-2 ml-5">
                <span
                  class="px-4 py-2 border border-[#C1838A] text-[#8B3A3A] text-sm font-semibold bg-white/50 rounded-lg shadow-sm"
                  >Jimbaran</span
                >
                <span
                  class="px-4 py-2 border border-[#C1838A] text-[#8B3A3A] text-sm font-semibold bg-white/50 rounded-lg shadow-sm"
                  >Ubud</span
                >
                <span
                  class="px-4 py-2 border border-[#C1838A] text-[#8B3A3A] text-sm font-semibold bg-white/50 rounded-lg shadow-sm"
                  >Uluwatu</span
                >
              </div>
            </div>
          </div>

          <!-- Flower Types -->
          <div v-if="selectedProduct.flowers" class="mb-6 border-b border-rose-100 pb-6">
            <h4 class="text-[11px] font-bold text-[#8B3A3A] mb-3 uppercase tracking-wider">
              FLOWER TYPES
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="flower in selectedProduct.flowers.split(',').map((f) => f.trim())"
                :key="flower"
                class="px-2 py-1 bg-rose-50 text-[#8B3A3A] text-[11px] font-bold border border-rose-100 rounded-sm"
              >
                {{ flower }}
              </span>
            </div>
          </div>

          <!-- Personal Note -->
          <div class="mb-6 border-t border-rose-100 pt-6">
            <h4 class="text-[11px] font-bold text-[#8B3A3A] mb-1 uppercase tracking-wider">
              PERSONAL NOTE
            </h4>
            <p class="text-[11px] text-stone-500 mb-2">
              We will print your message on a cute card for free.
            </p>
            <textarea
              v-model="personalNote"
              rows="3"
              placeholder="Write your message here... (We'll handwrite it on the card)"
              class="w-full p-3 border border-rose-200 bg-white text-sm rounded-xl focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A] resize-none"
            ></textarea>
          </div>

          <!-- Checkout Button -->
          <div class="mt-auto pt-4 flex flex-col gap-2">
            <button
              @click="checkoutWhatsapp"
              class="w-full bg-[#8B3A3A] hover:bg-[#682a2a] text-white py-4 rounded-xl font-bold tracking-wider text-sm transition-all shadow-lg shadow-[#8B3A3A]/20 flex justify-center items-center gap-2 uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Order Now Through WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
