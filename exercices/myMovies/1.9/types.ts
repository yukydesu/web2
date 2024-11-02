interface Films {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget: number | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  
  getDescription: () => string;
}

type NewFilm = Omit<Films, 'id'>;

interface Texts {
  id : string;
  content: string;
  level: "easy" | "medium" | "hard";
}

type NewText = Omit<Texts, 'id'>;

export type {Films, NewFilm, Texts, NewText};
