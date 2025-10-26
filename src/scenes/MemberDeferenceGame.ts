import BaseGame from './BaseGame';

export default class MemberDeferenceGame extends BaseGame {
  private hasCollided: boolean = false;
  private prop4Container?: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'MemberDeferenceGame' });
  }

  protected getGameTitle(): string {
    return '>> MEMBER DEFERENCE <<';
  }

  protected getLawLabel(): string {
    return 'MEMBER DEFERENCE';
  }

  protected setupGameSpecifics(): void {
    const { width } = this.cameras.main;
    
    const subtitle = this.add.text(width / 2, 105, '!!! ONE HIT = DEATH !!!', {
      fontSize: '14px',
      color: '#ff0000',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    subtitle.setOrigin(0.5);

    // Blinking warning
    this.tweens.add({
      targets: subtitle,
      alpha: 0.3,
      duration: 300,
      yoyo: true,
      repeat: -1
    });

    // Make the law faster and more menacing, tinted purple
    this.lawSpeed = 180;
    this.law.setTint(0xff66ff);
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

    // Background panel with retro styling
    const panel = this.add.rectangle(0, 0, 600, 400, 0x000000, 0.95);
    panel.setStrokeStyle(8, 0xff0000);

    // Double border for retro effect
    const innerBorder = this.add.rectangle(0, 0, 580, 380, 0x000000, 0);
    innerBorder.setStrokeStyle(2, 0xff0000);

    // Dramatic text with retro font
    const lossText = this.add.text(0, -140, '*** BUILDING DESTROYED ***', {
      fontSize: '24px',
      color: '#ff0000',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    });
    lossText.setOrigin(0.5);

    const warningText = this.add.text(0, -100, 'MEMBER DEFERENCE IS', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    warningText.setOrigin(0.5);

    const powerText = this.add.text(0, -80, 'TOO POWERFUL!', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    powerText.setOrigin(0.5);

    const hopeText = this.add.text(0, -40, '...UNLESS...', {
      fontSize: '20px',
      color: '#ffff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    });
    hopeText.setOrigin(0.5);

    // THE BUTTON - retro arcade style
    const buttonBg = this.add.rectangle(0, 60, 480, 100, 0x00ff00);
    buttonBg.setStrokeStyle(8, 0xffff00);
    buttonBg.setInteractive({ useHandCursor: true });

    const buttonText = this.add.text(0, 50, '>> YES ON PROP 4 <<', {
      fontSize: '32px',
      color: '#000000',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center'
    });
    buttonText.setOrigin(0.5);

    const subText = this.add.text(0, 80, '[ PRESS TO ACTIVATE ]', {
      fontSize: '14px',
      color: '#000000',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    subText.setOrigin(0.5);

    const instructText = this.add.text(0, 140, '!!! CLICK TO DEFEAT LAW !!!', {
      fontSize: '12px',
      color: '#00ff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      align: 'center'
    });
    instructText.setOrigin(0.5);

    // Add everything to container
    this.prop4Container.add([panel, innerBorder, lossText, warningText, powerText, hopeText, buttonBg, buttonText, subText, instructText]);

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
      buttonBg.setFillStyle(0xffff00);
      buttonText.setColor('#ff0000');
      subText.setColor('#ff0000');
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0x00ff00);
      buttonText.setColor('#000000');
      subText.setColor('#000000');
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

    // Restore building
    this.tweens.add({
      targets: this.building,
      scale: 1.5,
      duration: 500,
      yoyo: true
    });

    // Victory message with retro style
    this.time.delayedCall(500, () => {
      const victoryText = this.add.text(width / 2, height / 2 - 100, '*** VICTORY! ***', {
        fontSize: '56px',
        color: '#00ff00',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      victoryText.setOrigin(0.5);

      const prop4Text = this.add.text(width / 2, height / 2 - 40, 'PROPOSITION 4', {
        fontSize: '24px',
        color: '#ffff00',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      prop4Text.setOrigin(0.5);

      const defeatedText = this.add.text(width / 2, height / 2 - 10, 'DEFEATS', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'BoldPixels, Courier New, monospace'
      });
      defeatedText.setOrigin(0.5);

      const lawText = this.add.text(width / 2, height / 2 + 20, 'MEMBER DEFERENCE!', {
        fontSize: '20px',
        color: '#ff00ff',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      lawText.setOrigin(0.5);

      const scoreText = this.add.text(width / 2, height / 2 + 60, 'SCORE: 01000', {
        fontSize: '28px',
        color: '#00ffff',
        fontFamily: 'BoldPixels, Courier New, monospace',
        fontStyle: 'bold'
      });
      scoreText.setOrigin(0.5);

      const perfectText = this.add.text(width / 2, height / 2 + 90, '[ PERFECT ]', {
        fontSize: '20px',
        color: '#ffff00',
        fontFamily: 'BoldPixels, Courier New, monospace'
      });
      perfectText.setOrigin(0.5);

      const menuText = this.add.text(width / 2, height / 2 + 130, '>> PRESS SPACE <<', {
        fontSize: '16px',
        color: '#00ff00',
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

      // Retro pixel "fireworks" effect
      for (let i = 0; i < 40; i++) {
        this.time.delayedCall(i * 50, () => {
          const pixel = this.add.rectangle(
            Phaser.Math.Between(100, width - 100),
            Phaser.Math.Between(150, height - 100),
            4, 4,
            i % 3 === 0 ? 0x00ff00 : i % 3 === 1 ? 0xff00ff : 0xffff00
          );
          this.tweens.add({
            targets: pixel,
            alpha: 0,
            scale: 3,
            duration: 1000
          });
        });
      }

      this.input.keyboard!.once('keydown-SPACE', () => {
        this.scene.start('MainMenu');
      });
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

