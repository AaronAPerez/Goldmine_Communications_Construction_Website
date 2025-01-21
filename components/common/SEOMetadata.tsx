interface SEOMetadataProps {
    title: string;
    description: string;
    image?: string;
    type?: string;
  }
  
  export function SEOMetadata({
    title,
    description,
    image = '/images/default-og.jpg',
    type = 'website'
  }: SEOMetadataProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
    return (
      <>
        <title>{`${title} | Goldmine Communications`}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${image}`} />
        <meta property="og:type" content={type} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${image}`} />
      </>
    );
  }