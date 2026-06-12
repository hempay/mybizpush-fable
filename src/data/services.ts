export interface Service {
  title: string;
  description: string;
  details: string;
  image: string;
  tag: string;
}

export const allServices: Service[] = [
  {
    title: "IT Consultation",
    description: "Expert technology consulting for your business needs",
    details:
      "Our IT consultation services provide comprehensive technology strategy and implementation guidance. We help businesses optimize their IT infrastructure, implement new technologies, and develop digital transformation roadmaps that align with business objectives.",
    image: "/services/it-consultation.webp",
    tag: "Strategy",
  },
  {
    title: "Website Design",
    description: "Modern, responsive websites that convert visitors",
    details:
      "We create stunning, responsive websites that not only look great but also drive conversions. Our designs are user-centered, mobile-first, and optimized for search engines to ensure maximum visibility and engagement.",
    image: "/services/web-design.webp",
    tag: "Design",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven marketing strategies for growth",
    details:
      "Our digital marketing strategies are built on data insights and proven methodologies. We help businesses reach their target audience through various digital channels including social media, content marketing, and paid advertising.",
    image: "/services/digital-marketing.webp",
    tag: "Growth",
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile applications",
    details:
      "We develop high-quality mobile applications for both iOS and Android platforms. Our apps are designed with user experience in mind and built using the latest technologies to ensure optimal performance and scalability.",
    image: "/services/app-development.webp",
    tag: "Build",
  },
  {
    title: "Social Media Management",
    description: "Complete social media strategy and execution",
    details:
      "Our social media management services include strategy development, content creation, community management, and performance tracking across all major social platforms to build your brand presence and engage your audience.",
    image: "/services/social-media-management.webp",
    tag: "Growth",
  },
  {
    title: "Account Boosting & Monetization",
    description: "Grow and monetize your social presence",
    details:
      "We help individuals and businesses grow their social media following and develop monetization strategies. Our services include organic growth techniques, influencer partnerships, and revenue optimization.",
    image: "/services/account-boosting-monetization.webp",
    tag: "Growth",
  },
  {
    title: "SEO Expert & Ads Creation",
    description: "Improve rankings and create converting ads",
    details:
      "Our SEO experts optimize your website for search engines while our ad specialists create high-converting advertisements across Google, Facebook, and other platforms to drive targeted traffic and sales.",
    image: "/services/seo-expert-ads-creation.webp",
    tag: "Growth",
  },
  {
    title: "Google Mapping & Listings",
    description: "Local SEO and business listing optimization",
    details:
      "We optimize your Google My Business profile and other local listings to improve local search visibility. Our services include citation building, review management, and local SEO optimization.",
    image: "/services/google-mapping-listings.webp",
    tag: "Growth",
  },
  {
    title: "Content Creation",
    description: "Engaging content for all your marketing needs",
    details:
      "Our content creation services cover everything from blog posts and articles to videos and infographics. We create engaging, SEO-optimized content that resonates with your target audience and drives results.",
    image: "/services/content-creation.webp",
    tag: "Create",
  },
  {
    title: "Contracts & Proposals",
    description: "Professional business documentation",
    details:
      "We help businesses create professional contracts, proposals, and other legal documents. Our services ensure your business agreements are legally sound and professionally presented.",
    image: "/services/contracts-proposals.webp",
    tag: "Business",
  },
  {
    title: "Graphics Design",
    description: "Visual identity and brand design solutions",
    details:
      "Our graphic design services include logo design, brand identity development, marketing materials, and digital graphics. We create visually appealing designs that communicate your brand message effectively.",
    image: "/services/graphics-design.webp",
    tag: "Design",
  },
  {
    title: "Video Coverage & Commercials",
    description: "Professional video production services",
    details:
      "We provide comprehensive video production services including commercials, corporate videos, event coverage, and promotional content. Our team handles everything from concept to final production.",
    image: "/services/video-coverage-commercials.webp",
    tag: "Create",
  },
  {
    title: "Business Branding",
    description: "Complete brand identity development",
    details:
      "Our branding services help businesses develop a strong, cohesive brand identity. We work on brand strategy, visual identity, messaging, and brand guidelines to ensure consistent brand representation.",
    image: "/services/business-branding.webp",
    tag: "Design",
  },
  {
    title: "Plan Writing",
    description: "Strategic business and marketing plans",
    details:
      "We help businesses develop comprehensive business plans, marketing strategies, and operational plans. Our strategic planning services provide clear roadmaps for business growth and success.",
    image: "/services/plan-writing.webp",
    tag: "Business",
  },
  {
    title: "CAC Registrations",
    description: "Business registration and compliance",
    details:
      "We assist with Corporate Affairs Commission (CAC) business registration and ensure your business complies with all regulatory requirements. Our services streamline the registration process.",
    image: "/services/business-registrations.webp",
    tag: "Business",
  },
  {
    title: "Music Promotion & Distribution",
    description: "Get your music heard worldwide",
    details:
      "Our music promotion and distribution services help artists reach global audiences. We handle digital distribution, playlist placements, social media promotion, and marketing campaigns for musicians.",
    image: "/services/music-promotion-distribution.webp",
    tag: "Media",
  },
  {
    title: "Artist Management",
    description: "Complete artist career development",
    details:
      "We provide comprehensive artist management services including career planning, booking, promotion, brand development, and business strategy to help artists build successful careers.",
    image: "/services/artist-management.webp",
    tag: "Media",
  },
  {
    title: "Jingle Production",
    description: "Memorable audio branding solutions",
    details:
      "Our jingle production services create catchy, memorable audio content for brands. We handle everything from concept development to final production and delivery of high-quality audio branding.",
    image: "/services/jingle-production.webp",
    tag: "Media",
  },
  {
    title: "Training",
    description: "Professional development and skill building",
    details:
      "We offer comprehensive training programs in various areas including digital marketing, web development, business skills, and technology. Our training programs are designed to enhance professional capabilities.",
    image: "/services/training.webp",
    tag: "Business",
  },
  {
    title: "Data Analytics & Business Intelligence",
    description: "Transform data into actionable business insights",
    details:
      "Our data analytics and business intelligence services help organizations unlock the power of their data. We provide comprehensive data analysis, reporting dashboards, predictive analytics, and business intelligence solutions to drive informed decision-making and strategic growth.",
    image: "/services/data-analytics-business-intelligence.webp",
    tag: "Strategy",
  },
];

export const featuredServices = allServices.slice(0, 8);
