import Joi from 'joi';
import user from '../../models/user';
import CustomErrorHandler from '../../service/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtToken from './../../service/JwtToken';
import refreshToken from '../../models/refreshToken';

const loginController = {
    async login(req, res, next) {
        const registerSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const { error } = registerSchema.validate(req.body);
        if (error)
            return next(error);

        try {
            const User = await user.findOne({ email: req.body.email });
            if (!User) {
                return next(CustomErrorHandler.wrongcreadintials('User name or password is wrong'))
            }
            const match = await bcrypt.compare(req.body.password, User.password);
            if (!match) {
                return next(CustomErrorHandler.wrongcreadintials('User name or password is wrong'))
            }
            const accesstoken = JwtToken.sign({ _id: User._id });
            const refrestoken = JwtToken.sign({ _id: User._id }, '1y', process.env.refresshsec);

            await refreshToken.create({ token: refrestoken })
            res.json({ access_token: accesstoken, refresh_toekn: refrestoken });

        } catch (err) {
            return next(err);
        }

    },
    async logout(req, res, next) {
        try {
            const refreshSchema = Joi.object({
                refresh_token: Joi.string().required(),
            })

            const { error } = refreshSchema.validate(req.body);
            if (error)
                return next(error);
            await refreshToken.deleteOne({ token: req.body.refresh_token });
            res.json({ msg: 'user logout' })

        } catch (error) {
            return next(new Error('something went wrong in database', error));
        }
    }
}

export default loginController;