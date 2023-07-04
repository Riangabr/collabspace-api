function telephoneFormat(telephone: string | null): string | null {
  return telephone
    ? telephone
        .replaceAll("(", "") // (17 981805243
        .replaceAll(")", "") // 17) 981805243
        .replaceAll(" ", "") // 17 981805243
        .replaceAll("-", "") // 17- 981805243
    : null;
}

export { telephoneFormat };
