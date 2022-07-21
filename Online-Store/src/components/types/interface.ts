export interface IProducts {
  img: string;
  id: string;
  name: string;
  price: number;
  amount: number;
  year: number;
  manufacturer: string;
  color: [string, string];
  numberOfCameras: number;
  popular: [string, boolean];
  btn: string;
}
export default IProducts;
