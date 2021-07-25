import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const refreshTOken=new Schema({
      token:{type:String,unique:true}
})
export default mongoose.model('token',refreshTOken);