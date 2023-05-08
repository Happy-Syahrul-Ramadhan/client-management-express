export default function mentorMiddleware(req, res, next){
    //if req.user.role is not found return errorwith error handler
    if(!req.user.role){
        return res.status(403).json({
            status: "error",
            message: "You are not authorized to access this route",
        });
    }

    if(req.user.role !== "mentor"){
        return res.status(403).json({
            status: "error",
            message: "You are not authorized to access this route",
        });
    }
    next();
}