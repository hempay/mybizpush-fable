export interface Product {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  accent: string;
  accentSoft: string;
  features: string[];
  stats: { label: string; value: string }[];
  appStore: string;
  playStore: string;
}

export const products: Product[] = [
  {
    name: "Hempay",
    tagline: "The Future of Digital Finance",
    description:
      "A comprehensive fintech application with virtual cards and bill payments to enhance financial transactions across the globe. Experience seamless banking with cutting-edge security.",
    logo: "/products/hempay_logo.png",
    accent: "#a86b3a",
    accentSoft: "rgba(168, 107, 58, 0.16)",
    features: [
      "Virtual Debit & Credit Cards",
      "Global Bill Payments",
      "Instant Money Transfers",
      "Multi-Currency Support",
      "Advanced Security Features",
      "Real-time Transaction Tracking",
      "Merchant Payment Solutions",
      "Investment Portfolio Management",
    ],
    stats: [
      { label: "Active Users", value: "50K+" },
      { label: "Countries", value: "25+" },
      { label: "Transactions", value: "$2M+" },
    ],
    appStore: "#",
    playStore: "#",
  },
  {
    name: "Plemuz",
    tagline: "Where Music Meets Monetization",
    description:
      "An all-in-one music streaming platform where users and artists alike can earn in USD, while organizations efficiently manage labels and artists. Revolutionizing the music industry ecosystem.",
    logo: "/products/plemuz_logo.png",
    accent: "#ffb84d",
    accentSoft: "rgba(255, 184, 77, 0.16)",
    features: [
      "High-Quality Music Streaming",
      "Artist Revenue in USD",
      "Label Management System",
      "Music Distribution Network",
      "Live Performance Booking",
      "Fan Engagement Tools",
      "Analytics Dashboard",
      "Collaborative Playlists",
    ],
    stats: [
      { label: "Artists", value: "10K+" },
      { label: "Songs", value: "100K+" },
      { label: "Monthly Streams", value: "5M+" },
    ],
    appStore: "#",
    playStore: "#",
  },
  {
    name: "Yuafomi",
    tagline: "Connect. Stream. Love.",
    description:
      "An international dating app with innovative streaming features for meaningful connections worldwide. Experience authentic relationships through video interactions and shared experiences.",
    logo: "/products/yuafomi_logo.png",
    accent: "#ea258e",
    accentSoft: "rgba(234, 37, 142, 0.16)",
    features: [
      "Global Dating Network",
      "Live Video Streaming",
      "HD Video Calls",
      "Smart Matching Algorithm",
      "Cultural Exchange Features",
      "Safety & Verification",
      "Language Translation",
      "Virtual Date Experiences",
    ],
    stats: [
      { label: "Members", value: "100K+" },
      { label: "Countries", value: "50+" },
      { label: "Matches", value: "1M+" },
    ],
    appStore: "#",
    playStore: "#",
  },
  {
    name: "Pailop",
    tagline: "Stack Your Success",
    description:
      "A stock trading app where users can buy stocks and commodities and pile them up. Get real-time stock data analysis and make informed investment decisions with powerful analytics tools.",
    logo: "/products/pailop_logo.png",
    accent: "#3b82f6",
    accentSoft: "rgba(59, 130, 246, 0.16)",
    features: [
      "Real-Time Stock Data",
      "Commodity Trading",
      "Advanced Analytics Dashboard",
      "Portfolio Management",
      "Market Trend Analysis",
      "Price Alerts & Notifications",
      "Trading Signals",
      "Investment Insights",
    ],
    stats: [
      { label: "Traders", value: "30K+" },
      { label: "Daily Trades", value: "50K+" },
      { label: "Assets", value: "1000+" },
    ],
    appStore: "#",
    playStore: "#",
  },
  {
    name: "Ceremotik",
    tagline: "Celebrate Every Moment",
    description:
      "An event booking application where users can book events, buy event tickets, and artists/organizations can list events and sell tickets. Connect with unforgettable experiences worldwide.",
    logo: "/products/ceremotik_logo.png",
    accent: "#c084fc",
    accentSoft: "rgba(192, 132, 252, 0.16)",
    features: [
      "Event Discovery",
      "Secure Ticket Booking",
      "Artist/Organizer Portal",
      "Event Management Tools",
      "QR Code Ticketing",
      "Real-Time Seat Selection",
      "Event Analytics",
      "Promotional Tools",
    ],
    stats: [
      { label: "Events", value: "5K+" },
      { label: "Tickets Sold", value: "100K+" },
      { label: "Organizers", value: "2K+" },
    ],
    appStore: "#",
    playStore: "#",
  },
  {
    name: "Hyparrow",
    tagline: "Power Your Payments",
    description:
      "A payment gateway where users can integrate payment APIs and resell bill payments as wholesale or retail, receive payments as merchants, and access various payment/verification APIs.",
    logo: "/products/hyparrow_logo.png",
    accent: "#10b981",
    accentSoft: "rgba(16, 185, 129, 0.16)",
    features: [
      "Payment API Integration",
      "Wholesale Bill Payments",
      "Retail Bill Payments",
      "Merchant Payment Solutions",
      "Verification APIs",
      "Multi-Channel Payments",
      "Instant Settlements",
      "Developer-Friendly SDK",
    ],
    stats: [
      { label: "Merchants", value: "15K+" },
      { label: "API Calls", value: "10M+" },
      { label: "Uptime", value: "99.9%" },
    ],
    appStore: "#",
    playStore: "#",
  },
  {
    name: "BundleBoss",
    tagline: "Pay Bills Like a Boss",
    description:
      "A bill payment application where users can pay for a variety of bills effortlessly. Manage all your utility payments, subscriptions, and recurring bills in one convenient platform.",
    logo: "/products/bundleboss_logo.png",
    accent: "#f87171",
    accentSoft: "rgba(248, 113, 113, 0.16)",
    features: [
      "Multi-Bill Payments",
      "Automatic Reminders",
      "Payment Scheduling",
      "Bill History Tracking",
      "Multiple Payment Methods",
      "Instant Confirmations",
      "Cashback & Rewards",
      "Secure Transactions",
    ],
    stats: [
      { label: "Users", value: "40K+" },
      { label: "Bills Paid", value: "500K+" },
      { label: "Saved Time", value: "1M+ hrs" },
    ],
    appStore: "#",
    playStore: "#",
  },
];

export const featuredProducts = products.slice(0, 3);
