import { Image } from "@mantine/core";

export default function GiftCard({ src = "", title = "", body = "" }) {
  return (
    <div className="flex flex-col lg:gap-4 md:gap-2 gap-1 md:w-[350px] w-[260px] md:h-[310px] h-[260px] border p-4 rounded-lg bg-[#D9D9D9] items-center">
      <Image id="massage" src={src} alt="dashboard" width={310} height={220} />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full lg:px-4 md:px-2 px-1 justify-between items-center">
          {/* <span className="lg:text-xl md:text-base text-sm font-semibold text-black Poppins-font">
            {title}
          </span> */}
          <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
            <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
            <span className="md:text-lg sm:text-base">uy</span>&nbsp;
            <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
            <span className="md:text-lg sm:text-base">ow</span>
          </button>
        </div>
        {/* <span className="lg:text-base md:text-sm text-xs text-black Poppins-font lg:px-4 md:px-2 px-1">
          {body}
        </span> */}
      </div>
    </div>
  );
}
