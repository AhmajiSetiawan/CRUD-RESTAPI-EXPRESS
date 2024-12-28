const express = require ("express");
const { PrismaClient } = require ("@prisma/client");
const dotenv = require("dotenv");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json())

app.get("/api", (req, res) => {
    res.send("ini API Pertama akuuh");
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products);
})

app.post("/products", async (req, res) => {
    const newProductData = req.body;
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image,
        },
    });
    res.status(201).send({
        data: product,
        message: "Create product Sucsess",
    });
})

app.listen(PORT, () => {
    console.log("Express Runing di PORT : " + PORT);
})