import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
  // Individual scale settings for each icon (adjust as needed)

  private multipler = 0.85;
  private iconScales = {
    article78: 0.95 * this.multipler,
    far: 1 * this.multipler,
    memberDeference: 0.21 * this.multipler
  };

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    // Preload game assets
    this.load.image('building', 'Building.png');
    this.load.image('script', 'Script.png');
    this.load.image('logo', 'logo.png');

    // Load background
    this.load.image('mainMenuBackground', 'main-menu-background.png');

    // Load game icons
    this.load.image('article78Icon', 'icons/Article 78 Icon.png');
    this.load.image('farIcon', 'icons/FAR Icon.png');
    this.load.image('memberDeferenceIcon', 'icons/Member Deference.png');

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

    // Add main menu background image
    const background = this.add.image(width / 2, height / 2, 'mainMenuBackground');
    background.setOrigin(0.5);
    
    // Scale background to fit the canvas (should be 1:1 now)
    const scaleX = width / background.width;
    const scaleY = height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale);

    // Create the three game icons horizontally centered
    const iconY = height * 0.74; // 74% down the screen (bottom half)
    
    // Horizontally center the icons - evenly distributed around center
    const icon1X = width * 0.25; // 25% from left
    const icon2X = width * 0.50; // Center
    const icon3X = width * 0.78; // 75% from left (25% from right)

    // Article 78 Icon
    this.createGameIcon(
      icon1X,
      iconY,
      'article78Icon',
      'ARTICLE 78',
      this.iconScales.article78,
      () => this.scene.start('Article78Game')
    );

    // FAR Icon
    this.createGameIcon(
      icon2X,
      iconY,
      'farIcon',
      'FAR',
      this.iconScales.far,
      () => this.scene.start('FARGame')
    );

    // Member Deference Icon
    this.createGameIcon(
      icon3X,
      iconY,
      'memberDeferenceIcon',
      'MEMBER DEFERENCE',
      this.iconScales.memberDeference,
      () => this.scene.start('MemberDeferenceGame')
    );
  }

  private createGameIcon(
    x: number,
    y: number,
    iconKey: string,
    label: string,
    scale: number,
    onClick: () => void
  ) {
    const container = this.add.container(x, y);

    // Create yellow glow (initially invisible)
    const glow = this.add.circle(0, 0, 80, 0xffff00, 0);
    glow.setBlendMode(Phaser.BlendModes.ADD);

    // Create the icon
    const icon = this.add.image(0, 0, iconKey);
    icon.setOrigin(0.5);
    icon.setScale(scale);
    icon.setInteractive({ useHandCursor: true });

    // Store references for scaling
    icon.setData('baseScale', scale);
    icon.setData('glow', glow);

    // Create label below the icon
    const labelText = this.add.text(0, 120, label, {
      fontSize: '40px',
      color: '#ffffff',
      fontFamily: 'BoldPixels, Courier New, monospace',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: 210, useAdvancedWrap: true }
    });
    labelText.setOrigin(0.5);

    container.add([glow, icon, labelText]);

    // Hover effects
    icon.on('pointerover', () => {
      // Show yellow glow
      this.tweens.add({
        targets: glow,
        alpha: 0.6,
        duration: 200
      });

      // Enlarge icon
      this.tweens.add({
        targets: icon,
        scale: icon.getData('baseScale') * 1.15,
        duration: 200,
        ease: 'Back.easeOut'
      });

      // Enlarge and highlight label
      labelText.setColor('#ffff00');
      this.tweens.add({
        targets: labelText,
        scale: 1.1,
        duration: 200,
        ease: 'Back.easeOut'
      });
    });

    icon.on('pointerout', () => {
      // Hide glow
      this.tweens.add({
        targets: glow,
        alpha: 0,
        duration: 200
      });

      // Return to normal size
      this.tweens.add({
        targets: icon,
        scale: icon.getData('baseScale'),
        duration: 200,
        ease: 'Back.easeIn'
      });

      // Reset label color and size
      labelText.setColor('#ffffff');
      this.tweens.add({
        targets: labelText,
        scale: 1,
        duration: 200,
        ease: 'Back.easeIn'
      });
    });

    icon.on('pointerdown', onClick);

    return container;
  }

  update() {
    // Game loop - runs every frame
  }
}

