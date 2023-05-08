import userDomain from "../databases/mongodb/domain/userDomain.js";
import userRepository from "../databases/mongodb/repository/authRepository.js";
import errorStatus from "../helpers/errorStatus.js";
import AuthServices from "../services/authService.js";
import generatePayload from "../utils/generatePayload.js";
class UserServices {
  repository = userRepository();
  authServies = new AuthServices();
  async signinMentor(username, password, password2, email,phone, role="mentor" ) {
    // TODO: add a proper validation (consider using @hapi/joi)
    if(!username || !password || !email || !password2 || !phone){
      throw new Error(
        "username, password, and email fields cannot be empty"
      );
    }
    if(password !== password2){
      throw new Error("Password is invalid");
    }
    const newUser = userDomain(
      username,
      email,
      this.authServies.encryptPassword(password),
      phone,
      role
    );
    return this.repository.add(newUser);

  }
  async signin(username, password, password2, email,phone ) {
    // TODO: add a proper validation (consider using @hapi/joi)
    if (!username || !password || !email || !password2 || !phone) {
      throw new Error(
        "username, password, and email fields cannot be empty"
      );
    }
    if (password !== password2) {
      throw new Error("Password is invalid");
    }

    const newUser = userDomain(
      username,
      email,
      this.authServies.encryptPassword(password),
      phone,
    );
    return this.repository.add(newUser);
  }

  async login(email, password) {
    if (!email || !password) {
      const error = new Error("email and password fields cannot be empty");
      error.statusCode = 401;
      throw error;
    }
    const user = await this.repository.findByPropertyLogin({email});
  
    if (!user.length) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }
    
    const isMatch = this.authServies.compare(password, user[0].password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }
    
    

    const payload = {
      user : generatePayload(user[0]),
    };

    return await this.authServies.createAccessAndRefreshToken(payload);
  }

  async refreshToken(token) {
    try {
      let refreshToken = await this.authServies.findRefreshToken(token);

      if (!refreshToken) {
        throw errorStatus("Refresh token is not valid !", 403);
      }

      refreshToken = await this.authServies.verifyOrDeleteRefreshToken(
        refreshToken
      );

      const payload = {
        user: generatePayload(refreshToken.user),
      };
      await this.authServies.deleteRefreshToken(refreshToken.token); // rotate refresh token
      return await this.authServies.createAccessAndRefreshToken(payload);
    } catch (err) {
      throw errorStatus(err, 500);
    }
  }
  async logout(token) {
    try {
      return await this.authServies.deleteRefreshToken(token);
    } catch (error) {
      throw errorStatus(error, 500);
    }
  }
  findById(id) {
    return this.repository.findById(id);
  }
  countAll(params) {
    return this.repository.countAll(params);
  }
  findByProperty(params) {
    return this.repository.findByProperty(params);
  }

  async dashboardAdmin(){
    // TODO: add a proper validation (consider using @hapi/joi), add last 10 Order 
    let data ={}
    const mentor = await this.repository.findLast10Mentor()
    const client = await this.repository.findLast10User()
    // data order
    return data = {
      mentor,
      client
    }
  }

  async updateUser(id, username) {
    if (!username) {
      throw new Error("Form is not valid");
    }
    const newUser = await this.repository.updateById(id, { username });
    return newUser;
  }

  deleteUser(id) {
    return this.repository.deleteById(id);
  }
  // email verify
  async verifyEmail(token) {
    try {
      const user = await this.repository.findByPropertyVerifyEmail({ token });
      if (!user.length) {
        throw errorStatus("Token is not valid !", 403);
      }
      await this.repository.updateById(user[0].id, { isVerified: true });
      return user[0];
    } catch (err) {
      throw errorStatus(err, 500);
    }
  }
  // forgot password
  async forgotPassword(email) {
    try {
      const user = await this.repository.findByPropertyForgotPassword({
        email,
      });
      if (!user.length) {
        throw errorStatus("Email is not valid !", 403);
      }
      const resetToken = await this.authServies.createResetToken(user[0].id);
      const link = `${process.env.FRONTEND_URL}/reset-password/${resetToken.token}`;
      const message = {
        to: user[0].email,
        from: process.env.EMAIL_FROM,
        subject: "Reset Password",
        text: `Reset Password Link: ${link}`,
      };
      await this.authServies.sendEmail(message);
      return user[0];
    } catch (err) {
      throw errorStatus(err, 500);
    }
  }
}

export default UserServices;
