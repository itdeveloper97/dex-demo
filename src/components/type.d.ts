export interface PropertyInterface {
  name: string;
  type: string;
  label: string;
  value: string;
  id: string;
}

export interface PropertiesInterface {
  property: PropertyInterface
  value: string | Array<{
    name: string
    value: string
    label: string
  }>
}

export interface ProductInterface {
  name: string
  price: number
  image: string
  date_of_change: string
  description: string
  properties: PropertiesInterface[]
  id: string
}