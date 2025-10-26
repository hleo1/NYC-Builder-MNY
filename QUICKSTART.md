# 🚀 Quick Start - NYC Builder 2025

## ▶️ Play Right Now

The game is already running at: **http://localhost:5175/**

Just open that URL in your browser!

## 🎮 Controls

- **Arrow Keys** - Move your building
- **ESC** - Return to main menu
- **SPACE** - Continue after game ends
- **Mouse** - Click buttons

## 🎯 The Three Games

### 1. ⚖️ Article 78
**The Slowdown Law**
- Avoid the law 📜
- Each touch slows you down
- Survive 30 seconds!

### 2. 📐 FAR 
**Floor Area Ratio**
- Avoid the law 📏
- Each touch shrinks you
- Don't disappear!

### 3. ⚠️ Member Deference
**The Unbeatable Law**
- ONE TOUCH = Game over! 🚫
- Wait for the special button...
- Click "YES on Proposition 4" to win! ✅

## 📁 Project Structure

```
src/
├── scenes/
│   ├── MainMenu.ts              ← Main menu
│   ├── Article78Game.ts         ← Game 1
│   ├── FARGame.ts               ← Game 2
│   └── MemberDeferenceGame.ts   ← Game 3
└── components/
    └── PhaserGame.tsx           ← React wrapper
```

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📝 Making Changes

### Add New Game Mode
1. Create new scene in `src/scenes/YourGame.ts`
2. Extend `BaseGame` class
3. Add to `src/components/PhaserGame.tsx` imports
4. Add button in `MainMenu.ts`

### Change Visuals
- **Colors**: Edit scene files (search for hex colors like `#4CAF50`)
- **Text**: Change strings in scene `create()` methods
- **Emojis**: Replace emoji strings (🏢, 📜, 📏, 🚫)
- **Timing**: Change `timeRemaining: number = 30` in BaseGame.ts

### Adjust Difficulty
In each game file:
- `buildingSpeed` - How fast building moves
- `lawSpeed` - How fast law chases
- `slowdownFactor *= 0.85` - How much each hit slows (Article 78)
- `buildingScale *= 0.85` - How much each hit shrinks (FAR)

## 🌐 Deploy to Web

**Easiest: Netlify**
1. Run `npm run build`
2. Drag `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. Done! 🎉

**Free Options:**
- GitHub Pages (see DEPLOYMENT.md)
- Vercel
- Render

## 📄 Files to Read

- `README.md` - Full documentation
- `GAME_SUMMARY.md` - What was created
- `DEPLOYMENT.md` - How to deploy
- `LICENSE` - MIT License (use freely!)

## 🆘 Troubleshooting

**Game doesn't load?**
- Check http://localhost:5175/ is correct URL
- Look at browser console (F12) for errors
- Try `npm run dev` again

**Want to restart fresh?**
```bash
rm -rf node_modules dist
npm install
npm run dev
```

**Build errors?**
- Check all imports are correct
- Run `npm run lint` to find issues
- Check console for TypeScript errors

## ✨ Features

✅ 3 complete game modes  
✅ Animated UI  
✅ Score tracking  
✅ Win/lose conditions  
✅ Full keyboard controls  
✅ Responsive design  
✅ Maximum New York branding  
✅ Educational messaging  
✅ Production-ready  

## 📞 Need Help?

1. Check `README.md` for detailed info
2. Check `DEPLOYMENT.md` for hosting help
3. Check browser console for errors
4. All code is commented!

## 🎉 You're Ready!

Your game is **live**, **documented**, and **ready to deploy**!

Have fun! 🏙️

