import { Image } from "@mantine/core";
import { IconLocation } from "@tabler/icons-react";

export default function TeamCard() {
  return (
    <div className="md:w-[450px] w-[350px] md:h-[500px] h-[380px] bg-[url('/img/team-card.png')] bg-cover rounded-md border border-[#46A7B0]">
      <div className="flex flex-col w-full justify-between h-full">
        <div className="flex-grow"></div>
        <div className="w-full bg-gradient-to-t from-black to-black/20 p-2">
          <div className="flex flex-col gap-1">
            <div className="w-full flex flex-row justify-between">
              <span className="Poppins-font text-white">Dr. Mishal Mehak</span>
              <div className="flex flex-row items-center justify-center">
                <span className="Poppins-font text-white">5(</span>
                <Image
                  className="text-white w-4 h-4"
                  id="Vector"
                  src="/img/Vector.png"
                  alt="team"
                  width={16}
                  height={16}
                />
                <span className="Poppins-font text-white">)</span>
              </div>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <IconLocation className="h-4 w-4 text-white" />
              <span className="text-white Poppins-font text-sm">
                United Kingdom
              </span>
            </div>
            <div className="flex flex-row items-center w-full justify-between">
              <span className="text-white text-base font-semibold Poppins-font">
                Massage therapist
              </span>
              <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  B
                </span>
                <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  N
                </span>
                <span className="md:text-lg sm:text-base">ow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
