// define the hero interface
export interface Hero {
  id: string;
  name: string;
  alterEgo: string;
  placeOfOrigin: string;
  abilities: string;
  biography: string;
  createdAt: string;
  updatedAt: string;
}

export type HeroInput = Omit<Hero, 'id'>
