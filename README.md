# 🏙️ NYC Builder 2025

**An Educational Arcade Game About NYC Housing Laws**

Presented by [**Maximum New York**](https://www.maximumnewyork.com/about)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎮 Play Now

Visit the live game at: https://nyc-builder-mny.netlify.app/

## 📖 About This Game

NYC Builder 2025 is an educational arcade game that makes NYC housing policy interactive and entertaining. Players control a building that must survive against three different legal challenges—Article 78, FAR (Floor Area Ratio), and Member Deference—each representing real NYC housing laws that affect development.

This game embodies Maximum New York's philosophy: **civics education should be entertaining and outcompete Netflix**. Instead of dry policy documents, experience firsthand how different laws impact housing development through fast-paced gameplay.

## 🏛️ About Maximum New York

[Maximum New York](https://www.maximumnewyork.com/about) is a new civics academy focused on **governmental mechanics**—the study of the components of government and law, and how they interrelate. 

**Mission:** Far too few people understand how NYC's government works, and there is no academy to teach them. MNY combats this through intensive, robust education on NYC's governmental systems, with special attention to case studies and political history.

**What Makes MNY Different:**
- Trains a smaller group to a very high level, creating deep knowledge and expertise
- Focuses on individuals who can push big, vital projects through NYC
- Students meet co-founders, employers/employees, and best friends—the social graph is part of the value
- Emphasizes that civic instruction must be **entertaining** and **good**

**Learn More:**
- Website: [https://www.maximumnewyork.com](https://www.maximumnewyork.com)
- About: [https://www.maximumnewyork.com/about](https://www.maximumnewyork.com/about)
- Contact: daniel@maximumnewyork.com
- Founded by Daniel Golliher (Government degree, Harvard College)

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

## 🎓 Educational Philosophy

This game follows Maximum New York's core principle: **civics education must be entertaining and compete with Netflix**. As MNY founder Daniel Golliher notes:

> "Civics already has a bad reputation as a boring field. But this isn't the fault of the field—it's the fault of generations of terrible teachers. Good political and civic instruction requires outcompeting Netflix."

This game makes housing policy:
- **Interactive** - Experience laws through gameplay, not reading
- **Memorable** - Learn through doing and failing
- **Shareable** - Easy to spread and discuss
- **Accessible** - No prior knowledge required

## 🎯 Educational Use

This game is designed to raise awareness about NYC housing policy and governmental mechanics. Feel free to:
- Use it in educational settings and civic tech classes
- Modify it for your own advocacy or teaching
- Share it to spark conversations about housing and government
- Fork it and create your own versions about different policy areas
- Use it as an example of making civics entertaining

**For Civic Educators:** If you're teaching NYC government, housing policy, or governmental mechanics, this game can serve as an engaging introduction or case study. Contact Maximum New York for educational partnerships.

## 🙏 Acknowledgments

- **[Maximum New York](https://www.maximumnewyork.com)** - For pioneering entertaining civics education and housing advocacy
- **Daniel Golliher** - Founder of Maximum New York, for the vision that civics can and should be fun
- **Phaser** - For the powerful game framework
- **React** - For the UI framework
- The NYC housing advocacy and civic tech community

## 📞 Contact & Support

### About Maximum New York
- **Website**: [https://www.maximumnewyork.com](https://www.maximumnewyork.com)
- **About Page**: [https://www.maximumnewyork.com/about](https://www.maximumnewyork.com/about)
- **Contact**: daniel@maximumnewyork.com
- **Classes**: Learn governmental mechanics through MNY's intensive courses
- **Twitter/LinkedIn**: @danielgolliher

### About This Game
- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/yourusername/nyc-builder-2025/issues)
- **Game Questions**: Use GitHub Issues or reach out to the development team

## 🗳️ Take Action & Learn More

This game is inspired by real NYC housing policies. To deepen your understanding:

**Learn Governmental Mechanics:**
- Take a [Maximum New York class](https://www.maximumnewyork.com/classes) to understand how NYC government really works
- Learn the hierarchy of authorities, case studies on municipal transformation, and practical political action
- Network with technologists, city employees, legislative staffers, and engaged citizens

**Get Involved in Housing:**
- Research Proposition 4 and similar housing initiatives
- Understand the real Article 78, FAR, and Member Deference through civic education
- Contact your local representatives with informed perspectives
- Support organizations working on housing policy
- Vote in local elections

**Why MNY's Approach Matters:**
As Daniel Golliher writes, "If you've ever had the thought 'people are too apathetic to learn this,' you are probably blaming others for your own inability to relay the material in a compelling fashion. The call of civics is a call of excellence."

---

**Built with ❤️ for entertaining civics education and better housing policy in NYC**

*This is an educational game and artistic representation. Game mechanics are simplified versions of complex legal concepts. For deep understanding of NYC governmental mechanics, explore [Maximum New York's curriculum](https://www.maximumnewyork.com).*
