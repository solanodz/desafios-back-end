import mongoose from 'mongoose';

export const init = async () => {
    try {
        const URI = 'mongodb+srv://solanodz:BYiuAO9vfoQHRQCI@@cluster0.twgoqf6.mongodb.net/e-commerce';
        await mongoose.connect(URI);
        console.log('Database connected 🚀');
    } catch (error) {
        console.error('Error to connect to database', error.message);
    }
};