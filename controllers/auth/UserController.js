import user from "../../models/user";
import CustomErrorHandler from './../../service/CustomErrorHandler';

const UserController={
    async me(req,res,next)
    {
          try
          {
              const User=await user.findOne({_id:req.User._id});
              
              if(!User)
              {
                  return next(CustomErrorHandler.notfound('not found'));
              }
              return res.json({User});
          }
          catch(err)
          {
              return next(err);
          }
    }
}

export default UserController;