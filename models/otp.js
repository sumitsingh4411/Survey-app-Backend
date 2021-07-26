import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const otpschema = new Schema({
    otp: { type: String },
    email: { type: String }
})
export default mongoose.model('otp', otpschema);