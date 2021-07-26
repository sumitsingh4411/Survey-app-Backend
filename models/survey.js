import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const surveySchema = new Schema({
    question: { type: String, required: true, unique:true},
    email: { type: String, required: true },
    option: { type: String, required: true }
});

export default mongoose.model("survey", surveySchema);