function telephoneFormat(telephone: string | null): string | undefined {
  return telephone
    ? telephone
        .replaceAll("(", "") // (17 981805243
        .replaceAll(")", "") // 17) 981805243
        .replaceAll(" ", "") // 17 981805243
        .replaceAll("-", "") // 17- 981805243
    : undefined;
}

export { telephoneFormat };
