import styles from './Cards.module.scss';


export const Cards = props => {
  return (
    <div className={styles.cards}>
      <div className={styles['cards__inner']}>
        <div className={styles['card']}>
          <video src="/videos/zuck.mp4" autoPlay playsInline loop muted/>
        </div>
        <div className={styles['card']}>
          <img src="/doge-meme@2x.jpg" alt=""/>
        </div>
        <div className={styles['card']}>
          <img src="/doge-meme1@2x.jpg" alt=""/>
        </div>
        <div className={styles['card']}>
          <img src="/doge-meme2@2x.jpg" alt=""/>
        </div>
        <div className={styles['card']}>
          <img src="/doge-meme3@2x.jpg" alt=""/>
        </div>
        <div className={styles['card']}>
          <img src="/doge-meme5@2x.jpg" alt=""/>
        </div>
      </div>
    </div>
  )
}