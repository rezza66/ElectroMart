import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => { 
   const token = req.header('auth-token')
   if(!token) return res.status(400).json({
    status: res.statusCode,
    message: 'Accsess Denied'
   })
   try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
   } catch (error) {
        res.status(404).json({
            status: res.statusCode,
            message: 'Invalid Token'
        })
   }

}