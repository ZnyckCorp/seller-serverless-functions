const Product = require('../model/product');
const Store = require('./store');
const embeddingService = require("./generate_embeddings")

exports.createProduct = async (req, res) =>  {
    try {
        req.query.store_id = req.body.store_id;
        const storeDetails = await Store.getStores(req, res , true);
        if (!storeDetails) {
          return res.status(404).json({ message: 'Store not found' });
        }
        try {
            const product = new Product({
                item_name: req.body.item_name,
                item_description: req.body.item_description,
                image_url_primary: req.body.image_url_primary,
                image_url_secodary_1: req.body.image_url_secodary_1,
                image_url_secodary_2: req.body.image_url_secodary_2,
                image_url_secodary_3: req.body.image_url_secodary_3,
                category: req.body.category,
                item_price: req.body.item_price,
                lwh_price: req.body.lwh_price,
                lwh_quantity: req.body.lwh_quantity,
                item_unit : req.body.item_unit,
                item_quantity: req.body.item_quantity,
                store_id: storeDetails._id,
                store_lat: storeDetails.store_lat,
                store_lng: storeDetails.store_long,
                sub_category : req.body.sub_category
            });
            let real_desc = req.body.item_description;
            req.body.item_description = req.body.item_name + " : " +  req.body.item_description + "category [ " + req.body.category + " ] " + " sub_category [ " +  req.body.sub_category + "]";
            await embeddingService.generate_embeddings(req, res).then((result)=>{
              product.vector_embbeddings = result;
            }).catch((error) => {
              return res.status(500).json({ message: 'Internal Server Error during vector embedding' +error.message });
            });
            
            if(product.vector_embbeddings === null || product.vector_embbeddings === undefined || product.vector_embbeddings === ""){
                return res.status(500).json({ message: 'Internal Server Error during vect0r embedding' });
            }
            req.body.item_description = real_desc;
            const savedProduct = await product.save();
            return res.status(201).json(savedProduct);
          } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
                res.status(400).json({ error: errorMessage });
              } else {
                console.error('Error creating store:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
          }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
  }

  exports.getProduct = async (req,res, internal = false) => {
    try {
        try {
            const product_id = req.query.product_id;
        
            const product = await Product.findById(product_id);
        
            if (!product) {
              return res.status(404).json({ message: 'Product not found' });
            }
            if(internal){
              return product;
            }
            return res.status(200).json(product);
          } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
                res.status(400).json({ error: errorMessage });
              } else {
                console.error('Error creating store:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
          }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
  }

exports.getAllProducts = async (req, res) => {
  try {
    const _page = req.query.page || 1;
    const _limit = req.query.limit || 40;

    const options = {
      page: parseInt(_page, 10),
      limit: parseInt(_limit, 10),
    };

    const allProducts = await Product.paginate({}, options);

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  exports.updateProduct = async (req,res) => {
    try {
        
        try {        
            const product_id = req.query.product_id;
            const updatedData = req.body;
            if(product_id === undefined || product_id === null || product_id === ""){
                return res.status(400).json({ message: 'Product id is required' });
            }
            if(updatedData === undefined || updatedData === null || updatedData === ""){
                return res.status(400).json({ message: 'Updated data is required' });
            }
            if(updatedData.item_name || updatedData.item_description){
              let product;
              await this.getProduct(req, res, true).then((result)=>{
                product = result;
              }).catch((err)=>{
                return res.status(500).json({message: err.message})
              });
              if(product === undefined || product === null || product === ""){
                return res.status(400).json({ message: 'Product not found' });
              }
              if(updatedData.item_name){
                product.item_name = updatedData.item_name;
              }
              if(updatedData.item_description){
                product.item_description = updatedData.item_description;
              }
              req.body.item_name = product.item_name;
              req.body.item_description = product.item_description;

              let real_desc = req.body.item_description;
              req.body.item_description = req.body.item_name + " : " +  req.body.item_description + "category [ " + req.body.category + " ] " + " sub_category [ " +  req.body.sub_category + "]";
              
              await embeddingService.generate_embeddings(req, res).then((result)=>{
                console.log(result);
                product.vector_embbeddings = result;
              }).catch((error) => {
                return res.status(500).json({ message: 'Internal Server Error during vector embedding' +error.message });
              });

              req.body.item_description = real_desc;
              const updatedProduct = await Product.findByIdAndUpdate(product_id, product, { new: true });
        
              if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
              }
        
              return res.status(200).json(updatedProduct);
            }

            const updatedProduct = await Product.findByIdAndUpdate(product_id, updatedData, { new: true });
        
            if (!updatedProduct) {
              return res.status(404).json({ message: 'Product not found' });
            }
        
            return res.status(200).json(updatedProduct);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
  } 

  exports.deleteProduct = async (req,res) => {
    try {
        try {
            const product_id = req.query.product_id;
            if(product_id === undefined || product_id === null || product_id === ""){
              return res.status(400).json({ message: 'Product id is required' });
          }
        
            const deletedProduct = await Product.findByIdAndDelete(product_id);
        
            if (!deletedProduct) {
              return res.status(404).json({ message: 'Product not found' });
            }
        
            return res.status(200).json(deletedProduct);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
  }

  exports.searchProducts = async (req, res) => {
    try {
      const store_id = req.query.store_id; // Add the storeId query parameter
      const keyword = req.query.keyword;
      const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special characters
      const regex = new RegExp(`.*${escapedKeyword}.*`, 'i');
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = 40;
  
      try {
        let query = {
          $or: [
            { item_name: keyword },
            { item_name: regex },
            { item_description: keyword },
            { item_description: regex },
          ],
        };
  
        if (store_id) {
          query.store_id = store_id;
        }
  
        const products = await Product.find(query)
          .skip((page - 1) * pageSize)
          .limit(pageSize);
  
        return res.status(200).json(products);
      } catch (error) {
        console.error('Error searching products:', error);
        return res.status(500).json({ error: 'Error searching products' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  
  
