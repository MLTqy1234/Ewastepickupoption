"use client";

import { useState } from "react";
import { MapPin, Clock, CreditCard, ChevronRight, Users } from "lucide-react";
import { OrderSummary } from "./components/OrderSummary";
import { EwasteRecycling } from "./components/EwasteRecycling";
import { FindingRider } from "./components/FindingRider";
import { RiderTracking } from "./components/RiderTracking";
import { RiderView } from "./components/RiderView";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";

type OrderStatus = "checkout" | "searching" | "tracking";
type ViewMode = "customer" | "rider";

export default function App() {
  const [selectedEwasteSize, setSelectedEwasteSize] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("checkout");
  const [viewMode, setViewMode] = useState<ViewMode>("customer");

  const orderItems = [
    { name: "Crispy Chicken Burger", quantity: 1, price: 18.50 },
    { name: "Large Fries", quantity: 2, price: 12.00 },
    { name: "Iced Coffee", quantity: 1, price: 6.50 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 3.99;
  const serviceFee = 1.50;

  const handlePlaceOrder = () => {
    if (selectedEwasteSize) {
      setOrderStatus("searching");
    }
  };

  const handleRiderFound = () => {
    setOrderStatus("tracking");
  };

  // Show rider view if in rider mode
  if (viewMode === "rider") {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("customer")}
            className="bg-white shadow-lg"
          >
            Switch to Customer View
          </Button>
        </div>
        <RiderView />
      </div>
    );
  }

  // Show searching screen
  if (orderStatus === "searching" && selectedEwasteSize) {
    return <FindingRider ewasteSize={selectedEwasteSize} onFound={handleRiderFound} />;
  }

  // Show rider tracking if rider is found
  if (orderStatus === "tracking" && selectedEwasteSize) {
    return <RiderTracking ewasteSize={selectedEwasteSize} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* View Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode("rider")}
          className="bg-white shadow-lg"
        >
          <Users className="w-4 h-4 mr-2" />
          Switch to Rider View
        </Button>
      </div>

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h2>Checkout</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-32">
        {/* Delivery Info */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span>Delivery address</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                123 Collins Street, Melbourne VIC 3000
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span>Estimated delivery time</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Today, 30-40 mins
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <OrderSummary
          items={orderItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          serviceFee={serviceFee}
        />

        {/* Promo Code Section */}
        <div className="bg-white rounded-lg p-4">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🎫</span>
              </div>
              <span>Promo code</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* E-waste Recycling */}
        <EwasteRecycling onSizeSelect={setSelectedEwasteSize} />

        {/* Payment Method */}
        <div className="bg-white rounded-lg p-4">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div>Payment method</div>
                <p className="text-sm text-muted-foreground">Visa ****1234</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Total</span>
            <span className="text-2xl">${(subtotal + deliveryFee + serviceFee).toFixed(2)}</span>
          </div>
          <Button 
            className="w-full h-12 bg-black hover:bg-gray-800"
            onClick={handlePlaceOrder}
          >
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
}
