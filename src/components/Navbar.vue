<template>
  <nav class="navbar border rounded-3 shadow mb-5">
    <div class="container-lg">
      <div class="row">
        <RouterLink class="col" to="/">Home</RouterLink>
        <RouterLink class="col" to="/cliente">cadastrar novo cliente</RouterLink>
        <RouterLink class="col" to="/compra">Ambiente de compras</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue" 
export default defineComponent({
    name:"Navbar"
})
</script>
