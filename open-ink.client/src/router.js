import { createRouter, createWebHashHistory, useRoute } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'
import { logger } from './utils/Logger.js'
import Pop from './utils/Pop.js'
import { artistsService } from './services/ArtistsService.js'
import { AppState } from './AppState.js'
import { days, minutes } from './utils/time.js'

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
  const ageToken = JSON.parse(localStorage.getItem('open_ink_age_token'))
  logger.log(ageToken)
  if (!ageToken || new Date(ageToken.timeStamp).getTime < 3 * minutes) {
    const artist = await artistsService.getArtist(to.params.artist)
    let ageConfirm = true
    if (artist.nsfw && AppState.user.email != artist.email) {
      ageConfirm = await Pop.confirm('This Gallery has been marked as NSFW.', 'please confirm you age before entering', 'Yes I am 18 or over', 'No get Me outta here', 'question')
    }
    if (!ageConfirm) next({ name: 'Home' })
  }

  localStorage.setItem('open_ink_age_token', JSON.stringify({ timeStamp: new Date() }))
  next()
}
