import errorStatus from "../helpers/errorStatus.js";
import userServices from "../services/userService.js";

const config = process.env;

class UserControllers {
  repository = new userServices();

  fetchUserById = (req, res, next) => {
    this.repository
      .findById(req.params.id)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  dashboardUser = async (req, res, next) => {
    const userId = req.user;
    try {
      const user = await this.repository.findById(userId.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    const userId = req.user.id;
    const { username } = req.body;
    try {
      const newUser = await this.repository.updateUser(userId, username);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    const user = req.user;
    try {
      await this.repository.deleteUser(user.id);
      res.status(203);
    } catch (error) {
      next(error);
    }
  };

  register = (req, res, next) => {
    const { username, password, password2, email } = req.body;
    this.repository
      .signin(username, password, password2, email)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { access, refresh } = await this.repository.login(email, password);
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

  verifyEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await this.repository.verifyEmail(email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    const { refresh } = req.body;
    if (!refresh) {
      res.status(403).json({ message: "you not login" });
    } else {
      try {
        await this.repository.logout(refresh);
        res.json({ message: "success logout", status: 200 });
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
      const { access, refresh } = await this.repository.refreshToken(
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
}
export default UserControllers;
