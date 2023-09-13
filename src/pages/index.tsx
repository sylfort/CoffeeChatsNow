import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import {
  SignIn,
  SignInButton,
  SignUp,
  SignUpButton,
  useUser,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

// type PostWithUsers = RouterOutputs["posts"]["getAll"][number];

// const PostView = (props: PostWithUsers) => {
//   const {post, author} = props;
//   return (
//     <div>
//       <p>{post}</p>
//       <p>By {author}</p>
//     </div>
//   )
// }

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  const { data } = api.posts.getAll.useQuery();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          {!isSignedIn && <SignInButton />}
          {!isSignedIn && <SignUpButton />}
          {!!isSignedIn && <SignOutButton />}

          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div>{data?.map((post) => <div>{post.content}</div>)}</div>
        </div>
      </main>
    </>
  );
}
