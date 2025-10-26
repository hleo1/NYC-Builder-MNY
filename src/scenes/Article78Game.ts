import BaseGame from './BaseGame';

export default class Article78Game extends BaseGame {
  private slowdownFactor: number = 1.0;
  private minSpeed: number = 20;

  constructor() {
    super({ key: 'Article78Game' });
  }

  protected getGameTitle(): string {
    return '>> ARTICLE 78 <<';
  }

  protected getLawLabel(): string {
    return 'ARTICLE 78';
  }

  protected setupGameSpecifics(): void {
    const { width, height } = this.cameras.main;
    
    const subtitle = this.add.text(width / 2, 105, '[ SLOWDOWN LAW // AVOID CONTACT ]', {
      fontSize: '12px',
      color: '#ff00ff',
      fontFamily: 'BoldPixels, Courier New, monospace'
    });
    subtitle.setOrigin(0.5);

    // Tint the law scroll red
    this.law.setTint(0xff6666);

    // Spawn law further away from player for Article 78 (easier difficulty)
    this.law.setPosition(80, height - 100);
  }

  protected onCollision(): void {
    // Slow down the building
    this.slowdownFactor *= 0.85;
    this.buildingSpeed = Math.max(this.minSpeed, 200 * this.slowdownFactor);

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
    // Update score based on speed
    this.score = this.slowdownFactor * 100;
    this.scoreText.setText(`SCR:${Math.round(this.score).toString().padStart(3, '0')}`);

    // Check if building is frozen (too slow)
    if (this.buildingSpeed <= this.minSpeed + 5) {
      this.endGame(false);
    }
  }
}

