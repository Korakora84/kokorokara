import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beranda',
      component: Home,
      meta: {
        title: 'Kokorokara | Jual Bunga Bali & Karangan Bunga',
        description:
          'Kokorokara dari Bali Blossom menyediakan layanan buang abalu, buket, dan karangan bunga segar terbaik.',
      },
    },
    {
      path: '/catalog',
      name: 'katalog',
      component: Catalog,
      meta: {
        title: 'Katalog Bunga & Kokorokara - Bali Blossom',
        description:
          'Lihat koleksi lengkap bunga bali dan layanan buang abalu kami di katalog ini.',
      },
    },
    {
      path: '/about',
      name: 'tentang',
      component: About,
      meta: {
        title: 'Tentang Kami - Kokorokara Bali Blossom',
        description:
          'Mengenal lebih dekat perjalanan kami menghadirkan layanan bunga terbaik dan solusi buang abalu.',
      },
    },
    {
      path: '/contact',
      name: 'kontak',
      component: Contact,
      meta: {
        title: 'Hubungi Kami - Kokorokara',
        description: 'Pesan karangan bunga atau tanyakan seputar layanan kokorokara di sini.',
      },
    },
    { path: '/admin', name: 'admin', component: AdminLogin },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

// Authentication Guard & SEO Middleware
router.beforeEach(async (to, from, next) => {
  // --- 1. SEO: Ganti Title & Meta Description Otomatis ---
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }

  // --- 2. AUTHENTICATION SUPABASE ---
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      next('/admin') // Redirect to login if not authenticated
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
