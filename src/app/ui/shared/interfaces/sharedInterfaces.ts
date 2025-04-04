export interface OptionStructure {
  id: number;
  text: string;
}

export interface UiState {
  isNavigationMenuOpen: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  features: string[];
  technologies: string[];
  description: string;
  buyUrl: string;
  index: number;
  component: string;
}

export interface ProductsStore {
  products: Product[];
}
