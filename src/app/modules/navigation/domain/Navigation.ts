export interface NavigationOptionStructure {
  id: number;
  text: string;
  link: string;
}

export interface NavigationState {
  options: NavigationOptionStructure[];
}
