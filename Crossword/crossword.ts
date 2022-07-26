export type CrosswordWord = {
  id: number;
  word: string;
  clue: string;
};
export type CrosswordClues = {
  across: CrosswordWord[];
  down: CrosswordWord[];
};
export type CrosswordTile = {
  marker?: number;
  letter: string;
} | null;

export const crosswordClues: CrosswordClues = {
  across: [
    {id: 1, word: 'HEAT', clue: 'It is the opposite of cold.'},
    {
      id: 2,
      word: 'BORED',
      clue: 'You feel this when there is nothing else to do.',
    },
  ],
  down: [
    {id: 1, word: 'HOBBY', clue: 'Doing something you like.'},
    {id: 3, word: 'ACRE', clue: 'It is larger than a kilometer.'},
    {id: 4, word: 'DIE', clue: 'Roll to get numbers (Singular)'},
  ],
};

export const crossword: CrosswordTile[][] = [
  [
    {
      marker: 1,
      letter: 'H',
    },
    {
      letter: 'E',
    },
    {
      marker: 3,
      letter: 'A',
    },
    {
      letter: 'T',
    },
    null,
  ],
  [
    {
      letter: 'O',
    },
    null,
    {
      letter: 'C',
    },
    null,
    null,
  ],
  [
    {
      marker: 2,
      letter: 'B',
    },
    {
      letter: 'O',
    },
    {
      letter: 'R',
    },
    {
      letter: 'E',
    },
    {
      marker: 4,
      letter: 'D',
    },
  ],
  [
    {
      letter: 'B',
    },
    null,
    {
      letter: 'E',
    },
    null,
    {
      letter: 'I',
    },
  ],
  [
    {
      letter: 'Y',
    },
    null,
    null,
    null,
    {
      letter: 'E',
    },
  ],
];
