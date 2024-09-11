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
                  <h4 class="mb-sm-0 font-size-18">Category Management</h4>
                </div>
              </div>
            </div>
            <!-- end page title -->
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Category List</h4>
                    <p class="card-title-desc">Displaying categories fetched from Laravel API.</p>

                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Category Name</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="category in categories" :key="category.id">
                          <td>{{ category.id }}</td>
                          <td>{{ category.name }}</td>
                          <td
                            :style="{
                              color:
                                category.type === 'expense'
                                  ? 'red'
                                  : category.type === 'income'
                                    ? 'green'
                                    : 'black'
                            }"
                          >
                            {{ category.type }}
                          </td>

                          <td>
                            <div class="dropdown d-inline-block">
                              <button
                                type="menu"
                                class="btn btn-primary"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i class="mdi mdi-dots-vertical"></i>
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                                style=""
                              >
                                <li>
                                  <a class="dropdown-item" href="#" @click="editCategory(category)"
                                    >Edit</a
                                  >
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item"
                                    href="#"
                                    @click="deleteCategory(category.id)"
                                    >Delete</a
                                  >
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
          </div>
        </div>
        <EditCategoryModal
          v-if="selectedCategory"
          :category="selectedCategory"
          @category-updated="fetchCategory"
          @close-modal="resetselectedCategory"
        />
        <Footer />
      </div>
    </div>
  </body>
</template>

<script>
import axios from '@/api/axios'
import Header from '@/views/common/Header.vue'
import Leftbar from '@/views/common/Leftbar.vue'
import Footer from '@/views/common/Footer.vue'
import EditCategoryModal from '@/views/pages/Category/CategoryEditManageModel.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Header,
    Leftbar,
    Footer,
    EditCategoryModal
  },
  data() {
    return {
      categories: [],
      selectedCategory: null
    }
  },
  mounted() {
    this.fetchCategory()
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get('category')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching category:', error)
      }
    },

    async deleteCategory(cateID) {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      })

      if (confirmation.isConfirmed) {
        try {
          await axios.delete(`category/delete/${cateID}`)
          this.fetchCategory()
          Swal.fire('Deleted!', 'Category has been deleted.', 'success')
        } catch (error) {
          console.error('Error deleting category:', error)
          Swal.fire('Error!', 'An error occurred while deleting the category.', 'error')
        }
      }
    },
    editCategory(category) {
      this.selectedCategory = { ...category }
    },
    resetselectedCategory() {
      this.selectedCategory = null
    }
  }
}
</script>

<style scoped>
.expense {
  color: red;
}

.income {
  color: green;
}
</style>
