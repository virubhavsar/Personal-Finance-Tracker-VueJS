<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import Swal from 'sweetalert2'
import InputBox from '../components/frontComponents/InputBox.vue'

const inputEmail = ref('')
const inputUsername = ref('')
const inputPassword = ref('')
const router = useRouter()
const errors = ref({})

const register = async () => {
  try {
    const response = await axios.post('/register', {
      email: inputEmail.value,
      username: inputUsername.value,
      password: inputPassword.value
    })
    console.log('Registration successful:', response.data)
    localStorage.setItem('token', response.data.token)
    Swal.fire({
      icon: 'success',
      title: 'Registration successful',
      text: 'You can now log in with your credentials.'
    })

    // Navigate to the login page
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration error:', error)
    if (error.response && error.response.data && error.response.data.errors) {
      errors.value = error.response.data.errors
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error with your registration!'
      })
    }
  }
}
</script>

<template>
  <div class="account-pages my-5 pt-sm-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card overflow-hidden">
            <div class="bg-primary-subtle">
              <div class="row">
                <div class="col-7">
                  <div class="text-primary p-4">
                    <h5 class="text-primary">Free Register !</h5>
                    <p>Get your free Skote account now.</p>
                  </div>
                </div>
                <div class="col-5 align-self-end">
                  <img src="/assets/images/profile-img.png" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="auth-logo">
                <RouterLink to="/" class="auth-logo-light">
                  <div class="avatar-md profile-user-wid mb-4">
                    <span class="avatar-title rounded-circle bg-light">
                      <img
                        src="/assets/images/logo-light.svg"
                        alt=""
                        class="rounded-circle"
                        height="34"
                      />
                    </span>
                  </div>
                </RouterLink>

                <RouterLink to="/" class="auth-logo-dark">
                  <div class="avatar-md profile-user-wid mb-4">
                    <span class="avatar-title rounded-circle bg-light">
                      <img
                        src="/assets/images/logo.svg"
                        alt=""
                        class="rounded-circle"
                        height="34"
                      />
                    </span>
                  </div>
                </RouterLink>
              </div>
              <div class="p-2">
                <form class="form-horizontal" @submit.prevent="register">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email ID</label>
                    <InputBox
                      v-model="inputEmail"
                      type="text"
                      class="form-control"
                      placeholder="Enter email id"
                    ></InputBox>
                    <span v-if="errors.email" class="text-danger">
                      {{ errors.email[0] }}
                    </span>
                  </div>

                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <InputBox
                      v-model="inputUsername"
                      type="text"
                      class="form-control"
                      placeholder="Enter username"
                    ></InputBox>
                    <span v-if="errors.username" class="text-danger">
                      {{ errors.username[0] }}
                    </span>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <InputBox
                      v-model="inputPassword"
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      aria-label="Password"
                      aria-describedby="password-addon"
                    ></InputBox>

                    <span v-if="errors.password" class="text-danger">
                      {{ errors.password[0] }}
                    </span>
                  </div>
                  <div class="mt-3 d-grid">
                    <button class="btn btn-primary waves-effect waves-light" type="submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-5 text-center">
            <div>
              <p>
                Already have an account ?
                <RouterLink to="/" class="fw-medium text-primary"> Login </RouterLink>
              </p>
              <p>
                © Skote. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Themesbrand
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end account-pages -->
</template>
