<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <img
          src="https://f10c9a1a926d75da4529bf5609086225.cdn.bubble.io/f1726684657948x100162462227010080/LOGO%20TCT%20sem%20fundo.png"
          alt="Logomarca"
          width="50"
          height="40"
        />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item mx-3">
            <Modal class="nav-item" name="messages" btn="btn btn-outline-dark border-0 position-relative">
              <template v-slot:botao>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5.365V3m0 2.365a5.34 5.34 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175c0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.34 5.34 0 0 1 12 5.365m-8.134 5.368a8.46 8.46 0 0 1 2.252-5.714m14.016 5.714a8.46 8.46 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0z"
                  />
                </svg>
                <span
                  class="translate-middle badge rounded-pill bg-danger ajuste"
                  v-if="messages.length"
                >
                  {{ messages.length }}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </template>
              <template v-slot:header> Notifications </template>
              <template v-slot:body>
                <ul class="list-group-flush">
                  <li
                    class="list-group-item"
                    v-for="message in messages"
                    :key="message"
                  >
                    {{ message }}
                  </li>
                </ul>
              </template>
            </Modal>
          </li>
          <li class="nav-item mx-3">
            <div class="dropdown d-flex flex-column">
              <button
                class="btn btn-outline-dark dropdown-toggle d-flex gap-3 align-items-center border-0 align-self-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img :src="chooseCountry.img" alt="Flag country" />
                <p class="m-0">{{ chooseCountry.country }}</p>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    v-for="country in countries"
                    :key="country.country"
                    @click="alterarescolha(country)"
                  >
                    {{ country.country }}
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="!store.state.login.user_id" class="nav-item mx-3">
            <button
              class="btn btn-outline-dark me-2"
              @click="navegar('/Login')"
            >
              Login
            </button>
          </li>
          <li v-else class="nav-item dropdown mx-3">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ store.state.login.user }}
              <!--TODO para parecer com o figma-->
            </a>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button" @click="logout()">
                  logout
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  Dashboard
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useStore } from "@/store";
import actions from "@/store/clientes/actions";
import countryActions from "@/store/countries/actions";
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Modal from "./Modal.vue";
import { ICountry } from "@/interfaces/ICountry";

export default defineComponent({
  name: "Navbar",
  components: { Modal },
  setup() {
    const router = useRouter();
    const store = useStore();
    store.dispatch(actions.leitura);
    store.dispatch(countryActions.leitura);
    const clientes = computed(() => store.state.cliente.clientes);
    const countries = computed(() => store.state.country.countries);
    const chooseCountry = ref({
      country: "United States",
      img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/23px-Flag_of_the_United_States.svg.png",
      ddi: 1,
      continent: "North America",
    } as ICountry);
    const login = computed(() => {
      return store.state.login.user_id;
    });
    const messages = ref([] as string[]);
    const navegar = (to: string) => {
      router.push(to);
    };
    const logout = () => {
      store.dispatch("Logoff");
      router.push("/")
    };
    const alterarescolha = (country: ICountry) => {
      chooseCountry.value = country;
    };
    watch(login, (login) => {
      console.log(login);
      const cliente = clientes.value.find((cli) => {
        return cli.chave == login;
      });
      messages.value = cliente?.mensagens || [];
    });
    return {
      navegar,
      store,
      logout,
      messages,
      countries,
      chooseCountry,
      alterarescolha,
    };
  },
});
</script>

<style lang="css" scoped>
.ajuste{
  position: absolute;
  top: 20%;
  right: -20%;
}
</style>
