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

    async valorTotal(cliente, produto) {
        const pedidos = await repo.getPedidosEntreguesByClienteOrProduto(cliente, produto);

        if (!pedidos.length) {
            throw new Error("Nenhum pedido encontrado");
        }
        
        const valorTotal = pedidos.map(p => p.valor).reduce((a, b) => a + b);

        return valorTotal;
    }

    async produtosMaisVendidos() {
        const pedidos = await repo.getPedidosEntreguesByClienteOrProduto();

        if (!pedidos.length) {
            throw new Error("Nenhum pedido encontrado");
        }

        const produtosMaisVendidos = pedidos.map(p => ({ produto: p.produto, vendas: 1 })).reduce((acc, p) => {
            if (!acc.some(a => a.produto == p.produto)) {
                acc.push(p);
                return acc;
            }

            let idx = acc.findIndex(a => a.produto == p.produto);

            acc[idx].vendas++;

            return acc;
        }, []).sort((a, b) => b.vendas - a.vendas);

        return produtosMaisVendidos;
    }
}
