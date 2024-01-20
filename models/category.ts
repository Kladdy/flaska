export interface ICategory {
  name: string,
  color: string,
  icon: string,
}

export const DefaultCategory : ICategory = {
  name: 'Annat',
  color: 'gray',
  icon: '/img/categoryicons/other.png'
}

// Icons from https://www.behance.net/gallery/68779607/Alcohol-drinks-icons
export const EntryCategorys : ICategory[] = [
  {
    name: 'Vitt vin',
    color: 'beige',
    icon: '/img/categoryicons/white-wine.png'
  },
  {
    name: 'Rött vin',
    color: 'red',
    icon: '/img/categoryicons/red-wine.png'
  },
  {
    name: 'Champagne',
    color: 'yellow',
    icon: '/img/categoryicons/champagne.png'
  },
  {
    name: 'Vermouth',
    color: 'blue',
    icon: '/img/categoryicons/vermouth.png'
  },
  {
    name: 'Rom',
    color: 'orange',
    icon: '/img/categoryicons/rum.png'
  },
  {
    name: 'Whiskey',
    color: 'orange',
    icon: '/img/categoryicons/whiskey.png'
  },
  {
    name: 'Tequila',
    color: 'gray',
    icon: '/img/categoryicons/tequila.png'
  },
  {
    name: 'Cognac',
    color: 'orange',
    icon: '/img/categoryicons/cognac.png'
  },
  {
    name: 'Vodka',
    color: 'gray',
    icon: '/img/categoryicons/vodka.png'
  },
  {
    name: 'Gin',
    color: 'green',
    icon: '/img/categoryicons/gin.png'
  },
  {
    name: 'Likör',
    color: 'orange',
    icon: '/img/categoryicons/liqueur.png'
  },
  {
    name: 'Öl',
    color: 'orange',
    icon: '/img/categoryicons/beer.png'
  },
  DefaultCategory
]