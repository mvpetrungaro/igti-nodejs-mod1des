import express from "express";
import PedidosController from "../controllers/pedidos.controller.js";

const router = express.Router();

const controller = new PedidosController();

router.get("/valorTotal", controller.valorTotal);//6 e 7
router.get("/produtosMaisVendidos", controller.produtosMaisVendidos);//8
//router.get("/", controller.getPedidos);
router.get("/:id", controller.getPedido);//5
router.post("/", controller.createPedido);//1
router.put("/:id", controller.updatePedido);//2
router.patch("/:id", controller.updateStatusPedido);//3
router.delete("/:id", controller.deletePedido);//4

export default router;