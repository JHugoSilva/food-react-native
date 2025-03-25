import { createContext, useEffect, useState } from 'react'

const CartContext = createContext({})

function CartProvider(props) {

    const [itens, setItens] = useState([])
    const [entrega, setEntrega] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [empresa, setEmpresa] = useState(0)

    const addItem = (item) => {
        let novoItens = itens
        novoItens.push(item)
        
        setItens(novoItens)
    }

    const calculaValores = () => {
        const subTotalTemp = itens.reduce((prev, atual) => {
            return prev + atual.vl_total
        },0)

        setSubTotal(subTotalTemp)
        setTotal(subTotalTemp + entrega)
    }

    useEffect(()=>{
        calculaValores()
    },[itens])

    return <CartContext.Provider value={{ 
        itens, setItens, 
        entrega, setEntrega, 
        subTotal, setSubTotal, 
        total, setTotal, addItem, 
        empresa, setEmpresa, calculaValores }}>
        {props.children}
    </CartContext.Provider>
}

export { CartProvider, CartContext }