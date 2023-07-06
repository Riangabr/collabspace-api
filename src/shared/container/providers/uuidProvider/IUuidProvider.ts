interface IUuidProvider {
  createUUID(): string;
  validateUUID(uuid: string): boolean;
}

export { IUuidProvider };
/* Esses são os parametros da implementação */
