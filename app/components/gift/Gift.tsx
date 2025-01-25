import { Carousel } from "@mantine/carousel";
import GiftCard from "./GiftCard";

export default function Gift() {
  const giftcardData = [
    {
      src: "/img/gitcard1.png",
      title: "90% Caseback",
      content: "On 50+ Gift Cards",
    },
    {
      src: "/img/gitcard2.png",
      title: "90% Caseback",
      content: "On 50+ Gift Cards",
    },
    {
      src: "/img/gitcard1.png",
      title: "90% Caseback",
      content: "On 50+ Gift Cards",
    },
    {
      src: "/img/gitcard2.png",
      title: "90% Caseback",
      content: "On 50+ Gift Cards",
    },
    {
      src: "/img/gitcard1.png",
      title: "90% Caseback",
      content: "On 50+ Gift Cards",
    },
    {
      src: "/img/gitcard2.png",
      title: "90% Caseback",
      content: "On 50+ Gift Cards",
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
        dragFree
        align="start"
        slidesToScroll={5}
        withControls={false}
      >
        {giftcardData &&
          giftcardData.map((item, index) => (
            <Carousel.Slide>
              <div key={index}>
                <GiftCard
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
