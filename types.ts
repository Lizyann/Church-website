export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  imageUrl: string;
  description: string;
  videoUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Page {
  HOME = 'HOME',
  SERMONS = 'SERMONS',
  SERMON_DETAIL = 'SERMON_DETAIL',
  EVENTS = 'EVENTS',
  GIVING = 'GIVING',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}