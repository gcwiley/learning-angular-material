import { Injectable } from '@angular/core';

export interface HeroItem {
   id: number;
   name: string;
   overview: string;
}

const HEROES = [
   {
      id: 1,
      name: 'hero 1',
      overview: 'test',
   },
   {
      id: 2,
      name: 'hero 2',
      overview: 'test',
   },
   {
      id: 3,
      name: 'hero 3',
      overview: 'test',
   },
   {
      id: 4,
      name: 'hero 4',
      overview: 'test',
   },
   {
      id: 5,
      name: 'hero 5',
      overview: 'test',
   },
];

@Injectable({ providedIn: 'root' })
export class HeroItems {
   getAllItems(): HeroItem[] {
      return HEROES;
   }

   getItemById(id: number): HeroItem | undefined {
      return HEROES.find((i) => i.id === id);
   }
}
