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
        img: {
            type: String
        },
        seoTitle: {
            type: String,
        },
        productType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductType"
        },
    },
)

const Product = mongoose.model('Product', schema)

export default Product
