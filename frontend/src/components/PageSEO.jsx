import { useEffect } from 'react';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../config/site';
import { buildOrganizationSchema, buildWebSiteSchema } from '../config/seo';

const META_ATTR = 'data-page-seo';

const upsertMeta = (attr, key, content) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attr}="${key}"][${META_ATTR}]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    element.setAttribute(META_ATTR, 'true');
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  if (!href) return;

  let element = document.head.querySelector(`link[rel="${rel}"][${META_ATTR}]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute(META_ATTR, 'true');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const upsertJsonLd = (id, data) => {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  if (!data) return;

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.setAttribute(META_ATTR, 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

const PageSEO = ({
  title,
  description,
  path = '/',
  keywords = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = null,
  includeSiteSchemas = false,
}) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'robots', robotsContent);
    upsertMeta('name', 'author', SITE_NAME);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    upsertLink('canonical', canonicalUrl);

    if (includeSiteSchemas) {
      upsertJsonLd('seo-organization', buildOrganizationSchema());
      upsertJsonLd('seo-website', buildWebSiteSchema());
    }

    upsertJsonLd('seo-page', jsonLd);

    return () => {
      document.getElementById('seo-page')?.remove();
    };
  }, [
    title,
    description,
    path,
    keywords,
    image,
    type,
    noindex,
    canonicalUrl,
    robotsContent,
    jsonLd,
    includeSiteSchemas,
  ]);

  return null;
};

export default PageSEO;
