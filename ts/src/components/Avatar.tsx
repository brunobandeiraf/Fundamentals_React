import { ImgHTMLAttributes } from "react";
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean; //Propriedade opcional - recebe ? 
}

// Se não vier param no hasBorder, assume como true
export function Avatar({ hasBorder = true, ...props}: AvatarProps) {
  return (
    //Se hasBorder é true, chama a styles.avatarWithBorder
    // Se hasBorder é false, chama styles.avatar
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}