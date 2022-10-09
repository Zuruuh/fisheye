import { Likes } from '../components/Likes';

interface BaseMedia {
  id: number;
  photographerId: number;
  title: string;
  likes: number;
  price: number;
  date: string;
  likesStore?: Likes;
}

export type VideoMedia = BaseMedia & { video: string };
export type ImageMedia = BaseMedia & { image: string };

export type Media = VideoMedia | ImageMedia;
