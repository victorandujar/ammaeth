import { Service } from "@/app/modules/services/domain/Service";

const services: Service[] = [
  {
    id: 1,
    title: "ux/ui design",
    susbtitle: "design.subtitle",
    content: [
      { id: 1, text: "design.content.first" },
      { id: 2, text: "design.content.second" },
      { id: 3, text: "design.content.third" },
      { id: 4, text: "design.content.fourth" },
    ],
    lower_text: "design.lower_text",
  },
  {
    id: 2,
    title: "web development",
    susbtitle: "development.subtitle",
    content: [
      { id: 1, text: "development.content.first" },
      { id: 2, text: "development.content.second" },
      { id: 3, text: "development.content.third" },
      { id: 4, text: "development.content.fourth" },
    ],
    lower_text: "development.lower_text",
  },
  {
    id: 3,
    title: "web optimization",
    susbtitle: "optimization.subtitle",
    content: [
      { id: 1, text: "optimization.content.first" },
      { id: 2, text: "optimization.content.second" },
      { id: 3, text: "optimization.content.third" },
      { id: 4, text: "optimization.content.fourth" },
    ],
    lower_text: "optimization.lower_text",
  },
];

export default services;
