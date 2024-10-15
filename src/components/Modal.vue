<template>
    <button class="btn" :class="btn" data-bs-toggle="modal" :data-bs-target="'#'+name"><slot name="botao"/></button>
  <div
    class="modal fade"
    :id="name"
    tabindex="-1"
    :aria-labelledby="name+'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="name+'Label'"><slot name="header"/></h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"><slot name="body"/></div>
        <div class="modal-footer">
            <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"Modal",
    props:{
        name:{type:String, required:true},
        btn:{type:String, default:"btn-primary"}
    }
})
</script>