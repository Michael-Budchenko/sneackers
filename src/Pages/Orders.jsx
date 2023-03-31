import axios from "axios";
import React from "react";
import Card from "../Components/Card";

function Orders() {
  const [isLoading, setIsLoading] = React.useState(true);

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Помилка при запиты заказыв");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мої закази</h1>
      </div>
      <div className="d-flex flex-wrap">
	  {(isLoading ? [...Array(8)]: orders).map((item, index)=>(
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Orders;
