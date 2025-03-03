import { Image } from "@mantine/core";

export default function TrainingCard({ src = "", title = "", body = "" }) {
  return (
    <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 md:w-[300px] w-[190px] md:h-[450px] h-[300px] border lg:p-4 md:p-3 p-2 rounded-lg bg-[#D9D9D9]">
      <Image
        className="massage-responsive w-[210px] h-[130px] rounded-xl bg-cover bg-center"
        id="training"
        src={src}
        alt="dashboard"
        width={210}
        height={130}
      />
      <span className="md:text-base text-sm font-semibold text-black Poppins-font">
        {title}
      </span>
      <div className="flex flex-col justify-between h-full items-center">
        <span className="md:text-sm text-xs Poppins-font text-center">
          {body}
        </span>
        <button className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
          <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
          <span className="md:text-lg sm:text-base">ook</span>&nbsp;
          <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
          <span className="md:text-lg sm:text-base">ow</span>
        </button>
      </div>
    </div>
  );
}
