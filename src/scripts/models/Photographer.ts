import { Media } from './Media';
import { Model } from './Model';
import { MediaProvider } from '../providers/MediaProvider';

export interface RawPhotographerInterface {
  name: string;
  id: number;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;
}

export type PhotographerInterface = RawPhotographerInterface & {
  medias: Media[];
};

export class Photographer
  implements
    PhotographerInterface,
    Model<RawPhotographerInterface, PhotographerInterface>
{
  id: number;
  city: string;
  country: string;
  medias: Media[];
  name: string;
  portrait: string;
  price: number;
  tagline: string;

  public getMappingFactories() {
    return {
      medias: () => ({
        medias: new MediaProvider().getAllMediasForPhotograph(this),
      }),
    };
  }
}
