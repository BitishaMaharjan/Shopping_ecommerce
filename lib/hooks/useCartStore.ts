import { create } from 'zustand'
import { OrderItems } from '../models/OderModel'

import {round2} from '../utils'
import {persist} from 'zustand/middleware'
type Cart = {
  items: OrderItems[]
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number

}
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
 
}

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore',
  })
)

export default function useCartService() {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    
  } = cartStore()
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    
    increase: (item: OrderItems) => {
      const exist = items.find((x) => x.slug === item.slug)
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }]
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems)
        cartStore.setState({
            items: updatedCartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          });
        },
        decrease: (item: OrderItems) => {
            const exist = items.find((x) => x.slug === item.slug)
            if (!exist) return
            const updatedCartItems =
              exist.qty === 1
                ? items.filter((x: OrderItems) => x.slug !== item.slug)
                : items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x))
            const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
              calcPrice(updatedCartItems)
            cartStore.setState({
              items: updatedCartItems,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
            })
          },
    }}
        
        const calcPrice = (items: OrderItems[]) => {
          const itemsPrice = round2(
            items.reduce((acc, item) => acc + item.price * item.qty, 0)
          ),
          shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
          taxPrice = round2(Number(0.15 * itemsPrice)),
          totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
          return { itemsPrice, shippingPrice, taxPrice, totalPrice };
        }
        