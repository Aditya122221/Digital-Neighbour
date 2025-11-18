import { groq } from "next-sanity";

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    hero{
      title,
      description,
      image,
      wordsText
    },
    origins{
      title,
      description,
      images[]{
        image,
        alt
      }
    },
    values{
      title,
      items[]{
        title,
        description
      }
    },
    achievements{
      title,
      description,
      stats[]{
        number,
        label
      },
      team{
        title,
        description,
        members[]{
          name,
          role,
          image,
          social{
            twitter,
            linkedin,
            instagram
          }
        }
      }
    }
  }
`;

export const marketingAgencyPageQuery = groq`
  *[_type == "marketingAgencyPage"][0]{
    title,
    metadata,
    description,
    hero{
      heading,
      subheading
    },
    form{
      heading,
      content,
      subContent,
      cta,
      formHeading,
      buttonText
    },
    introParagraph{
      heading,
      problemStatement,
      valueProposition
    },
    painPoints{
      heading,
      subheading,
      painPoints[]{
        problem,
        solution
      }
    },
    services,
    process{
      heading,
      steps,
      content
    },
    keyBenefits{
      heading,
      subheading,
      benefits[]{
        title,
        description,
        icon,
        "image": coalesce(image.asset->url, "")
      },
      items[]{
        title,
        description,
        icon,
        "image": coalesce(image.asset->url, "")
      }
    },
    features{
      heading,
      subheading,
      features[]{
        title,
        description,
        icon
      }
    },
    faq{
      serviceName,
      faqs[]{
        q,
        a
      }
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    metadata,
    description,
    hero{
      heading,
      subheading,
      images[]{
        asset->{
          _id,
          url
        }
      }
    },
    brandInfo{
      main{
        heading,
        subheading
      },
      differentiators[]{
        title,
        description,
        icon
      },
      rightCard{
        heading,
        description,
        stats[]{
          value,
          label
        }
      }
    },
    services{
      heading,
      subheading,
      rightCard[]{
        "video": video.asset->url,
        title,
        subheading
      }
    },
    keepYourStack{
      logos[]{
        name,
        "svg": svg.asset->url
      }
    },
    contentSection{
      heading,
      subheading,
      benefits[]{
        title,
        description,
        icon,
        stat
      }
    },
    process{
      steps,
      content
    }
  }
`;

export const apartPageQuery = groq`
  *[_type == "apartPage"][0]{
    ours,
    others
  }
`;

export const casePageQuery = groq`
  *[_type == "casePage"][0]{
    caseStudies[]{
      title,
      textColor,
      bgImages[]{
        asset->{
          _id,
          url
        }
      },
      metrics[]{
        number,
        text
      },
      services,
      isNew
    }
  }
`;

export const resourcesPageContentQuery = groq`
  *[_type == "resourcesPage"][0]{
    title,
    description,
    details
  }
`;

export const resourceArticlesQuery = groq`
  *[_type == "resourcesPage"][0].articles[]{
    title,
    "slug": slug.current,
    category,
    "date": publishedAt,
    excerpt,
    content,
    "image": coalesce(image.asset->url, imageUrl),
    imageAlt
  }
`;

export const resourceArticleBySlugQuery = groq`
  *[_type == "resourcesPage"][0].articles[slug.current == $slug][0]{
    title,
    "slug": slug.current,
    category,
    "date": publishedAt,
    excerpt,
    content,
    "image": coalesce(image.asset->url, imageUrl),
    imageAlt
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    summary,
    body,
    seo
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(_createdAt desc){
    _id,
    title,
    slug,
    summary
  }
`;

export const servicePageBySlugQuery = groq`
  *[_type == "servicePage" && (slug.current == $slug || serviceKey == $slug)][0]
`;

export const allServicePagesQuery = groq`
  *[_type == "servicePage" && defined(slug.current)] | order(coalesce(servicesLabel, hero.heading, serviceKey) asc){
    _id,
    serviceKey,
    coalesce(servicesLabel, hero.heading) as title,
    "slug": coalesce(slug.current, serviceKey),
    servicesLabel
  }
`;

// SEO Service Queries
export const seoServiceByTitleQuery = groq`
  *[_type == "seoService" && title == $title][0]{
    _id,
    title,
    metadata,
    description,
    hero{
      heading,
      subheading
    },
    form{
      heading,
      content,
      subContent,
      cta,
      formHeading,
      buttonText
    },
    introParagraph{
      heading,
      problemStatement,
      valueProposition
    },
    painPoints{
      heading,
      subheading,
      painPoints[]{
        problem,
        solution
      }
    },
      serviceCards[]{
        id,
        name,
        title,
        description,
        "image": coalesce(image.asset->url, "")
      },
      content{
        heading,
        text1,
        text2,
        text3,
        "image": coalesce(image.asset->url, ""),
        alt
      },
    process{
      heading,
      steps,
      content
    },
    keyBenefits{
      heading,
      subheading,
        benefits[]{
          title,
          description,
          icon,
          "image": coalesce(image.asset->url, "")
        },
        items[]{
          title,
          description,
          icon,
          "image": coalesce(image.asset->url, "")
        }
    },
    features{
      heading,
      subheading,
      features[]{
        title,
        description,
        icon
      }
    },
    faq{
      serviceName,
      faqs[]{
        q,
        a
      }
    }
  }
`;

export const allSeoServicesQuery = groq`
  *[_type == "seoService"] | order(title asc){
    _id,
    title,
    hero
  }
`;

// Common fields for all service queries
const commonServiceFields = groq`
  _id,
  title,
  metadata,
  description,
  hero{
    heading,
    subheading
  },
  form{
    heading,
    content,
    subContent,
    cta,
    formHeading,
    buttonText
  },
  introParagraph{
    heading,
    problemStatement,
    valueProposition
  },
  painPoints{
    heading,
    subheading,
    painPoints[]{
      problem,
      solution
    }
  },
  serviceCards[]{
    id,
    name,
    title,
    description,
    "image": coalesce(image.asset->url, "")
  },
  content{
    heading,
    text1,
    text2,
    text3,
    "image": coalesce(image.asset->url, ""),
    alt
  },
  process{
    heading,
    steps,
    content
  },
  keyBenefits{
    heading,
    subheading,
    benefits[]{
      title,
      description,
      icon,
      "image": coalesce(image.asset->url, "")
    },
    items[]{
      title,
      description,
      icon,
      "image": coalesce(image.asset->url, "")
    }
  },
  features{
    heading,
    subheading,
    features[]{
      title,
      description,
      icon
    }
  },
  faq{
    serviceName,
    faqs[]{
      q,
      a
    }
  },
  strategic{
    heading,
    blocks[]{
      icon,
      title,
      description
    }
  },
  industries{
    heading,
    description,
    industries[]{
      id,
      name,
      icon,
      details
    }
  },
  premiumCloudServices{
    title,
    cardone{
      title,
      description
    },
    cardtwo{
      title,
      description
    },
    customApi{
      title,
      badge,
      description
    },
    maximumCustomization{
      title,
      description,
      features[]{
        title,
        description,
        icon,
        "image": coalesce(image.asset->url, "")
      }
    }
  }
`;

// Paid Advertising Service Queries
export const paidAdsServiceByTitleQuery = groq`
  *[_type == "paidAdvertService" && title == $title][0]{${commonServiceFields}}
`;

// Social Media Marketing Service Queries
export const socialMediaServiceByTitleQuery = groq`
  *[_type == "socialMarketingService" && title == $title][0]{${commonServiceFields}}
`;

// Content Marketing Service Queries
export const contentMarketingServiceByTitleQuery = groq`
  *[_type == "contentMarketingService" && title == $title][0]{${commonServiceFields}}
`;

// Web Development Service Queries
export const webDevelopmentServiceByTitleQuery = groq`
  *[_type == "webDevelopmentService" && title == $title][0]{${commonServiceFields}}
`;

// App Development Service Queries
export const appDevelopmentServiceByTitleQuery = groq`
  *[_type == "appDevelopmentService" && title == $title][0]{${commonServiceFields}}
`;

// Hosting Service Queries
export const hostingServiceByTitleQuery = groq`
  *[_type == "hostingService" && title == $title][0]{${commonServiceFields}}
`;

// AI Automation Service Queries
export const aiAutomationServiceByTitleQuery = groq`
  *[_type == "aiAutomationService" && title == $title][0]{${commonServiceFields}}
`;

// Data Analytics Service Queries
export const dataAnalyticsServiceByTitleQuery = groq`
  *[_type == "dataAnalyticsService" && title == $title][0]{${commonServiceFields}}
`;

// Industries Service Queries
export const industriesServiceByTitleQuery = groq`
  *[_type == "industriesService" && title == $title][0]{${commonServiceFields}}
`;

// Professional Marketing Service Queries
export const professionalMarketingServiceByTitleQuery = groq`
  *[_type == "professionalMarketingService" && title == $title][0]{${commonServiceFields}}
`;
