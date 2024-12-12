<template>
  <RouterView />
  <!--span class="accordion" id="areaExclusiva">
    <div class="accordion-item">
      <h2 class="accordion header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="areaExcusiva"
        >
          Esta area é esclusiva para fornecedores
        </button>
      </h2>
      <div
        id="areaExcusivaItem1"
        class="accordion-collapse collapse show"
        data-bs-parent="areaExclusiva"
      >
        <div class="accordion-body d-flex justify-content-around">
          <button class="btn btn-outline-danger" @click="deletar">
            delete um produto
          </button>
          <button class="btn btn-outline-primary" @click="adicionar">
            adicione um produto
          </button>
          <Modal name="editarProduto" btn="btn-outline-warning">
            <template v-slot:botao>edite um produto</template>
            <template v-slot:header>Escolha</template>
            <template v-slot:body>
              <div class="input-group">
                <select
                  name="produto"
                  id="editeProduto"
                  class="form-select"
                  v-model="id"
                >
                  <option value="">produtos</option>
                  <option
                    v-for="produto in produtos"
                    :key="produto.id"
                    :value="produto.id"
                  >
                    {{ produto.nome }}
                  </option>
                </select>
              </div>
            </template>
            <template v-slot:footer>
              <button
                class="btn btn-success"
                @click="editar"
                data-bs-dismiss="modal"
              >
                confirmar
              </button>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </!--span-->
</template>

<script lang="ts">
//import Modal from "@/components/Modal.vue";
import router from "@/router";
import { useStore } from "@/store";
import actions from "@/store/produtos/actions";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Compra",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    adicionar(): void {
      router.push("/compra/adicionar");
    },
    deletar(): void {
      router.push("/compra/deletar");
    },
    editar(): void {
      router.push("/compra/alterar/" + this.id);
    },
  },
  /*components: {
    Modal,
  },*/
  setup() {
    const store = useStore();
    store.dispatch(actions.leitura);
    const produtos = computed(() => store.state.produto.produtos);
    return { produtos };
  },
});
</script>
