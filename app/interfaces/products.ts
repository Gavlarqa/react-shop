export interface productCategory {
  id: number | null;
  image: string;
  name: string;
}

export interface product {
  id: number;
  price: number;
  title: string;
  images: string[];
  category: productCategory;
}
