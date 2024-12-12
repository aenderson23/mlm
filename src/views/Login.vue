<template>
  <h1>Faça seu Login</h1>
  <div class="container">
    <div class="row">
        <div class="col">&nbsp;</div>
      <div class="col">
        <div class="input-group">
          <label for="email" class="input-group-text">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            v-model="user"
          />
        </div>
        <div class="input-group">
          <label for="senha" class="input-group-text">Senha</label>
          <input
            type="password"
            name="password"
            id="senha"
            class="form-control"
            v-model="password"
          />
        </div>
        <div><button class="btn btn-primary" @click="login()">Login</button></div>
      </div>
      <div class="col">&nbsp;</div>
    </div>
    <div class="row">
        <p class="col">{{ store.state.login.user }}</p>
        <p class="col">{{ store.state.login.password }}</p>
        <p class="col">{{ store.state.login.key }}</p>
        <p class="col">{{ store.state.login.user_id }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const user = ref("");
    const password = ref("");
    const login = () => {
      store.dispatch("Login", {
        user: user.value,
        password: password.value,
      });
    };
    return { user, password, login, store };
  },
});
</script>
