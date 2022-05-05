import PedidosService from "../services/pedidos.service.js";

const serv = new PedidosService();

export default class PedidosController {

    async getPedidos(req, res, next) {
        
        try {
            const pedidos = await serv.getPedidos();
            res.send(pedidos);
        } catch(err) {
            next(err);
        }
    }

    async getPedido(req, res, next) {

        try {
            let id = req.params.id;

            try {
                validateNumber(id);
            } catch(err) {
                res.status(400);
                throw err;
            }
            
            try {
                const pedido = await serv.getPedido(req.params.id);
                res.send(pedido);
            } catch(err) {
                res.status(404);
                throw err;
            }
        } catch(err) {
            next(err);
        }
    }

    async createPedido(req, res, next) {

        try {
            let pedido = req.body;

            try {
                validateText(pedido.cliente);
                validateText(pedido.produto);
                validateNumber(pedido.valor);
            } catch(err) {
                res.status(400);
                throw err;
            }

            pedido = {
                cliente: pedido.cliente,
                produto: pedido.produto,
                valor: parseFloat(pedido.valor)
            };

            pedido = await serv.createPedido(pedido);
            res.send(pedido);
        } catch(err) {
            next(err);
        }
    }

    async updatePedido(req, res, next) {

        try {
            let id = req.params.id;
            let pedido = req.body;

            try {
                validateNumber(id);
                validateText(pedido.cliente);
                validateText(pedido.produto);
                validateNumber(pedido.valor);
                validateBoolean(pedido.entregue);
            } catch(err) {
                res.status(400);
                throw err;
            }

            pedido = {
                id: parseInt(id),
                cliente: pedido.cliente,
                produto: pedido.produto,
                valor: parseFloat(pedido.valor),
                entregue: (pedido.entregue == "true" || pedido.entregue === true)
            };

            try {
                pedido = await serv.updatePedido(pedido);
                res.send(pedido);
            } catch (err) {
                res.status(404);
                throw err;
            }
        } catch(err) {
            next(err);
        }
    }

    async updateStatusPedido(req, res, next) {

        try {
            let id = req.params.id;
            let entregue = req.body.entregue;

            try {
                validateNumber(id);
                validateBoolean(entregue);
            } catch(err) {
                res.status(400);
                throw err;
            }

            id = parseInt(id);
            entregue = (entregue == "true" || entregue === true);

            try {
                const pedido = await serv.updateStatusPedido(id, entregue);
                res.send(pedido);
            } catch(err) {
                res.status(404);
                throw err;
            }
        } catch(err) {
            next(err);
        }
    }

    async deletePedido(req, res, next) {

        try {
            let id = req.params.id;

            try {
                validateNumber(id);
            } catch(err) {
                res.status(400);
                throw err;
            }

            id = parseInt(id);

            try {
                await serv.deletePedido(id);
            } catch(err) {
                res.status(404);
                throw err;
            }

            res.end();
        } catch(err) {
            next(err);
        }
    }
}

function isBoolean(param) {
    return param == "true" || param == "false" || param === true || param === false;
}

function validateText(param) {
    const isValid = !!param && param.trim() != "";

    if (!isValid) {
        throw new Error("Parâmetros inválidos");
    }
}

function validateNumber(param) {
    const isValid = !!param && !isNaN(param) && !isBoolean(param);

    if (!isValid) {
        throw new Error("Parâmetros inválidos");
    }
}

function validateBoolean(param) {
    const isValid = isBoolean(param);

    if (!isValid) {
        throw new Error("Parâmetros inválidos");
    }
}