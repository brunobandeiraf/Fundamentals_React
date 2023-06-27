import styles from './Avatar.module.css'

// Se não vier param no hasBorder, assume como true
export function Avatar({ hasBorder = true, src }) {
  return (
    //Se hasBorder é true, chama a styles.avatarWithBorder
    // Se hasBorder é false, chama styles.avatar
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}