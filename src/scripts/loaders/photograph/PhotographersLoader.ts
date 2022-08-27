import { Photographer } from '../../models/Photographer';
import { LoaderInterface } from '../LoaderInterface';

export class PhotographersLoader implements LoaderInterface<Photographer> {
  async load() {
    return (await (
      await fetch('/data/photographers.json')
    ).json()) as Photographer[];
  }
}
