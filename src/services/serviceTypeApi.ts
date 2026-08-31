import { clientApi } from "./clientApi";
import type { ServiceType } from "../types/serviceType";

export function getActiveServiceTypes(): Promise<ServiceType[]> {
  return clientApi<ServiceType[]>("/service-types");
}
