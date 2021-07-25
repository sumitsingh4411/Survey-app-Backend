import Joi from 'joi';
import user from '../../models/user';
import CustomErrorHandler from '../../service/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtToken from './../../service/JwtToken';
import refreshToken from '../../models/refreshToken';


const registerController = {
    async register(req, res, next) {
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_pass: Joi.ref('password')
        });
        const { error } = registerSchema.validate(req.body);
        if (error)
            return next(error);

        try {
            const exist = await user.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This email is already taken'));
            }
        } catch (err) {
            return next(err);
        }


        const hashpassword = await bcrypt.hash(req.body.password, 10);
        const { name, email } = req.body;

        const User = new user({
            name,
            email,
            password: hashpassword
        });
        let accesstoken = '';
        let refreshtoken = ' ';
        try {
            const saveuser = await User.save();
            accesstoken = JwtToken.sign({ _id: saveuser._id });
            refrestoken = JwtToken.sign({ _id: saveuser._id }, '1y', process.env.refresshsec);

            await refreshToken.create({token:refrestoken})
        }
        catch (err) {
            return next(err);
        }

        res.json({ access_token: accesstoken, refresh_toekn: refreshtoken });
    }
}

export default registerController;