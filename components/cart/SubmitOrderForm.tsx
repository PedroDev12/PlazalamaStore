"use client"

import { useState, useEffect } from "react"
import { submitOrder } from "@/actions/submit-order-action"
import { useActionState } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"
import CreditCardPaymentModal from "./CreditCardPaymentModal"

export default function SubmitOrderForm() {
  const [open, setOpen] = useState(false)

  const total = useStore(state => state.total)
  const coupon = useStore(state => state.coupon.name)
  const contents = useStore(state => state.contents)
  const clearOrder = useStore(state => state.clearOrder)

  const order = { total, coupon, contents }

  const submitOrderWithData = submitOrder.bind(null, order)
  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: ""
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => toast.error(error))
    }
    if (state.success) {
      toast.success(state.success)
      clearOrder()
      setOpen(false) // cerrar modal cuando la orden se procese
    }
  }, [state, clearOrder])

  return (
    <div>
      {/* Botón Confirmar Compra */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase font-bold p-3"
      >
        Confirmar Compra
      </button>

      {/* Modal de pago con tarjeta */}
      {open && (
        <CreditCardPaymentModal
          onClose={() => setOpen(false)}
          onPay={dispatch} // aquí pasamos el dispatch al modal
        />
      )}
    </div>
  )
}
