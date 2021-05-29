import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 50,
        },
        img: {
            type: String,
        },
        calories: {
            type: Number,
        },
        minutesToCook: {
            type: Number,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        utensils: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Utensil"
        }],
    },
)

const Recipe = mongoose.model('Recipe', schema)

export default Recipe
