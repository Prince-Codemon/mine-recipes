import React from "react";
import { Helmet } from "react-helmet";
import LOGO from "../logo.png";
const RHelmet = ({ title, content, image, creator }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {content && <meta name="description" content={content} />}
      {image && <meta property="og:image" content={image} />}
      {creator && <meta property="og:creator" content={creator} />}
      {creator && <meta name="author" content={creator} />}
      {!image && <link rel="icon" href={LOGO} />}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="og:site_name" content="minerecipes" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:article:author" content={creator} />
      <meta property="og:article:section" content="Recipe" />
      <meta property="og:article:tag" content="Recipe" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@minerecipes" />
      <meta name="twitter:creator" content="@minerecipes" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={content} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={creator} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={process.env.REACT_APP_BASE_URL} />
      <meta property="og:site_name" content="minerecipes" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:article:author" content={creator} />
      <meta property="og:article:section" content="Recipe" />
      <meta property="og:article:tag" content="Recipe" />
    </Helmet>
  );
};

export default RHelmet;
