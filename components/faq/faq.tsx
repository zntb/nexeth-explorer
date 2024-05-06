import { FC } from "react";

import { Accordion } from "../ui/accordion";
import { Card } from "../ui/card";

import { FaqItem, FaqItemProps } from "./faq-item";

export const FAQ: FC = () => (
  <Card className="px-4 mx-auto w-full max-w-2xl">
    <Accordion type="single" collapsible className="w-full">
      {faqContent.map((item) => (
        <FaqItem key={item.question} {...item} />
      ))}
    </Accordion>
  </Card>
);

const faqContent: FaqItemProps[] = [
  {
    question: "What is Nexeth?",
    answer:
      "Nexeth is a blockchain explorer that allows you to search and explore Ethereum data in a user-friendly way. We support multiple chains and testnets, and are always looking to expand our reach.",
  },
  {
    question: "Why beta?",
    answer:
      "We're constantly working to improve Nexeth, and we're excited to share it with you. We're calling it beta because we're still adding features and refining the experience. If you have any feedback, we'd love to hear it!",
  },
  {
    question: "Which chains does your app currently support?",
    answer:
      "We proudly support Ethereum, Optimism, Arbitrum, Polygon, and Base. We also support various testnets for these chains. We're always looking to expand our reach, so stay tuned for more!",
  },
  {
    question: "How do I search?",
    answer:
      "You can search by address, transaction hash, block number, or ENS name. Just type in the search bar and hit enter to see the results. You can bring up the search bar by clicking the magnifying glass icon in the top right corner of the page, or by pressing cmd/ctrl + k.",
  },
  {
    question: "Does your app offer any features besides search?",
    answer:
      "Currently, our focus is on providing a streamlined search experience across chains. However, we're always exploring new features that would enhance your Ethereum exploration. You can also explore onchain data, analytics and Ethereum dashboards",
  },
  {
    question: "How can I stay updated about new features or supported chains?",
    answer: "You can follow us on social media via About Us > Twitter.",
  },
];
