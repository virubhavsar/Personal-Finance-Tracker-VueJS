<template>
  <body data-sidebar="dark">
    <div id="layout-wrapper">
      <Header />
      <Leftbar />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0 font-size-18">Budget Management</h4>
                </div>
              </div>
            </div>
            <!-- end page title -->
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Add Budget</h4>

                    <form @submit.prevent="handleSubmit">
                      <div class="col-6">
                        <!-- Category -->
                        <div class="mb-3">
                          <label for="category" class="form-label">Category</label>
                          <div class="input-group">
                            <select id="category" class="form-control" v-model="selectedCategory">
                              <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                              >
                                {{ category.name }}
                              </option>
                              <option value="add-new">Add New Category</option>
                            </select>
                          </div>
                          <span v-if="errors.category_id" class="text-danger">
                            {{ errors.category_id[0] }}
                          </span>
                        </div>

                        <!-- Amount -->
                        <div class="mb-3">
                          <label for="amount" class="form-label">Amount</label>
                          <input
                            id="amount"
                            type="number"
                            class="form-control"
                            v-model="amount"
                            placeholder="Enter budget amount"
                          />
                          <span v-if="errors.amount" class="text-danger">
                            {{ errors.amount[0] }}
                          </span>
                        </div>

                        <!-- Start Date -->
                        <div class="mb-3">
                          <label for="startDate" class="form-label">Start Date</label>
                          <input
                            id="startDate"
                            type="date"
                            class="form-control"
                            v-model="startDate"
                          />
                          <span v-if="errors.start_date" class="text-danger">
                            {{ errors.start_date[0] }}
                          </span>
                        </div>

                        <!-- End Date -->
                        <div class="mb-3">
                          <label for="endDate" class="form-label">End Date</label>
                          <input id="endDate" type="date" class="form-control" v-model="endDate" />
                          <span v-if="errors.end_date" class="text-danger">
                            {{ errors.end_date[0] }}
                          </span>
                        </div>

                        <!-- Repeat Every Month -->
                        <div class="mb-3">
                          <label for="repeat" class="form-label">Repeat Every Month</label>
                          <select id="repeat" class="form-control" v-model="repeatEveryMonth">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </form>

                    <!-- Modal for Adding New Category -->
                    <div
                      class="modal fade"
                      id="addCategoryModal"
                      tabindex="-1"
                      aria-labelledby="addCategoryModalLabel"
                      aria-hidden="true"
                      ref="modal"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="addCategoryModalLabel">Add New Category</h5>
                            <button
                              type="button"
                              class="btn-close"
                              @click="hideModal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="handleAddCategory">
                              <div class="mb-3">
                                <label for="newCategoryName" class="form-label">
                                  New Category Name
                                </label>
                                <input
                                  id="newCategoryName"
                                  type="text"
                                  class="form-control"
                                  v-model="newCategoryName"
                                  placeholder="Enter new category name"
                                  required
                                />
                                <span v-if="errors.newCategoryName" class="text-danger">
                                  {{ errors.newCategoryName[0] }}
                                </span>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="hideModal">
                                  Close
                                </button>
                                <button type="submit" class="btn btn-primary">Add Category</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End Modal -->
                  </div>
                </div>
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </body>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from '@/api/axios'
import Swal from 'sweetalert2'
import Header from '@/views/common/Header.vue'
import Leftbar from '@/views/common/Leftbar.vue'
import Footer from '@/views/common/Footer.vue'

export default {
  components: {
    Header,
    Leftbar,
    Footer
  },
  setup() {
    const selectedCategory = ref('')
    const newCategoryName = ref('')
    const amount = ref('')
    const startDate = ref('')
    const endDate = ref('')
    const repeatEveryMonth = ref('no')
    const errors = reactive({})
    const categories = ref([])
    const modal = ref(null)
    let bsModal = null

    // Fetch existing categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/category')
        categories.value = response.data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    // Handle new category submission
    const handleAddCategory = async () => {
      try {
        // Send request to add the new category
        const response = await axios.post('/category/store', {
          name: newCategoryName.value,
          type: 'expense' // or 'income', depending on your requirement
        })

        // Add the new category to the list
        categories.value.push(response.data)

        // Set the newly added category as selected
        selectedCategory.value = response.data.id

        // Reset the form fields
        newCategoryName.value = ''

        // Hide the modal and update categories
        hideModal()
        fetchCategories()

        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Category added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          Object.assign(errors, error.response.data.errors)
        }
      }
    }

    // Handle budget form submission
    const handleSubmit = async () => {
      if (selectedCategory.value === 'add-new') {
        openModal()
      } else {
        try {
          const response = await axios.post('/budget/store', {
            category_id: selectedCategory.value,
            amount: amount.value,
            start_date: startDate.value,
            end_date: endDate.value,
            repeat_every_month: repeatEveryMonth.value
          })

          Swal.fire({
            title: 'Success!',
            text: 'Budget added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        } catch (error) {
          if (error.response && error.response.data && error.response.data.errors) {
            Object.assign(errors, error.response.data.errors)
          }
        }
      }
    }

    // Open the modal
    const openModal = () => {
      if (!bsModal) {
        bsModal = new bootstrap.Modal(modal.value)
      }
      bsModal.show()
    }

    // Hide the modal
    const hideModal = () => {
      if (bsModal) {
        bsModal.hide()
      }
    }

    // Watch for changes in selectedCategory
    watch(selectedCategory, (newValue) => {
      if (newValue === 'add-new') {
        openModal()
      }
    })

    // Initialize component
    onMounted(() => {
      fetchCategories()
      // Initialize Bootstrap modal
      if (modal.value) {
        bsModal = new bootstrap.Modal(modal.value)
      }
    })

    return {
      selectedCategory,
      newCategoryName,
      amount,
      startDate,
      endDate,
      repeatEveryMonth,
      errors,
      categories,
      handleSubmit,
      handleAddCategory,
      openModal,
      hideModal,
      modal
    }
  }
}
</script>

<style>
.text-danger {
  color: red;
}
</style>
