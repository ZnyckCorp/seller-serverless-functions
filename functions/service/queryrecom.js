const { Pinecone } = require('@pinecone-database/pinecone');
const functions = require('firebase-functions');
const vectorizer = require('./generate_embeddings');

// Generate embeddings for the query term
exports.queryrecom =  async (req, res) => {
    try{
        const query_term = req.query.query_term;
        
        if(!query_term || query_term === "" || query_term === undefined){
            res.status(500).send("query_term term need!");
        }

        req.body.item_name = query_term;
        req.body.item_description = query_term;
        const queryEmbedding = await vectorizer.generate_embeddings(req,res);
        if(!queryEmbedding){
            res.status(500).send("error in generating embeddings!");
        }
        await queryProductsByEmbedding(queryEmbedding).then(function(result){
            res.status(200).json(result);
        }).catch(function(error){
            res.status(400).json(error.message);
        });
    }catch(err){
        res.status(500).send('error message : '+err.message);
    }
}

async function queryProductsByEmbedding(queryEmbedding) {
    try {

        const pineconeClient = new Pinecone({ apiKey: functions.config().config.pineconeapi });

        const indexName = 'products';
        let s = 10
        const result = await pineconeClient.index(indexName).namespace('grocery').query({ topK: s, vector:  queryEmbedding })
        return result.matches;
    } catch (error) {
        throw new Error('Error querying products: ' + error.message);
    }
}