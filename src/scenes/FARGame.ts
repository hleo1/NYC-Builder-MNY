import BaseGame from './BaseGame';

export default class FARGame extends BaseGame {
  private buildingScale: number = 0.15;
  private minScale: number = 0.03;

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
    this.building.setScale(this.buildingScale); // Reset building size
    
    const subtitle = this.add.text(width / 2, 85, 'SHRINK LAW - DON\'T DISAPPEAR', {
      fontSize: '32px',
      color: '#d4a574',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    subtitle.setOrigin(0.5);

    // Tint the law scroll blue
    this.law.setTint(0x99ccff);
  }

  protected onCollision(): void {
    // Shrink the building
    this.buildingScale *= 0.85;
    const newScale = Math.max(this.minScale, this.buildingScale);
    this.building.setScale(newScale);

    // Visual feedback
    this.cameras.main.shake(100, 0.003);
    
    // Flash the building red
    this.building.setTint(0xff0000);
    this.time.delayedCall(200, () => {
      this.building.clearTint();
    });

    // Push law back slightly
    const angle = Phaser.Math.Angle.Between(
      this.building.x, this.building.y,
      this.law.x, this.law.y
    );
    this.law.x = this.building.x + Math.cos(angle + Math.PI) * 100;
    this.law.y = this.building.y + Math.sin(angle + Math.PI) * 100;

    // Check if building is too small
    if (this.buildingScale <= this.minScale + 0.05) {
      this.endGame(false);
    }
  }

  protected updateGameSpecifics(): void {
    // Update score based on size (normalized to 0-100 range)
    this.score = (this.buildingScale / 0.15) * 100;
    this.scoreText.setText(`SCORE: ${Math.round(this.score)}`);
  }
}

