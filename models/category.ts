export interface ICategory {
  name: string,
  color: string,
  icon: string,
}

export const DefaultCategory : ICategory = {
  name: 'Annat',
  color: 'gray',
  icon: 'img/categoryicons/other.png'
}

export const EntryCategorys : ICategory[] = [
  {
    name: 'Champagne',
    color: 'yellow',
    icon: 'img/categoryicons/champagne.png'
  },
  {
    name: 'Vitt vin',
    color: 'beige',
    icon: 'img/categoryicons/white-wine.png'
  },
  {
    name: 'Rött vin',
    color: 'red',
    icon: 'img/categoryicons/red-wine.png'
  },
  {
    name: 'Rosévin',
    color: 'pink',
    icon: 'img/categoryicons/rose-wine.png'
  },
  {
    name: 'Whiskey',
    color: 'orange',
    icon: 'img/categoryicons/whiskey.png'
  },
  {
    name: 'Öl',
    color: 'orange',
    icon: 'img/categoryicons/beer.png'
  },
  DefaultCategory
]