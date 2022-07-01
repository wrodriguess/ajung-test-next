import styles from '../styles/Card.module.css';

export default function Card({img, slug, productId}){
    return(
        <div className={styles.container}>
            <img src={img} alt={slug}/>
            <strong>{slug}</strong>
            <p>{productId}</p>
        </div>
    )
}