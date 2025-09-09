"use client";

import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import { useStore } from "@/src/store";
import { useState } from "react";
import CreditCardPaymentModal from "@/components/cart/CreditCardPaymentModal";
import ShoppingCartItem from "@/components/cart/ShoppingCartItem";
import Amount from "@/components/cart/Amount";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const addToCart = useStore((state) => state.addToCart);
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full relative overflow-hidden transform transition-transform duration-300 scale-95 hover:scale-100">
          
          {/* Botón Cerrar */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-3xl font-bold transition-colors"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Contenedor principal */}
          <div className="flex flex-col lg:flex-row">
            {/* Imagen */}
            <div className="w-full lg:w-1/2 h-80 lg:h-auto bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
              <Image
                src={getImagePath(product.image)}
                alt={`Imagen de Producto ${product.name}`}
                width={700}
                height={900}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            {/* Información */}
            <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Categoría:</span> {product.categoryId}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Disponibles:</span> {product.inventory}
                </p>
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(product.price)}
                </p>
              </div>

              {/* Botones */}
              <div className="mt-6 flex flex-col lg:flex-row gap-4 w-full">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  Agregar al Carrito
                </button>

                <button
                  onClick={() => {
                    addToCart(product);
                    setShowPaymentModal(true);
                  }}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>

          {/* Carrito elegante al fondo */}
          {contents.length > 0 && (
            <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mx-4 lg:mx-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Tu Carrito
              </h3>
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {contents.map((item) => (
                  <ShoppingCartItem key={item.productId} item={item} />
                ))}
              </ul>

              <dl className="space-y-3 mt-6 text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                {discount ? (
                  <Amount label="Descuento" amount={discount} discount />
                ) : null}
                <Amount label="Total a Pagar" amount={total} />
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Modal de pago */}
      {showPaymentModal && (
        <CreditCardPaymentModal
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
}
