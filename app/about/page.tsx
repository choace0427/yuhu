import { Image } from "@mantine/core";
import TeamMember from "../components/team/TeamMembers";

export default function AboutPage() {
  return (
    <div className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full px-4 mx-auto">
      <div className="w-full flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between lg:pt-10 md:pt-8 pt-6">
        <div className="flex flex-col lg:gap-4 md:gap-2 gap-1 max-w-[600px] md:items-start items-center">
          <span className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] Poppins-font font-semibold">
            About Us
          </span>
          <span className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font md:text-start text-center">
            At Yuhu Wellness, we believe in bringing wellness and fitness
            directly to you. As a leading provider of mobile massage and
            personal training services, we deliver tailored experiences across
            Mallorca, Ibiza, the Balearic Islands, Rome, Milan, and Italy. With
            a team of certified professionals, we ensure personalized care in
            the comfort of your home, office, or event.
          </span>
        </div>
        <Image
          className="about-responsive"
          id="aboutus"
          src="/img/aboutus1.png"
          alt="aboutus"
          width={550}
          height={460}
        />
      </div>
      <div className="w-full flex md:gap-0 gap-2 md:flex-row flex-col items-center justify-between">
        <Image
          className="about-responsive"
          id="aboutus"
          src="/img/aboutus2.png"
          alt="aboutus"
          width={450}
          height={350}
        />
        <div className="flex flex-col lg:gap-4 md:gap-2 gap-1 max-w-[600px] md:items-start items-center">
          <span className="lg:text-3xl md:text-2xl text-xl text-[#46A7B0] Poppins-font font-semibold">
            Our Mission
          </span>
          <span className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font">
            Our mission is to make wellness accessible, convenient, and
            personalized. By combining expert care, flexibility, and on-demand
            services, we empower individuals to prioritize their health and
            well-being. Whether you seek relaxation, recovery, or fitness
            improvement, Yuhu Wellness is here to help.
          </span>
        </div>
      </div>
      <div className="w-full flex md:flex-row md:gap-0 gap-2 flex-col items-center justify-between">
        <div className="flex flex-col lg:gap-4 md:gap-2 gap-1 max-w-[600px] md:items-start items-center">
          <span className="lg:text-3xl md:text-2xl text-xl text-[#46A7B0] Poppins-font font-semibold">
            Our Vision
          </span>
          <span className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font">
            We envision a world where wellness is a lifestyle, not a luxury. At
            Yuhu Wellness, we strive to revolutionize the way people approach
            self-care by creating seamless, accessible, and stress-free
            experiences across Spain and Italy.
          </span>
        </div>
        <Image
          className="about-responsive"
          id="aboutus"
          src="/img/aboutus3.png"
          alt="aboutus"
          width={450}
          height={350}
        />
      </div>
      <div className="w-full flex flex-col lg:gap-10 md:gap-8 sm:gap-6 gap-4 items-center justify-center">
        <span className="text-[#46A7B0] lg:text-5xl md:text-4xl text-3xl font-bold Poppins-font">
          What We Do?
        </span>
        <div className="flex md:flex-row flex-col md:gap-0 gap-4 w-full justify-between">
          <div className="flex flex-col lg:gap-4 md:gap-3 gap-2 items-center justify-start">
            <Image
              id="facial-massage"
              src="/img/facial-massage.png"
              alt="massage"
              w={30}
              h={30}
            />
            <span className="md:text-base text-sm font-bold text-black Poppins-font">
              We offer
            </span>
            <div className="flex flex-col">
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[300px] text-center">
                Massages: therapeutic, relaxing, and sports.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Beauty treatments.(Facials, Manicure,pedicure,etc)
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[300px] text-center">
                Personal training programs customized to your goals.
              </span>
            </div>
          </div>
          <div className="border border-black opacity-50"></div>
          <div className="flex flex-col lg:gap-4 md:gap-3 gap-2 items-center justify-start">
            <Image
              id="personal-training.png"
              src="/img/personal-training.png"
              alt="personal-training"
              w={30}
              h={30}
            />
            <span className="md:text-base text-sm font-bold text-black Poppins-font">
              How It Works
            </span>
            <div className="flex flex-col">
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Simply select what you need, your favorite therapist (upon
                availability) along with the time and place.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Make your payment and We will deliver the service directly to
                you.
              </span>
            </div>
          </div>
          <div className="border border-[#191D23] opacity-50"></div>
          <div className="flex flex-col lg:gap-4 md:gap-3 gap-2 items-center justify-start">
            <Image
              id="beauty-treatment"
              src="/img/facial-massage.png"
              alt="beauty-treatment"
              w={30}
              h={30}
            />
            <span className="md:text-base text-sm font-bold text-black Poppins-font">
              Who and Where We Serve
            </span>
            <div className="flex flex-col">
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                We cater to:
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Private clients.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Corporate events.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Retreats and more.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Locations include:
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Mallorca, Ibiza,Spain Rome, Milan, and across Italy
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font max-w-[350px] text-center">
                Wherever you are, we bring wellness to you.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:gap-8 md:gap-6 gap-4 items-center lg:pb-24 md:pb-20 sm:pb-16 pb-12">
        <span className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] font-bold Poppins-font">
          Meet our team
        </span>
        <span className="md:text-base text-sm text-black text-center Poppins-font">
          Lorem ipsum dolor sit amet consectetur. Magna risus et in tempor nulla
          condimentum in ac. Sapien nisl nisl ac lobortis mauris. Vitae
        </span>
        <TeamMember />
      </div>
    </div>
  );
}
