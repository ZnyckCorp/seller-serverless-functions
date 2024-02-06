const functions = require('firebase-functions');
const admin = require('firebase-admin');
const storeService = require("./service/store");
const productService = require("./service/product");
const db = require("./service/db");
const cors = require("cors")({origin: true});


// Initialize Firebase Admin SDK
admin.initializeApp();

// Middleware to handle async operations in Express
const asyncMiddleware = (fn) => async (req, res, next) => {
   await db.connectToDatabase();
  Promise.resolve(fn(req, res, next)).catch(next);
};


// Create
exports.createStore = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
        storeService.createStore(req, res);

    } );
}));

// Read
exports.getStore = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    storeService.getStores(req, res);
    });
}));
// Read all
exports.getAllStores = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    storeService.getAllStores(req, res);
    });
}));
// Update
exports.updateStore = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    storeService.updateStore(req, res);
    });
}));

// Delete
exports.deleteStore = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    storeService.deleteStore(req, res);
    });
}));

// Search
exports.searchStores = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    storeService.searchStores(req, res);
    });
}));




// all products routes

// Create
exports.createProduct = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    productService.createProduct(req, res);
    });
}));

// Read
exports.getProduct = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    productService.getProduct(req, res);
    });
}));

// Read all
exports.getAllProducts = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    productService.getAllProducts(req, res);
    });
}));

// Update
exports.updateProduct = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    productService.updateProduct(req, res);
    });
}));

// Delete
exports.deleteProduct = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    productService.deleteProduct(req, res);
    });
}));

// Search
exports.searchProduct = functions.https.onRequest(asyncMiddleware(async (req, res) => {
    cors(req, res, () => {
    productService.searchProducts(req, res);
    });
}));
