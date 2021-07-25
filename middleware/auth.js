
import CustomErrorHandler from './../service/CustomErrorHandler';
import JwtToken from './../service/JwtToken';

const auth = async (req, res, next) => {
    let authheader = req.headers.authorization;
    if (!authheader)
        return next(CustomErrorHandler.Aunauthroize('unAuthorize'));
    const token = authheader.split(' ')[1];

    try {
        const { _id } = await JwtToken.veryfy(token);
        req.User = {};
        req.User._id = _id;
        next();
    } 
    catch (err) {
        console.log('hello sumit singh')
        return next(CustomErrorHandler.Aunauthroize());
    }

}
export default auth;