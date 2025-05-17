import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import Card from '../Card/Card'
import { ItemsContext } from '../Context/Items'
import { fetchFromFirestore } from '../Firebase/Firebase'

function Home() {
    const [openModal, setModal] = useState(false) 
    const [openSell, setSell] = useState(false)

    function togglemodal() {
        setModal(!openModal) 
    }

    function toggmodalSell() {         
        setSell(!openSell)     
    }      

    const ItemsCtx = ItemsContext()      

    useEffect(() => {         
        const getItems = async () => {             
            const datas = await fetchFromFirestore()             
            ItemsCtx?.setItems(datas)         
        }         
        getItems()     
    }, [])      

    useEffect(() => {         
        console.log("updated items:", ItemsCtx.items);              
    }, [ItemsCtx.items])          

    return (         
        <>             
            <Navbar togglemodal={togglemodal} toggmodalSell={toggmodalSell} />             
            <Login toggleModal={togglemodal} status={openModal} />              
            <Sell setItems={ItemsCtx?.setItems} toggmodalSell={toggmodalSell} status={openSell} />             
            <Card items={ItemsCtx?.items || []}/>         
        </>     
    ) 
}  

export default Home