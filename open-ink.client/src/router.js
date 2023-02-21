import { createRouter, createWebHashHistory, useRoute } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'
import { logger } from './utils/Logger.js'
import Pop from './utils/Pop.js'
import { artistsService } from './services/ArtistsService.js'
import { AppState } from './AppState.js'
import { days, hours, minutes } from './utils/time.js'
import { galleriesService } from './services/GalleriesService.js'
import { matureService } from './services/MatureService.js'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/:artist',
    name: 'Artist',
    component: loadPage('ArtistPage'),
    beforeEnter: [authSettled, ageRestrict],
    children: [
      {
        path: ':gallery',
        name: 'Gallery',
        beforeEnter: [authSettled, ageRestrict],
        component: loadPage('GalleryPage')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/signup/:code',
    name: 'SignUp',
    component: loadPage('SignUpPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

async function ageRestrict(to, from, next) {

  const artist = await artistsService.getArtist(to.params.artist)
  let ageConfirm = false
  if (artist.nsfw && artist.email == AppState.user.email) matureService.setToken()
  if (artist.nsfw) {
    ageConfirm = await matureService.confirmToken()

    if (!ageConfirm) {
      next({ name: 'Home' })
    }
  }

  next()
}
