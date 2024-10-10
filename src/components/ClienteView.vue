<template>
  <div class="card shadow-sm">
    <div class="card-header component">
      <div class="row">
        <h5 class="col-11">{{ cliente.name }}</h5>
        <button
          class="btn-close col-1"
          aria-label="Close"
          @click="deletarCliente(cliente.id)"
        ></button>
      </div>
    </div>
    <div class="card-body">
      <p>Your code: {{ cliente.code }}</p>
      <p>Your referal: {{ cliente.reference }}</p>
      <button class="btn btn-secondary" @click="editarCliente(cliente.id)">
        Editar
      </button>
    </div>
    <div class="card-footer component">
      <div class="row">
        <div class="col">
          <Modal :name="'clienteModal' + cliente.id">
            <template v-slot:botao>Procurar Dependentes</template>
            <template v-slot:header>{{ cliente.name }}</template>
            <template v-slot:body>
              <p>your code: {{ cliente.code }}</p>
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="cli in clientes"
                  :key="cli.id"
                >
                  <div class="card shadow-sm">
                    <div class="card-header component">
                      {{ cli.name }}
                    </div>
                    <div class="card-body">
                      <p>His code: {{ cli.code }}</p>
                    </div>
                    <div class="card-footer">OK</div>
                  </div>
                </li>
              </ul>
            </template>
            <template v-slot:footer>
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                Ok
              </button>
            </template>
          </Modal>
        </div>
        <div class="col">
          <Modal :name="'clienteReference' + cliente.id">
            <template v-slot:botao>Ver Pai</template>
            <template v-slot:header>{{ cliente.name }}</template>
            <template v-slot:body>
              <p>your referal: {{ cliente.reference }}</p>
              <div class="card shadow-sm" v-if="pai">
                <div class="card-header component">
                  {{ pai?.name || "" }}
                </div>
                <div class="card-body">
                  <p>His code: {{ pai?.code || "" }}</p>
                </div>
                <div class="card-footer">OK</div>
              </div>
            </template>
            <template v-slot:footer>
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                Ok
              </button>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ICliente } from "@/interfaces/IClientes";
import Modal from "./Modal.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import actions from "@/store/clientes/actions";

export default defineComponent({
  name: "ClienteView",
  props: {
    cliente: {
      type: Object as PropType<ICliente>,
      required: true,
    },
  },
  components: {
    Modal,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const clientes = computed(() =>
      store.state.cliente.clientes.filter(
        (cli) => cli.reference == props.cliente.code
      )
    );
    const pai = computed(() =>
      store.state.cliente.clientes.find(
        (cli) => cli.code == props.cliente.reference
      )
    );
    const editarCliente = (id: string): void => {
      router.push("/cliente/" + id);
    };
    const deletarCliente = (id: string) => {
      store.dispatch(actions.deletar, id);
    };
    return { editarCliente, deletarCliente, clientes, pai };
  },
});
</script>
