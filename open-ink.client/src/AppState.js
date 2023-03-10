import { computed, reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // user data
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  artist: {},
  limits: {},
  invites: [],
  // artist data
  activeGallery: {},
  galleries: [],
  projects: [],
  activeProject: {},
  pieces: [],
  relatedProjects: [],

  // utilities
  loading: 0,
  editing: {},


  // themeing
  mobileDisplay: false
})

export const isArtist = computed(() => AppState.artist.id == AppState.account.id)
