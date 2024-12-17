import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { cliente, EstadoCliente } from "./clientes";
import { country, EstadoCountry } from "./countries";
import { EstadoProduto, produto } from "./produtos";
import {apiWF} from "@/http/clientehttp";
import { loginInterface } from "@/interfaces/loginInterface";
interface Estado {
  cliente: EstadoCliente;
  country: EstadoCountry;
  produto:EstadoProduto;
  login:loginInterface
}

const store = createStore<Estado>({
  state: {
    cliente: {
      clientes: [],
    },
    country: {
      countries: [],
    },
    produto:{
      produtos:[],
    },
    login:{} as loginInterface
  },
  mutations: {
    Login(state,login:loginInterface){
      state.login=login;
    },
    Logoff(state){
      state.login = {} as loginInterface
    }
  },
  actions: {
    Login({commit},login:loginInterface){
      apiWF.post('/Login_to_a_vue_connection/',login)
      .then(resp=>{
        const structure = resp.data.response as Resposta 
        login.key = structure.token;
        login.user_id = structure.user_id;
        commit("Login",login)
      })
      .catch(e=>window.alert("Login issue, error message: "+e))
    },
    Logoff({commit}){
      commit("Logoff")
    }
  },
  modules: { cliente, country, produto },
});
const key: InjectionKey<Store<Estado>> = Symbol();
function useStore(): Store<Estado> {
  return vuexUseStore(key);
}

export { store, Estado, useStore, key };

interface Resposta{
  token:string,
  user_id:string
}