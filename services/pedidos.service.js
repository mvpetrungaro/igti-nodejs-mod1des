import PedidosRepository from "../repositories/pedidos.repository.js";

const repo = new PedidosRepository();

export default class PedidosService {

    async getPedidos() {
        return await repo.getPedidos();
    }

    async getPedido(id) {
        return await repo.getPedido(id);
    }

    async createPedido(pedido) {
        pedido.entregue = false;
        pedido.timestamp = new Date();

        return await repo.createPedido(pedido);
    }

    async updatePedido(pedido) {
        return await repo.updatePedido(pedido);
    }

    async updateStatusPedido(id, entregue) {
        return await repo.updateStatusPedido(id, entregue);
    }

    async deletePedido(id) {
        await repo.deletePedido(id);
    }
}
