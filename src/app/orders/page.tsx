import OrderTable from "@/components/table/OrderTable";
import React, { Suspense } from "react";
import Loading from "../loading";

const Orders = () => {
  return (
    <div className="page">
      <h1 className="title">Siparişler</h1>

      <Suspense fallback={<Loading designs="my-20" />}>
        <OrderTable />
      </Suspense>
    </div>
  );
};

export default Orders;
