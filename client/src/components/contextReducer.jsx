import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer=(currItem,action)=>{
    let newData=[];
    switch (action.type) {
        case "ADD":
            newData=[...currItem,{ id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
            
            break;
        
        case "REMOVE":
            let newArr = [...currItem]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...currItem]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                    return arr
            })
                return arr
        case "DROP":
            let empArray = []
            return empArray
        
        default:
            break;
    }
    
    return newData;

}

export default function CartProvider({children}) {
    
    const[state,dispatch]=useReducer(reducer,[]);

    return (
    
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}

export const useCart=()=> useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);

