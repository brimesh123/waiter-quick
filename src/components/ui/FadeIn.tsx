
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  duration?: 'fast' | 'normal' | 'slow';
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 'normal',
  delay = 0,
  className = '',
  direction = 'up',
  distance = 20,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = domRef.current;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && current) {
            observer.unobserve(current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      });
    });
    
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [once]);

  const durationClass = {
    fast: 'duration-300',
    normal: 'duration-500',
    slow: 'duration-700',
  }[duration];

  const getTransformValue = () => {
    if (direction === 'none') return '';
    const directionMap = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
    };
    return directionMap[direction] || '';
  };

  return (
    <div
      ref={domRef}
      className={cn(
        'transition-all',
        durationClass,
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getTransformValue(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
