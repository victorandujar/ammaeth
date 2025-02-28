export interface Service {
  title: string;
  susbtitle: string;
  content: ServiceContent[];
  lower_text: string;
}

export interface ServiceContent {
  id: number;
  text: string;
}
