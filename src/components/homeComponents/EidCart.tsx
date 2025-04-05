
"use client"
import { useState } from 'react';
import Countdown from './CountDown';


interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export default function EidCart() {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: 'Pizza', quantity: 2 },
    { id: 2, name: 'Burger', quantity: 1 },
  ]);

  const handleExpire = () => {
    setIsExpired(true);
    setCart([]); // Clear cart
  };

  return (
   <div className='w-11/12 mx-auto'>
     <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">Eid Cart</h1>

      {!isExpired && <Countdown onExpire={handleExpire} />}

      {isExpired ? (
        <p className="text-red-500 mt-4">⏳ Your cart has expired!</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="border p-2 rounded shadow">
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
   </div>
  );
}
