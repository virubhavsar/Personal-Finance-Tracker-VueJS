<template>
  <div
    class="modal fade"
    id="editCategoryModal"
    tabindex="-1"
    aria-labelledby="editCategoryModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editCategoryModalLabel">Edit Category</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateCategory">
            <div class="mb-3">
              <label for="name" class="form-label">Category Name</label>
              <input type="text" class="form-control" id="name" v-model="category.name" required />
            </div>

            <div class="mb-3">
              <label for="role" class="form-label">Type</label>
              <select class="form-select" id="role" v-model="category.type" required>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
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
    category: {
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

    const updateCategory = async () => {
      try {
        const response = await axios.put(`category/update/${props.category.id}`, props.category)
        emit('category-updated', response.data)
        hideModal()
      } catch (error) {
        console.error('Error updating category:', error)
      }
    }

    watch(
      () => props.category,
      (newVal, oldVal) => {
        if (newVal && newVal.id !== oldVal.id) {
          showModal()
        }
      }
    )

    onMounted(() => {
      console.log('Category:', props.category)
      if (props.category && props.category.id) {
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
      updateCategory
    }
  }
}
</script>
