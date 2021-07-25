import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const surveySchema = new Schema({
    email: { type: String, required: true, unique: true },
    question: { type: String, required: true, unique: true },
    option: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("survey", surveySchema);