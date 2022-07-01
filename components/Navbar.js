import {useState, useEffect} from 'react';
import { FaAlignLeft, FaAngleRight, FaBars, FaAngleDown } from "react-icons/fa";
import Link from 'next/link'

export default function Navbar(){
    const [categories, setCategories] = useState([]);
    const [openSubMenu, setOpenSubMenu] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories(){
        const res = await fetch('https://asia.ajung.site/api/categories', {headers: {'appKey': 'yDY5qu106qdgj7iBJm9j1biHH8v7sTO6WPPe29vY'}})
        const data = await res.json();
        setCategories(data)        
    }

    function ucfirst(text){
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    function toggleSubmenu(id){
        let res = document.querySelectorAll('.subcat')
        for(let i = 0; i < res.length; i++){
            res[i].style.display = 'none'
        }
        
        setOpenSubMenu(null)

        if(id){
            setOpenSubMenu(id)
            document.getElementById(`sub${id}`).style.display = 'block' 
        } 
        
        if(openSubMenu === id){
            setOpenSubMenu(null)
            document.getElementById(`sub${id}`).style.display = 'none' 
        }
    }

    function toggleMenuMobile(){
        const nav = document.querySelector('.nav');
        nav.classList.toggle('active');
    }

    return(
        <div>
            <button className="btnMobile" onClick={toggleMenuMobile}><FaBars/></button>

            <nav className="nav">
                <ul className="menu">
                    <div className="menuTitle">
                        <FaAlignLeft/>
                        <p>Categorias</p>
                    </div>

                    {categories.map(category => (
                        <li key={category.id}>
                            {category.categories.length > 0 &&
                                <>
                                    <button className="button" onClick={() => {toggleSubmenu(category.id);}}>
                                        <div className="subitemContainer">
                                            {ucfirst(category.name)}
                                            {openSubMenu == category.id ? <FaAngleDown/> : <FaAngleRight/>}
                                        </div>
                                    </button>

                                    <ul className="subcat" id={`sub${category.id}`}>
                                        {category.categories.map(subcategory => (
                                            <li key={subcategory.id}>
                                                <Link href={`/category/${subcategory.slug}`}>
                                                    <button className="button" onClick={() => {
                                                                        // clickCategory();
                                                                        toggleMenuMobile();
                                                                    }}>
                                                        {ucfirst(subcategory.name)}
                                                    </button>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            }

                            {category.categories.length == 0 &&
                                <Link href={`/category/${category.slug}`}>
                                    <button className="button" onClick={() => {
                                                            // clickCategory(category.slug);
                                                            toggleMenuMobile();
                                                            toggleSubmenu();
                                                        }}>
                                        {ucfirst(category.name)}
                                    </button>
                                </Link>
                            }
                        </li>
                    ))}
                </ul>
            </nav>   
        </div>
    )
}