

import jwt from "jsonwebtoken";

const createTokenJWT = (payload) => {
    let key = process.env.JWT_TOKEN_SECRET
    const jwtToken = jwt.sign(payload, key, { expiresIn: '1h' });
    return jwtToken
}

const verifyTokenJWT = (token) => {
    let key = process.env.JWT_TOKEN_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key);
        data = decoded
    } catch (err) {
        console.log(err);
    }

    return data
}

const checkTokenJWT = (req, res, next) => {
    let token = req.headers.authorization?.slice(7)

    if (token) {
        let decoded = verifyTokenJWT(token)

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token is expired'
            })
        }
        next()
    } else {
        return res.status(401).json({
            success: false,
            message: 'Bạn Cần Đăng Nhập Để Thực Hiện Yêu Cầu Này'
        })
    }

}

module.exports = {
    createTokenJWT,
    verifyTokenJWT,
    checkTokenJWT,
}