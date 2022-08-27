export interface Model<
  RawDataInterface extends Record<PropertyKey, any> = any,
  DataInterface extends Record<PropertyKey, any> = any
> {
  id: number;
  getMappingFactories(): {
    [T in keyof RawDataInterface | string]?: (
      value: T extends keyof RawDataInterface ? RawDataInterface[T] : never
    ) => {
      [K in keyof DataInterface]?: DataInterface[K] | Promise<DataInterface[K]>;
    };
  };
}
