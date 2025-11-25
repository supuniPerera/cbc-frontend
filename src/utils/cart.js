export function loadCart(){
    let cartString = localStorage.getItem("cart")

     if(cartString == null){
        localStorage.setItem("cart", "[]")
        cartString = "[]"
    }

    const cart = JSON.parse(cartString)

    return cart
}

export function addToCart(product, quantity){
    let cart = loadCart()

    const existingItemIndex = cart.findIndex(
        (item)=>{
            return item.productId == product.productId
        }
    )

    if(existingItemIndex == -1){
        // item not in cart

        if(quantity<1){
            console.log("Quantity must be at least 1")
            return
        }

        const cartItem = {
            productId: product.productId,
            name: product.name,
            price: product.price,
            labellPrice: product.labellPrice,
            quantity: quantity,
            image: product.images[0]
        }
         cart.push(cartItem)

         }else{
        
        const existingItem = cart[existingItemIndex]

        const newQuantity = existingItem.quantity + quantity

        if(newQuantity<1){
            cart = cart.filter(
                (item)=>{
                    return item.productId != product.productId
                }
            )
        }else{
            cart[existingItemIndex].quantity = newQuantity
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart))
}
export function getTotal(){

    const cart = loadCart()
    
    let total = 0

    cart.forEach(
        (item)=>{
            total += item.price * item.quantity
        }
    )
    return total
}