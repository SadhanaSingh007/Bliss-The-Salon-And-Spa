import { Router } from "express";
import Products from "../models/Products.js";



const productRouter = Router();

productRouter
  .get("/", async (req, res, next) => {
    try {
      const allproducts = await Products.find({});
      res.send(allproducts);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const { title, description, price } = req.body;
      const image = req.file.path; 
      const newProduct = new Products({
        title,
        description,
        price,
        image,
      });

      await newProduct.save();
      res.status(201).send("Product created successfully");
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  }).put('/:id', async (req, res) => {
    try {
      const { title, description, price } = req.body;
      let updateFields = {
        title,
        description,
        price
      };
  
      const updatedProduct = await Products.findByIdAndUpdate(req.params.id, updateFields, { new: true });
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
      res.json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

export default productRouter;
