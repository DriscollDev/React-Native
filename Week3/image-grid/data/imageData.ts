// data/imageData.ts
export interface ImageData {
  id: number;
  url: string;
}

export const generateImageData = (count: number = 70): ImageData[] => {
  const imageData: ImageData[] = [];
  for (let i = 1; i < count + 1; i++) {
    imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
  }
  return imageData;
};

export const defaultImageData = generateImageData();
