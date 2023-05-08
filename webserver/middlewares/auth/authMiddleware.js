import errorStatus from "../../../helpers/errorStatus.js";
import authService from "../../../services/authService.js";

export default function authMiddleware(req, res, next) {
  // Get token from cookie
  const token = req.cookies["X-accessToken"];
  const authservice = authService()
  if (!token) {
    const error = new Error("You Must Login | No access token found");
    res.redirect("/login");
  }

  try {
    const decoded = authservice.verify(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    throw errorStatus(err);
  }
}
