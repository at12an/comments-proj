import React, { useState, useEffect } from 'react';

const MovingImage = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotation, flipRotation] = useState(1)

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setPositionY((prevPositionY) => prevPositionY - 30);
        // flipRotation()
        break;
      case 'ArrowDown':
        setPositionY((prevPositionY) => prevPositionY + 30);
        // flipRotation(1)
        break;
      case 'ArrowLeft':
        setPositionX((prevPositionX) => prevPositionX - 30);
        flipRotation((prevPositionY) => prevPositionY * -1)
        break;
      case 'ArrowRight':
        setPositionX((prevPositionX) => prevPositionX + 30);
        flipRotation((prevPositionY) => prevPositionY * -1)
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const imageStyle = {
    position: 'absolute',
    top: `${positionY}px`,
    left: `${positionX}px`,
    transform: `scaleX(${rotation})`,
    transition: 'top 0.1s ease-in-out, left 0.1s ease-in-out'
  };

  return (
    <div>
      <img
        src="https://cdn.discordapp.com/attachments/371219646109712394/1146370319779635251/suck1-removebg-preview.png"
        alt="Moving Image"
        style={imageStyle}
      />
    </div>
  );
};

export default MovingImage;