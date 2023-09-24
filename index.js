const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();
const PORT = 5000;

app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017")
    .then(() => {
        console.log("MongoDb connected!!.");
        app.listen(PORT, () => {
            console.log(`Server is listening on port:${PORT}`);
        });
    })
    .catch((error) => console.log(error));

//to save a new product to db.
app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// to get all products from db.
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//to get product by id from db.
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// to update product by id and new fields in db.
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res
                .status(404)
                .json({ message: `Cannot find the specified product with id: ${id}.` });
        }

        const updatedProduct = await Product.findById(id);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find the specified product with id: ${id}.` });
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.get("/", (req, res) => {
    res.send("Hello from HomePage.");
});
