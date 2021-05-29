import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        slug: {
            type: String,
            maxLength: 50,
        },
        // Display title in Ukrainian
        title: {
            type: String,
            maxlength: 50,
        },
        img: {
            type: String
        },
        description: {
            type: String,
        },
        headerText: {
            type: String,
        },
        seoText: {
            type: String,
        }
    },
)

const Category = mongoose.model('Category', schema)

export default Category
