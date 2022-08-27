import { PhotographersProvider } from '../providers/PhotographersProvider';

async function main(): Promise<void> {
  const photographers = await new PhotographersProvider().all();

  console.log(photographers);
}

main().catch(console.error);

export {};
