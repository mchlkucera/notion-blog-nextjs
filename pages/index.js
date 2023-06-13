import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text, getPageSlug } from "./[id].js";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
   const year = new Date().getFullYear();
   const dateOptions = {
      year: "numeric",
      month: "long",
   };

   return (
      <div>
         <Head>
            <title>Martin Kučera</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className="m-auto max-w-2xl ">
            <header className="my-8 mt-16 text-gray-400">
               <Link className="text-xl hover:underline" href="/">
                  Martin Kučera
               </Link>
            </header>

            <div className="flex flex-col gap-2">
               {posts.map((post) => {
                  const date = new Date(post.last_edited_time).toLocaleString(
                     "cs-CZ",
                     dateOptions
                  );
                  return (
                     <Link
                        href={"/" + getPageSlug(post)}
                        key={post.id}
                        className="rounded border border-gray-200 p-4 hover:bg-gray-100 transition flex items-center justify-between focus:outline focus:outline-2"
                     >
                        <h3 className="">
                           <Text text={post.properties.Name.title} />
                        </h3>
                        <p className="text-gray-400">{date}</p>
                     </Link>
                  );
               })}
            </div>
            <footer className="my-8 text-gray-400 text-sm">
               &copy; {year}
            </footer>
         </main>
      </div>
   );
}

export const getStaticProps = async () => {
   const database = await getDatabase(databaseId);

   return {
      props: {
         posts: database,
      },
      revalidate: 1,
   };
};
