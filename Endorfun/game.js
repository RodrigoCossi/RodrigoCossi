// Endorfun Game Clone using Canvas 2D
// A recreation of the classic 1995 puzzle game

class EndorfunGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.grid = [];
        this.gridSize = 6; // 6x6 grid
        this.tileSize = 60;
        this.colors = [
            '#FF0000', // Red
            '#00FF00', // Green
            '#0000FF', // Blue
            '#FFFF00', // Yellow
            '#FF00FF', // Magenta
            '#00FFFF'  // Cyan
        ];
        this.score = 0;
        this.matches = 0;
        this.animatingTiles = new Set();

        // Positive affirmations from the original game concept
        this.affirmations = [
            "You are capable of amazing things!",
            "Your potential is limitless!",
            "You radiate positive energy!",
            "Every day you grow stronger!",
            "You deserve happiness and success!",
            "Your creativity knows no bounds!",
            "You are worthy of love and respect!",
            "Your mind is powerful and clear!",
            "You embrace challenges with confidence!",
            "You are making a positive difference!",
            "Your inner strength is unbreakable!",
            "You attract success and abundance!",
            "You trust in your abilities!",
            "Your determination inspires others!",
            "You are exactly where you need to be!",
            "Your journey is unique and valuable!",
            "You create your own positive reality!",
            "Your efforts are bringing results!",
            "You are growing and evolving daily!",
            "Your passion lights the way forward!"
        ];

        this.init();
    }

    init() {
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Add event listeners
        this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));

        // Create initial game board
        this.createGameBoard();

        // Start animation loop
        this.animate();

        // Show first affirmation
        this.showRandomAffirmation();
    }

    resizeCanvas() {
        const container = document.getElementById('canvas-container');
        const size = Math.min(container.clientWidth - 40, container.clientHeight - 40, 600);
        this.canvas.width = size;
        this.canvas.height = size;
        this.tileSize = size / (this.gridSize + 1);
    }

    createGameBoard() {
        this.grid = [];
        
        for (let x = 0; x < this.gridSize; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSize; y++) {
                this.grid[x][y] = this.createTile(x, y);
            }
        }
    }

    createTile(gridX, gridY) {
        // Each tile has 4 faces (top, right, bottom, left) with colors
        const colors = [];
        for (let i = 0; i < 4; i++) {
            colors.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        }
        
        return {
            gridX: gridX,
            gridY: gridY,
            colors: colors,
            rotation: 0,
            scale: 1,
            animationPhase: 0
        };
    }

    drawTile(tile) {
        const padding = this.tileSize * 0.5;
        const x = padding + tile.gridX * this.tileSize;
        const y = padding + tile.gridY * this.tileSize;
        const size = this.tileSize * 0.8 * tile.scale;
        const halfSize = size / 2;

        this.ctx.save();
        this.ctx.translate(x + halfSize, y + halfSize);
        this.ctx.rotate((tile.rotation * Math.PI) / 2);

        // Draw tile with 4 colored triangles
        const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
        
        for (let i = 0; i < 4; i++) {
            this.ctx.fillStyle = tile.colors[i];
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            
            const angle1 = angles[i];
            const angle2 = angles[(i + 1) % 4];
            
            const x1 = Math.cos(angle1) * halfSize;
            const y1 = Math.sin(angle1) * halfSize;
            const x2 = Math.cos(angle2) * halfSize;
            const y2 = Math.sin(angle2) * halfSize;
            
            this.ctx.lineTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        // Draw center circle
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, halfSize * 0.2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.3)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        const padding = this.tileSize * 0.5;
        
        for (let i = 0; i <= this.gridSize; i++) {
            const pos = padding + i * this.tileSize;
            
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(pos, padding);
            this.ctx.lineTo(pos, this.canvas.height - padding);
            this.ctx.stroke();
            
            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(padding, pos);
            this.ctx.lineTo(this.canvas.width - padding, pos);
            this.ctx.stroke();
        }

        // Draw all tiles
        this.grid.forEach(row => {
            row.forEach(tile => {
                this.drawTile(tile);
            });
        });
    }

    onCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const padding = this.tileSize * 0.5;
        const gridX = Math.floor((clickX - padding) / this.tileSize);
        const gridY = Math.floor((clickY - padding) / this.tileSize);

        if (gridX >= 0 && gridX < this.gridSize && gridY >= 0 && gridY < this.gridSize) {
            const tile = this.grid[gridX][gridY];
            if (tile && !this.animatingTiles.has(tile)) {
                this.rotateTile(tile);
            }
        }
    }

    rotateTile(tile) {
        this.animatingTiles.add(tile);
        const startRotation = tile.rotation;
        const targetRotation = startRotation + 1;
        const duration = 300; // milliseconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth rotation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            tile.rotation = startRotation + easeProgress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                tile.rotation = targetRotation % 4;
                
                // Rotate the colors array to match the rotation
                const colors = tile.colors;
                tile.colors = [colors[3], colors[0], colors[1], colors[2]];
                
                this.animatingTiles.delete(tile);
                
                // Check for matches after rotation
                this.checkMatches();
            }
        };

        animate();
    }

    checkMatches() {
        const matched = new Set();

        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const tile = this.grid[x][y];
                
                // Check right neighbor (tile face 1 vs neighbor face 3)
                if (x < this.gridSize - 1) {
                    const rightTile = this.grid[x + 1][y];
                    if (tile.colors[1] === rightTile.colors[3]) {
                        matched.add(`${x},${y}`);
                        matched.add(`${x + 1},${y}`);
                    }
                }
                
                // Check bottom neighbor (tile face 2 vs neighbor face 0)
                if (y < this.gridSize - 1) {
                    const bottomTile = this.grid[x][y + 1];
                    if (tile.colors[2] === bottomTile.colors[0]) {
                        matched.add(`${x},${y}`);
                        matched.add(`${x},${y + 1}`);
                    }
                }
            }
        }

        if (matched.size >= 3) {
            this.handleMatches(matched);
        }
    }

    handleMatches(matched) {
        const points = matched.size * 10;
        this.score += points;
        this.matches += 1;
        
        // Update UI
        document.getElementById('score').textContent = this.score;
        document.getElementById('matches').textContent = this.matches;

        // Show affirmation on match
        this.showRandomAffirmation();

        // Animate matched tiles
        matched.forEach(coord => {
            const [x, y] = coord.split(',').map(Number);
            const tile = this.grid[x][y];
            
            this.animatingTiles.add(tile);
            
            // Scale animation
            let progress = 0;
            const duration = 500;
            const startTime = Date.now();
            
            const scaleAnimation = () => {
                const elapsed = Date.now() - startTime;
                progress = elapsed / duration;
                
                if (progress < 1) {
                    tile.scale = 1 + Math.sin(progress * Math.PI) * 0.3;
                    tile.animationPhase = progress;
                    requestAnimationFrame(scaleAnimation);
                } else {
                    tile.scale = 1;
                    tile.animationPhase = 0;
                    this.randomizeTileColors(tile);
                    this.animatingTiles.delete(tile);
                }
            };
            
            scaleAnimation();
        });
    }

    randomizeTileColors(tile) {
        const colors = [];
        for (let i = 0; i < 4; i++) {
            colors.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        }
        tile.colors = colors;
    }

    showRandomAffirmation() {
        const affirmation = this.affirmations[Math.floor(Math.random() * this.affirmations.length)];
        const element = document.getElementById('affirmation');
        
        // Fade out
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = affirmation;
            // Fade in
            element.style.opacity = '1';
        }, 500);
    }

    newGame() {
        this.score = 0;
        this.matches = 0;
        document.getElementById('score').textContent = this.score;
        document.getElementById('matches').textContent = this.matches;
        this.animatingTiles.clear();
        this.createGameBoard();
        this.showRandomAffirmation();
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize game when page loads
window.game = null;
window.addEventListener('DOMContentLoaded', () => {
    window.game = new EndorfunGame();
});
