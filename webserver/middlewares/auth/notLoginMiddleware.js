
export default function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.cookies["X-accessToken"];

  if (!token) {
    next()
  }else{
    res.redirect("/")
  }
  
}
