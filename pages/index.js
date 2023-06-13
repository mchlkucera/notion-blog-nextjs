import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";

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
            <header className="my-8 mt-16">
               <h1 className="text-xl">Martin Kučera</h1>
            </header>

            <div className="flex flex-col gap-2">
               {posts.map(({ last_edited_time, properties, id }) => {
                  const date = new Date(last_edited_time).toLocaleString(
                     "cs-CZ",
                     dateOptions
                  );
                  return (
                     <Link
                        href={"/" + id}
                        key={id}
                        className="rounded border border-gray-200 p-4 hover:bg-gray-100 transition flex items-center justify-between"
                     >
                        <h3 className="">
                           <Text text={properties.Name.title} />
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
