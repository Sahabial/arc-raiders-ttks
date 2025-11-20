export interface Shield {
  name: string;
  charge: number;
  damageMitigation: number;
  movementPenalty: number;
}

export const shields: Shield[] = [
  {
    name: 'Light Shield',
    charge: 40,
    damageMitigation: 0.4,
    movementPenalty: 0,
  },
  {
    name: 'Medium Shield',
    charge: 70,
    damageMitigation: 0.425,
    movementPenalty: 0.05,
  },
  {
    name: 'Heavy Shield',
    charge: 80,
    damageMitigation: 0.525,
    movementPenalty: 0.15,
  },
];
