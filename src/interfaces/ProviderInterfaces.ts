export interface IProviderFiltered {
  id:                     number,
  full_name:              boolean,
  business:               IBusinessFiltered[],
}

export interface IBusinessFiltered {
  id:                     number,
  name:                   string,
  category:               string,
  description:            string,
  rating:                 number,
}