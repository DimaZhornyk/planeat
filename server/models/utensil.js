import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        slug: {
            type: String,
        },
        title: {
            type: String,
            maxLength: 50,
        },
        img: {
            type: String,
        },
        seoTitle: {
            type: String,
        }
    },
)

const Utensil = mongoose.model('Utensil', schema)

export default Utensil
