const Store = require('../model/store');

exports.createStore = async (req, res) =>{
    try {
        const { store_name, store_description, store_location, store_lat, store_long, store_image_url } = req.body;
        
      try {
        const newStore = new Store({
          store_name,
          store_description,
          store_location,
          store_lat,
          store_long,
          store_image_url,
        });
    
        const savedStore = await newStore.save();
        return res.status(201).json({ id: savedStore._id });
      } catch (error) {
        if (error.name === 'ValidationError') {
          const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
          res.status(400).json({ error: errorMessage });
        } else {
          console.error('Error creating store:', error);
          return res.status(500).json({ error: 'Internal Server Error'+error.message });
        }
      }
    }catch(error){
      return res.status(500).json({ error: 'Error creating store' });
    }
}

exports.getStores = async (req, res, internal = false) => {
    try {
        if(req.query.store_id === undefined || req.query.store_id === null || req.query.store_id === ""){
            return res.status(400).json({ error: 'Store ID is required' });
        }
        const store_id = req.query.store_id;
        
      try {
        const store = await Store.findById(store_id);

        if (store) {
          if(internal){
            return store;
          }
          return res.status(200).json(store);
        } else {
          return res.status(404).json({ error: 'Store not found' });
        }
      } catch (error) {
        console.error('Error getting store:', error);
        return res.status(500).json({ error: 'Error getting store' });
      }
      } catch (error) {
        console.error('Error getting stores:', error);
        return res.status(500).json({ error: 'Error getting stores' });
      }
}

exports.updateStore = async (req, res) => {
    try {
        const store_id = req.query.store_id;
        const { store_name, store_description, store_location, store_lat, store_long, store_image_url } = req.body;
          
        try {
          const result = await Store.updateOne(
            { _id: store_id },
            { $set: { store_name, store_description, store_location, store_lat, store_long, store_image_url } }
          );
          console.log(result);
          if (result.acknowledged && result.modifiedCount > 0) {
            return res.status(200).json({ message: 'Store updated successfully' });
          } else if (result.acknowledged && result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No changes !!' });
          } else {
            return res.status(404).json({ error: 'Store not found' });
          }
        } catch (error) {
          console.error('Error updating store:', error);
          return res.status(500).json({ error: 'Error updating store' });
        }
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

exports.deleteStore = async (req, res) => { 
    try {
        const store_id = req.query.store_id;
        
      try {
        const result = await Store.deleteOne({ _id: store_id });
        
        if (result.deletedCount > 0) {
          return res.status(200).json({ message: 'Store deleted successfully' });
        } else {
          return res.status(404).json({ error: 'Store not found' });
        }
      } catch (error) {
        console.error('Error deleting store:', error);
        return res.status(500).json({ error: 'Error deleting store' });
      }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.searchStores = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special characters
    const regex = new RegExp(`.*${escapedKeyword}.*`, 'i');
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = 40;


    try {
      const stores = await Store.find({
        $or: [
          { store_name: keyword },
          { store_name: regex },
          { store_description: keyword },
          { store_description: regex },
        ],
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return res.status(200).json(stores);
    } catch (error) {
      console.error('Error searching stores:', error);
      return res.status(500).json({ error: 'Error searching stores' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const _page = req.query.page || 1;
    const _limit = req.query.limit || 40;

    const options = {
      page: parseInt(_page, 10),
      limit: parseInt(_limit, 10),
    };

    const allStores = await Store.paginate({}, options);

    res.status(200).json(allStores);
  } catch (error) {
    console.error('Error getting all stores:', error);
    res.status(500).json({ error: 'Error getting all stores' });
  }
};

  
  