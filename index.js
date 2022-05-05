import express from "express";

const app = express();
app.use(express.json());

app.get("/", async (req, res, next) => {
    try {
        throw new Error("deu ruim pa carai");
    } catch (err) {
        next(err);
    }

    res.send("Hello!");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err.message });
})

app.listen(8080, () => {
    console.log("API started");
});