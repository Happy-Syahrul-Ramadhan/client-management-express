import errorStatus from "../helpers/errorStatus.js";
import authService from "../services/authService.js";
import userServices from "../services/userService.js";

class UserControllers {
  services = new userServices();
  authServies = authService();

  loginPage = (req, res, next) => {
    res.render("loginPage");
  };

  registerPage = (req, res, next) => {
    res.render("registerPage");
  };
  register = (req, res, next) => {
    const { username, password, password2, email, phone } = req.body;
    this.services
      .signin(username, password, password2, email, phone)
      .then(async (user) => {
        const { access, refresh } = await this.services.login(email, password);
        res.cookie("X-accessToken", access, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.cookie("X-refreshToken", refresh, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.redirect("/");
      })
      .catch((error) => next(error));
  };
  registerMentor = (req, res, next) => {
    const { username, password, password2, email, phone } = req.body;
    this.services
      .signinMentor(username, password, password2, email, phone)
      .then(async (user) => {
        const { access, refresh } = await this.services.login(email, password);
        res.cookie("X-accessToken", access, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.cookie("X-refreshToken", refresh, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.redirect("/");
      })
      .catch((error) => next(error));
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { access, refresh } = await this.services.login(email, password);
      res.cookie("X-accessToken", access, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.cookie("X-refreshToken", refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    // get refresh token from cookies
    const refresh = req.cookies["X-refreshToken"];

    if (!refresh) {
      res.status(403).json({ message: "you not login" });
    } else {
      try {
        // clear cookies
        res.clearCookie("X-accessToken");
        res.clearCookie("X-refreshToken");
        // delete refresh token in database
        await this.services.logout(refresh);

        res.redirect("/login");
      } catch (error) {
        throw errorStatus(error, 500);
      }
    }
  };

  refreshToken = async (req, res, next) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
    try {
      const { access, refresh } = await this.services.refreshToken(
        requestToken
      );
      res
        .json({
          access,
          refresh,
        })
        .status(200);
    } catch (error) {
      next(error);
    }
  };
  updateUser = async (req, res, next) => {
    const userId = req.user.id;
    const { username } = req.body;
    try {
      const newUser = await this.services.updateUser(userId, username);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  DashboardAdmin = async (req, res, next) => {
    const userId = req.user.id;
    try {
      const user = await this.services.findById(userId);
      if (user.role !== "admin") {
        next(errorStatus("you not allowed", 403));
      }
      const data = await this.services.dashboardAdmin();
      // render page/admin with data
      res.render("pages/admin", { data });
    } catch (error) {
      next(error);
    }
  };
}
export default UserControllers;
