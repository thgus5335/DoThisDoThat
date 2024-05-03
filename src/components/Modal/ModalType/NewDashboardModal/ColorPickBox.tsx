import styles from './ColorPickBox.module.scss';
import Image from 'next/image';
import checkWhite from '@/src/assets/icons/checkWhite.svg';

interface ColorPickBoxProps {
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPickBox = ({ colors, selectedColor, onSelectColor }: ColorPickBoxProps) => {
  return (
    <div className={styles.colorContainer}>
      {colors.map((color, index) => (
        <button
          type="button"
          key={index}
          id={color}
          style={{
            backgroundColor: color,
            display: 'flex',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            width: '35px',
            height: '35px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => onSelectColor(color)}>
          {selectedColor === color && selectedColor && (
            <Image src={checkWhite} className={styles.checkIcon} alt="check" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorPickBox;
