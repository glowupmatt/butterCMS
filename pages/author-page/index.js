import React from "react";
import { useRouter } from "next/router";
import AuthorCard from "@/components/author-page/author-card";
import { getAuthorCollection } from "@/lib/api";
import Preloader from "@/components/preloader";
import camelcaseKeys from "camelcase-keys";
import ErrorPage from "next/error";

export default function AuthorPage({ collection }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Preloader />;
  }

  if (!collection) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="author-page-main">
      <div className="author-page-title">
        <h1>View our writers and their work</h1>
      </div>
      <div className="authors-container">
        {collection.authorCollection.map((fields, index) => {
          return <AuthorCard key={index} fields={fields} />;
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const collection = await getAuthorCollection();
    return {
      props: {
        collection: camelcaseKeys(collection),
      },
      revalidate: 1,
    };
  } catch (e) {
    console.error(`Couldn't load content for Landing page.`, e);

    return {
      notFound: true,
    };
  }
}
