<template>
  <!--Começando a colocar o figma para funcionar-->
  <div class="bg-white rounded-4 my-4">
    <section class="container-fluid capa my-3 border-1 rounded-4">
      <div class="row align-items-center">
        <div class="col-7">
          <h1 class="text-white">
            Lorem ipsum dolor sit amet. Qui eius expedita non optio cupiditate sed voluptatem quidem ea sunt enim et accusamus necessitatibus et nihil suscipit? Ab voluptas ducimus et aspernatur officiis in consequatur animi et eveniet dolorem? Et temporibus doloribus et quisquam omnis vel omnis nemo. Sed aspernatur cumque in magni molestiae ut nihil ipsum eos harum maxime.
          </h1>
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
  </div>
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
