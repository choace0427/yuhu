"use client";

import { useState } from "react";
import CustomerBooking from "@/app/therapist/availability";

export default function BookingPage(params: any) {
  const [therapistId, setTherapistId] = useState(params.params.therapist_id);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">
              Request an Appointment
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Select your preferred date and time
            </p>
          </div>
        </div>
        <CustomerBooking therapistId={therapistId} />
      </div>
    </>
  );
}
