import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (!token?.startsWith("Bearer ")) {
      return res.status(401).send("Invalid token");
      // token = token.slice(7, token.length).trimLeft();
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT, (err, decode) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log(decode.id, decode.role);
      req.user = decode.id;
      req.role = decode.role;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const verifyRole = (...role) => {
  return (req, res, next) => {
    if (!req.role) {
      return res.status(401).send("Unautherized Action");
    }

    const allow = [...role];
    const result = allow.includes(req.role);
    if (!result) return res.status(401).send("Unautherized Action");
    next();
  };
};
