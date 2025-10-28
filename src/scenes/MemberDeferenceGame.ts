import BaseGame from './BaseGame';

export default class MemberDeferenceGame extends BaseGame {
  private hasCollided: boolean = false;
  private prop4Container?: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'MemberDeferenceGame' });
  }

  protected getGameTitle(): string {
    return 'MEMBER DEFERENCE';
  }

  protected getLawLabel(): string {
    return 'MEMBER DEFERENCE';
  }

  protected setupGameSpecifics(): void {
    const { width } = this.cameras.main;
    
    // Reset game-specific variables (critical for replay)
    this.hasCollided = false;
    this.prop4Container = undefined;
    
    // Set starting score to 1000
    this.score = 1000;
    this.scoreText.setText('SCORE: 1000');
    
    const subtitle = this.add.text(width / 2, 85, 'ONE HIT = DEATH', {
      fontSize: '36px',
      color: '#ff6b6b',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    subtitle.setOrigin(0.5);

    // Blinking warning
    this.tweens.add({
      targets: subtitle,
      alpha: 0.4,
      duration: 400,
      yoyo: true,
      repeat: -1
    });

    // Make the law faster and more menacing, tinted purple
    this.lawSpeed = 180;
    this.law.setTint(0xffaaff);
  }

  protected onCollision(): void {
    if (this.hasCollided) return;
    
    this.hasCollided = true;
    this.gameOver = true;

    // Stop building movement
    this.buildingSpeed = 0;

    // Dramatic effects
    this.cameras.main.shake(500, 0.01);
    this.cameras.main.flash(500, 255, 0, 0);

    // Darken screen
    const { width, height } = this.cameras.main;
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0);
    overlay.setOrigin(0);
    
    this.tweens.add({
      targets: overlay,
      alpha: 0.7,
      duration: 500
    });

    // Show dramatic loss message
    this.time.delayedCall(600, () => {
      this.showProp4Button();
    });
  }

  protected showProp4Button(): void {
    const { width, height } = this.cameras.main;

    // Create container for the popup
    this.prop4Container = this.add.container(width / 2, height / 2);

    // Background panel with chalkboard styling
    const panel = this.add.rectangle(0, 0, 650, 450, 0x1a3a2f, 0.98);
    panel.setStrokeStyle(6, 0xf5deb3);

    // Dramatic text with chalkboard font - even bigger
    const lossText = this.add.text(0, -150, 'BUILDING DESTROYED', {
      fontSize: '44px',
      color: '#ff6b6b',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    });
    lossText.setOrigin(0.5);

    const warningText = this.add.text(0, -100, 'MEMBER DEFERENCE IS', {
      fontSize: '32px',
      color: '#f5deb3',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    warningText.setOrigin(0.5);

    const powerText = this.add.text(0, -70, 'TOO POWERFUL!', {
      fontSize: '32px',
      color: '#f5deb3',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    powerText.setOrigin(0.5);

    const hopeText = this.add.text(0, -30, '...UNLESS...', {
      fontSize: '36px',
      color: '#ffd700',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    });
    hopeText.setOrigin(0.5);

    // THE BUTTON - chalkboard style
    const buttonBg = this.add.rectangle(0, 70, 550, 110, 0xffd700);
    buttonBg.setStrokeStyle(5, 0xf5deb3);
    buttonBg.setInteractive({ useHandCursor: true });

    const buttonText = this.add.text(0, 55, 'YES ON PROPOSITION 4', {
      fontSize: '42px',
      color: '#1a3a2f',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    });
    buttonText.setOrigin(0.5);

    const subText = this.add.text(0, 95, 'PRESS TO ACTIVATE', {
      fontSize: '26px',
      color: '#1a3a2f',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    subText.setOrigin(0.5);

    const instructText = this.add.text(0, 160, 'CLICK TO DEFEAT LAW', {
      fontSize: '26px',
      color: '#90ee90',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    instructText.setOrigin(0.5);

    // Add everything to container
    this.prop4Container.add([panel, lossText, warningText, powerText, hopeText, buttonBg, buttonText, subText, instructText]);

    // Retro screen wipe entrance
    this.prop4Container.setScale(0.01, 1);
    this.tweens.add({
      targets: this.prop4Container,
      scaleX: 1,
      duration: 300,
      ease: 'Linear'
    });

    // Retro blinking animation for button
    this.tweens.add({
      targets: buttonText,
      alpha: 0.5,
      duration: 400,
      yoyo: true,
      repeat: -1
    });

    // Border blink effect
    this.tweens.add({
      targets: instructText,
      alpha: 0,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    // Button click handler
    buttonBg.on('pointerdown', () => {
      this.onProp4Click();
    });

    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0x90ee90);
      buttonText.setColor('#1a3a2f');
      subText.setColor('#1a3a2f');
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0xffd700);
      buttonText.setColor('#1a3a2f');
      subText.setColor('#1a3a2f');
    });
  }

  protected onProp4Click(): void {
    // Epic victory!
    const { width, height } = this.cameras.main;

    // Clear the popup
    if (this.prop4Container) {
      this.prop4Container.destroy();
    }

    // Victory effects
    this.cameras.main.flash(1000, 255, 255, 0);
    
    // Make the law disappear
    this.tweens.add({
      targets: this.law,
      alpha: 0,
      scale: 0,
      duration: 500,
      ease: 'Power2'
    });

    // Victory message with chalkboard style
    this.time.delayedCall(500, () => {
      // Black overlay (matching Article78/FAR style)
      const overlay = this.add.rectangle(0, 0, width, height, 0x1a3a2f, 0.9);
      overlay.setOrigin(0);

      const victoryText = this.add.text(width / 2, height / 2 - 120, 'VICTORY!', {
        fontSize: '64px',
        color: '#90ee90',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      victoryText.setOrigin(0.5);

      const prop4Text = this.add.text(width / 2, height / 2 - 50, 'PROPOSITION 4', {
        fontSize: '32px',
        color: '#ffd700',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      prop4Text.setOrigin(0.5);

      const defeatedText = this.add.text(width / 2, height / 2 - 10, 'DEFEATS', {
        fontSize: '28px',
        color: '#f5deb3',
        fontFamily: 'BoldPixels, Courier New, monospace'
      });
      defeatedText.setOrigin(0.5);

      const lawText = this.add.text(width / 2, height / 2 + 25, 'MEMBER DEFERENCE!', {
        fontSize: '28px',
        color: '#ffaaff',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      lawText.setOrigin(0.5);

      const scoreText = this.add.text(width / 2, height / 2 + 75, 'SCORE: 1000', {
        fontSize: '36px',
        color: '#ffffff',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      scoreText.setOrigin(0.5);

      const perfectText = this.add.text(width / 2, height / 2 + 115, 'PERFECT', {
        fontSize: '28px',
        color: '#ffd700',
        fontFamily: 'BoldPixels, Courier New, monospace'
      });
      perfectText.setOrigin(0.5);

      const menuText = this.add.text(width / 2, height / 2 + 160, 'PRESS SPACE OR TAP TO MAIN MENU', {
        fontSize: '28px',
        color: '#90ee90',
        fontFamily: 'BoldPixels, Courier New, monospace'
      });
      menuText.setOrigin(0.5);

      // Blinking text effect
      this.tweens.add({
        targets: [victoryText, menuText],
        alpha: 0.3,
        duration: 500,
        yoyo: true,
        repeat: -1
      });

      // Celebration effect
      for (let i = 0; i < 30; i++) {
        this.time.delayedCall(i * 50, () => {
          const pixel = this.add.rectangle(
            Phaser.Math.Between(100, width - 100),
            Phaser.Math.Between(150, height - 100),
            6, 6,
            i % 3 === 0 ? 0x90ee90 : i % 3 === 1 ? 0xffd700 : 0xf5deb3
          );
          this.tweens.add({
            targets: pixel,
            alpha: 0,
            scale: 2,
            duration: 1000
          });
        });
      }

      // Handler to return to main menu
      const returnToMenu = () => {
        this.scene.start('MainMenu');
      };

      // Space key to return to menu
      this.input.keyboard!.once('keydown-SPACE', returnToMenu);

      // Tap/click anywhere on overlay to return to menu
      overlay.setInteractive();
      overlay.once('pointerdown', returnToMenu);
    });
  }

  protected updateGameSpecifics(): void {
    // No additional updates needed for this game mode
    if (!this.hasCollided) {
      // Show warning when law gets close
      const distance = Phaser.Math.Distance.Between(
        this.building.x, this.building.y,
        this.law.x, this.law.y
      );

      if (distance < 100 && distance > 40) {
        this.building.setTint(0xff8800);
      } else {
        this.building.clearTint();
      }
    }
  }
}

