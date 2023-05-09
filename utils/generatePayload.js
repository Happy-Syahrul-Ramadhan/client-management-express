export default function generatePayload(user) {
  if (user.role === "client") {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };
  } else {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
