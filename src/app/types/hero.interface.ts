// ISO 8601 date/time string
export type ISODateString = string;

// define the hero interface
export interface Hero {
  id: string;
  name: string;
  alterEgo: string;
  placeOfOrigin: string;
  abilities: string;
  biography: string;
  imageUrl?: string; // optional
  createdAt: string;
  updatedAt: string;
}

export type HeroInput = Omit<Hero, 'id'>
