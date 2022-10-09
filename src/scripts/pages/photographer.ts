import { URLPhotographerAdapter } from '../adapters/photographer/URLPhotographerAdapter';
import { MediaProvider } from '../providers/MediaProvider';
import { HTMLNodeBuilder } from '../composers/HTMLNodeBuilder';
import { Selectors } from '../enums/Selectors';
import { Likes } from '../components/Likes';
import { Observable } from '../utils/Observable';
import { InsertionStrategy } from '../enums/InsertionStrategies';
import { Dropdown } from '../components/Dropdown';
import { MediaSorter } from '../sorters/medias/MediaSorter';
import { MediaSortingStrategy } from '../enums/MediaSortingStrategy';
import { MediaPopularitySorter } from '../sorters/medias/MediaPopularitySorter';
import { Lightbox } from '../components/Lightbox';
import { Modal } from '../components/Modal/Modal';
import { ModalContainer } from '../components/Modal/ModalContainer';
import type { Media } from '../models/Media';
import type { Photographer } from '../models/Photographer';
import { MediaFactoryLocator } from '../factories/medias/MediaFactoryLocator';

async function main(): Promise<void> {
  const modalContainer = new ModalContainer('#modals-container');
  new Modal(Selectors.CONTACT_MODAL, ['.contact-button'], modalContainer);

  const header = document.querySelector<HTMLDivElement>(
    Selectors.PHOTOGRAPH_HEADER
  )!;
  const grid = document.querySelector<HTMLDivElement>(Selectors.MEDIA_GRID)!;

  const photographer = await URLPhotographerAdapter.getPhotographerFromUrl(
    new URL(window.location.href)
  );

  if (!photographer) {
    window.location = './index.html' as unknown as Location;
    return;
  }

  initialPageHydration(photographer);

  const medias = await new MediaProvider().getAllMediasForPhotograph(
    photographer
  );

  HTMLNodeBuilder.node(
    {
      tag: 'div',
      insertionStrategy: InsertionStrategy.APPEND,
      attributes: {
        class: 'photographer-profile-picture',
      },
      children: [
        {
          tag: 'img',
          attributes: {
            src: `./medias/photographers/${photographer.portrait}`,
            alt: photographer.name,
          },
        },
      ],
    },
    header
  );

  HTMLNodeBuilder.node(
    {
      tag: 'div',
      insertionStrategy: InsertionStrategy.PREPEND,
      attributes: {
        class: ' photographer-info',
      },
      children: [
        { tag: 'h1', text: photographer.name },
        { tag: 'h3', text: `${photographer.city}, ${photographer.country}` },
        { tag: 'span', text: photographer.tagline },
      ],
    },
    header
  );

  // Handle likes
  const likesStore = new Observable<number>(
    medias.reduce<number>((prev, curr) => prev + curr.likes, 0)
  );

  // Generate medias html elements
  renderMedias(
    new MediaPopularitySorter().sort(medias),
    photographer,
    likesStore
  ).forEach((media) => grid.appendChild(media));

  // Global likes container
  const photographerLikes = HTMLNodeBuilder.node(
    {
      tag: 'div',
      insertionStrategy: InsertionStrategy.APPEND,
      attributes: { class: 'photographer-likes' },
      children: [
        {
          tag: 'div',
          children: [
            {
              tag: 'span',
              attributes: { class: 'likes-count' },
              text: String(likesStore.current),
            },
            { tag: 'i', attributes: { class: 'fas fa-heart' } },
          ],
        },
        {
          tag: 'span',
          text: `${photographer.price}€/jour`,
        },
      ],
    },
    document.body
  );

  // Subscribe to likes count update to trigger re-render
  likesStore.subscribeForPageLifecycle(
    (likes) =>
      (photographerLikes.querySelector('span.likes-count')!.textContent =
        String(likes))
  );

  // Media sorters
  const dropdown = new Dropdown<MediaSortingStrategy>(
    document.querySelector(Selectors.MEDIA_SORTERS)!,
    {
      [MediaSortingStrategy.TRENDING]: 'Popularité',
      [MediaSortingStrategy.DATE]: 'Date',
      [MediaSortingStrategy.TITLE]: 'Titre',
    },
    MediaSortingStrategy.TRENDING,
    'media-sorter-label'
  );

  dropdown.subscribeForPageLifecycle((e: MediaSortingStrategy) => {
    const sorter = MediaSorter.getSorter(e);
    grid.textContent = '';

    const sortedMedias = new MediaSorter(medias).sort(sorter);
    renderMedias(sortedMedias, photographer, likesStore).forEach((media) =>
      grid.appendChild(media)
    );
  });
}

function renderMedias(
  medias: Media[],
  photographer: Photographer,
  likesStore: Observable<number>
): HTMLElement[] {
  const lightbox = new Lightbox(0, document.body);

  return medias.map((media: Media, index: number): HTMLElement => {
    const factory = new MediaFactoryLocator(
      media,
      `./medias/${photographer.id}`
    ).getSupportedFactory();

    const likes = media.likesStore ?? new Likes(media, likesStore);
    media.likesStore = likes;

    const mediaHTMLElement = factory.thumbnail();

    mediaHTMLElement.appendChild(likes.render());
    lightbox.add(factory.slideshow(), media.title);
    const trigger = mediaHTMLElement.querySelector<
      HTMLVideoElement | HTMLImageElement
    >('.lightbox-trigger')!;

    lightbox.addTrigger(trigger, index);

    return mediaHTMLElement;
  });
}

function initialPageHydration(photographer: Photographer): void {
  document.title = `Fisheye - ${photographer.name}`;

  const modal = document.querySelector(Selectors.CONTACT_MODAL)!;
  const modalTitle = modal.querySelector('header h2')!;
  modalTitle.innerHTML += `<br>${photographer.name}`;

  const contactButton = document.querySelector<HTMLButtonElement>(
    Selectors.CONTACT_BUTTON
  )!;
  contactButton.removeAttribute('disabled');
}

main().catch(console.error);

export {};
