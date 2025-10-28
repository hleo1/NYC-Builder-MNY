import BaseGame from './BaseGame';

export default class FARGame extends BaseGame {
  private buildingScale: number = 0.15;
  private minScale: number = 0.03;
  private collisionCount: number = 0;
  private huntTimer: number = 0; // Tracks time since last collision

  constructor() {
    super({ key: 'FARGame' });
  }

  protected getGameTitle(): string {
    return 'F.A.R. LIMIT';
  }

  protected getLawLabel(): string {
    return 'F.A.R.';
  }

  protected setupGameSpecifics(): void {
    const { width } = this.cameras.main;
    
    // Reset game-specific variables
    this.buildingScale = 0.15;
    this.collisionCount = 0;
    this.huntTimer = 0;
    this.building.setScale(this.buildingScale); // Reset building size
    
    // Set initial law speed to 90% of building speed
    this.lawSpeed = this.buildingSpeed * 0.9;
    
    const subtitle = this.add.text(width / 2, 85, 'SHRINK LAW - DON\'T DISAPPEAR', {
      fontSize: '32px',
      color: '#d4a574',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    subtitle.setOrigin(0.5);

    // Tint the law scroll blue
    this.law.setTint(0x99ccff);
    
    // Spawn law further away from the building
    const { height } = this.cameras.main;
    this.law.setPosition(100, height - 150);
  }

  protected onCollision(): void {
    // Increment collision counter
    this.collisionCount++;
    
    // Shrink the building
    this.buildingScale *= 0.85;
    const newScale = Math.max(this.minScale, this.buildingScale);
    this.building.setScale(newScale);

    // Reset hunt timer and law speed to 90% of building speed
    this.huntTimer = 0;
    this.lawSpeed = this.buildingSpeed * 0.9;

    // Visual feedback
    this.cameras.main.shake(100, 0.003);
    
    // Flash the building red
    this.building.setTint(0xff0000);
    this.time.delayedCall(200, () => {
      this.building.clearTint();
    });

    // Push law back further after collision
    const angle = Phaser.Math.Angle.Between(
      this.building.x, this.building.y,
      this.law.x, this.law.y
    );
    this.law.x = this.building.x + Math.cos(angle + Math.PI) * 250;
    this.law.y = this.building.y + Math.sin(angle + Math.PI) * 250;

    // End game after 10 collisions
    if (this.collisionCount >= 10) {
      this.endGame(false);
    }
  }

  protected updateGameSpecifics(): void {
    // Update hunt timer (time since last collision)
    this.huntTimer += 0.016; // Roughly 1/60th of a second per frame
    
    // Calculate law speed: 90% to 110% of building speed over 5 seconds
    const speedProgress = Math.min(this.huntTimer / 5.0, 1.0); // 0 to 1 over 5 seconds
    const speedMultiplier = 0.9 + (0.2 * speedProgress); // 0.9 to 1.1
    this.lawSpeed = this.buildingSpeed * speedMultiplier;
    
    // Update score based on size (normalized to 0-100 range)
    this.score = (this.buildingScale / 0.15) * 100;
    this.scoreText.setText(`SCORE: ${Math.round(this.score)}`);
  }
}

