import React from "react";
import Image from "next/image";
import Link from "next/link";
const AuthorCard = ({ fields }) => {
  const {
    author_name,
    author_title,
    author_photo,
    author_description,
    author_link,
  } = fields;
  return (
    <Link href={`author-page/${author_link}`}>
      <div className="author-card">
        <div className="author-display-data">
          <div>
            <p>{author_name}</p>
            <p>{author_title}</p>
          </div>
          <Image
            className="author-image"
            src={author_photo}
            alt={author_name}
            width={100}
            height={100}
          />
        </div>
        <p className="author-description">{author_description}</p>
      </div>
    </Link>
  );
};

export default AuthorCard;
