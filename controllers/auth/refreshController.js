
import Joi from 'joi';
import refreshToken from '../../models/refreshToken';
import CustomErrorHandler from './../../service/CustomErrorHandler';
import JwtToken from '../../service/JwtToken';
import user from '../../models/user';

const refreshController = {
    async refreshTToken(req, res, next) {
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        })

        const { error } = refreshSchema.validate(req.body);
        if (error)
            return next(error);

        let data = '';
        let UserId = '';
        try {
            data = await refreshToken.findOne({ token: req.body.refresh_token });
            if (!data) {
                return next(CustomErrorHandler.Aunauthroize('Invalide refresh token'));
            }

            try {
                const { _id } = JwtToken.veryfy(data.token, "thisismysecret");
                UserId = _id;


            } catch (error) {
                return next(ErrorHandler.Aunauthroize('Invalide refresh token'));
            }

            const User = await user.findOne({ _id: UserId });

            if (!User) {
                return next(ErrorHandler.Aunauthroize('user not found'));
            }

            const accesstoken = JwtToken.sign({ _id: User._id });


            const refrestoken = JwtToken.sign({ _id: User._id }, '1y', "thisismysecret");

            await refreshToken.create({ token: refrestoken })
            res.json({ access_token: accesstoken, refresh_token: refrestoken });

        } catch (error) {
            return next(new Error('something went wrong', error.message));
        }
    }
}

export default refreshController;