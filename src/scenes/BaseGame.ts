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
  protected baseLawSpeed: number = 150; // Base speed to reset to after collision
  protected lawAcceleration: number = 5; // Speed increase per second during hunt
  
  // Virtual joystick for mobile
  protected useJoystick: boolean = false;
  protected joystickBase?: Phaser.GameObjects.Arc;
  protected joystickThumb?: Phaser.GameObjects.Arc;
  protected joystickPointer?: Phaser.Input.Pointer;
  protected joystickVector: { x: number, y: number } = { x: 0, y: 0 };

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
          document.fonts.load('64px "BoldPixels"'),
          document.fonts.load('48px "BoldPixels"'),
          document.fonts.load('40px "BoldPixels"'),
          document.fonts.load('32px "BoldPixels"'),
          document.fonts.load('24px "BoldPixels"'),
        ])
      : Promise.resolve();

    return fontPromise;
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Reset game state variables (important for replaying)
    this.timeRemaining = 30;
    this.score = 100;
    this.gameOver = false;
    this.buildingSpeed = 200;
    this.lawSpeed = 150;
    this.baseLawSpeed = 150;
    this.lawAcceleration = 5;
    
    // Chalkboard green background to match main menu
    this.cameras.main.setBackgroundColor('#2c5f4f');

    // Title with chalkboard styling - even bigger and higher
    const title = this.add.text(width / 2, 40, this.getGameTitle(), {
      fontSize: '56px',
      color: '#f5deb3',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Timer display - bigger and cleaner
    this.timerText = this.add.text(100, 120, 'TIME: 30', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    this.timerText.setOrigin(0, 0.5);

    // Score display - bigger and cleaner
    this.scoreText = this.add.text(width - 100, 120, 'SCORE: 100', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    this.scoreText.setOrigin(1, 0.5);

    // Instructions at bottom - much bigger
    const instructions = this.add.text(width / 2, height - 50, 'ARROWS: MOVE  |  ESC: MENU', {
      fontSize: '28px',
      color: '#d4a574',
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

    // Create law label text that follows the script - bigger
    this.lawLabel = this.add.text(this.law.x, this.law.y + 30, this.getLawLabel(), {
      fontSize: '20px',
      color: '#f5deb3',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      backgroundColor: '#1a3a2f',
      padding: { x: 6, y: 3 }
    });
    this.lawLabel.setOrigin(0.5);

    // Setup controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    
    // ESC key to return to menu
    this.input.keyboard!.on('keydown-ESC', () => {
      this.scene.start('MainMenu');
    });

    // Always show virtual joystick
    this.useJoystick = true;
    this.createVirtualJoystick(width, height);

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

    // Move building with arrow keys or virtual joystick
    const speed = this.buildingSpeed;
    let velocityX = 0;
    let velocityY = 0;
    
    // Calculate movement direction
    if (this.useJoystick && (this.joystickVector.x !== 0 || this.joystickVector.y !== 0)) {
      // Use virtual joystick input
      velocityX = this.joystickVector.x;
      velocityY = this.joystickVector.y;
    } else {
      // Use keyboard input
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
    this.building.y = Phaser.Math.Clamp(this.building.y, 200, height - 60);

    // Move law towards building
    this.moveLawTowardsBuilding();

    // Gradually increase law speed (acceleration)
    this.lawSpeed += this.lawAcceleration * 0.016;

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
    this.timerText.setText(`TIME: ${this.timeRemaining}`);

    // Flash timer when low
    if (this.timeRemaining <= 10) {
      this.timerText.setColor(this.timeRemaining % 2 === 0 ? '#ff6b6b' : '#ffffff');
    }

    if (this.timeRemaining <= 0) {
      this.endGame(true);
    }
  }

  protected endGame(won: boolean) {
    this.gameOver = true;

    const { width, height } = this.cameras.main;
    const message = won ? 'VICTORY!' : 'GAME OVER';
    const color = won ? '#90ee90' : '#ff6b6b';

    // Chalkboard overlay
    const overlay = this.add.rectangle(0, 0, width, height, 0x1a3a2f, 0.9);
    overlay.setOrigin(0);

    const resultText = this.add.text(width / 2, height / 2 - 100, message, {
      fontSize: '64px',
      color: color,
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    resultText.setOrigin(0.5);

    // Blinking effect
    this.tweens.add({
      targets: resultText,
      alpha: 0.5,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    const finalScore = this.add.text(width / 2, height / 2, `SCORE: ${Math.round(this.score)}`, {
      fontSize: '40px',
      color: '#f5deb3',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    finalScore.setOrigin(0.5);

    const menuText = this.add.text(width / 2, height / 2 + 100, 'PRESS SPACE OR TAP TO MAIN MENU', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    menuText.setOrigin(0.5);

    // Blinking "press space or tap"
    this.tweens.add({
      targets: menuText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Handler to return to main menu
    const returnToMenu = () => {
      this.scene.start('MainMenu');
    };

    // Space key to return to menu
    this.input.keyboard!.once('keydown-SPACE', returnToMenu);

    // Tap/click anywhere on overlay to return to menu
    overlay.setInteractive();
    overlay.once('pointerdown', returnToMenu);
  }


  protected createVirtualJoystick(_width: number, height: number): void {
    const joystickRadius = 60;
    const thumbRadius = 25;
    const joystickX = 100;
    const joystickY = height - 100;

    // Create semi-transparent joystick base
    this.joystickBase = this.add.circle(joystickX, joystickY, joystickRadius, 0xffffff, 0.2);
    this.joystickBase.setStrokeStyle(3, 0xffffff, 0.4);
    this.joystickBase.setDepth(1000);

    // Create semi-transparent joystick thumb
    this.joystickThumb = this.add.circle(joystickX, joystickY, thumbRadius, 0xffffff, 0.4);
    this.joystickThumb.setStrokeStyle(3, 0xffffff, 0.6);
    this.joystickThumb.setDepth(1001);

    // Make joystick interactive
    this.joystickBase.setInteractive();

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const distance = Phaser.Math.Distance.Between(
        pointer.x,
        pointer.y,
        joystickX,
        joystickY
      );

      if (distance < joystickRadius + 50) {
        this.joystickPointer = pointer;
      }
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer === pointer && this.joystickThumb && this.joystickBase) {
        const angle = Phaser.Math.Angle.Between(
          joystickX,
          joystickY,
          pointer.x,
          pointer.y
        );

        const distance = Math.min(
          Phaser.Math.Distance.Between(joystickX, joystickY, pointer.x, pointer.y),
          joystickRadius - thumbRadius
        );

        // Update thumb position
        this.joystickThumb.x = joystickX + Math.cos(angle) * distance;
        this.joystickThumb.y = joystickY + Math.sin(angle) * distance;

        // Calculate normalized vector
        if (distance > 10) {
          this.joystickVector.x = Math.cos(angle);
          this.joystickVector.y = Math.sin(angle);
        } else {
          this.joystickVector.x = 0;
          this.joystickVector.y = 0;
        }
      }
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer === pointer && this.joystickThumb) {
        this.joystickPointer = undefined;
        this.joystickThumb.x = joystickX;
        this.joystickThumb.y = joystickY;
        this.joystickVector.x = 0;
        this.joystickVector.y = 0;
      }
    });
  }

  protected resetLawSpeed(): void {
    // Reset law speed to base speed after collision
    this.lawSpeed = this.baseLawSpeed;
  }

  protected abstract getGameTitle(): string;
  protected abstract getLawLabel(): string;
  protected abstract setupGameSpecifics(): void;
  protected abstract onCollision(): void;
  protected abstract updateGameSpecifics(): void;
}

