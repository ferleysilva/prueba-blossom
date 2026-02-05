export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  type?: string;
  status: string;
  gender: string;
  origin?: { name: string };
  location?: { name: string };
  episodes?: { name: string; episode: string }[];
}
