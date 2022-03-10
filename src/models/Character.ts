export interface Character {
  order?: string;
  name?: string;
  availability?: string;
  alsoAppearsIn?: string[];
  images?: {
    icon?: string | ArrayBuffer | null;
    portrait?: string | ArrayBuffer | null;
  }
  series?: {
    icon?: string | ArrayBuffer | null;
    name?: string;
  }
}
