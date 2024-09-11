<template>
  <div
    class="modal fade"
    id="editUserModal"
    tabindex="-1"
    aria-labelledby="editUserModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateUser">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="user.username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" readonly />
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <select class="form-select" id="role" v-model="user.role" required>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/api/axios'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const modal = ref(null)
    let bsModal = null

    const showModal = () => {
      if (!bsModal) {
        bsModal = new bootstrap.Modal(modal.value)
      }
      bsModal.show()
      modal.value.addEventListener('hidden.bs.modal', onModalHidden, { once: true })
    }

    const hideModal = () => {
      if (bsModal) {
        bsModal.hide()
      }
    }

    const onModalHidden = () => {
      modal.value.removeEventListener('hidden.bs.modal', onModalHidden)
      bsModal.dispose()
      bsModal = null
      emit('close-modal')
    }

    const updateUser = async () => {
      try {
        const response = await axios.put(`users/${props.user.id}`, props.user)
        emit('user-updated', response.data)
        hideModal()
      } catch (error) {
        console.error('Error updating user:', error)
      }
    }

    watch(
      () => props.user,
      (newVal, oldVal) => {
        if (newVal && newVal.id !== oldVal.id) {
          showModal()
        }
      }
    )

    onMounted(() => {
      if (props.user && props.user.id) {
        showModal()
      }
    })

    onBeforeUnmount(() => {
      if (bsModal) {
        bsModal.dispose()
      }
    })

    return {
      modal,
      hideModal,
      updateUser
    }
  }
}
</script>
