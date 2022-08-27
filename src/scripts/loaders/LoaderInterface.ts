export interface LoaderInterface<T> {
  load(): Promise<T[]>;
}
