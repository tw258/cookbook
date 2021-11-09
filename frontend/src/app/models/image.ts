export interface Image {
  _id: string;
  dataAsBase64: string;
  isThumbnail?: boolean;
  sizeInBytes: number;
}
