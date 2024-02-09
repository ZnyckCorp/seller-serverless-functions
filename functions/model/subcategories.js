const subCategories = {
    grocery: {
        fruits_and_vegetables: {
            1: 'fruits',
            2: 'vegetables',
            3: 'dried fruits',
            4: 'leafy vegetables',
            5: 'exotic vegetables',
            6: 'nuts & seeds',
            7: 'herbs & spices'
        },
        meat_and_seafood: {
            1: 'chicken & mutton',
            2: 'fish & seafood',
            3: 'eggs',
            4: 'meat',
            5: 'poultry',
            6: 'pork',
        },
        atta_rice_oil_dal: {
            1: 'atta',
            2: 'rice',
            3: 'oil',
            4: 'flours',
            5: 'dal & pulses',
            6: 'masala',
            7: 'spices'
        },
        breakfast_and_essentials: {
            1: 'batters & mixes',
            2: 'bread & buns',
            3: 'cereals',
            4: 'coffee & tea',
            5: 'milk drinks',
            6: 'cheese, butter, jam'
        },
        baby_care:{
            1 : 'Diapering',
            2 : 'Bathing Needs',
            3 : 'Baby Food',
            4 : 'Baby Gifting & toys',
        },
        cleaning_essentials : {
            1 : 'Fresheners',
            2 : 'Garbage bags',
            3 : 'Liquid detergents',
            4 : 'toilet cleaner',
            5 : 'Dishwasher Bars',
            6 : 'Shoe care',
            7 : 'Mops & brooms'
        }, 
        pet_care : {
            1 : 'Dog food',
            2 : 'Cat food',
            3 : 'Dog treats',
            4 : 'Cat treats',
            5 : 'Dog toys',
            6 : 'Cat toys',
            7 : 'Dog accessories',
            8 : 'Cat accessories',
            9 : 'Dog grooming',
            10 : 'Cat grooming'
        },
        snacks_munchies : {
            1 : 'chips & crisps',
            2 : 'bhujira mixes',
            3 : 'energy bars'
        },
    },
    electronics: {
        mobile_phones: {
            1: 'smartphones',
            2: 'tablets',
            3: 'accessories'
        },
        laptops: {
            1: 'laptops',
            2: 'accessories'
        },
        cameras: {
            1: 'cameras',
            2: 'accessories'
        },
        gaming: {
            1: 'consoles',
            2: 'accessories'
        },
        home_appliances: {
            1: 'kitchen',
            2: 'laundry',
            3: 'cleaning',
            4: 'air conditioning',
            5: 'refrigeration'
        },
        audio: {
            1: 'headphones',
            2: 'speakers',
            3: 'accessories'
        },
        televisions: {
            1: 'tvs',
            2: 'accessories'
        },
    },
    fashion: {
        womens: {
            1: 'dresses',
            2: 'tops',
            3: 'bottoms',
            4: 'footwear',
            5: 'accessories'
        },
        mens: {
            1: 'shirts',
            2: 'bottoms',
            3: 'footwear',
            4: 'accessories'
        },
        kids: {
            1: 'boys',
            2: 'girls',
            3: 'footwear',
            4: 'accessories'
        },
        shoes: {
            1: 'men',
            2: 'women',
            3: 'kids'
        },
        bags: {
            1: 'men',
            2: 'women',
            3: 'kids'
        },
        watches: {
            1: 'men',
            2: 'women',
            3: 'kids'
        },
        beauty: {
            1: 'men',
            2: 'women',
            3: 'kids'
        }
    }
};

module.exports = subCategories;
