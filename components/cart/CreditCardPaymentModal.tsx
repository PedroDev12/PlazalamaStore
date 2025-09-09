"use client";

import { useStore } from "@/src/store";
import { motion, AnimatePresence } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import Amount from "@/components/cart/Amount";
import { useState } from "react";

interface CreditCardPaymentModalProps {
  onClose: () => void;
  onPay?: () => void;
}

export default function CreditCardPaymentModal({ onClose, onPay }: CreditCardPaymentModalProps) {
  const total = useStore(state => state.total);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  // Formatea el número de tarjeta en xxxx xxxx xxxx xxxx
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // solo números
    value = value.slice(0, 16); // máximo 16 dígitos
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Formato MM/AA
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // solo números
    value = value.slice(0, 4); // MMYY
    if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    setExpiry(value);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());

    // Validar campos obligatorios
    const allFilled = Object.values(values).every(val => val !== '' && val !== null);
    if (!allFilled || cardNumber.length !== 19 || !/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Por favor completa correctamente todos los campos (tarjeta y expiración).");
      return;
    }

    setShowSuccess(true);

    if (onPay) onPay();

    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative"
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
            Pago con Tarjeta
          </h2>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-base font-semibold mb-2">Nombre en la tarjeta</label>
              <input
                type="text"
                name="name"
                placeholder="Pedro Luis"
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-base font-semibold mb-2">Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
            </div>

            {/* Tarjeta */}
            <div>
              <label className="block text-base font-semibold mb-2">Número de tarjeta</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg pr-28"
                />
                <div className="absolute top-3 right-4 flex gap-3 text-2xl">
                  <FaCcVisa className="text-blue-600" />
                  <FaCcMastercard className="text-red-600" />
                  <FaCcAmex className="text-indigo-700" />
                </div>
              </div>
            </div>

            {/* Expiración y CVC */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-base font-semibold mb-2">Expiración (MM/AA)</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="08/26"
                  required
                  maxLength={5}
                  value={expiry}
                  onChange={handleExpiryChange}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-base font-semibold mb-2">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  placeholder="123"
                  required
                  maxLength={4}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
              </div>
            </div>

            {/* Provincia */}
            <div>
              <label className="block text-base font-semibold mb-2">Provincia</label>
              <select
                name="province"
                required
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              >
                <option value="">Selecciona tu provincia</option>
                <option value="Distrito Nacional">Distrito Nacional</option>
                <option value="Santo Domingo">Santo Domingo</option>
                <option value="Santiago">Santiago</option>
                <option value="La Vega">La Vega</option>
              </select>
            </div>

            {/* Total */}
            <Amount label="Total a Pagar" amount={total} />
            <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              ${total.toFixed(2)}
            </p>

            {/* Botones */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border hover:bg-gray-100 text-lg font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 text-lg font-semibold"
              >
                Pagar
              </button>
            </div>
          </form>

          {/* Recuadro de éxito */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center rounded-3xl shadow-lg p-8 text-center"
              >
                <div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">✅ Compra realizada</h3>
                  <p className="text-gray-700">Gracias por tu compra. Recargando página...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
