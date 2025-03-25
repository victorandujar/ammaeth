import { NavigationOptionStructure } from "@/app/modules/navigation/domain/Navigation";
import routes from "./routes";

const navigationOptions: NavigationOptionStructure[] = [
  {
    id: 1,
    text: "dive in",
    link: routes.soul,
  },
];

export default navigationOptions;
