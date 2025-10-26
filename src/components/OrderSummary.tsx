"use client";

import { Separator } from "./ui/separator";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
}

export function OrderSummary({ items, subtotal, deliveryFee, serviceFee }: OrderSummaryProps) {
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <h3>Order summary</h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="text-muted-foreground">{item.quantity}×</span>
              <span>{item.name}</span>
            </div>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
