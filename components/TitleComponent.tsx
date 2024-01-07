import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

interface Props {
  user: UserProfile;
}

const TitleComponent = (props: Props) => {
  return (
    <div className="flex flex-col items-center my-10">
      <Link
        href="/"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          flaska
        </h1>
      </Link>
      
      <h3 className="flex flex-col items-center text-l font-semibold mt-5">
        <p className="">Välkommen, {props.user.name}!</p>
        <a className="hover:underline text-gray-500" href="/api/auth/logout">Logga ut</a>
      </h3>
    </div>
  )
}

export default TitleComponent