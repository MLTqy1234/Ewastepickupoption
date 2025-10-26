"use client";

import { MapPin, Package, Recycle, User, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface RiderTrackingProps {
  ewasteSize: string;
}

export function RiderTracking({ ewasteSize }: RiderTrackingProps) {
  const isSmall = ewasteSize === "small";
  const personType = isSmall ? "Rider" : "Driver";
  const personName = isSmall ? "James Wilson" : "Sarah Chen";
  const vehicleInfo = isSmall ? "Honda CB500X" : "Toyota Corolla";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h2>Order Confirmed</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your order is being prepared
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Order Status */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3>Estimated arrival</h3>
            <span className="text-2xl">30-40 mins</span>
          </div>
          <Progress value={30} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Order confirmed</span>
            <span>Preparing</span>
            <span>On the way</span>
          </div>
        </div>

        {/* E-waste Collection Notice */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-green-900 mb-2">E-waste Collection Included</h3>
              <p className="text-sm text-green-800">
                Your {personType.toLowerCase()} is equipped with an e-waste collection box and will pick up your {ewasteSize} electronic item during delivery.
              </p>
            </div>
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 border border-green-300">
            <div className="flex items-center gap-2 text-sm text-green-900 mb-2">
              <Package className="w-4 h-4" />
              <span>What to prepare:</span>
            </div>
            <ul className="text-sm text-green-800 space-y-1 ml-6 list-disc">
              <li>Have your e-waste item ready at the door</li>
              <li>Remove any personal data from devices</li>
              <li>The {personType.toLowerCase()} will collect it when delivering your order</li>
            </ul>
          </div>
        </div>

        {/* Rider/Driver Info */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h3>Your {personType}</h3>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">{personName}</p>
                  <p className="text-sm text-muted-foreground">{vehicleInfo}</p>
                </div>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm mb-1">Equipped with e-waste collection box</p>
                <p className="text-sm text-muted-foreground">
                  Your items will be safely transported to a certified recycling facility
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="mb-1">Delivery to</p>
              <p className="text-sm text-muted-foreground">
                123 Collins Street, Melbourne VIC 3000
              </p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-600">
            <Recycle className="w-5 h-5" />
            <h3>Thank you for recycling!</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            By choosing e-waste recycling, you're helping reduce electronic waste in landfills and supporting sustainable practices in our community.
          </p>
          
          {/* Reward Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎁</span>
              <div className="flex-1">
                <h4 className="text-green-900 mb-2">Earn a discount on your next order</h4>
                <p className="text-sm text-green-800">
                  Once your e-waste item is confirmed delivered to the recycling facility, we'll send you a discount code to use on your next Uber Eats order. Look out for a notification in the app!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
