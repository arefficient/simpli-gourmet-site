export const SITE = {
  name: "Simpli Gourmet",
  tagline: "Exceeding Your Expectations",
  phone: "313-316-3882",
  phoneHref: "tel:+13133163882",
  email: "SimpliGourmet@aol.com",
  location: "Detroit, MI",
  chef: "Simpli",
  founder: "Tanaia Jones",
};

export type Package = {
  id: "repass" | "hibachi" | "corporate";
  name: string;
  price: string;
  feeds: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: "repass",
    name: "Repass",
    price: "$499",
    feeds: "Feeds 40",
    blurb:
      "A warm, generous table for family and friends gathering to honor and remember.",
    features: [
      "Choice of protein",
      "Choice of side",
      "Vegetable",
      "Salad",
      "Dinner rolls",
      "Dessert",
    ],
  },
  {
    id: "hibachi",
    name: "Hibachi Experience",
    price: "$599",
    feeds: "Feeds 35",
    blurb:
      "A live cooking experience that turns your event into a show — teppanyaki-style, right at your venue.",
    features: [
      "Live chef, onsite cooking",
      "Chicken, rice & vegetables",
      "Personalized containers",
    ],
    featured: true,
  },
  {
    id: "corporate",
    name: "Corporate",
    price: "Custom",
    feeds: "Tailored to your team",
    blurb:
      "Refined catering for meetings, launches, and company celebrations. Pricing on request.",
    features: [
      "Custom menu design",
      "Bespoke quote",
      "Full-service delivery & setup",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Always been a really good cook. Exceptional customer service. Attention to detail and accommodating the customer's request is a strong point for Chef Simpli.",
    name: "Lola Rushin",
    title: "Catering Coordinator",
  },
  {
    quote:
      "I look forward to Aunty's get togethers for Aunty's food. I don't care about what the place looks like. My wife loves the food, my kids love the food.",
    name: "Alfonzo",
    title: "Client",
  },
];

export const GALLERY_IMAGES = [
  "476291850_122187277598093361_8414500877029737009_n.jpg",
  "476840492_122188185410093361_7328090524114800261_n.jpg",
  "477439139_122188185962093361_470713421571213107_n.jpg",
  "481161055_122189712476093361_8359017564864197393_n.jpg",
  "481782662_122191261718093361_356739266371665944_n.jpg",
  "482227748_122192167556093361_4804995639776503459_n.jpg",
  "484551648_122193028334093361_4662607787524056954_n.jpg",
  "484753030_122193028370093361_5594610317888953463_n.jpg",
  "484878775_122193357374093361_4581707787966528217_n.jpg",
  "485143126_122193275594093361_4153486148469330492_n.jpg",
  "485378793_122193358778093361_4247765824530140097_n.jpg",
  "499526689_122203074668093361_4779161514369232582_n.jpg",
  "500261182_122202736466093361_8166871310302297234_n.jpg",
  "500278717_122202609452093361_6386168406764783145_n.jpg",
  "500938763_122202735878093361_3401275915670537339_n.jpg",
  "518751113_122208675650093361_6835841517744488243_n.jpg",
  "532075766_122212769132093361_8369478957001685748_n.jpg",
  "556062643_122219535704093361_4590742687790656193_n.jpg",
  "556740849_122219776430093361_7496841492587271191_n.jpg",
  "558868273_122219776478093361_6746065299672592796_n.jpg",
  "574023426_122224109300093361_2875811294157881878_n.jpg",
  "574580008_122224109588093361_6343250292617798203_n.jpg",
  "574925758_122224464080093361_4845442537612166263_n.jpg",
  "607455074_122230986350093361_7116141853648707700_n.jpg",
  "607954229_122230986542093361_8460427754784071018_n.jpg",
  "608513066_122230986398093361_783133224713409266_n.jpg",
];
