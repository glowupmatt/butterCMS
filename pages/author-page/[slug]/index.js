import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAuthor } from "@/lib/api";
import Link from "next/link";

const AuthorPost = () => {
  const router = useRouter();
  const [author, setAuthor] = useState(null);
  const authorName = router.query.slug
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
  useEffect(() => {
    const getSelectedAuthor = async () => {
      const author = await getAuthor(router.query.slug);
      setAuthor(author);
    };
    getSelectedAuthor();
  }, [router.query.slug]);
  if (!author) {
    return <div>Loading...</div>;
  }
  console.log(router);
  return (
    <div className="preview-body">
      <h2>{authorName} Posts: </h2>
      {author.recent_posts.map((data) => {
        return (
          <Link
            href={`/blog/${data.slug}`}
            key={data.slug}
            className="preview-container"
          >
            <h2>{data.title}</h2>
            <p>{data.summary}</p>
            <Image
              className="featured-image-post"
              src={data.featured_image}
              alt={data.title}
              width={1000}
              height={1000}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default AuthorPost;

// export async function getStaticProps({ params }) {
//   try {
//     const author = await getAuthor(params.slug);
//     return {
//       props: { author: camelcaseKeys(author) },
//     };
//   } catch (e) {
//     console.error(`Couldn't load content for Landing page ${params.slug}.`, e);

//     return {
//       notFound: true,
//     };
//   }
// }

// export async function getStaticPaths({ params }) {
//   const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;
//   if (butterToken) {
//     try {
//       return {
//         paths: `/author-page/${params.slug}`,
//         fallback: true,
//       };
//     } catch (e) {
//       console.error("Couldn't load content for Landing pages.", e);
//     }

//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// }
