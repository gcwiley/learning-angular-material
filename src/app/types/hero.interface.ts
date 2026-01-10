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
  imageUrl?: string; // optional field
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// payload to create an hero
// excludes server-generated fields like id, createdAt, updatedAt
export type HeroInput = Omit<Hero, 'id' | 'createdAt' | 'updatedAt'>

// ---- HELPER INTERFACES FOR UI LIST ---


