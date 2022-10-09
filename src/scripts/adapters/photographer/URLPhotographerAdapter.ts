import type { Photographer } from '../../models/Photographer';
import { PhotographersProvider } from '../../providers/PhotographersProvider';

export class URLPhotographerAdapter {
  public static async getPhotographerFromUrl(
    url: URL
  ): Promise<Photographer | null> {
    if (!url.searchParams.has('id')) {
      return null;
    }

    const id = url.searchParams.get('id');
    if (!Number(id)) {
      return null;
    }

    return await new PhotographersProvider().get(Number(id));
  }
}
