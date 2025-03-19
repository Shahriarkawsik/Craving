interface MyJsonType {
  key: string;
  value: number;
}

declare module "*.json" {
  const value: MyJsonType;
  export default value;
}