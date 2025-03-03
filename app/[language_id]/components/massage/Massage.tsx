import { Carousel } from "@mantine/carousel";
import MassageCard from "./MassageCard";

export default function Massage() {
  const massagecardData = [
    {
      src: "/img/Kobido.png",
      title: "Kobido",
      content:
        "An ancient Japanese facial massage known for its anti-aging effects, Kobido focuses on improving skin elasticity, reducing wrinkles, and promoting a youthful appearance by stimulating facial muscles and circulation.",
    },
    {
      src: "/img/swedish-massage.png",
      title: "Swedish Massage",
      content:
        "An ancient Japanese facial massage known for its anti-aging effects, Kobido focuses on improving skin elasticity, reducing wrinkles, and promoting a youthful appearance by stimulating facial muscles and circulation.",
    },
    {
      src: "/img/deep-tissue-massage.png",
      title: "Deep Tissue Massage",
      content:
        "This massage technique targets the deeper layers of muscles and connective tissues. It's especially helpful for people with chronic pain or muscle tension.",
    },
    {
      src: "/img/thai-massage.png",
      title: "Thai Massage",
      content:
        "Combining acupressure, Indian Ayurvedic principles, and assisted yoga postures, Thai massage stretches and releases tension throughout the body, enhancing flexibility and energy flow",
    },
    {
      src: "/img/aromatherapy-massage.png",
      title: "Aromatherapy Massage",
      content:
        "Combining acupressure, Indian Ayurvedic principles, and assisted yoga postures, Thai massage stretches and releases tension throughout the body, enhancing flexibility and energy flow",
    },
    {
      src: "/img/deep-tissue-massage.png",
      title: "Deep Tissue Massage",
      content:
        "This massage technique targets the deeper layers of muscles and connective tissues. It's especially helpful for people with chronic pain or muscle tension.",
    },
    {
      src: "/img/thai-massage.png",
      title: "Thai Massage",
      content:
        "Combining acupressure, Indian Ayurvedic principles, and assisted yoga postures, Thai massage stretches and releases tension throughout the body, enhancing flexibility and energy flow",
    },
    {
      src: "/img/aromatherapy-massage.png",
      title: "Aromatherapy Massage",
      content:
        "Combining acupressure, Indian Ayurvedic principles, and assisted yoga postures, Thai massage stretches and releases tension throughout the body, enhancing flexibility and energy flow",
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
      >
        {massagecardData &&
          massagecardData.map((item, index) => (
            <Carousel.Slide>
              <div key={index}>
                <MassageCard
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
