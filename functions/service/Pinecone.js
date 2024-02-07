const { Pinecone } = require('@pinecone-database/pinecone');
const functions = require('firebase-functions');

const pc = new Pinecone({
  apiKey: functions.config().config.pineconeapi
});

const index = pc.index('products');

exports.insertIndex = async (req, res) => {
    try {
        const { vector, metadata } = req.body;

        const { productId } = metadata;
        const { store_id } = metadata;
        const {category} = metadata;

        if (!category || category === '' || category === 'undefined') {
            return res.status(400).send('Category is required.');
        }
        // testing only
        if (category !== 'grocery' ){
            return res.status(400).send('Category must be grocery.');
        }
        if (!store_id || store_id === '' || store_id === 'undefined') {
            return res.status(400).send('Store ID is required.');
        }
        if (!productId || productId === '' || productId === 'undefined') {
            return res.status(400).send('Product ID is required.');
        }

        const meta = {
            ...metadata,
            id: productId,
            storeId: store_id,
        };

        await index.namespace(category).upsert([{id: productId, values: vector, metadata: meta }]).then(
            (response) => {
                res.status(200).send('Insertion completed successfully');
            },
            (error) => {
                res.status(500).send('Error inserting into index'+error);
            }
            );
    } catch (error) {
        console.error('Error inserting into index:', error);
        res.status(500).send('Error inserting into index');
    }
};

exports.readIndex = async (req, res) => {
    try {
        const productId = req.query.product_id;

        if (!productId || productId === '' || productId === 'undefined') {
            return res.status(400).send('Product ID is required.');
        }

        const result = await index.namespace('grocery').fetch([productId]);
        if (!result) {
            return res.status(404).send('Document not found');
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error reading from index:', error);
        res.status(500).send('Error reading from index');
    }
};


exports.deleteIndex = async (req, res) => {
    try {
        const productId = req.query.product_id;

        if (!productId || productId === '' || productId === 'undefined') {
            return res.status(400).send('Product ID is required.');
        }

        await index.namespace('grocery').deleteOne(productId);
        res.status(200).send('Deletion completed successfully');
    } catch (error) {
        console.error('Error deleting from index:', error);
        res.status(500).send('Error deleting from index');
    }
};
