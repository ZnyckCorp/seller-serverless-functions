const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const subCategories = require('./subcategories');

const productSchema = new mongoose.Schema({
    item_name: {
        type: String,
        index: true,
        required: true,
        maxLength: 100,
        validate: {
            validator: function (value) {
              // Custom validation function to check if the length does not exceed the maximum
              return value.length <= 100;
            },
            message: 'Product name must not exceed 100 characters',
          },
    },
    item_description: {
        type: String,
        required: true,
        index: true,
        maxLength: 1000,
        validate: {
            validator: function (value) {
              // Custom validation function to check if the length does not exceed the maximum
              return value.length <= 2000;
            },
            message: 'Product description must not exceed 2000 characters',
          },
    },
    image_url_primary: {
        type: String,
        required: true
    },
    image_url_secodary_1: {
        type: String
    },
    image_url_secodary_2: {
        type: String
    },
    image_url_secodary_3: {
        type: String
    },
    category: {
        type: String,
        lowercase: true,
        index: true,
        enum: ['grocery', 'fashion', 'electronics'],
    },
    vector_embbeddings: [{
        type: Number
    },],
    item_price: {
        type: Number,
        required: true,
    },
    item_quantity: {
        type: Number,
        required: true,
    },
    item_unit: {
        type: String,
        required: true,
    },
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    store_lat: {
        type: String,
        required: true,
    },
    store_lng: {
        type: String,
        required: true,
    },
    lwh_price: {
        type: String,
    },
    lwh_quantity: {
        type: String,
    }, 
    sub_category: {
        type: String,
        validate: {
            validator: function (value) {
                const selectedCategory = this.category && this.category.toLowerCase();
               
                if (
                    selectedCategory &&
                    subCategories[selectedCategory] &&
                    subCategories[selectedCategory][value]
                ) {
                    return true;
                }
            
                return false;
            },
            message: 'Invalid subcategory for the selected category.',
        },
    },
    
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;