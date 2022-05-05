import express from "express";
import PedidosController from "../controllers/pedidos.controller.js";

const router = express.Router();

const controller = new PedidosController();

router.get("/", controller.getPedidos);
router.get("/:id", controller.getPedido);
router.post("/", controller.createPedido);
router.put("/:id", controller.updatePedido);
router.patch("/:id", controller.updateStatusPedido);
router.delete("/:id", controller.deletePedido);

export default router;