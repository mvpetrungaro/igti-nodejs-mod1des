import { promises as fs } from "fs";

const file = "pedidos.json";

export default class PedidosRepository {

    async getPedidos() {
        const data = JSON.parse(await fs.readFile(file));

        return data.pedidos;
    }

    async getPedidosEntreguesByClienteOrProduto(cliente, produto) {
        const data = JSON.parse(await fs.readFile(file));

        const filterPedidos = p => {
            let filter = p.entregue;

            if (cliente) {
                filter = filter && !!p.cliente && p.cliente.toLowerCase() == cliente.toLowerCase()
            }

            if (produto) {
                filter = filter && !!p.produto && p.produto.toLowerCase() == produto.toLowerCase()
            }

            return filter;
        };

        const pedidos = data.pedidos.filter(filterPedidos);

        return pedidos;
    }

    async getPedido(id) {
        const data = JSON.parse(await fs.readFile(file));

        const pedido = data.pedidos.find(p => p.id == id);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        return pedido;
    }

    async createPedido(pedido) {
        const data = JSON.parse(await fs.readFile(file));

        pedido = {
            id: data.nextId++,
            ...pedido
        }

        data.pedidos.push(pedido);

        await fs.writeFile(file, JSON.stringify(data, null, 2));

        return pedido;
    }

    async updatePedido(pedido) {
        const data = JSON.parse(await fs.readFile(file));

        const idx = data.pedidos.findIndex(p => p.id == pedido.id);

        if (idx < 0) {
            throw new Error("Pedido não encontrado");
        }

        data.pedidos[idx] = pedido;

        await fs.writeFile(file, JSON.stringify(data, null, 2));

        return data.pedidos[idx];
    }

    async updateStatusPedido(id, entregue) {
        const data = JSON.parse(await fs.readFile(file));

        const idx = data.pedidos.findIndex(p => p.id == id);

        if (idx < 0) {
            throw new Error("Pedido não encontrado");
        }

        data.pedidos[idx].entregue = entregue;

        await fs.writeFile(file, JSON.stringify(data, null, 2));

        return data.pedidos[idx];
    }

    async deletePedido(id) {
        const data = JSON.parse(await fs.readFile(file));

        const idx = data.pedidos.findIndex(p => p.id == id);

        if (idx < 0) {
            throw new Error("Pedido não encontrado");
        }

        data.pedidos = [...data.pedidos.slice(1, idx), ...data.pedidos.slice(idx + 1)];

        await fs.writeFile(file, JSON.stringify(data, null, 2));
    }
}
