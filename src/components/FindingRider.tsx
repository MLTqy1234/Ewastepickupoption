"use client";

import { useEffect, useState } from "react";
import { Loader2, MapPin, Bike, Car } from "lucide-react";

interface FindingRiderProps {
  ewasteSize: string;
  onFound: () => void;
}

export function FindingRider({ ewasteSize, onFound }: FindingRiderProps) {
  const [dots, setDots] = useState("");
  const isSmall = ewasteSize === "small";
  const personType = isSmall ? "rider" : "driver";
  const Icon = isSmall ? Bike : Car;

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Auto transition to rider tracking after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onFound();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFound]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-8 space-y-6 text-center shadow-lg">
          {/* Animated Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-32 h-32 bg-green-100 rounded-full animate-ping opacity-20"></div>
            <div className="absolute w-24 h-24 bg-green-200 rounded-full animate-pulse opacity-40"></div>
            <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-green-900">
              Finding a {personType}{dots}
            </h2>
            <p className="text-muted-foreground">
              Looking for a {personType} with e-waste collection equipment
            </p>
          </div>

          {/* Loading Spinner */}
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>

          {/* Additional Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3 text-left">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-green-900 mb-1">Searching nearby</p>
                <p className="text-sm text-green-700">
                  We're matching you with a {personType} equipped with an e-waste collection box
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
