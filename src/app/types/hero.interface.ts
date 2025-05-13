// define the hero interface
export interface Hero {
  id: string;
  name: string;
  age: string;
  dateOfBirth: string;
  homePlanet: string;
  superPower: string;
  biography: string;
  createdAt: string;
  updatedAt: string;
}

export type HeroInput = Omit<Hero, 'id'>
