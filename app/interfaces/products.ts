export interface productCategory {
  id: number
  image: string
  name: string
}

export interface product {
  id: number
  price: number
  title: string
  images: [string]
  category: productCategory
}
