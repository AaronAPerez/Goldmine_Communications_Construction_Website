const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://goldminecomm.net';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// Static routes configuration
const staticRoutes = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/services',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/communications',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/construction',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/projects',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString(),
  },
];

// Dynamic routes (you can extend this to pull from your CMS/database)
async function getDynamicRoutes() {
  const dynamicRoutes = [];
  
  // Example: Add blog posts, project pages, etc.
  // const projects = await getProjects();
  // projects.forEach(project => {
  //   dynamicRoutes.push({
  //     url: `/projects/${project.slug}`,
  //     changefreq: 'monthly',
  //     priority: 0.5,
  //     lastmod: project.updatedAt,
  //   });
  // });
  
  return dynamicRoutes;
}

// Generate XML sitemap
function generateSitemapXML(routes) {
  const urlSet = routes
    .map(route => {
      return `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`;
}


// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Block access to admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow search engines to access important files
Allow: /api/search
Allow: /sitemap.xml
Allow: /favicon.ico

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
}

// Main function
async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap...');
    
    // Combine static and dynamic routes
    const dynamicRoutes = await getDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    
    // Generate sitemap XML
    const sitemapXML = generateSitemapXML(allRoutes);
    
    // Write sitemap.xml
    fs.writeFileSync(OUTPUT_PATH, sitemapXML);
    console.log(`✅ Sitemap generated successfully: ${OUTPUT_PATH}`);
    
    // Generate robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log(`✅ Robots.txt generated successfully: ${robotsPath}`);
    
    // Generate sitemap index if needed (for large sites)
    if (allRoutes.length > 50000) {
      generateSitemapIndex();
    }
    
    console.log(`📊 Total URLs: ${allRoutes.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Generate sitemap index for large sites
function generateSitemapIndex() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;
  
  const indexPath = path.join(process.cwd(), 'public', 'sitemap-index.xml');
  fs.writeFileSync(indexPath, sitemapIndex);
  console.log(`✅ Sitemap index generated: ${indexPath}`);
}

// Validate sitemap
function validateSitemap() {
  try {
    const sitemapContent = fs.readFileSync(OUTPUT_PATH, 'utf8');
    
    // Basic validation
    if (!sitemapContent.includes('<?xml')) {
      throw new Error('Invalid XML format');
    }
    
    if (!sitemapContent.includes('<urlset')) {
      throw new Error('Missing urlset element');
    }
    
    // Count URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    
    if (urlCount === 0) {
      throw new Error('No URLs found in sitemap');
    }
    
    if (urlCount > 50000) {
      console.warn('⚠️  Warning: Sitemap has more than 50,000 URLs. Consider using sitemap index.');
    }
    
    console.log(`✅ Sitemap validation passed (${urlCount} URLs)`);
    return true;
    
  } catch (error) {
    console.error('❌ Sitemap validation failed:', error);
    return false;
  }
}

// Run the generator
if (require.main === module) {
  generateSitemap().then(() => {
    // Validate the generated sitemap
    if (validateSitemap()) {
      console.log('🎉 Sitemap generation completed successfully!');
    }
  });
}

module.exports = { generateSitemap, validateSitemap };
