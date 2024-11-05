export interface ILogos {
  url: string;
  _id: string;
}
export interface ILogoResponse {
  currentlyLogo: string;
  logos: ILogos[];
  _id: string;
  __v: number;
}
