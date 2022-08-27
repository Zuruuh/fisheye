import { Media } from '../../models/Media';
import { LoaderInterface } from '../LoaderInterface';

export class MediasLoader implements LoaderInterface<Media> {
  async load() {
    return (await (await fetch('/data/medias.json')).json()) as Media[];
  }
}
