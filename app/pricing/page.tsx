import { Image } from "@mantine/core";
import FAQ from "../components/faq/FAQ";

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full lg:gap-8 md:gap-6 gap-4 justify-center items-center">
      <div className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full justify-center px-4">
        <div className="w-full flex md:flex-row flex-col items-center justify-between pt-10">
          <div className="flex flex-col lg:gap-8 md:gap-6 gap-4 max-w-[600px] md:items-start items-center md:pb-0 pb-4">
            <span className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] Poppins-font font-semibold md:text-start text-center">
              Choose the Perfect Plan for Your Needs.
            </span>
            <span className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font md:text-start text-center">
              Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis.
            </span>
            <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
              <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
              <span className="md:text-lg sm:text-base">ook</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
              <span className="md:text-lg sm:text-base">ow</span>
            </button>
          </div>
          <Image
            className="team-responsive"
            id="pricing"
            src="/img/pricing.png"
            alt="pricing"
            width={620}
            height={410}
          />
        </div>
        <FAQ />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
