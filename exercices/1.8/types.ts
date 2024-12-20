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

export type {Films, NewFilm};
