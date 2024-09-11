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
                  <h4 class="mb-sm-0 font-size-18">User Management</h4>
                </div>
              </div>
            </div>
            <!-- end page title -->
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">User List</h4>
                    <p class="card-title-desc">Displaying users fetched from Laravel API.</p>

                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Created Date</th>
                          <th>Active/De-active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="user in users" :key="user.id">
                          <td>{{ user.id }}</td>
                          <td>{{ user.username }}</td>
                          <td>{{ user.email }}</td>
                          <td>
                            <span class="badge badge-soft-success">{{ user.role }}</span>
                          </td>
                          <td>{{ user.created_at }}</td>
                          <td>
                            <div class="form-check form-switch form-switch-md mb-3">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :id="'switchCheck' + user.id"
                                :checked="user.is_active === 1"
                                @change="toggleActiveStatus(user)"
                              />
                            </div>
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
                                  <a class="dropdown-item" href="#" @click="editUser(user)">Edit</a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#" @click="deleteUser(user.id)"
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
        <EditUserModal
          v-if="selectedUser"
          :user="selectedUser"
          @user-updated="fetchUsers"
          @close-modal="resetSelectedUser"
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
import EditUserModal from '@/views/pages/UserEditManageModel.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Header,
    Leftbar,
    Footer,
    EditUserModal
  },
  data() {
    return {
      users: [],
      selectedUser: null
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('users')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async toggleActiveStatus(user) {
      try {
        const response = await axios.put(`users/${user.id}/toggle-active`, {
          is_active: user.is_active === 1 ? 0 : 1
        })
        console.log('Toggle response:', response.data)
      } catch (error) {
        console.error('Error toggling active status:', error)
        user.is_active = user.is_active === 1 ? 0 : 1
      }
    },
    async deleteUser(userId) {
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
          await axios.delete(`users/${userId}`)
          this.fetchUsers()
          Swal.fire('Deleted!', 'User has been deleted.', 'success')
        } catch (error) {
          console.error('Error deleting user:', error)
          Swal.fire('Error!', 'An error occurred while deleting the user.', 'error')
        }
      }
    },
    editUser(user) {
      this.selectedUser = { ...user }
    },
    resetSelectedUser() {
      this.selectedUser = null
    }
  }
}
</script>
