import UserTable from "@/components/table/UserTable";
import { Suspense } from "react";
import Loading from "../loading";
import UserModal from "@/components/modal/UserModal";

type Props = {
  searchParams: Promise<{ show?: string }>;
};
const Users = async ({ searchParams }: Props) => {
  const { show } = await searchParams;
  return (
    <div className="page">
      <h1 className="title">Kullanıcılar</h1>
      <Suspense fallback={<Loading designs="my-30" />}>
        <UserTable />
      </Suspense>

      {show && <UserModal userId={show} />}
    </div>
  );
};

export default Users;
