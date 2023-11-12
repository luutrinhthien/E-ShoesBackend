import express from "express";
import {
  postProduct,
  getProduct,
  cmtProduct,
  getCart,
  removeProduct,
  updateUser,
  getUser,
  getOrder,
  getAllUser,
  getAllProduct,
  removeProductCart,
  updateRole,
} from "../controllers/user.js";

import { verifyToken, verifyRole } from "../middleware/auth.js";

const router = express.Router();

/** POST  id:/ _idUser*/

router.post(
  "/postP",
  verifyToken,
  verifyRole("admin", "operator"),
  postProduct
);

router.post("/cmtP/:id/:idP", verifyToken, cmtProduct);

/** READ  id: _idUser*/

router.get("/getP/:id", verifyToken, getProduct);
router.get("/getCart/:id", verifyToken, getCart);
router.get("/getOrder/:id", verifyToken, getOrder);
router.get("/getUser/:id", getUser);
router.get("/getAllUser", verifyToken, verifyRole("admin"), getAllUser);
router.get(
  "/getAllProduct",
  verifyToken,
  verifyRole("admin", "operator"),
  getAllProduct
);
/** Update  */

router.patch("/update/:id", verifyToken, updateUser);

router.patch("/grantRole/:id", verifyToken, verifyRole("admin"), updateRole);

router.patch(
  "/removeProduct/:idP",
  verifyToken,
  verifyRole("admin", "operator"),
  removeProduct
);

router.patch("/removeProductCart/:id/:product", verifyToken, removeProductCart);

export default router;
