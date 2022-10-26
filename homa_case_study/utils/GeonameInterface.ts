export interface Geoname {
  continent: string;
  capital: string;
  languages: string;
  geonameId: number;
  south: number;
  isoAlpha3: string;
  north: number;
  fipsCode: string;
  population: number;
  east: number;
  isoNumeric: string;
  areaInSqKm: number;
  countryCode: string;
  west: number;
  countryName: string;
  postalCodeFormat: string;
  continentName: string;
  currencyCode: string;
}

export interface GeonamesRootObject {
  geonames: Array<Geoname>;
}

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};
