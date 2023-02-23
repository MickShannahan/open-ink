<template>
  <section v-if="acceptedAccount" class="row text-dark">
    <div class="col-12">Invite other artists</div>
    <button class="btn-theme text-" @click="createInvite">create invite link {{
      invites.length
    }}/{{ account.inviteMax || 3 }}</button>

    <div class="col-12 p-2" v-for="invite in invites">
      <router-link :to="{ name: 'Artist', params: { artist: invite.account.username } }"
        v-tooltip:auto="`see artists box`" v-if="invite.account"
        class="btn-theme text-primary d-flex justify-content-between p-2 rounded">
        <div><i class="mdi mdi-account me-1"></i>{{ invite.account.username || invite.account.name }}</div>
        <i class="mdi mdi-link"></i>
      </router-link>
      <div v-else class="selectable d-flex justify-content-between text-info p-2 rounded"
        v-tooltip:auto="`copy invite link`" @click="copyCodeLink(invite.id)">
        <div>https://website.com/signup/{{ invite.id }}</div>
        <div class="open invite"><i class="mdi mdi-circle-outline"></i></div>
      </div>
    </div>
  </section>
  <section v-else-if="!account.TOSAgree && account.id">
    <div class="col-12">
      <p>Welcome, To get started please supply your invite code</p>
    </div>
    <form @submit.prevent="acceptInvite">
      <div class="mb-3">
        <div class="input-group">
          <input type="text" required minlength="24" maxlength="24" class="form-control w-75" v-model="editable.id"
            @change="checkCode">
          <button v-if="validCode == false" class="form-control btn btn-danger" disabled><i
              class="mdi mdi-close"></i></button>
          <button v-else-if="validCode" class="form-control btn btn-success" disabled><i
              class="mdi mdi-check"></i></button>
          <button v-else class="form-control btn btn-secondary" disabled><i class="mdi mdi-circle-outline"></i></button>
        </div>
        <small v-if="validCode == null">Paste 24 character code</small>
        <small v-else-if="validCode == false">code is not valid</small>
        <small v-else>code is valid please accept terms</small>
      </div>
      <div v-if="validCode == true" class="mb-3">
        <label for="">Do you accept the terms?</label>
        <input type="checkbox" required v-model="editable.TOSAgree">
        <small>read terms here <a href="" target="_blank">tos</a></small>
      </div>
      <div class="mb-3">
        <button :disabled="!validCode == true && !editable.TOSAgree" class="btn btn-primary">
          Create Profile
        </button>
      </div>
    </form>
  </section>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { invitesService } from '../services/InvitesService.js'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import { useRoute } from 'vue-router';
const route = useRoute()
const user = computed(() => AppState.user)
const account = computed(() => AppState.account)
const invites = computed(() => AppState.invites)
const acceptedAccount = computed(() => AppState.account.TOSAgree && AppState.account.inviteCode)
const validCode = ref(null)
const editable = ref({})

onMounted(() => {
  if (route.query.invite) {
    editable.value.id = route.query.invite
    checkCode()
  }
  getInvites()
})

async function getInvites() {
  try {
    await invitesService.getAccountInvites()
  } catch (error) {
    Pop.error(error)
  }
}

async function createInvite() {
  try {
    await invitesService.create()
    Pop.toast('invite created', 'success', 'top')
  } catch (error) {
    Pop.error(error)
  }
}

function copyCodeLink(code) {
  let url = window.location.origin
  logger.log(url.origin)
  navigator.clipboard.writeText(url + '/#/signup/' + code)
}

async function checkCode() {
  try {
    let invite = {}
    if (editable.value.id.length == 24) {
      invite = await invitesService.checkCode(editable.value.id)
    }
    if (invite.account.id != AppState.account._id) {
      debugger
      if (!invite.account) {
        validCode.value = true
      } else {
        validCode.value = false
        Pop.toast('That code has already been used')
      }
    }

  } catch (error) {
    validCode.value = false
    Pop.toast('Code is invalid')
    logger.error(error)
  }
}

async function acceptInvite() {
  try {
    editable.value.accountId = AppState.account.id
    editable.value.accepted = true
    await invitesService.accept(editable.value)
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<style lang="scss" scoped></style>
