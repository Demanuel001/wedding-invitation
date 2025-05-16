export interface CoupleInfo {
  partner1: string;
  partner2: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    googleMapsUrl: string;
  };
}

export interface GiftItem {
  name: string;
  price: string;
  store: string;
  url: string;
}

export interface ContactInfo {
  phone: string;
  message: string;
}

export interface WeddingData {
  couple: CoupleInfo;
  verses: string[];
  gifts: GiftItem[];
  contact: ContactInfo;
  images: string[];
  music: string;
}