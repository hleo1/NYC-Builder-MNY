import Phaser from 'phaser';

export default abstract class BaseGame extends Phaser.Scene {
  protected building!: Phaser.GameObjects.Image;
  protected law!: Phaser.GameObjects.Image;
  protected lawLabel!: Phaser.GameObjects.Text;
  protected timerText!: Phaser.GameObjects.Text;
  protected scoreText!: Phaser.GameObjects.Text;
  protected timeRemaining: number = 30;
  protected score: number = 100;
  protected gameOver: boolean = false;
  protected cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  protected buildingSpeed: number = 200;
  protected lawSpeed: number = 150;

  preload() {
    // Load game assets
    this.load.image('building', 'Building.png');
    this.load.image('script', 'Script.png');

    // Load WebFont library for custom font
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  init() {
    // Wait for custom font to load
    const fontPromise = document.fonts?.load
      ? Promise.all([
          document.fonts.load('24px "BoldPixels"'),
          document.fonts.load('18px "BoldPixels"'),
          document.fonts.load('16px "BoldPixels"'),
          document.fonts.load('12px "BoldPixels"'),
        ])
      : Promise.resolve();

    return fontPromise;
  }

  create() {
    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#000033');

    // Add scanlines for retro CRT effect
    this.createScanlines(width, height);

    // Title with retro styling
    const title = this.add.text(width / 2, 25, this.getGameTitle(), {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Create retro HUD box
    const hudBox = this.add.rectangle(width / 2, 70, 300, 50, 0x000000, 0.7);
    hudBox.setStrokeStyle(2, 0x00ff00);

    // Timer with retro display
    this.timerText = this.add.text(width / 2 - 70, 70, 'TIME:30', {
      fontSize: '18px',
      color: '#ff00ff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    this.timerText.setOrigin(0.5);

    // Score with retro display
    this.scoreText = this.add.text(width / 2 + 70, 70, 'SCR:100', {
      fontSize: '18px',
      color: '#ffff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    this.scoreText.setOrigin(0.5);

    // Instructions with retro style
    const instructions = this.add.text(width / 2, height - 20, '<ARROWS:MOVE> <ESC:MENU>', {
      fontSize: '10px',
      color: '#00ffff',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    instructions.setOrigin(0.5);

    // Create building (player) - using Building.png
    this.building = this.add.image(width / 2, height / 2, 'building');
    this.building.setOrigin(0.5);
    this.building.setScale(0.15); // Smaller scale for gameplay

    // Create law (enemy) - using Script.png
    this.law = this.add.image(100, 200, 'script');
    this.law.setOrigin(0.5);
    this.law.setScale(0.12); // Smaller scale for gameplay

    // Create law label text that follows the script
    this.lawLabel = this.add.text(this.law.x, this.law.y + 30, this.getLawLabel(), {
      fontSize: '12px',
      color: '#ffff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      padding: { x: 3, y: 1 }
    });
    this.lawLabel.setOrigin(0.5);

    // Setup controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    
    // ESC key to return to menu
    this.input.keyboard!.on('keydown-ESC', () => {
      this.scene.start('MainMenu');
    });

    // Start timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Add game-specific setup
    this.setupGameSpecifics();
  }

  update() {
    if (this.gameOver) return;

    // Move building with arrow keys
    const speed = this.buildingSpeed;
    let velocityX = 0;
    let velocityY = 0;
    
    // Calculate movement direction
    if (this.cursors.left.isDown) {
      velocityX = -1;
    } else if (this.cursors.right.isDown) {
      velocityX = 1;
    }

    if (this.cursors.up.isDown) {
      velocityY = -1;
    } else if (this.cursors.down.isDown) {
      velocityY = 1;
    }

    // Normalize diagonal movement (divide by sqrt(2) when moving diagonally)
    if (velocityX !== 0 && velocityY !== 0) {
      const diagonal = Math.sqrt(2);
      velocityX /= diagonal;
      velocityY /= diagonal;
    }

    // Apply velocity
    this.building.x += velocityX * speed * 0.016;
    this.building.y += velocityY * speed * 0.016;

    // Keep building in bounds
    const { width, height } = this.cameras.main;
    this.building.x = Phaser.Math.Clamp(this.building.x, 20, width - 20);
    this.building.y = Phaser.Math.Clamp(this.building.y, 130, height - 60);

    // Move law towards building
    this.moveLawTowardsBuilding();

    // Check collision (adjusted for smaller image sizes)
    const distance = Phaser.Math.Distance.Between(
      this.building.x, this.building.y,
      this.law.x, this.law.y
    );

    if (distance < 40) {
      this.onCollision();
    }

    // Game-specific update logic
    this.updateGameSpecifics();
  }

  protected moveLawTowardsBuilding() {
    const angle = Phaser.Math.Angle.Between(
      this.law.x, this.law.y,
      this.building.x, this.building.y
    );

    this.law.x += Math.cos(angle) * this.lawSpeed * 0.016;
    this.law.y += Math.sin(angle) * this.lawSpeed * 0.016;

    // Update label position to follow the law
    this.lawLabel.x = this.law.x;
    this.lawLabel.y = this.law.y + 30;
  }

  protected updateTimer() {
    if (this.gameOver) return;

    this.timeRemaining--;
    this.timerText.setText(`TIME:${this.timeRemaining.toString().padStart(2, '0')}`);

    // Flash timer when low
    if (this.timeRemaining <= 10) {
      this.timerText.setColor(this.timeRemaining % 2 === 0 ? '#ff0000' : '#ff00ff');
    }

    if (this.timeRemaining <= 0) {
      this.endGame(true);
    }
  }

  protected endGame(won: boolean) {
    this.gameOver = true;

    const { width, height } = this.cameras.main;
    const message = won ? '*** VICTORY ***' : '** GAME OVER **';
    const color = won ? '#00ff00' : '#ff0000';

    // Retro game over screen
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8);
    overlay.setOrigin(0);

    const resultText = this.add.text(width / 2, height / 2 - 60, message, {
      fontSize: '48px',
      color: color,
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    resultText.setOrigin(0.5);

    // Blinking effect
    this.tweens.add({
      targets: resultText,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    const finalScore = this.add.text(width / 2, height / 2, `SCORE: ${Math.round(this.score).toString().padStart(5, '0')}`, {
      fontSize: '28px',
      color: '#ffff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    finalScore.setOrigin(0.5);

    const menuText = this.add.text(width / 2, height / 2 + 60, '[ PRESS SPACE ]', {
      fontSize: '16px',
      color: '#00ffff',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    menuText.setOrigin(0.5);

    // Blinking "press space"
    this.tweens.add({
      targets: menuText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.start('MainMenu');
    });
  }

  protected createScanlines(width: number, height: number) {
    // Create CRT scanline effect
    for (let i = 0; i < height; i += 4) {
      const line = this.add.rectangle(0, i, width, 2, 0x000000, 0.3);
      line.setOrigin(0);
    }
  }

  protected abstract getGameTitle(): string;
  protected abstract getLawLabel(): string;
  protected abstract setupGameSpecifics(): void;
  protected abstract onCollision(): void;
  protected abstract updateGameSpecifics(): void;
}

