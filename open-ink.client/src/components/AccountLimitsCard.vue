<template>
  <h4 class="text-center">Account Status</h4>
  <div class="text-center fs-4 text-info">
    <div v-if="!account.TOSAgree" class="bg-dark text-warning rounded">Not Validated<i
        class="mdi mdi-account-alert-outline"></i>
    </div>
    <div v-else-if="admin">admin <i class="mdi mdi-shield-account"></i></div>
    <div v-else-if="premium">premium <i class="mdi mdi-plus"></i> <i class="mdi mdi-account"></i></div>
    <div v-else>free <i class="mdi mdi-account-outline"></i></div>
  </div>
  <div class="d-flex justify-content-between text-dark border-bottom border-secondary mb-1"
    v-for="(limit, name) in limits">
    <div class="fw-bold">{{ name }}</div>
    <div :class="{
      'text-info': limit < maxes[name],
      'text-danger': limit >= maxes[name]
    }">{{ limit }} / {{ maxes[name] }}</div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { AuthService } from '../services/AuthService.js';
const user = computed(() => AppState.user)
const account = computed(() => AppState.account)
const admin = computed(() => AuthService.hasRoles('admin'))
const premium = computed(() => AuthService.hasRoles('premium-user'))
const limits = computed(() => AppState.limits)
const maxes = {
  invites: 3,
  galleries: 5,
  projects: 50,
  pieces: 200,
}

onMounted(() => {
  getLimits()
})

async function getLimits() {
  try {
    await accountService.getLimits()
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<style lang="scss" scoped></style>
