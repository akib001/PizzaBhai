import React from 'react';

function UserOrderItem(props) {
  const orderedItems = props.items;

  let loadedItems = [];

  for (const key in orderedItems) {
    loadedItems.push({
      id: orderedItems[key].itemId,
      name: orderedItems[key].itemName,
      price: orderedItems[key].itemPrice,
      quantity: orderedItems[key].itemQuantity,
      totalPrice: orderedItems[key].itemTotalPrice,
    });
  }

  console.log(loadedItems);

  return (
    <section>
      {loadedItems.map((loadedItem) => (
          <React.Fragment key={loadedItem.id}>         
          <p>Name: {loadedItem.name}</p>
          <p>price: {loadedItem.price}</p>
          <p>quantity: {loadedItem.quantity}</p>
          <p>totalPrice: {loadedItem.totalPrice}</p>
        </React.Fragment>
      ))}
    </section>
  );
}

export default UserOrderItem;
