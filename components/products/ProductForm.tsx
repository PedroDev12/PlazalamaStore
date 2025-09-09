import { CategoriesResponseSchema, Product } from "@/src/schemas";
import UploadProductImage from "./UploadProductImage";
import Image from "next/image";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  const categories = CategoriesResponseSchema.parse(json);
  return categories;
}

export default async function ProductForm({ product }: { product?: Product }) {
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="name" className="block">
          Nombre Producto
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre Producto"
          className="border border-gray-300 w-full p-2"
          name="name"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="block">
          Precio
        </label>
        <input
          id="price"
          type="number"
          placeholder="Precio Producto"
          className="border border-gray-300 w-full p-2"
          name="price"
          min={0}
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="inventory" className="block">
          Inventario
        </label>
        <input
          id="inventory"
          type="number"
          placeholder="Cantidad Disponible"
          className="border border-gray-300 w-full p-2"
          name="inventory"
          min={0}
          defaultValue={product?.inventory}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="categoryId" className="block">
          Categoría
        </label>
        <select
          id="categoryId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block">Imagen del Producto</label>

        {/* Contenedor de previsualización de imagen uniforme */}
        <div className="w-48 h-48 relative border border-gray-300 rounded-md overflow-hidden mb-2">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.name || "Producto"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              Sin imagen
            </div>
          )}
        </div>

        {/* Componente para subir imagen */}
        <UploadProductImage currentImage={product?.image} />
      </div>
    </>
  );
}
