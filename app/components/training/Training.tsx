import { Carousel } from "@mantine/carousel";
import TrainingCard from "./TrainingCard";

export default function Training() {
  const trainingcardData = [
    {
      src: "/img/p-training.png",
      title: "Personal Training",
      content:
        "One-on-one training sessions tailored to individual fitness goals such as weight loss, muscle building, or general health improvement. The trainer customizes workouts based on the client's needs and fitness level.",
    },
    {
      src: "/img/partner-training.png",
      title: "Couples/Partner Training",
      content:
        "Designed for pairs (couples, friends, or family members) who want to work out together. This type of training builds teamwork and motivation while allowing each person to pursue individual goals with shared guidance.",
    },
    {
      src: "/img/yoga-training.png",
      title: "Yoga Training",
      content:
        "Focuses on improving flexibility, strength, and mindfulness through various yoga styles like Hatha, Vinyasa, or Power Yoga. Suitable for individuals seeking a holistic approach to fitness and stress relief.",
    },
    {
      src: "/img/online-training.png",
      title: "Online Training",
      content:
        "Offers flexibility by providing personalized workout plans and guidance through virtual platforms. Ideal for clients who prefer remote sessions, need convenience, or cannot attend in-person training regularly.",
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
        {trainingcardData &&
          trainingcardData.map((item, index) => (
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
