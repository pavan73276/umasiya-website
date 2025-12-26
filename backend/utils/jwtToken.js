export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // determine cookie name by role
  let cookieName = "userToken";
  if (user.role === "admin") cookieName = "adminToken";
  if (user.role === "staff") cookieName = "staffToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000 // ✅ FIX
      ),
      httpOnly: true,

      // ✅ REQUIRED FOR NETLIFY + RENDER
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
