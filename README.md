# 🏙️ NYC Builder 2025

**A browser-based game about NYC housing laws**

Presented by **Maximum New York**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎮 Play Now

Visit the live game at: [Your deployment URL here]

## 📖 About

NYC Builder 2025 is an educational arcade game that demonstrates how different NYC housing laws can impact building development. Players control a building and must navigate three different legal challenges, each representing a real NYC housing law that affects development.

### The Laws

1. **⚖️ Article 78** - *The Slowdown Law*
   - Represents legal challenges that slow down development
   - Each contact with this law makes your building move slower
   - Survive for 30 seconds without being completely frozen!

2. **📐 FAR (Floor Area Ratio)** - *The Shrinker*
   - Represents zoning restrictions that limit building size
   - Each contact shrinks your building
   - Keep at least some of your building intact for 30 seconds!

3. **⚠️ Member Deference** - *The Unbeatable Law...?*
   - Represents the most restrictive housing policy
   - One touch and it's game over
   - But wait... there might be a way to fight back with Proposition 4!

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nyc-builder-2025.git
cd nyc-builder-2025

# Install dependencies
npm install

# Run the development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🎯 How to Play

### Controls

- **Arrow Keys** - Move your building
- **ESC** - Return to main menu
- **SPACE** - Continue after game over
- **Mouse** - Click buttons and interact with UI

### Game Modes

#### Article 78 Challenge
- **Objective**: Survive for 30 seconds
- **Mechanic**: Avoid the law or it will slow you down
- **Scoring**: Based on your remaining speed
- **Strategy**: Keep moving and maintain distance

#### FAR Challenge
- **Objective**: Survive for 30 seconds without disappearing
- **Mechanic**: Avoid the law or it will shrink you
- **Scoring**: Based on your remaining size
- **Strategy**: Minimize contact while staying large

#### Member Deference Challenge
- **Objective**: Survive... or click the button
- **Mechanic**: One touch = game over
- **Secret**: When all seems lost, a special button appears
- **Victory**: Sometimes the answer is political action!

## 🛠️ Technology Stack

- **Game Engine**: Phaser 4 (Beta)
- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS

## 📁 Project Structure

```
src/
├── components/
│   └── PhaserGame.tsx          # React wrapper for Phaser
├── scenes/
│   ├── MainMenu.ts             # Main menu scene
│   ├── BaseGame.ts             # Base class for game scenes
│   ├── Article78Game.ts        # Article 78 challenge
│   ├── FARGame.ts              # FAR challenge
│   └── MemberDeferenceGame.ts  # Member Deference challenge
├── App.tsx                     # Main app component
└── main.tsx                    # Entry point
```

## 🎨 Customization

### Adding New Laws

1. Create a new scene extending `BaseGame` in `src/scenes/`
2. Implement the required abstract methods:
   - `getGameTitle()` - Return the game title
   - `getLawEmoji()` - Return the emoji for the law
   - `setupGameSpecifics()` - Initialize game-specific elements
   - `onCollision()` - Handle what happens when law touches building
   - `updateGameSpecifics()` - Update game-specific logic each frame

3. Add the scene to `src/components/PhaserGame.tsx`
4. Add a button in `src/scenes/MainMenu.ts`

### Customizing Visuals

- **Emojis**: Replace text emojis in scene files with custom sprites
- **Colors**: Modify color schemes in each scene's `create()` method
- **Animations**: Add Phaser tweens and particle effects
- **Branding**: Update branding text in `MainMenu.ts`

## 📄 License

**MIT License**

Copyright (c) 2025 NYC Builder 2025 / Maximum New York

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🤝 Contributing

Contributions are welcome! This is an open-source educational project.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎓 Educational Use

This game is designed to raise awareness about NYC housing policy. Feel free to:
- Use it in educational settings
- Modify it for your own advocacy
- Share it to spark conversations about housing
- Fork it and create your own versions

## 🙏 Acknowledgments

- **Maximum New York** - For housing advocacy and inspiration
- **Phaser** - For the amazing game framework
- **React** - For the UI framework
- The NYC housing advocacy community

## 📞 Contact & Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/yourusername/nyc-builder-2025/issues)
- **Website**: [Maximum New York](https://maximumnewyork.org) (if applicable)

## 🗳️ Take Action

This game is inspired by real NYC housing policies. To learn more about housing advocacy:
- Research Proposition 4 and similar housing initiatives
- Contact your local representatives
- Support organizations working on housing policy
- Vote in local elections

---

**Built with ❤️ for better housing policy in NYC**

*Note: This is an educational game and artistic representation. Game mechanics are simplified versions of complex legal concepts.*
