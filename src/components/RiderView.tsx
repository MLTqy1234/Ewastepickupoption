"use client";

import { useState } from "react";
import { MapPin, Package, Recycle, CheckCircle2, Camera, Upload, Navigation, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ewastePhoto from "figma:asset/69704af671c419c6fb258f125045e0ce28185078.png";

type ViewStep = "order" | "upload" | "confirmed" | "navigation" | "dropoff" | "complete";

export function RiderView() {
  const [step, setStep] = useState<ViewStep>("order");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [dropoffPhoto, setDropoffPhoto] = useState<string | null>(null);

  const handleCollected = () => {
    setStep("upload");
  };

  const handleUploadPhoto = () => {
    // Simulate photo upload with the provided image
    setUploadedPhoto(ewastePhoto);
  };

  const handleConfirmUpload = () => {
    setStep("confirmed");
  };

  const handleNavigateToRecycling = () => {
    setStep("navigation");
  };

  const handleArrivedAtFacility = () => {
    setStep("dropoff");
  };

  const handleUploadDropoffPhoto = () => {
    // Use the Unsplash recycling facility image
    setDropoffPhoto("https://images.unsplash.com/photo-1577010768912-19874598a38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBmYWNpbGl0eSUyMGJpbnxlbnwxfHx8fDE3NjAxMDg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
  };

  const handleConfirmDropoff = () => {
    setStep("complete");
  };

  // Order Details
  const orderDetails = {
    orderId: "#UE-8764",
    customerName: "Alex Thompson",
    address: "123 Collins Street, Melbourne VIC 3000",
    items: [
      { name: "Crispy Chicken Burger", quantity: 1 },
      { name: "Large Fries", quantity: 2 },
      { name: "Iced Coffee", quantity: 1 },
    ],
    ewasteSize: "small",
    estimatedTime: "30-40 mins",
  };

  if (step === "complete") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-black text-white">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h2 className="text-white">Rider Dashboard</h2>
          </div>
        </div>

        {/* Complete Content */}
        <div className="max-w-2xl mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
          <div className="bg-white rounded-lg p-8 space-y-6 text-center shadow-lg max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-green-900">Mission Complete!</h2>
              <p className="text-muted-foreground">
                E-waste successfully delivered to the recycling facility. The customer will now receive their discount code. Thank you for helping the environment!
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Recycle className="w-5 h-5" />
                <span>+1 E-waste Item Recycled</span>
              </div>
              <Separator className="bg-green-300" />
              <p className="text-sm text-green-800">
                You've helped reduce electronic waste and supported sustainable practices in Melbourne.
              </p>
            </div>

            <Button 
              className="w-full bg-black hover:bg-gray-800"
              onClick={() => {
                setStep("order");
                setUploadedPhoto(null);
                setDropoffPhoto(null);
              }}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "dropoff") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-black text-white">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h2 className="text-white">Confirm Drop-off</h2>
          </div>
        </div>

        {/* Dropoff Content */}
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Camera className="w-6 h-6 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="mb-2">Final Verification Required</h3>
                <p className="text-sm text-muted-foreground">
                  Take a photo of the e-waste deposited at the recycling facility to complete the process and trigger the customer's discount reward.
                </p>
              </div>
            </div>
          </div>

          {!dropoffPhoto ? (
            <div className="bg-white rounded-lg p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h4>Upload Drop-off Photo</h4>
                  <p className="text-sm text-muted-foreground">
                    Take a photo showing the e-waste at the recycling facility
                  </p>
                </div>
                <Button 
                  className="bg-black hover:bg-gray-800"
                  onClick={handleUploadDropoffPhoto}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h4>Photo Preview</h4>
              <div className="rounded-lg overflow-hidden border">
                <ImageWithFallback 
                  src={dropoffPhoto} 
                  alt="E-waste at recycling facility" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Perfect! Ready to complete the e-waste recycling process.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setDropoffPhoto(null)}
                >
                  Retake Photo
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleConfirmDropoff}
                >
                  Confirm Drop-off
                </Button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Important:</strong> Ensure the photo clearly shows the e-waste item being deposited in the designated recycling bin at the facility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "navigation") {
    return (
      <div className="min-h-screen bg-gray-50 pb-32">
        {/* Header */}
        <div className="bg-black text-white">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h2 className="text-white">Navigate to Recycling Facility</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {/* Map Placeholder */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <div className="text-center space-y-3">
                <Navigation className="w-16 h-16 text-green-600 mx-auto animate-pulse" />
                <p className="text-sm text-muted-foreground">Map navigation active</p>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3>Melbourne E-waste Hub</h3>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm text-green-700">Open</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Facility Address</p>
                  <p>456 Recycling Way, Melbourne VIC 3000</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Arrival</p>
                  <p>8 minutes (2.3 km)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-900 mb-3">Drop-off Instructions</h4>
            <ol className="text-sm text-blue-800 space-y-2 ml-4 list-decimal">
              <li>Follow GPS directions to the recycling facility</li>
              <li>Look for designated e-waste collection bins</li>
              <li>Deposit the item in the appropriate bin</li>
              <li>Take a photo as proof of drop-off</li>
              <li>Complete the process to trigger customer reward</li>
            </ol>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="mb-3">Operating Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span>7:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday - Sunday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <Button 
              className="w-full h-12 bg-green-600 hover:bg-green-700"
              onClick={handleArrivedAtFacility}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Arrived at Facility
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-black text-white">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h2 className="text-white">Rider Dashboard</h2>
          </div>
        </div>

        {/* Success Content */}
        <div className="max-w-2xl mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
          <div className="bg-white rounded-lg p-8 space-y-6 text-center shadow-lg max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-green-900">E-waste Collection Confirmed!</h2>
              <p className="text-muted-foreground">
                Your photo has been uploaded successfully. The customer will be notified and receive their discount once you deliver the e-waste to the recycling facility.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3 text-left">
                <Recycle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-green-900 mb-1">Next step</p>
                  <p className="text-sm text-green-700">
                    Complete the food delivery, then navigate to the nearest designated recycling facility.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-black hover:bg-gray-800"
              onClick={handleNavigateToRecycling}
            >
              Navigate to Recycling Facility
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "upload") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-black text-white">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h2 className="text-white">Upload E-waste Photo</h2>
          </div>
        </div>

        {/* Upload Content */}
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Camera className="w-6 h-6 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="mb-2">Photo Evidence Required</h3>
                <p className="text-sm text-muted-foreground">
                  Take a photo of the e-waste item in your collection box to confirm pickup. This ensures transparency and helps the customer track their recycling contribution.
                </p>
              </div>
            </div>
          </div>

          {!uploadedPhoto ? (
            <div className="bg-white rounded-lg p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h4>Upload Photo</h4>
                  <p className="text-sm text-muted-foreground">
                    Take a photo showing the e-waste item in your collection box
                  </p>
                </div>
                <Button 
                  className="bg-black hover:bg-gray-800"
                  onClick={handleUploadPhoto}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h4>Photo Preview</h4>
              <div className="rounded-lg overflow-hidden border">
                <img 
                  src={uploadedPhoto} 
                  alt="E-waste in collection box" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Photo looks good! You can confirm the collection now.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setUploadedPhoto(null)}
                >
                  Retake Photo
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleConfirmUpload}
                >
                  Confirm Collection
                </Button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Make sure the e-waste item is clearly visible in the photo and properly placed in your collection box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Order view
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h2 className="text-white">Rider Dashboard</h2>
          <p className="text-sm text-gray-300 mt-1">Active delivery</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Order ID */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-xl mt-1">{orderDetails.orderId}</p>
            </div>
            <div className="bg-orange-100 px-3 py-1 rounded-full">
              <span className="text-sm text-orange-700">In Progress</span>
            </div>
          </div>
        </div>

        {/* E-waste Collection Alert */}
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-green-900 mb-2">E-waste Collection Required</h3>
              <p className="text-sm text-green-800">
                This order includes e-waste pickup. Remember to collect the customer's {orderDetails.ewasteSize} electronic item when delivering the food.
              </p>
            </div>
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 border border-green-300">
            <div className="flex items-center gap-2 text-sm text-green-900 mb-2">
              <Package className="w-4 h-4" />
              <span>Item size: {orderDetails.ewasteSize === "small" ? "Small" : "Large"}</span>
            </div>
            <p className="text-sm text-green-800">
              {orderDetails.ewasteSize === "small" 
                ? "Examples: Phones, chargers, earbuds, cables"
                : "Examples: Laptops, tablets, keyboards, monitors"
              }
            </p>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h3>Delivery Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Customer</p>
                <p className="mb-2">{orderDetails.customerName}</p>
                <p className="text-sm text-muted-foreground mb-1">Address</p>
                <p>{orderDetails.address}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Order Items</p>
                <div className="space-y-1">
                  {orderDetails.items.map((item, index) => (
                    <p key={index} className="text-sm">
                      {item.quantity}× {item.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-blue-900 mb-3">Pickup Instructions</h4>
          <ol className="text-sm text-blue-800 space-y-2 ml-4 list-decimal">
            <li>Deliver the food order to the customer</li>
            <li>Ask the customer for their e-waste item</li>
            <li>Place the item in your e-waste collection box</li>
            <li>Take a photo as proof of collection</li>
            <li>Deliver to recycling facility after your shift</li>
          </ol>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Button 
            className="w-full h-12 bg-green-600 hover:bg-green-700"
            onClick={handleCollected}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            E-waste Collected - Upload Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
