<template>
    <div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbarNavOffcanvas"
        aria-controls="navbarNavOffcanvas"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-start"
        id="navbarNavOffcanvas"
        tabindex="-1"
        aria-labelledby="navbarNavOffcanvasLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="navbarNavOffcanvasLabel">Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav">
            <li class="nav-item text-start">
              <RouterLink to="/dashboard" class="nav-link d-flex align-items-center menu-item" :class="{ active: $route.path === '/dashboard' }">
                <img src="@/assets/logo.png" alt="Icon" class="me-2" />
                <span>Dashboard</span>
              </RouterLink>
            </li>
            <li class="nav-item text-start">
              <RouterLink to="/products" class="nav-link d-flex align-items-center menu-item" :class="{ active: $route.path === '/products' }">
                <img src="@/assets/logo.png" alt="Icon" class="me-2" />
                <span>Products</span>
              </RouterLink>
            </li>
            <li class="nav-item text-start">
              <RouterLink to="/order-lists" class="nav-link d-flex align-items-center menu-item" :class="{ active: $route.path === '/order-lists' }">
                <img src="@/assets/logo.png" alt="Icon" class="me-2" />
                <span>Order Lists</span>
              </RouterLink>
            </li>
            <li class="nav-item">
              <hr class="border-2" />
            </li>
            <li class="nav-item text-start">
              <RouterLink to="/settings" class="nav-link d-flex align-items-center menu-item" :class="{ active: $route.path === '/settings' }">
                <img src="@/assets/logo.png" alt="Icon" class="me-2" />
                <span>Settings</span>
              </RouterLink>
            </li>
            <li class="nav-item text-start">
              <RouterLink to="/logout" class="nav-link d-flex align-items-center menu-item" :class="{ active: $route.path === '/logout' }">
                <img src="@/assets/logo.png" alt="Icon" class="me-2" />
                <span>Logout</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  
  export default defineComponent({
    name: "MenuLateral",
    components: {
      RouterLink,
    },
    setup() {
      const route = useRoute();
      return { route };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos opcionais para o menu lateral */
  .me-2 {
    margin-right: 0.5rem;
  }
  
  .menu-item {
    border-radius: 0.75rem; /* Bordas arredondadas */
    border: 2px solid transparent; /* Classe border-2 */
    transition: background-color 0.3s ease; /* Transição suave */
  }
  
  .menu-item:hover {
    background-color: rgba(128, 128, 128, 0.2); /* Cinza 20% com transparência de 80% */
    border-color: rgba(128, 128, 128, 0.2); /* Bordas arredondadas */
  }
  
  .menu-item.active {
    background-color: var(--bs-primary); /* Cor primária do Bootstrap */
    color: white; /* Cor do texto */
    border-radius: 0.75rem; /* Bordas arredondadas */
  }
  </style>