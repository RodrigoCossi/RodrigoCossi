# Endorfun - Classic Puzzle Game Clone

A modern recreation of the classic 1995 puzzle game **Endorfun** built with HTML5 Canvas and pure JavaScript.

![Endorfun Game](https://img.shields.io/badge/Game-Puzzle-blue) ![Canvas2D](https://img.shields.io/badge/Canvas-2D-green) ![Status](https://img.shields.io/badge/Status-Playable-success)

## 🎮 About Endorfun

Endorfun is a unique puzzle game originally released in 1995 that combined engaging gameplay with positive psychological messages. Players rotate colored tiles on a 3D board to match colors and clear the board, while positive affirmations play in the background.

This clone recreates the core gameplay experience using modern web technologies:
- **HTML5 Canvas** for 2D graphics and rendering
- Pure JavaScript for game logic
- Responsive design that works on desktop and mobile

## 🕹️ How to Play

1. **Open `index.html`** in a modern web browser (Chrome, Firefox, Safari, Edge)
2. **Click on tiles** to rotate them 90 degrees
3. **Match colors** on adjacent tile faces
4. **Score points** when 3 or more tiles with matching adjacent faces are found
5. **Read affirmations** that appear as you play to boost your mood!

### Controls

- **Mouse Click**: Rotate individual tiles
- **Mouse Drag**: Rotate the camera view around the board
- **Mouse Wheel**: Zoom in and out
- **Arrow Keys**: Alternative navigation (future feature)

## 🎯 Game Mechanics

### Tile System
- 6x6 grid of colored cubes
- Each cube has 6 faces with different colors
- 6 possible colors: Red, Green, Blue, Yellow, Magenta, Cyan

### Matching Logic
- Click tiles to rotate them 90 degrees
- Match colors on adjacent faces of neighboring tiles
- When 3 or more tiles form matching connections, score points
- Matched tiles animate and get new random colors

### Scoring
- **10 points** per matched tile
- Matches are counted and displayed
- Aim for high scores and many matches!

### Positive Affirmations
Like the original game, Endorfun displays positive affirmations as you play:
- "You are capable of amazing things!"
- "Your potential is limitless!"
- "You radiate positive energy!"
- ...and many more!

## 🚀 Features

- ✨ **Colorful 2D graphics** with HTML5 Canvas
- 🎨 **Vibrant tile system** with 6 colors displayed as rotating diamonds
- 🔄 **Smooth rotation animations** for satisfying gameplay
- 💯 **Score tracking** and match counting
- 🌟 **Positive affirmations** displayed throughout gameplay
- 📱 **Responsive design** - works on desktop and mobile
- 🎮 **Intuitive controls** - simple click-to-rotate
- 🌊 **Clean visual design** with grid layout

## 🛠️ Technical Details

### Technologies Used
- **HTML5 Canvas**: 2D graphics rendering
- **HTML5**: Structure and layout
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: Game logic and interactivity

### Architecture
```
Endorfun/
├── index.html          # Main HTML file with UI
├── game.js            # Game logic and Canvas 2D implementation
└── README.md          # This file
```

### Key Classes and Methods

**EndorfunGame Class**:
- `init()`: Initializes Canvas context and event listeners
- `createGameBoard()`: Generates the 6x6 tile grid
- `createTile()`: Creates individual tiles with 4 colored faces
- `drawTile()`: Renders tiles as diamonds with colored triangles
- `rotateTile()`: Handles tile rotation with smooth animation
- `checkMatches()`: Detects matching tile patterns on adjacent faces
- `handleMatches()`: Processes matches and updates score
- `showRandomAffirmation()`: Displays positive messages

## 🎨 Customization

You can easily customize the game by modifying `game.js`:

### Change Grid Size
```javascript
this.gridSize = 8; // Change from 6x6 to 8x8
```

### Add More Colors
```javascript
this.colors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xffa500, // Orange - Add new color
    0x800080  // Purple - Add new color
];
```

### Change Scoring
```javascript
const points = matched.size * 20; // Change from 10 to 20 points per tile
```

### Add Your Own Affirmations
```javascript
this.affirmations = [
    "Your custom affirmation here!",
    "Another positive message!",
    // Add more...
];
```

## 🌐 Browser Compatibility

Endorfun works best in modern browsers with WebGL support:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📜 Original Game

The original Endorfun was released in 1995 by:
- **Developer**: Onesong Partners
- **Publisher**: Time Warner Interactive
- **Platform**: Windows, Mac

Learn more about the original:
- [Wikipedia - Endorfun](https://en.wikipedia.org/wiki/Endorfun)
- [Play Online](https://classicreload.com/endorfun-full-game-online.html)

## 🎓 Learning Resources

This project demonstrates:
- HTML5 Canvas API for 2D graphics
- Game state management
- Smooth animations with requestAnimationFrame
- Click detection and coordinate mapping
- Responsive web design
- Event handling (mouse and touch)

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📝 License

This is a fan-made recreation for educational purposes. The original Endorfun game and its concepts are property of their respective owners.

## 🎮 Future Enhancements

Possible future additions:
- [ ] Sound effects and background music
- [ ] Multiple difficulty levels
- [ ] Timed challenge mode
- [ ] Multiplayer support
- [ ] Power-ups and special tiles
- [ ] Progressive difficulty
- [ ] Save high scores to local storage
- [ ] Different board layouts and shapes
- [ ] Achievement system
- [ ] Tutorial mode for new players

## 🙏 Acknowledgments

- Original Endorfun developers at Onesong Partners
- HTML5 Canvas community for excellent resources
- The positive psychology movement that inspired the original game

---

**Enjoy playing Endorfun! Remember: You are capable of amazing things!** ✨
