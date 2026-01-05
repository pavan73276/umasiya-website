export const generateToken = (user, message, statusCode, res) => {
  // 🔴 ADD THESE LINES AT THE VERY TOP
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE || 7);

  if (!cookieExpireDays || isNaN(cookieExpireDays)) {
    throw new Error("COOKIE_EXPIRE must be a valid number (in days)");
  }

  // ✅ existing logic
  const token = user.generateJsonWebToken();

  let cookieName = "userToken";
  if (user.role === "admin") cookieName = "adminToken";
  if (user.role === "staff") cookieName = "staffToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      domain: process.env.NODE_ENV === "production" ? ".onrender.com" : undefined,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
