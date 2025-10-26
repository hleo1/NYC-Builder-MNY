import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainMenu from '../scenes/MainMenu';
import Article78Game from '../scenes/Article78Game';
import FARGame from '../scenes/FARGame';
import MemberDeferenceGame from '../scenes/MemberDeferenceGame';

interface PhaserGameProps {
  width?: number;
  height?: number;
}

const PhaserGame: React.FC<PhaserGameProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current) return;

    // Phaser game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: parentRef.current,
      backgroundColor: '#000000',
      scene: [MainMenu, Article78Game, FARGame, MemberDeferenceGame],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      render: {
        antialiasGL: true,
        antialias: true,
        roundPixels: false,
        pixelArt: false
      }
    };

    // Create the game instance
    gameRef.current = new Phaser.Game(config);

    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [width, height]);

  return (
    <div 
      ref={parentRef} 
      style={{ 
        width: '100%', 
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
    />
  );
};

export default PhaserGame;

