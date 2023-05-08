class HomeController {
  // index page
  indexPage(req, res, next) {
    if (!req.user.role) {
    return res.render("pages/about");
    }
    if (req.user.role === "mentor") {
      return res.render("pages/mentor");
    }
    return res.render("pages/index");
    
  }

}

export default HomeController;
