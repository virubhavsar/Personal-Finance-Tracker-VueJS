<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import Swal from 'sweetalert2'
import InputBox from '../components/frontComponents/InputBox.vue'

const inputEmail = ref('')
const inputPassword = ref('')
const router = useRouter()
const errors = ref({})

const login = async () => {
  try {
    const response = await axios.post('/login', {
      email: inputEmail.value,
      password: inputPassword.value
    })

    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    if (error.response && error.response.data && error.response.data.errors) {
      errors.value = error.response.data.errors
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password!'
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
                    <h5 class="text-primary">Welcome Back !</h5>
                    <p>Sign in to continue to Skote.</p>
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
                <form class="form-horizontal" @submit.prevent="login">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email ID</label>
                    <InputBox
                      v-model="inputEmail"
                      type="text"
                      class="form-control"
                      placeholder="Enter email id"
                    />
                    <span v-if="errors.email" class="text-danger">
                      {{ errors.email[0] }}
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
                    />
                    <span v-if="errors.password" class="text-danger">
                      {{ errors.password[0] }}
                    </span>
                  </div>
                  <div class="mt-3 d-grid">
                    <button class="btn btn-primary waves-effect waves-light" type="submit">
                      Log In
                    </button>
                  </div>

                  <div class="mt-4 text-center">
                    <RouterLink to="/forgot-password" class="text-muted">
                      <i class="mdi mdi-lock me-1"></i>
                      Forgot your password?
                    </RouterLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-5 text-center">
            <div>
              <p>
                Don't have an account ?
                <RouterLink to="/sign-up" class="fw-medium text-primary"> Signup now </RouterLink>
              </p>
              <p>
                © Skote. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Viraj Bhavsar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end account-pages -->
</template>
