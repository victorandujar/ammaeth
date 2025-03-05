import { NavigationOptionStructure } from "@/app/modules/navigation/domain/Navigation";
import routes from "./routes";

const navigationOptions: NavigationOptionStructure[] = [
  {
    id: 1,
    text: "soul",
    link: routes.soul,
  },
  { id: 2, text: "essence", link: "" },
  { id: 3, text: "manifestation", link: "" },
];

export default navigationOptions;
