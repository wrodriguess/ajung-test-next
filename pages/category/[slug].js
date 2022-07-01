import Card from '../../components/Card'
import styles from '../../styles/Category.module.css'

export async function getServerSideProps(context){    
    const slug = context.query.slug
    const res = await fetch(`https://asia.ajung.site/api/products/category/${slug}`, {headers: {'appKey': 'yDY5qu106qdgj7iBJm9j1biHH8v7sTO6WPPe29vY'}})
    const data = await res.json();

    return{
        props: {
            slug,
            products: data.products.data
        },
    }
}

function Category({products}){
    return(
        <div className={styles.cards}>
            {products.map(product => (
                <Card key={product.id} img={product.imagem.image_asset} slug={product.name} productId={product.code}/> 
            ))}
        </div>
    )
}

export default Category