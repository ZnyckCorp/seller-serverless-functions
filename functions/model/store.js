// models/store.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const storeSchema = new mongoose.Schema({
  store_name: {
    type: String,
    required: true,
    index: true,
    maxLength: 100,
    validate: {
      validator: function (value) {
        // Custom validation function to check if the length does not exceed the maximum
        return value.length <= 100;
      },
      message: 'Store name must not exceed 100 characters',
    },
  },
  store_description: {
    type: String,
    required: true,
    maxLength: 1000,
    validate: {
      validator: function (value) {
        // Custom validation function to check if the length does not exceed the maximum
        return value.length <= 1000;
      },
      message: 'Store description must not exceed 100 characters',
    },
  },
  store_location:  {
    type: String,
    required: true,
    maxLength: 100,
  },
  store_lat: {
    type: Number,
    required: true,
  },
  store_long: {
    type: Number,
    required: true,
  },
  store_image_url: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
          // Modified URL validation to allow both "https://" and "data:image"
          return /^(https?|data:image).*$/i.test(value);
      },
      message: 'Invalid URL for store_image_url',
  },
    
  },
});
storeSchema.plugin(mongoosePaginate);
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

