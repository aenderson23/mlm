<template>
  <nav class="navbar border rounded-3 shadow mb-5">
    <div class="container-fluid">
      <div class="row">
        <RouterLink class="col-1" to="/">Home</RouterLink>
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
