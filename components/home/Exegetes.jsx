import { getExegetes } from "../../lib/exegetes";
import ExegetesSwiper from "./ExegetesSwiper";

export default function Exegetes() {

  const exegetes = getExegetes();

  return <ExegetesSwiper exegetes={exegetes} />;
}