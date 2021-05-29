import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        slug: {
            type: String,
            maxlength: 50,
        },
        // Display title in Ukrainian
        title: {
            type: String,
            maxLength: 50,
        },
    },
)

const ProductType = mongoose.model('ProductType', schema)

export default ProductType
