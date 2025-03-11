
import React from 'react';
import QRCodeLib from 'react-qr-code';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  className?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 128,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  level = 'L',
  className,
}) => {
  return (
    <div className={className}>
      <QRCodeLib
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
      />
    </div>
  );
};

export default QRCode;
