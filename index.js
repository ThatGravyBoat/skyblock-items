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
        const output = {
            id: items.map(item => item.internal_id),
            uuids: items.map(item => item.components["minecraft:custom_data"]?.uuid ?? null).filter(uuid => uuid !== null),
        }
        res.status(200).json(output);
    }).catch((e) => {
        console.error(e);
        res.sendStatus(500);
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});