<script setup>
import InputBox from '../components/frontComponents/InputBox.vue'
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
                    <h5 class="text-primary">Reset Password</h5>
                    <p>Reset Password with Skote.</p>
                  </div>
                </div>
                <div class="col-5 align-self-end">
                  <img src="/assets/images/profile-img.png" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div>
                <a href="index.html">
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
                </a>
              </div>

              <div class="p-2">
                <!-- <div class="alert alert-success text-center mb-4" role="alert">
                  Enter your Email and instructions will be sent to you!
                </div> -->
                <form
                  class="form-horizontal"
                  action="https://themesbrand.com/skote/layouts/index.html"
                >
                  <div class="mb-3">
                    <label for="useremail" class="form-label">Email</label>
                    <InputBox
                      v-model="inputEmail"
                      type="email"
                      class="form-control"
                      id="useremail"
                      placeholder="Enter email"
                    ></InputBox>
                  </div>

                  <div class="text-end">
                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-5 text-center">
            <p>
              Remember It ?
              <a href="" class="fw-medium text-primary"
                ><RouterLink to="/">Sign In here</RouterLink></a
              >
            </p>
            <p>© Skote. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end account-pages -->
</template>
<script>
export default {
  name: 'Forgot',
  components: {
    InputBox
  },
  data() {
    return {
      inputEmail: ''
    }
  }
}
</script>
