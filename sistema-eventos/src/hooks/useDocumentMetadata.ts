import { useEffect } from 'react';

interface DocumentMetadata {
  title: string;
  description: string;
}

export const useDocumentMetadata = ({ title, description }: DocumentMetadata) => {
  useEffect(() => {
    document.title = title;

    const selector = 'meta[name="description"]';
    let metaTag = document.querySelector<HTMLMetaElement>(selector);

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute('content', description);

    const ogTitleSelector = 'meta[property="og:title"]';
    let ogTitleTag = document.querySelector<HTMLMetaElement>(ogTitleSelector);

    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }

    ogTitleTag.setAttribute('content', title);

    const ogDescriptionSelector = 'meta[property="og:description"]';
    let ogDescriptionTag = document.querySelector<HTMLMetaElement>(ogDescriptionSelector);

    if (!ogDescriptionTag) {
      ogDescriptionTag = document.createElement('meta');
      ogDescriptionTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescriptionTag);
    }

    ogDescriptionTag.setAttribute('content', description);
  }, [description, title]);
};