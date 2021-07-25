import jwt from 'jsonwebtoken';
class JwtToken {
    static sign(payload, expiry = '10h', secret = process.env.SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static veryfy(payload, secret = process.env.SECRET) {
        return jwt.verify(payload, secret);
    }
}
export default JwtToken;