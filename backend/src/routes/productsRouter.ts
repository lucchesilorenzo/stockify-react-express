import { Router } from "express";
import {
  getAvailableProducts,
  getProduct,
  getProductBySlug,
  getProductOptions,
  getProducts,
  getProductsToRestock,
  updateProduct,
  updateProductStatus,
  uploadProductImage,
} from "../controllers/productsController";

const router = Router();

router.post("/upload/:productId", uploadProductImage);

router.get("/to-restock", getProductsToRestock);
router.get("/available", getAvailableProducts);

router.get("/slug/:productSlug", getProductBySlug);
router.get("/:productId/options", getProductOptions);

router.get("/:productId", getProduct);

router.patch("/:productId", updateProduct);
router.patch("/:productId/status", updateProductStatus);
router.get("/", getProducts);

export default router;
