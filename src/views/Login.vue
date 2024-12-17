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
          <label for="senha" class="input-group-text">Password</label>
          <input
            type="password"
            name="password"
            id="senha"
            class="form-control"
            v-model="password"
          />
        </div>
        <div>
          <button class="btn btn-primary" @click="login()">Login</button>
        </div>
      </div>
      <div class="col">&nbsp;</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter()
    const user = ref("");
    const password = ref("");
    const success = computed(()=>store.state.login.user_id || "");
    const login = () => {
      store.dispatch("Login", {
        user: user.value,
        password: password.value,
      });

    };
    watch(success,(novo)=>{
      if (novo!=""){
        router.push("/")
      }
    })
    return { user, password, login, store };
  }
});
</script>
