import { financeServices } from "./finance";
import { membershipServices } from "./memberships";
import { softwareServices } from "./software";
import { streamingServices } from "./streaming";
import { telecomServices } from "./telecom";
import { insuranceServices } from "./insurance";
import { gamingServices } from "./gaming";
import { educationServices } from "./education";
import { cryptoServices } from "./crypto";
import { musicServices } from "./music";
import { cloudServices } from "./cloud";
import { vpnAntivirusServices } from "./vpnantivirus";
import { fitnessServices } from "./fitness";
import { foodServices } from "./food";
import { newsServices } from "./news";

export interface Service {
  slug: string;
  name: string;
  category: string;
}

export const services: Service[] = [
  ...financeServices,
  ...membershipServices,
  ...softwareServices,
  ...streamingServices,
  ...telecomServices,
  ...insuranceServices,
  ...gamingServices,
  ...educationServices,
  ...cryptoServices,
  ...musicServices,
  ...cloudServices,
  ...vpnAntivirusServices,
  ...fitnessServices,
  ...foodServices,
  ...newsServices,
];