import jwt from 'jsonwebtoken';
class JwtToken {
    static sign(payload, expiry = '10h', secret = "thisismysecret") {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static veryfy(payload, secret = "thisismysecret") {
        return jwt.verify(payload, secret);
    }
}
export default JwtToken;