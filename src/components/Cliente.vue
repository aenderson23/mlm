<template>
    <div class="card shadow-sm">
        <div class="card-header component">
            <div class="row">
                <h5 class="col-11">{{ cliente.name }}</h5>
                <button class="btn-close col-1" aria-label="Close"></button>
            </div>
        </div>
        <div class="card-body">
            <p>Your code: {{ cliente.code }}</p>
            <p>Your referal: {{ cliente.reference }}</p>
        </div>
        <div class="card-footer">
            <Modal :name="'clienteModal'+cliente.id">
                <template v-slot:botao>Procurar Dependentes</template>
                <template v-slot:header>{{ cliente.name }}</template>
                <template v-slot:body>
                    <p>Aqui vai a logica de procurar todos os que estão usando o seu codigo</p>
                    <p>{{ cliente.code }}</p>
                </template>
                <template v-slot:footer>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICliente } from '@/interfaces/IClientes';
import Modal from './Modal.vue';

export default defineComponent({
    name:"Cliente",
    props:{
        cliente:{
            type: Object as PropType<ICliente>,
            required:true
        }
    },
    components:{
        Modal
    }
})
</script>