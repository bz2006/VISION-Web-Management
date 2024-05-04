import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js"
import multer from "multer";
import productModel from "../models/productModel.js";











export const createProductController = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('Invalid Category')

        const files = req.files;
        if (!files || files.length === 0) return res.status(400).send('No image in the request');
        const imagesPaths = files.map(file => file.key);

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            images: imagesPaths,
            mrp: req.body.mrp,
            category: req.body.category,
            InStock: req.body.InStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        })

        product = await product.save();

        if (!product)
            return res.status(500).send('The product cannot be created')

        res.send(product);
    } catch (error) {
        console.log(error)
    }


}



export const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const productList = await productModel.find({});
        if (!productList) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        return res.status(200).json({ productList });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const productList = await productModel.find({ category: categoryId });

        if (!productList) {
            return res.status(404).json({ success: false, message: 'No products found for the specified category' });
        }

        return res.status(200).json({ success: true, productList });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const updateProducts = async (req, res) => {
    const file = req.file;
    let newkeys = []
    let imagesPaths = [];
    const files = req.files
    const img = req.body.images
  
    try {
        if (typeof img === "string") {
            imagesPaths.push(img)
           
        }
        else {
            for (let pic of img) {
                imagesPaths.push(pic)
            
            }
        }
        if (files) {
            files.map(file => {
                if (!imagesPaths.includes(file.key)) {
                    imagesPaths.push(file.key);
                }
            })
        }
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {

                name: req.body.name,
                description: req.body.description,
                images: imagesPaths,
                mrp: req.body.mrp,
                category: req.body.category,
                InStock: req.body.InStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found or cannot be updated.' });
        }
        res.json({ message: 'Product updated successfully', updatedProduct: product });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteproduct = async (req, res) => {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "product not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}