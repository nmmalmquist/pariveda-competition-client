import { createContext } from "react";

const CartContext = createContext({
    
    Cart: [],
    setCart: () => {}

})

export default CartContext;