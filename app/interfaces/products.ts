export interface productCategory {
  id: number | null;
  image: string;
  name: string;
}

export interface IBasketProduct {
  id: number;
  price: number;
  quantity: number;
}
export interface IProduct {
  id: number;
  price: number;
  title: string;
  images: string[];
  category: productCategory;
  description: string;
}
