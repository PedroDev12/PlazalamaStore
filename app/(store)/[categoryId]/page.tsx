import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/components/products/ProductCard";
import { redirect } from "next/navigation";

type Params = Promise<{ categoryId: string }>;

async function getProducts(categoryId: string) {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;

  const req = await fetch(url, {
    next: { tags: ["products-by-category"] },
  });

  if (!req.ok) {
    // Redirige si la categoría no existe o hay otro error HTTP
    redirect('/1');
  }

  let json;
  try {
    json = await req.json();
  } catch {
    // Si la respuesta no es JSON (HTML de error), redirige
    redirect('/1');
  }

  return CategoryWithProductsResponseSchema.parse(json);
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {category.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}