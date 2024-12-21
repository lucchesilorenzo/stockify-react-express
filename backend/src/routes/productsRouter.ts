import { randomUUID } from "crypto";
import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  getAvailableProducts,
  getProductBySlug,
  getProducts,
  getProductsToRestock,
  updateProduct,
  updateProductStatus,
} from "../controllers/productsController";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, randomUUID() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
});

router.get("/to-restock", getProductsToRestock);
router.get("/available", getAvailableProducts);

router.get("/slug/:productSlug", getProductBySlug);

router.patch("/:productId", upload.single("image"), updateProduct);
router.patch("/:productId/status", updateProductStatus);
router.get("/", getProducts);

export default router;
