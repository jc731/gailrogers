import { defineCollection, z } from 'astro:content';

// Section type definitions
const heroSection = z.object({
  type: z.literal('hero'),
  heading: z.string(),
  subheading: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  backgroundImage: z.string().optional(),
});

const richTextSection = z.object({
  type: z.literal('richText'),
  content: z.string(),
  className: z.string().optional(),
});

const faqSection = z.object({
  type: z.literal('faq'),
  title: z.string().optional(),
  items: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
});

const ctaBandSection = z.object({
  type: z.literal('ctaBand'),
  heading: z.string(),
  text: z.string().optional(),
  primaryCTA: z.object({
    text: z.string(),
    link: z.string(),
  }).optional(),
  secondaryCTA: z.object({
    text: z.string(),
    link: z.string(),
  }).optional(),
  className: z.string().optional(),
});

const cardGridSection = z.object({
  type: z.literal('cardGrid'),
  title: z.string().optional(),
  cards: z.array(z.object({
    title: z.string(),
    content: z.string(),
    link: z.string().optional(),
    image: z.string().optional(),
  })),
  columns: z.number().optional().default(3),
});

const sliderSection = z.object({
  type: z.literal('slider'),
  slides: z.array(z.object({
    heading: z.string(),
    subheading: z.string().optional(),
    image: z.string(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
    alt: z.string().optional(),
  })),
  autoplay: z.boolean().optional().default(true),
  autoplayInterval: z.number().optional().default(5000),
  showIndicators: z.boolean().optional().default(true),
  showControls: z.boolean().optional().default(true),
});

const linkButtonsSection = z.object({
  type: z.literal('linkButtons'),
  title: z.string().optional(),
  buttons: z.array(z.object({
    text: z.string(),
    link: z.string(),
    style: z.enum(['primary', 'secondary', 'outline']).optional().default('primary'),
  })),
  layout: z.enum(['horizontal', 'vertical', 'grid']).optional().default('horizontal'),
  className: z.string().optional(),
});

const iconBannerSection = z.object({
  type: z.literal('iconBanner'),
  items: z.array(z.object({
    icon: z.string(), // Iconify icon name (e.g., "mdi:home")
    text: z.string(),
    link: z.string().optional(),
  })),
  backgroundColor: z.string().optional().default('slate-dark'),
  className: z.string().optional(),
});

const contactFormSection = z.object({
  type: z.literal('contactForm'),
  title: z.string().optional(),
  introText: z.string().optional(),
  className: z.string().optional(),
});

const mapEmbedSection = z.object({
  type: z.literal('mapEmbed'),
  embedUrl: z.string(),
  height: z.string().optional().default('450'),
  className: z.string().optional(),
});

export const sectionSchema = z.discriminatedUnion('type', [
  heroSection,
  richTextSection,
  faqSection,
  ctaBandSection,
  cardGridSection,
  sliderSection,
  linkButtonsSection,
  iconBannerSection,
  contactFormSection,
  mapEmbedSection,
]);

// Site settings collection
const siteCollection = defineCollection({
  type: 'data',
  schema: z.object({
    brandName: z.string(),
    primaryPhone: z.string(),
    phones: z.array(z.string()).optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    }),
    hours: z.string().optional(),
    legalDisclaimer: z.string(),
    primaryCTA: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    secondaryCTA: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    navigation: z.array(z.object({
      label: z.string(),
      href: z.string(),
      children: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })).optional(),
    })).optional(),
    footerNavigation: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })).optional(),
  }),
});

// Pages collection
const pagesCollection = defineCollection({
  type: 'content',
  schema: ({ image, slug }) => z.object({
    title: z.string(),
    slug: z.string().optional().default(slug),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    // Optional: Custom layout configuration (e.g., 'two-column' for contact page)
    layoutConfig: z.object({
      type: z.enum(['default', 'two-column']).optional().default('default'),
      // Additional layout-specific options can be added here
    }).optional(),
    sections: z.array(sectionSchema),
  }),
});

// Practice areas collection
const practiceAreasCollection = defineCollection({
  type: 'content',
  schema: ({ image, slug }) => z.object({
    title: z.string(),
    slug: z.string().optional().default(slug),
    summary: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    order: z.number().optional().default(0),
    sections: z.array(sectionSchema),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = {
  site: siteCollection,
  pages: pagesCollection,
  practiceAreas: practiceAreasCollection,
};

