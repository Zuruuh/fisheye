import { Photographer } from './Photographer';
import { Model } from './Model';
import { PhotographersProvider } from '../providers/PhotographersProvider';

export interface RawMediaInterface {
  id: number;
  photographerId: number;
  name: string;
  image: string;
  likes: number;
  price: number;
  date: string;
}

export type MediaInterface = Omit<
  RawMediaInterface,
  'date' | 'photographerId'
> & {
  photographer: Photographer;
  date: Date;
};

export class Media
  implements MediaInterface, Model<RawMediaInterface, MediaInterface>
{
  id: number;
  name: string;
  image: string;
  likes: number;
  price: number;
  date: Date;
  photographer: Photographer;

  public getMappingFactories() {
    return {
      date: (value: string) => ({ date: new Date(value) }),
      photographerId: (id: number) => ({
        photographer: new PhotographersProvider().get(id)!,
      }),
    };
  }
}
