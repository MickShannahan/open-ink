<template>
  <header>
    <!-- <Navbar v-if="account.id && artist.id == account.id" /> -->
  </header>
  <main class="bg-bg">
    <router-view />
  </main>
  <footer class="bg-bg">
    <EditorFab v-if="account.id && artist.id == account.id" />
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { AppState } from './AppState'
import { logger } from './utils/Logger.js';


const appState = computed(() => AppState)
const account = computed(() => AppState.account)
const artist = computed(() => AppState.artist)
const theme = computed(() => AppState.artist?.theme)
const primaryColor = computed(() => theme.value?.primaryColor || '#fff')
const secondaryColor = computed(() => theme.value?.secondaryColor || '#fff')
const accentColor = computed(() => theme.value?.accentColor || '#fff')
const bg = computed(() => theme.value?.background || '#222')
const bgAccent = computed(() => theme.value?.backgroundAccent || '#333')
const borderRadius = computed(() => theme.value?.cardBorder + 'px' || '0px')
const cover = computed(() => {
  let cover = AppState.artist.theme?.cover
  let type = AppState.artist.theme?.coverType
  logger.log('computing cover', cover, type)
  if (!cover || !type) return '#111'
  if (type == 'fill') return cover
  if (type == 'image') return `url(${cover})`
  return `linear-gradient(45deg, ${accentColor.value} 0%, ${secondaryColor.value} 35%, ${primaryColor.value} 100%)`
})
const fontHeading = computed(() => theme.value?.fontHeading)
const fontBody = computed(() => theme.value?.fontBody)
const fontColor = computed(() => theme.value?.fontColor)
// const cover = computed(() => )

</script>
<style lang="scss">
@import "./assets/scss/main.scss";

$theme-primary: v-bind(primaryColor);
$theme-secondary: v-bind(secondaryColor);
$theme-accent: v-bind(accentColor);
$theme-bg : v-bind(bg);
$theme-bg-accent : v-bind(bgAccent);
$theme-border: v-bind(borderRadius);
$theme-cover: v-bind(cover);
$theme-font-heading: v-bind(fontHeading);
$theme-font-body: v-bind(fontBody);
$theme-font-color: v-bind(fontColor);

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $theme-font-heading;
}

p,
div,
button,
span,
b,
small {
  font-family: $theme-font-body;
}

.text-theme-color {
  color: $theme-font-color
}

.btn {
  color: unset;
}

form * {
  accent-color: $theme-accent;
}

.modal-backdrop.show {
  z-index: -10;
}

a {
  color: $theme-primary !important;

  &:hover {
    color: unset
  }
}

.router-link-exact-active {
  margin-bottom: 0px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: $theme-primary;
  color: black !important;
  // :hover {
  //   color: $theme-primary;
  // }
}

.bg-bg {
  background-color: $theme-bg;
}

.bg-accent {
  background-color: $theme-bg-accent;
}

.cover-theme {
  background: $theme-cover;
}

.bg-theme- {
  &primary {
    background-color: $theme-primary;
  }

  &secondary {
    background-color: $theme-secondary;
  }

  &accent {
    background-color: $theme-accent;
  }
}

.text-theme- {
  &primary {
    color: $theme-primary;
  }

  &secondary {
    color: $theme-secondary;
  }

  &accent {
    color: $theme-accent;
  }
}

.border-theme {
  border-radius: $theme-border;
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.lock-y {
  overflow-y: hidden;
}
</style>
