<template>
  <MenuLateral />
  <div class="my-3 rounded-4">
    <div class="d-flex flex-column">
      <h3 class="text-black align-self-start my-3">Dashboard</h3>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 p-3">
          <div class="card bg-light shadow rounded-4">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-block">
                  <p>Total user</p>
                  <h5>{{ users.length.toLocaleString("en") }}</h5>
                </div>
                <img src="../assets/pessoas.png" alt="total user" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 p-3">
          <div class="card bg-light shadow rounded-4">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-block">
                  <p>Total Sales</p>
                  <h5>{{ vendas.length.toLocaleString("en") }}</h5>
                </div>
                <img src="../assets/Sales.png" alt="total user" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 p-3">
          <div class="card bg-light shadow rounded-4">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-block">
                  <p>Total Value</p>
                  <h5>
                    {{
                      valorVendas.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}
                  </h5>
                </div>
                <img src="../assets/value.png" alt="total user" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 p-3">
          <div class="card bg-light shadow rounded-4">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-block">
                  <p>Your sales</p>
                  <h5>{{ suasVendas.toLocaleString("en") }}</h5>
                </div>
                <img src="../assets/pessoas.png" alt="total user" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card bg-light shadow rounded-4">
            <Grafico />
          </div>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12">
          <div class="card bg-light shadow rounded-4">
            <DetalheDeVendas />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import mutations from "@/store/Compra/mutations";
import Grafico from "@/components/Grafico.vue";
import DetalheDeVendas from "@/components/DetalheDeVendas.vue";
import MenuLateral from "@/components/MenuLateral.vue";

export default defineComponent({
  name: "Dashboard",
  components: { Grafico, DetalheDeVendas, MenuLateral },
  setup() {
    const store = useStore();
    const login = computed(() => store.state.login);
    const users = computed(() => store.state.cliente.clientes);
    const valorVendas = computed(() => {
      let valor = 0;
      store.state.venda.vendas.forEach((venda) => {
        valor += venda.valor;
      });
      return valor;
    });
    const suasVendas = computed(() => {
      let valor = 0;
      store.state.venda.vendas
        .filter((venda) => venda.referencia == store.state.login.key)
        .forEach((venda) => {
          valor += venda.valor;
        });
      return valor;
    });
    store.dispatch(mutations.leitura);
    const vendas = computed(() => store.state.venda.vendas);
    return { login, users, vendas, valorVendas, suasVendas, Grafico };
  },
});
</script>
