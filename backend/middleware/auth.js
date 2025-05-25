import jwt from "jsonwebtoken"

const authMiddleware = async (req, resizeBy, next) => {
    const { token } = req.headers;
    if (!token) {
        return resizeBy.json({success:false,message:"Not authorized login again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        resizeBy.json({ success: false, message: "error" })
    }
}

export default authMiddleware;