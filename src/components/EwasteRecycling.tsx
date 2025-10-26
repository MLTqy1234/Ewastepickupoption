"use client";

import { useState } from "react";
import { ChevronRight, Package, Recycle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface EwasteRecyclingProps {
  onSizeSelect?: (size: string | null) => void;
}

export function EwasteRecycling({ onSizeSelect }: EwasteRecyclingProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    { id: "small", label: "Small", description: "Phones, chargers, earbuds, cables", icon: "📱" },
    { id: "large", label: "Large", description: "Laptops, tablets, keyboards, monitors", icon: "💻" },
  ];

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onSizeSelect?.(size);
  };

  const handleCancel = () => {
    setSelectedSize(null);
    setIsExpanded(false);
    onSizeSelect?.(null);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Recycle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span>E-waste recycling</span>
              {selectedSize && (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              )}
            </div>
            {selectedSize ? (
              <p className="text-sm text-muted-foreground">
                {sizes.find(s => s.id === selectedSize)?.label} item selected
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Let your rider collect e-waste for recycling
              </p>
            )}
          </div>
        </div>
        <ChevronRight 
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t">
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select the size of your e-waste item
            </p>

            <RadioGroup value={selectedSize || ""} onValueChange={handleSizeChange}>
              <div className="space-y-3">
                {sizes.map((size) => (
                  <div key={size.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label 
                      htmlFor={size.id}
                      className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl">{size.icon}</span>
                      <div className="flex-1">
                        <div>{size.label}</div>
                        <p className="text-sm text-muted-foreground">{size.description}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {selectedSize && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">
                    {selectedSize === "small" 
                      ? "A rider with an e-waste collection box will pick up your item during delivery and take it to a designated recycling facility."
                      : "A driver with an e-waste collection box will pick up your item during delivery and take it to a designated recycling facility."
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Recycle className="w-4 h-4" />
                <span>Thank you for helping the environment!</span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-300">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🎁</span>
                  <div className="flex-1">
                    <p className="text-sm text-green-900">
                      <strong>Earn a discount!</strong> Once your e-waste is confirmed delivered to the recycling facility, you'll receive a discount code for your next order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSize && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => setIsExpanded(false)}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
