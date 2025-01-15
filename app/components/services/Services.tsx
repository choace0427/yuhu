import { Image } from "@mantine/core";

export default function Services({ src = "", title = "", body = "" }) {
  return (
    <div className="sm:w-[420px] w-[400px] h-[580px] flex shadow-2xl justify-center items-center p-6 rounded-md">
      <div className="flex flex-col lg:gap-4 md:gap-3 gap-2 items-center justify-center">
        <div className="border rounded-2xl">
          <Image
            id="blog-2"
            src={src}
            alt="dashboard"
            width={390}
            height={320}
          />
        </div>
        <span className="text-black font-bold md:text-2xl text-xl Poppins-font">
          {title}
        </span>
        <span className="text-black Poppins-font text-center md:text-base text-sm">
          {body}
        </span>
        <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
          <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
          <span className="md:text-lg sm:text-base">ook</span>&nbsp;
          <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
          <span className="md:text-lg sm:text-base">ow</span>
        </button>
      </div>
    </div>
  );
}
