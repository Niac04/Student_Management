// Simple API key middleware. If `API_KEY` is set in env, requests must include header `x-api-key: <API_KEY>`.
export default function authMiddleware(req, res, next) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return next(); // no API key configured -> allow all (dev mode)

  const provided = req.header("x-api-key");
  if (!provided || provided !== apiKey) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}
