export interface WeaponUpgrade {
  level: number;
  damage: number;
  magazineSize: number;
  headshotMultiplier: number;
}

export interface Weapon {
  name: string;
  upgrades: WeaponUpgrade[];
}

const HEADSHOT_MULTIPLIER = 2.5;

export const weapons: Weapon[] = [
  {
    name: 'Anvil',
    upgrades: [
      {
        level: 1,
        damage: 40,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 40,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 40,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 40,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Arpeggio',
    upgrades: [
      {
        level: 1,
        damage: 9.5,
        magazineSize: 24,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 9.5,
        magazineSize: 24,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 9.5,
        magazineSize: 24,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 9.5,
        magazineSize: 24,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Bettina',
    upgrades: [
      {
        level: 1,
        damage: 14,
        magazineSize: 25,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 14,
        magazineSize: 30,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 14,
        magazineSize: 35,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 14,
        magazineSize: 40,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Bobcat',
    upgrades: [
      {
        level: 1,
        damage: 6,
        magazineSize: 30,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 6,
        magazineSize: 35,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 6,
        magazineSize: 40,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 6,
        magazineSize: 45,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Burletta',
    upgrades: [
      {
        level: 1,
        damage: 10,
        magazineSize: 12,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 10,
        magazineSize: 14,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 10,
        magazineSize: 16,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 10,
        magazineSize: 18,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Ferro',
    upgrades: [
      {
        level: 1,
        damage: 40,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 40,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 40,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 40,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Hairpin',
    upgrades: [
      {
        level: 1,
        damage: 20,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 20,
        magazineSize: 7,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 20,
        magazineSize: 8,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 20,
        magazineSize: 9,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Hullcracker',
    upgrades: [
      {
        level: 1,
        damage: 100,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 100,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 100,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 100,
        magazineSize: 1,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Il Toro',
    upgrades: [
      {
        level: 1,
        damage: 67.5,
        magazineSize: 5,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 67.5,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 67.5,
        magazineSize: 7,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 67.5,
        magazineSize: 8,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Jupiter',
    upgrades: [
      {
        level: 1,
        damage: 55,
        magazineSize: 5,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 55,
        magazineSize: 5,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 55,
        magazineSize: 5,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 55,
        magazineSize: 5,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Kettle',
    upgrades: [
      {
        level: 1,
        damage: 10,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 10,
        magazineSize: 14,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 10,
        magazineSize: 18,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 10,
        magazineSize: 22,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Osprey',
    upgrades: [
      {
        level: 1,
        damage: 45,
        magazineSize: 8,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 45,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 45,
        magazineSize: 12,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 45,
        magazineSize: 14,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Rattler',
    upgrades: [
      {
        level: 1,
        damage: 9,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 9,
        magazineSize: 14,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 9,
        magazineSize: 18,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 9,
        magazineSize: 22,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Renegade',
    upgrades: [
      {
        level: 1,
        damage: 35,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 35,
        magazineSize: 8,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 35,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 35,
        magazineSize: 12,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Stitcher',
    upgrades: [
      {
        level: 1,
        damage: 7,
        magazineSize: 20,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 7,
        magazineSize: 20,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 7,
        magazineSize: 20,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 7,
        magazineSize: 20,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Tempest',
    upgrades: [
      {
        level: 1,
        damage: 10,
        magazineSize: 30,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 10,
        magazineSize: 35,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 10,
        magazineSize: 40,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 10,
        magazineSize: 45,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Torrente',
    upgrades: [
      {
        level: 1,
        damage: 8,
        magazineSize: 50,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 8,
        magazineSize: 60,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 8,
        magazineSize: 70,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 8,
        magazineSize: 80,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Venator',
    upgrades: [
      {
        level: 1,
        damage: 18,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 18,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 18,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 18,
        magazineSize: 10,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
  {
    name: 'Vulcano',
    upgrades: [
      {
        level: 1,
        damage: 49.5,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 2,
        damage: 49.5,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 3,
        damage: 49.5,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
      {
        level: 4,
        damage: 49.5,
        magazineSize: 6,
        headshotMultiplier: HEADSHOT_MULTIPLIER,
      },
    ],
  },
];
