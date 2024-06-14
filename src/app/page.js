import { fetchAuthUserAction } from "@/actions";
import Image from "next/image";

export default async function Home() {

  const currentUser = await fetchAuthUserAction();

  return (
    <div>
      <h1>Next JS Authentication</h1>
      <h2>{currentUser?.data?.username}</h2>
      <p>{currentUser?.data?.email}</p>
    </div>
  );
}
