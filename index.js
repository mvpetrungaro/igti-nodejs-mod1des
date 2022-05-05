import express from "express";
import pedidosRouter from "./routers/pedidos.router.js"

const app = express();
app.use(express.json());

app.use("/pedidos", pedidosRouter);

app.use((err, req, res, next) => {
    console.log(err);

    if (!res.statuCode) {
        res.status(500);
    }

    res.send({ error: err.message });
})

app.listen(3000, () => {
    console.log("API started");
});