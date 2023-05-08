import UserModel from "../models/userModel.js";
import errorStatus from "../../../helpers/errorStatus.js";

// move it to a proper place
function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function userRepository() {
  const findByPropertyLogin = (params) =>
    UserModel.find(omit(params)).select("-__v -createdAt -updatedAt");

  const findByProperty = (params) =>
    // find exclude that fields role not admin

    UserModel.find({
      ...omit(params, "page", "perPage"),
      role: { $in: ["client,mentor"] },
    })
      .select("-password -__v  -createdAt -updatedAt")
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const findLast10Mentor = () => {
    return userModel
      .find({ role: "mentor" })
      .select("-password -__v -createdAt -updatedAt")
      .limit(10);
  };
  const findLast10User = () => {
    return userModel
      .find({ role: "client" })
      .select("-password -__v -createdAt -updatedAt")
      .limit(10);
  };

  const countAll = (params) => UserModel.countDocuments(omit(params));

  const findById = (id) => UserModel.findById(id).select("-password");

  const add = async (user) => {
    try {
      const { username, email } = await UserModel.create({
        username: user.username,
        password: user.password,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });

      return { username, email };
    } catch (error) {
      console.log(error);
      if (error && error.code === 11000) {
        throw errorStatus(`users already exists`, 400);
      } else {
        throw error;
      }
    }
  };

  const updateById = (id, userDomain) => {
    const updatedUser = {
      username: userDomain.username,
      phone: userDomain.phone,
    };

    return UserModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedUser },
      { new: true }
    );
  };

  const deleteById = (id) => UserModel.findByIdAndRemove(id);

  return {
    findByPropertyLogin,
    countAll,
    findById,
    add,
    updateById,
    deleteById,
    findLast10Mentor,
    findLast10User,
    findByProperty
  };
}
