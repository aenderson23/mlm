<template>
  <!--Começando a colocar o figma para funcionar-->
  <section class="container-fluid capa my-3 border-1 rounded-4">
    <div class="row align-items-center">
      <div class="col-7">
        <h1 class="text-white">
          Lorem ipsum dolor sit amet. Qui eius expedita non optio cupiditate sed voluptatem quidem ea sunt enim et accusamus necessitatibus et nihil suscipit? Ab voluptas ducimus et aspernatur officiis in consequatur animi et eveniet dolorem? Et temporibus doloribus et quisquam omnis vel omnis nemo. Sed aspernatur cumque in magni molestiae ut nihil ipsum eos harum maxime.
        </h1>
      </div>
      <div class="col-5 d-flex justify-content-center capa__aumentar">
        <!--img
          src="https://f10c9a1a926d75da4529bf5609086225.cdn.bubble.io/f1661449992781x356035128274128960/M%C3%A3o%20e%20celular.jpeg"
          alt="imagem de capa"
          width="300"
          height="600"
        /-->
      </div>
    </div>
  </section>
  <section class="container-lg">
    <div class="row">
      <div class="col-3 p-1" v-for="produto in produtos" :key="produto.nome">
        <ProdutoView class="py-3" v-bind:-produto="produto" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import ProdutoView from "@/components/ProdutoView.vue";
import { useStore } from "@/store";
import actions from "@/store/produtos/actions";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  components: {
    ProdutoView,
  },
  setup() {
    const store = useStore();
    store.dispatch(actions.leitura);
    const produtos = computed(() => store.state.produto.produtos);
    return { store, produtos };
  },
});
</script>

<style lang="css" scoped>
.capa {
  background-image: url("/src/assets/fundo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.capa__aumentar{
  height: 600px;
}
</style>
