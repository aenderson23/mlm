<template>
    <div class="input-group">
        <label for="nome" class="input-group-text">nome</label>
        <input type="text" name="nome" id="nome" class="form-control" v-model="produto.nome">
        <label for="valor" class="input-group-text">valor</label>
        <label for="valor" class="input-group-text">$</label>
        <input type="number" name="valor" id="valor" class="form-control" v-model="produto.valor">
        <button class="btn btn-outline-primary" @click="alterar">confirmar</button>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { useStore } from '@/store';
import actions from '@/store/produtos/actions';
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name:"EditarProduto",
    props:{
        id:{type:String, required:true}
    },
    setup(props) {
        const store = useStore()
        store.dispatch(actions.leitura)
        const produto = computed(()=>store.state.produto.produtos.find(prod=>prod.id==props.id))
        const alterar=():void=>{
            store.dispatch(actions.alterar,produto.value)
            router.push("/compra")
        }
        return {produto,alterar}
    }
})
</script>