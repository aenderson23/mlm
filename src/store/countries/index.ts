import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { ICountry } from "@/interfaces/ICountry";
import http from "@/http/countryhttp";
import { Estado } from "..";
interface EstadoCountry {
  countries: ICountry[]
}

const country: Module<EstadoCountry, Estado> = {
  state: {
    countries: [],
  },
  mutations: {
    [mutations.leitura](state, countries: ICountry[]) {
      state.countries = countries;
    },
  },
  actions: {
    [actions.leitura]({ commit }) {
      http.get("/f1691440158655x872491788828488900/novo%20data.json").then((response) => commit(mutations.leitura,response.data as ICountry[]));
    },
  },
};
export { country, EstadoCountry };
