import type { MetadataRoute } from 'next';
import { productCatalog, type Product } from '@/data/productCatalog';
import { getAreaHref, serviceAreas } from '@/data/serviceAreas';
import { siteConfig } from '@/data/siteConfig';
import { absoluteUrl } from '@/lib/seo';
import { getProductCover, getTypeImage } from '@/lib/productImages';

function getProductImageUrls(product: Product): string[] {
  const urls = [getProductCover(product), ...product.types.map((type) => getTypeImage(product, type))];
  return urls.flatMap((imagePath) => (imagePath ? [absoluteUrl(imagePath)] : []));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.contentLastUpdated);
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/services'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/areas'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/privacy-policy'), lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const productPages: MetadataRoute.Sitemap = productCatalog.map((product) => ({
    url: absoluteUrl(`/services/${product.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
    // lets Google Images discover the real product photo
    images: getProductImageUrls(product),
  }));

  const areaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: absoluteUrl(getAreaHref(area.slug)),
    lastModified, changeFrequency: 'monthly',
    priority: area.kind === 'home' ? 0.7 : 0.6,
  }));

  return [...staticPages, ...productPages, ...areaPages];
}
