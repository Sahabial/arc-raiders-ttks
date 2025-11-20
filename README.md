# Arc Raiders Weapons TTK Calculator

A web application for calculating Time To Kill (TTK) statistics for weapons in Arc Raiders, including detailed breakdowns of shots required to eliminate players with different shield configurations.

## Overview

This tool helps players understand weapon effectiveness by calculating:
- **Shots to Kill**: Number of shots needed to eliminate a player (100 HP)
- **Magazines Required**: Number of magazines needed based on weapon capacity
- **Shield Interactions**: How different shield tiers affect TTK
- **Body vs Headshots**: Comparison between body shots and headshots

## Features

### Main Table View
- **Weapon Statistics**: Displays all weapons with their damage, magazine size, and headshot multiplier
- **Shield Scenarios**: Shows TTK for no shield, light shield (40 charge), medium shield (70 charge), and heavy shield (80 charge)
- **Body Shots & Headshots**: Separate columns for body shots and headshots
- **Visual Highlighting**: Cells are highlighted in light blue when a higher-tier shield requires more shots to kill than the previous tier
- **Interactive Breakdown**: Click on any shot count to see a detailed shot-by-shot breakdown

### Shot Breakdown Modal
- **Visual Progress Bars**: Two progress bars showing shield and HP status after each shot
  - Shield bar: Number of segments = max shield charge / 10 (4 for Light, 7 for Medium, 8 for Heavy)
  - HP bar: 10 segments (representing 100 HP)
  - Both bars have the same width with segments stretched proportionally
- **Shot-by-Shot Details**: Shows shield and HP values before and after each shot
- **Damage Differences**: Displays the change in shield and HP for each shot

## How It Works

### Damage Calculation

The calculator uses the following mechanics:

1. **Base Damage**: Each weapon has a base damage value
2. **Headshot Multiplier**: Headshots apply a 2.5x multiplier to base damage
3. **Shield Mitigation**: 
   - Shield takes full base damage (without headshot multiplier)
   - Health takes mitigated damage: `damage * (1 - shield.damageMitigation)`
   - Even if shield has only 1 charge left, it still mitigates the full damage amount
4. **Simultaneous Damage**: Each shot damages both shield and health simultaneously

### Shield Tiers

- **Light Shield**: 40 charge, 40% damage mitigation
- **Medium Shield**: 70 charge, 42.5% damage mitigation
- **Heavy Shield**: 80 charge, 52.5% damage mitigation

### Calculation Logic

The calculator simulates each shot:
1. Shield charge is reduced by base damage (up to remaining charge)
2. Health is reduced by mitigated damage (calculated from full damage)
3. Process continues until either:
   - Player dies (HP ≤ 0)
   - Shield breaks (charge ≤ 0), then remaining shots deal full damage to health

## Project Structure

```
src/
├── components/
│   ├── WeaponsTable.tsx          # Main table displaying all weapon stats
│   └── ShotsBreakdownModal/
│       └── index.tsx             # Modal showing shot-by-shot breakdown
├── data/
│   ├── weapons.ts                # Weapon definitions and stats
│   └── shields.ts                # Shield definitions and stats
├── utils/
│   └── ttkCalculator.ts          # Core TTK calculation logic
├── App.tsx                        # Main application component
└── main.tsx                       # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arc-raiders-ttks
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Building

Build for production:
```bash
npm run build
```

Build standalone version:
```bash
npm run build:standalone
```

Preview production build:
```bash
npm run preview
```

### Code Quality

Lint code:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

Check formatting:
```bash
npm run format:check
```

Spell check:
```bash
npm run spellcheck
```

## Technologies Used

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Ant Design**: UI component library
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Stylelint**: CSS linting
- **CSpell**: Spell checking

## Key Features Explained

### Column Organization
- Body shots are grouped together (None, Light, Med, Heavy)
- Headshots are grouped together (None, Light, Med, Heavy)
- Same pattern for magazine columns

### Highlighting Logic
Cells are highlighted when a higher-tier shield requires more shots than the previous tier:
- Light vs None
- Medium vs Light
- Heavy vs Medium

This helps identify when higher-tier shields actually provide better protection.

### Progress Bar Segments
- Each segment represents 10 units
- Shield segments = max shield charge / 10
- HP segments = 100 / 10 = 10 segments
- Both bars maintain the same width for visual consistency

## Contributing

When contributing, please ensure:
- Code follows the project's ESLint and Prettier configuration
- Arrow functions use curly braces
- Semicolons are mandatory
- TypeScript types are properly defined
- All tests pass (if applicable)

## License

This project is private and not licensed for public use.

