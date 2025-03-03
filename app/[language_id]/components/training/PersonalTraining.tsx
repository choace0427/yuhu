import { Carousel } from "@mantine/carousel";
import TrainingCard from "./TrainingCard";

export default function PersonalTraining() {
  const personaltrainingcardData = [
    {
      src: "/img/manicure.png",
      title: "Manicure",
      content:
        "A beauty treatment for hands and nails that includes nail shaping, cuticle care, and often polish or nail art for aesthetic enhancement.",
    },
    {
      src: "/img/pedicure.png",
      title: "Pedicure",
      content:
        "A foot care treatment that includes nail trimming, exfoliation, and massage, leaving feet looking groomed and feeling refreshed.",
    },
    {
      src: "/img/facial-treatments.png",
      title: "Facial Treatments",
      content:
        "Skincare treatments designed to cleanse, exfoliate, and nourish the skin, improving the complexion and addressing specific skin concerns",
    },
    {
      src: "/img/aculifting.jpeg",
      title: "Aculifting",
      content:
        "Aculifting also known as the Hollywood Lifting is a natural anti-aging treatment using fine needles on the face and body acupoints to rejuvenate the skin and provide aesthetic and wellness benefits.",
    },
    {
      src: "/img/acupuncture.jpg",
      title: "Acupuncture",
      content:
        "Acupuncture involves inserting thin needles into specific points on the body to treat pain, promote wellness, and manage stress. It stimulates nerves, muscles, and connective tissue, potentially enhancing the body's natural functions.",
    },
    {
      src: "/img/botox.png",
      title: "Botox",
      content:
        "A non-surgical cosmetic procedure involving injections of botulinum toxin to relax facial muscles, reducing fine lines and wrinkles.",
    },
  ];
  return (
    <div className="w-full max-w-7xl">
      <Carousel
        withIndicators
        height={500}
        slideSize="20%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={5}
        withControls={false}
        dragFree
      >
        {personaltrainingcardData &&
          personaltrainingcardData.map((item, index) => (
            <Carousel.Slide>
              <div key={index}>
                <TrainingCard
                  src={item.src}
                  title={item.title}
                  body={item.content}
                />
              </div>
            </Carousel.Slide>
          ))}
      </Carousel>
    </div>
  );
}
