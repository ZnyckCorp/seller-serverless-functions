const axios = require('axios');
const functions = require('firebase-functions');

exports.generate_embeddings = async (req, res) =>  {
    try {
        const txturl  = functions.config().config.txturl;
        const _secret_code = functions.config().config.secret_code;
        if(req.body.item_name === undefined || req.body.item_name === null || req.body.item_name === ""){
            return res.status(400).json({
                message: "Bad request",
                error: "Item name is required and be atmost 100 characters long"
            })
        }
        if(req.body.item_description === undefined || req.body.item_description === null || req.body.item_description === ""){
            return res.status(400).json({
                message: "Bad request",
                error: "Item description is required and be atmost 2000 characters long"
            })
        }
        const data = {
            secret_code: _secret_code,
            title: req.body.item_name,
            content: req.body.item_description
          };
          let __response = null;
         await axios.post(txturl, data)
            .then(response => {
              __response = response.data.data;
            })
            .catch(error => {
              return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
              });
            });
            return __response;
        
    }catch(err){
        return es.status(500).json({
            message: "Internal server error during vectorization",
            error: err
        });
    }
}