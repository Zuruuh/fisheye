import { PhotographersProvider } from '../providers/PhotographersProvider';
import { HTMLElementTreeBuilder } from '../factories/HTMLElementTreeBuilder';

async function main(): Promise<void> {
  const main = document.querySelector<HTMLDivElement>('#app')!;
  const photographers = await new PhotographersProvider().all();
  const photographerGrid = new HTMLElementTreeBuilder(main).node('div', {
    class: 'photographers',
  });

  photographers.forEach((photographer) =>
    new HTMLElementTreeBuilder(photographerGrid).node(
      'div',
      { class: 'photographer' },
      {},
      (factory) => {
        factory.node(
          'a',
          {
            href: `./photographer.html?id=${photographer.id}`,
          },
          { click: (e) => /*e.preventDefault()*/ e },
          (factory) => {
            factory.node('img', {
              src: `./images/photographers/${photographer.portrait}`,
            });
            factory.textNode('h2', photographer.name);
          }
        );
        factory.baseNode('div', (factory) => {
          factory.textNode('p', photographer.country, {
            class: 'photographer-location',
          });
          factory.textNode('p', photographer.tagline, {
            class: 'photographer-tagline',
          });
          factory.textNode('p', `${photographer.price}€/jour`, {
            class: 'photographer-price',
          });
        });
      }
    )
  );
}

main().catch(console.error);

export {};
