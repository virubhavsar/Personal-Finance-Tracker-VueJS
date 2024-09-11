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
                    <h4 class="card-title">Add Category</h4>

                    <form @submit.prevent="handleSubmit">
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="name" class="form-label">Category Name</label>
                          <input type="text" class="form-control" id="name" v-model="name" />
                          <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                          <label for="type" class="form-label">Type</label>
                          <select id="type" class="form-control" v-model="type">
                            <option value="">Select Type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                          </select>
                          <span v-if="errors.type" class="text-danger">{{ errors.type[0] }}</span>
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </form>
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
import { ref, reactive } from 'vue'
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
    const name = ref('')
    const type = ref('')

    const errors = reactive({})

    const resetForm = () => {
      name.value = ''
      type.value = ''
    }

    const handleSubmit = async () => {
      try {
        const response = await axios.post('/category/store', {
          name: name.value,
          type: type.value
        })

        resetForm()
        Object.keys(errors).forEach((key) => delete errors[key])
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

    return {
      name,
      type,
      errors,
      handleSubmit
    }
  }
}
</script>

<style>
.text-danger {
  color: red;
}
</style>
