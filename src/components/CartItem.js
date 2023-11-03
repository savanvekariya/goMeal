import React, { useContext, useEffect, useCallback } from "react";
import { itemContext } from "../App";

function CartItem(props) {
  const item = props.item;
  const iL = useContext(itemContext);
  const { list } = iL.state;
  const [fromDate, setFromDate] = React.useState(item.fromDate);
  const [toDate, setToDate] = React.useState(item.toDate);
  const [diffDays, setDiffDays] = React.useState(
    item.diffDays === 0 ? 1 : item.diffDays
  );
  // const [subTotal, setSubTotal] = React.useState(0);

  const handleDateField = (e) => {
    console.log("e", e, list, item);
    const target = e.target;
    let from, to;
    if (
      target.id === "from-date" &&
      target.value >= new Date().toISOString().split("T")[0]
    ) {
      setFromDate(target.value);
      // from = target.value;
      // to = toDate;
      item["fromDate"] = target.value;
      // item['toDate'] = to;
    } else if (
      target.id === "to-date" &&
      target.value >= new Date().toISOString().split("T")[0]
    ) {
      setToDate(target.value);
      // from = fromDate;
      // to = target.value;
      // item['fromDate'] = from;
      item["toDate"] = target.value;
    }
    from = new Date(item.fromDate);
    to = new Date(item.toDate);
    const diffTime = Math.abs(to - from);
    const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setDiffDays(diff);
    // console.log('date', fromDate, toDate, diffDays);
    item["diffDays"] = diff;
    console.log("car***", from, to, item);
    iL.method({ type: "totalCost" });
    iL.method({ type: "updateItems" });
    // iL.method({type:'addItem',payload:item})
  };

  // useEffect(() => {
  //     setSubTotal(item.quantity * item.price * diffDays);
  //     console.log('sub', subTotal)
  // }, [diffDays]);

  const increment = (data) => {
    iL.method({ type: "addItem", payload: data });
    iL.method({ type: "getTotalItems" });
    iL.method({ type: "totalCost" });
  };

  const decrement = (data) => {
    iL.method({ type: "deleteItem", payload: data });

    if (list && list.length) {
      iL.method({ type: "getTotalItems" });
      iL.method({ type: "totalCost" });
    }
  };

  return (
    <React.Fragment>
      <td className="h5">{item.itemName}</td>
      <td>&#8364;{item.quantity * item.price * diffDays}</td>
      <td>
        <label>From:</label>
        <input
          type="date"
          id="from-date"
          value={item.fromDate}
          onChange={handleDateField}
          min={new Date().toISOString().split("T")[0]}
        ></input>
      </td>
      <td>
        <label>To:</label>
        <input
          type="date"
          id="to-date"
          value={item.toDate}
          onChange={handleDateField}
          min={new Date().toISOString().split("T")[0]}
        ></input>
      </td>
    </React.Fragment>
  );
}

export default CartItem;
