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

export interface GiftCategory {
  id: string;
  name: string;
  level: string;
}

export interface GiftItem {
  id: string;
  name: string;
  store: string;
  url: string;
  image_url: string;
  category: GiftCategory;
  reserved?: boolean;
  guest_name?: string;
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
