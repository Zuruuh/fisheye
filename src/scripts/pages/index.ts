import { PhotographersProvider } from '../providers/PhotographersProvider';
import { HTMLNodeBuilder } from '../composers/HTMLNodeBuilder';
import { Selectors } from '../enums/Selectors';
import { InsertionStrategy } from '../enums/InsertionStrategies';

async function main(): Promise<void> {
  const main = document.querySelector<HTMLDivElement>(Selectors.MAIN)!;
  const photographers = await new PhotographersProvider().all();
  const photographerGrid = HTMLNodeBuilder.node(
    {
      tag: 'div',
      insertionStrategy: InsertionStrategy.APPEND,
      attributes: {
        class: 'photographers',
      },
    },
    main
  );

  photographers.forEach((photographer) =>
    HTMLNodeBuilder.node(
      {
        tag: 'div',
        insertionStrategy: InsertionStrategy.APPEND,
        attributes: { class: 'photographer' },
        children: [
          {
            tag: 'a',
            attributes: {
              href: `./photographer.html?id=${photographer.id}`,
            },
            eventListeners: {
              click: (e) => e,
            },
            children: [
              {
                tag: 'img',
                attributes: {
                  src: `./medias/photographers/${photographer.portrait}`,
                },
              },
              { tag: 'h2', text: photographer.name },
            ],
          },
          {
            tag: 'div',
            children: [
              {
                tag: 'p',
                text: photographer.country,
                attributes: { class: 'photographer-location' },
              },
              {
                tag: 'p',
                text: photographer.tagline,
                attributes: { class: 'photographer-tagline' },
              },
              {
                tag: 'p',
                text: `${photographer.price}€/jour`,
                attributes: { class: 'photographer-price' },
              },
            ],
          },
        ],
      },
      photographerGrid
    )
  );
}

main().catch(console.error);

export {};
