interface IAddress {
  id: string;
  user_id: string;
  cep: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  street: string | null;
}

interface ICreateAddress {
  id: string;
  userId: string;
  cep?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
}

interface IRequestCreateAddress {
  cep?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
}

interface IUpdateAddress {
  id: string;
  cep?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
}

interface IRequestUpdateAddress {
  cep?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
}

export {
  IAddress,
  ICreateAddress,
  IRequestCreateAddress,
  IUpdateAddress,
  IRequestUpdateAddress,
};
