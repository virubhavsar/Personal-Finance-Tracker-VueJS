<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="menu-title" key="t-menu">Menu</li>
          <li>
            <RouterLink to="/dashboard">
              <i class="bx bx-user-circle"></i>
              <span key="t-dashboards">Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/user-manage">
              <i class="bx bx-user-circle"></i>
              <span key="t-dashboards">User Management</span>
            </RouterLink>
          </li>

          <li class="menu-title" key="t-menu">Master</li>
          <li>
            <a
              href="javascript:void(0);"
              class="has-arrow waves-effect"
              @click="toggleMenu('categoryManagement')"
            >
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Category</span>
            </a>
            <ul class="sub-menu" v-if="isMenuOpen.categoryManagement">
              <li>
                <RouterLink to="/add-cateygory">
                  <span key="t-dashboards">Add Category</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/list-cateygory">
                  <span key="t-dashboards">List Category</span>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="javascript:void(0);"
              class="has-arrow waves-effect"
              @click="toggleMenu('BudgetManagement')"
            >
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Budgets</span>
            </a>
            <ul class="sub-menu" v-if="isMenuOpen.BudgetManagement">
              <li>
                <RouterLink to="/add-budget">
                  <span key="t-dashboards">Add Budgets</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/list-budget">
                  <span key="t-dashboards">List Budgets</span>
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: {
        categoryManagement: false,
        BudgetManagement: false
      }
    }
  },
  methods: {
    toggleMenu(menu) {
      this.isMenuOpen[menu] = !this.isMenuOpen[menu]
    }
  }
}
</script>

<style>
.vertical-menu {
  width: 250px;
}

.vertical-menu .h-100 {
  height: 100%;
}

.vertical-menu .menu-title {
  padding: 10px;
  font-weight: bold;
}

.vertical-menu .has-arrow {
  cursor: pointer;
}

.vertical-menu .sub-menu {
  padding-left: 20px;
}
</style>
