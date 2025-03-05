export interface Service {
  id: number;
  title: string;
  susbtitle: string;
  content: ServiceContent[];
  lower_text: string;
}

export interface ServiceContent {
  id: number;
  text: string;
}

export interface ServiceSlice {
  services: Service[];
}
