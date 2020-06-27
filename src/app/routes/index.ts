import { GET, IRoute } from "../../core/interfaces/IRoute";
import { Routes } from "../../core/Routes";
import Ping from "../../Aplication/Actions/Infraestructure/Ping";

const routes: IRoute[] = [
  //>>>>> INFRASTRUCTURE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  {
    method: GET,
    pattern: "/ping",
    action: new Ping(),
  },
];

export const RoutesManager: Routes = new Routes(routes);
