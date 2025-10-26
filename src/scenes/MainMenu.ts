import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    // Preload game assets
    this.load.image('building', 'Building.png');
    this.load.image('script', 'Script.png');
    this.load.image('logo', 'logo.png');

    // Load WebFont library for custom font
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  init() {
    // Wait for custom font to load
    const fontPromise = document.fonts?.load
      ? Promise.all([
          document.fonts.load('64px "BoldPixels"'),
          document.fonts.load('48px "BoldPixels"'),
          document.fonts.load('32px "BoldPixels"'),
          document.fonts.load('24px "BoldPixels"'),
          document.fonts.load('16px "BoldPixels"'),
        ])
      : Promise.resolve();

    return fontPromise;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Set retro background color (dark blue like old CRT monitors)
    this.cameras.main.setBackgroundColor('#000033');

    // Add scanline effect overlay
    this.createScanlineEffect(width, height);

    // Add Maximum New York logo - smaller and higher
    const logo = this.add.image(width / 2, 70, 'logo');
    logo.setOrigin(0.5);
    logo.setScale(0.35); // Smaller to save space

    // Add retro title text - moved down slightly
    const title = this.add.text(width / 2, 165, 'NYC BUILDER', {
      fontSize: '48px',
      color: '#00ff00',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    const year = this.add.text(width / 2, 210, '**  2 0 2 5  **', {
      fontSize: '24px',
      color: '#ff00ff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    year.setOrigin(0.5);

    // Blinking Maximum New York branding
    const branding = this.add.text(width / 2, 245, '>> MAXIMUM NEW YORK <<', {
      fontSize: '14px',
      color: '#ffff00',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    branding.setOrigin(0.5);
    this.tweens.add({
      targets: branding,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Add subtitle with retro spacing
    const subtitle = this.add.text(width / 2, 275, '= SELECT LEVEL =', {
      fontSize: '16px',
      color: '#00ffff',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    subtitle.setOrigin(0.5);

    // Create Article 78 button - better spacing
    this.createMenuButton(
      width / 2, 
      height / 2 + 20, 
      '▼ ARTICLE 78',
      'SLOWDOWN LAW',
      '#00ff00',
      '#00ff77',
      () => this.scene.start('Article78Game')
    );

    // Create FAR button
    this.createMenuButton(
      width / 2, 
      height / 2 + 105, 
      '◄► F.A.R.',
      'SHRINK LAW',
      '#00ffff',
      '#00dddd',
      () => this.scene.start('FARGame')
    );

    // Create Member Deference button
    this.createMenuButton(
      width / 2, 
      height / 2 + 190, 
      '☠ MEMBER DEFERENCE',
      'INSTANT DEATH',
      '#ff00ff',
      '#ff77ff',
      () => this.scene.start('MemberDeferenceGame')
    );

    // Add retro footer - moved up slightly for better balance
    const footer = this.add.text(width / 2, height - 75, '[  ARROW KEYS TO MOVE  ]', {
      fontSize: '18px',
      color: '#00ff00',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    footer.setOrigin(0.5);

    const infoText = this.add.text(width / 2, height - 48, 'SURVIVE THE LAWS // SAVE THE BUILDINGS', {
      fontSize: '16px',
      color: '#ff00ff',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    infoText.setOrigin(0.5);

    // Add retro "PRESS START" style credits
    const credits = this.add.text(width / 2, height - 20, 'C 2025 MAX NY', {
      fontSize: '11px',
      color: '#666666',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    credits.setOrigin(0.5);

    // Add retro pixel grid background
    this.createRetroGrid(width, height);
    
    // Add animated retro stars/pixels in background
    for (let i = 0; i < 30; i++) {
      const pixel = this.add.rectangle(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(0, height),
        2, 2,
        i % 3 === 0 ? 0x00ff00 : i % 3 === 1 ? 0xff00ff : 0x00ffff
      );
      pixel.setAlpha(0.5);
      
      this.tweens.add({
        targets: pixel,
        alpha: 0,
        duration: Phaser.Math.Between(1000, 3000),
        repeat: -1,
        yoyo: true
      });
    }
  }

  private createScanlineEffect(width: number, height: number) {
    // Create CRT scanline effect
    for (let i = 0; i < height; i += 4) {
      const line = this.add.rectangle(0, i, width, 2, 0x000000, 0.3);
      line.setOrigin(0);
    }
  }

  private createRetroGrid(width: number, height: number) {
    // Create retro grid lines
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x00ff00, 0.1);
    
    // Vertical lines
    for (let x = 0; x < width; x += 40) {
      graphics.lineBetween(x, 0, x, height);
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += 40) {
      graphics.lineBetween(0, y, width, y);
    }
    
    graphics.strokePath();
  }

  private createMenuButton(
    x: number, 
    y: number, 
    text: string, 
    subtitle: string,
    color: string, 
    hoverColor: string,
    onClick: () => void
  ) {
    const container = this.add.container(x, y);

    // Retro button background with pixel border
    const buttonBg = this.add.rectangle(0, 0, 500, 70, parseInt(color.replace('#', '0x')));
    buttonBg.setStrokeStyle(4, parseInt(hoverColor.replace('#', '0x')));
    buttonBg.setInteractive({ useHandCursor: true });

    // Pixel corners for retro effect
    const cornerSize = 8;
    const corners = [
      this.add.rectangle(-250 + cornerSize/2, -35 + cornerSize/2, cornerSize, cornerSize, 0x000000),
      this.add.rectangle(250 - cornerSize/2, -35 + cornerSize/2, cornerSize, cornerSize, 0x000000),
      this.add.rectangle(-250 + cornerSize/2, 35 - cornerSize/2, cornerSize, cornerSize, 0x000000),
      this.add.rectangle(250 - cornerSize/2, 35 - cornerSize/2, cornerSize, cornerSize, 0x000000)
    ];

    // Button text with retro font
    const buttonText = this.add.text(0, -8, text, {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold'
    });
    buttonText.setOrigin(0.5);

    // Subtitle with retro spacing
    const subtitleText = this.add.text(0, 18, '[ ' + subtitle + ' ]', {
      fontSize: '12px',
      color: '#000000',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    subtitleText.setOrigin(0.5);

    container.add([buttonBg, ...corners, buttonText, subtitleText]);

    // Retro hover effects - glitch-style
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(parseInt(hoverColor.replace('#', '0x')));
      buttonText.setColor('#ffffff');
      subtitleText.setColor('#ffffff');
      
      // Glitch effect
      this.tweens.add({
        targets: container,
        x: x + 2,
        duration: 50,
        yoyo: true,
        repeat: 2
      });
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(parseInt(color.replace('#', '0x')));
      buttonText.setColor('#000000');
      subtitleText.setColor('#000000');
    });

    buttonBg.on('pointerdown', onClick);

    return container;
  }

  update() {
    // Game loop - runs every frame
  }
}

