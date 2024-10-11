import express from "express";
import {addItem, getItems} from "./database/items.dal.mjs";

const app = express();

app.post("/add/:id", express.json(), (req, res) => {
    addItem(req.params.id, req.body).then(() => {
        res.sendStatus(200);
    }).catch((e) => {
        console.error(e);
        res.sendStatus(500);
    });
});

app.get("/items", (req, res) => {
    getItems().then((items) => {
        res.status(200).json(items.map(item => item.id));
    }).catch((e) => {
        console.error(e);
        res.sendStatus(500);
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});