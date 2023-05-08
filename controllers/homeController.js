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
  DashboardAdmin = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const user = await this.services.findById(userId);
      console.log(user);
    } catch (error) {
      next(error);
    }
  };
}

export default HomeController;
