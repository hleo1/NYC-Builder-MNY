import BaseGame from './BaseGame';

export default class Article78Game extends BaseGame {
  private slowdownFactor: number = 1.0;
  private minSpeed: number = 20;
  private baseLawSpeedFactor: number = 1.0; // Reduces with each collision
  private initialBaseLawSpeed: number = 200; // Starting base law speed (matches building speed)
  private huntTimer: number = 0; // Tracks time since last collision

  constructor() {
    super({ key: 'Article78Game' });
  }

  protected getGameTitle(): string {
    return 'ARTICLE 78';
  }

  protected getLawLabel(): string {
    return 'ARTICLE 78';
  }

  protected setupGameSpecifics(): void {
    const { width, height } = this.cameras.main;
    
    // Reset game-specific variables
    this.slowdownFactor = 1.0;
    this.baseLawSpeedFactor = 1.0;
    this.huntTimer = 0;
    
    // Set initial law speed to 90% of base speed
    this.baseLawSpeed = this.initialBaseLawSpeed * this.baseLawSpeedFactor;
    this.lawSpeed = this.baseLawSpeed * 0.9;
    
    const subtitle = this.add.text(width / 2, 85, 'SLOWDOWN LAW - AVOID CONTACT', {
      fontSize: '32px',
      color: '#d4a574',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    subtitle.setOrigin(0.5);

    // Tint the law scroll red
    this.law.setTint(0xff9999);

    // Spawn law further away from player for Article 78 (easier difficulty)
    this.law.setPosition(80, height - 100);
  }

  protected onCollision(): void {
    // Slow down the building
    this.slowdownFactor *= 0.85;
    this.buildingSpeed = Math.max(this.minSpeed, 200 * this.slowdownFactor);

    // Reduce base law speed (same rate as building slowdown)
    this.baseLawSpeedFactor *= 0.85;
    this.baseLawSpeed = this.initialBaseLawSpeed * this.baseLawSpeedFactor;
    
    // Reset hunt timer and start at 90% of new base speed
    this.huntTimer = 0;
    this.lawSpeed = this.baseLawSpeed * 0.9;

    // Visual feedback
    this.cameras.main.shake(100, 0.002);
    
    // Flash the building red
    this.building.setTint(0xff0000);
    this.time.delayedCall(200, () => {
      this.building.clearTint();
    });

    // Push law back further for easier gameplay
    const angle = Phaser.Math.Angle.Between(
      this.building.x, this.building.y,
      this.law.x, this.law.y
    );
    this.law.x = this.building.x + Math.cos(angle + Math.PI) * 200;
    this.law.y = this.building.y + Math.sin(angle + Math.PI) * 200;
  }

  protected updateGameSpecifics(): void {
    // Update hunt timer (time since last collision)
    this.huntTimer += 0.016; // Roughly 1/60th of a second per frame
    
    // Calculate law speed: 90% to 110% of base speed over 5 seconds
    const speedProgress = Math.min(this.huntTimer / 5.0, 1.0); // 0 to 1 over 5 seconds
    const speedMultiplier = 0.9 + (0.2 * speedProgress); // 0.9 to 1.1
    this.lawSpeed = this.baseLawSpeed * speedMultiplier;
    
    // Update score based on speed
    this.score = this.slowdownFactor * 100;
    this.scoreText.setText(`SCORE: ${Math.round(this.score)}`);

    // Check if building is frozen (too slow)
    if (this.buildingSpeed <= this.minSpeed + 5) {
      this.endGame(false);
    }
  }
}

