import Head from 'next/head'
import {useState, useEffect} from 'react'

import styles from '../styles/Home.module.css'
import api from '../services/api'
import Card from '../components/Card'
import Navbar from '../components/Navbar'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [slugActived, setSlugActived] = useState('');

  useEffect(() => {
    loadProducts();
  }, [slugActived])

  async function loadProducts(){
      await api.get(`/products/category/${slugActived}`, {headers: {'appKey': 'yDY5qu106qdgj7iBJm9j1biHH8v7sTO6WPPe29vY'}})
          .then(response => {
              setProducts(response.data.products.data);
          })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ajung Solution - NextJS</title>
        <meta name="description" content="Front-end test with nextjs" />
      </Head>

      <Navbar clickCategory={setSlugActived}/>

      <div className={styles.cards}>
        {products.length > 0 ?
          products.map(product => (
            <Card key={product.id} img={product.imagem.image_asset} slug={product.name} productId={product.code}/> 
          ))
        :
          <div className="selectCategory">
            <h2>Selecione uma categoria</h2>
          </div>
        }
      </div>
    </div>
  )
}
