import {database} from "./mdb.mjs"

/**
 * @return {Promise<{
 *     id: String,
 * }[]>}
 */
export const getItems = () => {
    return database.connect()
        .then(() =>
            database.db(process.env.DATABASE_NAME)
                .collection("items")
                .find()
        )
        .then(cursor => cursor.toArray())
        .then(result => {
            if (!result) {
                throw new Error("No items found")
            }
            return result
        })
}

/**
 * @param id {String}
 * @param data {object}
 */
export const addItem = (id, data) => {
    return database.connect()
        .then(() =>
            database.db(process.env.DATABASE_NAME)
                .collection("items")
                .insertOne({
                    ...data,
                    internal_id: id,
                })
        )
        .then(result => {
            if (result.insertedCount === 0) {
                throw new Error("No items found")
            }
        })
}