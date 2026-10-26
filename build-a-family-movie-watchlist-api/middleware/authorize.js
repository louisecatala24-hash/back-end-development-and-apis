export function authorizeModification(req, res, next) {
  const role = req.user && req.user.role;
  const userId = req.user && req.user.id;

  if (role === "parent") {
    return next();
  }

  if (role === "child" && String(req.params.userId) === String(userId)) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}