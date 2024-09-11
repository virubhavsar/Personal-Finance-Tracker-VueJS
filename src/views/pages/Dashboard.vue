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
                  <h4 class="mb-sm-0 font-size-18">Dashboard</h4>
                </div>
              </div>
            </div>
            <!-- end page title -->

            <div class="row">
              <div class="col-xl-4">
                <div class="card overflow-hidden">
                  <div class="bg-primary-subtle">
                    <div class="row">
                      <div class="col-7">
                        <div class="text-primary p-3">
                          <h5 class="text-primary">Welcome Back !</h5>
                          <p>Skote Dashboard</p>
                        </div>
                      </div>
                      <div class="col-5 align-self-end">
                        <img src="/assets/images/profile-img.png" alt="" class="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-4">Monthly Financial Overview</h4>
                    <!-- Add the Bar Chart component here -->
                    <BarChart :chart-data="chartData" />
                  </div>
                </div>
              </div>
              <!-- Additional Charts can go here -->
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end modal -->
        <Footer />
      </div>
    </div>
  </body>
</template>

<script>
import Header from '@/views/common/Header.vue'
import Leftbar from '@/views/common/Leftbar.vue'
import Footer from '@/views/common/Footer.vue'
// import BarChart from '@/components/BarChart.vue'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
    Leftbar
    // BarChart
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/monthly-financial-overview')
      this.chartData = response.data
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
  }
}
</script>
