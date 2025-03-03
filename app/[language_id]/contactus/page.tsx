"use client";

import Contacts from "../components/contacts/Contacts";

export default function ContactusPage() {
  return (
    <div className="flex flex-col w-full lg:gap-8 md:gap-6 gap-4 justify-center items-center">
      <div className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full justify-center px-4 m-8">
        <Contacts />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
