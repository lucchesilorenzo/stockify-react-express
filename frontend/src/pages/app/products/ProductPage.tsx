import Spinner from "@/components/common/spinner";
import ProductEditForm from "@/components/products/product-edit-form/ProductEditForm";
import { useProduct } from "@/hooks/queries/products/useProduct";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function ProductPage() {
  const { productSlug } = useParams();
  const { data: product, isLoading } = useProduct({ productSlug });

  useEffect(() => {
    document.title = `${product?.name} | Stockify`;
  }, [product]);

  if (isLoading) return <Spinner size="large" />;
  if (!productSlug || !product) return <Navigate to="*" replace />;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductEditForm product={product} />
    </main>
  );
}
