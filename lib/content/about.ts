/**
 * About page copy. Wording follows the "new required wording" column of the
 * December 2025 website brief (SYCAMORE ROYALS WEBSITE INFORMATION 2025 DEC.docx);
 * the figures come from the 2024 organisation profile.
 */

export const intro = {
  title: "Welcome to Sycamore Royals",
  tagline: "Transforming Lives holistically through Action",
  lead: "Discover our story, Vision, Mission, Values, Programs, and Footprint in a quest for holistic community Transformation.",
};

export const stats = [
  { value: "2020", label: "Founded in Wera, Amuria" },
  { value: "~500", label: "Children reached in Angaro and neighbouring villages" },
  { value: "~5,000", label: "People reached directly by our programmes" },
  { value: "6", label: "Countries in our expansion plan" },
];
export const statsNote = "Figures from our 2024 organisation profile.";

export const whoWeAre =
  "Sycamore Royals is a Christian Not for Profit; Nongovernmental entity currently registered as a Community based organization. It Demonstrates and proclaims the gospel by providing a nexus of Charitable and social enterprise Programs. Sycamore Royals was founded in 2020, by Stephen and Elizabeth Okiror. This was to spur children and families to develop holistically, care for Creation and build sustainable businesses.";

export const vision = "Everyone, Everywhere, living a transformed, holistic and flourishing Life.";

export const mission =
  "Sycamore Royals exists to Proclaim and Demonstrate the Gospel of Jesus Christ to Children and their families through holistic social development services, creation care and sustainable businesses.";

export type ValueIcon = "heart" | "shield" | "trophy" | "infinity" | "sprout";

export const values: { title: string; body: string; icon: ValueIcon }[] = [
  { title: "Being God and People Centric", body: "We put God and people at the center of what we plan, Do, and Speak.", icon: "heart" },
  { title: "Integrity", body: "We are accountable to God and man; our private and public affairs are in sync.", icon: "shield" },
  { title: "Pursuing Excellence", body: "God is of excellence; we will not do any less.", icon: "trophy" },
  { title: "Building Lasting Legacies", body: "We invest for now, next generation and eternity.", icon: "infinity" },
  { title: "Creation Care", body: "We Steward and defend God’s creation.", icon: "sprout" },
];

export type ApproachKey = "implementation" | "programs" | "partnership" | "growth";

export const approach: { key: ApproachKey; label: string; body: string[]; image: { src: string; alt: string } }[] = [
  {
    key: "implementation",
    label: "Implementation",
    body: [
      "SR does both direct as well as partnership approach to implementation. This is based on our belief of catalyzing change and building synergies.",
      "We believe in being facilitative as a biblical sycamore tree, enabling people meet God and opportunities for sustainable transformation.",
    ],
    image: { src: "/images/moments/gathering.jpg", alt: "Children and leaders gathered on chairs under a large tree in Wera" },
  },
  {
    key: "programs",
    label: "Programs",
    body: [
      "SR programs adopt a transformational development Approach: they are holistic in nature, taking a whole gospel to a whole person, resulting in whole human flourishing.",
      "Our programs are also focused on sustainability through skilling, creation care, business ventures and nurturing vertical and horizontal relationships for posterity. Our programs and operation approach are fueled by our values. Our work is a locally led, globally inspiring effort, ministering to our neighbors holistically.",
    ],
    image: { src: "/images/moments/music.jpg", alt: "A young musician plays the keyboard for children seated under a tent" },
  },
  {
    key: "partnership",
    label: "Partnership",
    body: [
      "The Church is our primary partner as godly mandate holders to proclaim and demonstrate the Love of God.",
      "We strive to achieve synergies and impactful partnership for the sake of the Child and family flourishing.",
    ],
    image: { src: "/images/moments/worship.jpg", alt: "Children and adults seated together under a tent during a camp session" },
  },
  {
    key: "growth",
    label: "Growth",
    body: [
      "We are growing deeper before growing wider: impacting one footprint (community, nation) at a time before growing wider (national, international). We believe in evidence-based, need-inspired growth.",
      "We operate under a lean, agile and iterative structure and culture. SR is especially keen to hear God’s leading in where to serve and how best to serve; following Christ is our nature.",
    ],
    image: { src: "/images/moments/sharing.jpg", alt: "Children sitting on the ground in the shade, sharing cups of porridge" },
  },
];

export type Founder = {
  name: string;
  short: string;
  role: string;
  photo: string;
  summary: string;
  bio: string;
  linkedin: string;
};

export const founders: Founder[] = [
  {
    name: "Stephen Okiror",
    short: "Stephen",
    role: "Founder and CEO",
    photo: "/images/people/stephen-okiror.jpg",
    summary: "A visionary, servant-hearted missionary leader committed to the holistic transformation of society.",
    bio: "Stephen is visionary, servant hearted, and missionary leader committed to holistic transformation of society. He has spent decades of his adult life in transformative projects in several countries on African continent, leading and serving in Humanitarian assistance and development work. He believes the Church of Christ has mandate to demonstrate and proclaim the gospel as part of its holistic mission.",
    linkedin: "https://www.linkedin.com/in/stephen-o-16277640/",
  },
  {
    name: "Elizabeth Akeso Okiror",
    short: "Elizabeth",
    role: "Co-Founder and Director Integral Mission",
    photo: "/images/people/elizabeth-akeso-okiror.jpg",
    summary: "A pastor and environmentalist, and a compassionate strategic leader with a passion for human flourishing.",
    bio: "Pastor Elizabeth, an Environmentalist, is a compassionate strategic leader with a long experience on humanitarian assistance, social development, lecturing and business development. She brings passion for human flourishing, creation care, evangelism and legacy social enterprises. A nexus she believes if well harnessed creates holistic human flourishing.",
    linkedin: "https://www.linkedin.com/in/elizabeth-akeso-044a61301/",
  },
];

export type ProgramIcon = "child" | "community" | "business" | "climate";

export const programs: { title: string; areas: string[]; icon: ProgramIcon }[] = [
  {
    title: "Holistic Child and Youth Development",
    areas: ["Evangelism", "Discipleship", "Child protection", "Skilling", "Village Library"],
    icon: "child",
  },
  { title: "Community Development", areas: ["Education", "Healthcare", "Livelihoods"], icon: "community" },
  {
    title: "Business Development",
    areas: ["Schools", "Health Care facilities", "Farms", "Other IGAs", "Entrepreneurship and Business skills"],
    icon: "business",
  },
  { title: "Climate Change and Environmental Management", areas: ["Conservation", "Adaptation Actions"], icon: "climate" },
];

export const footprint = {
  current: "Operating in Uganda: Wera Community, Amuria District, Uganda.",
  future: ["Uganda", "Zambia", "Liberia", "Sierra Leone", "Kenya", "Malawi"],
  futureNote: "Future expansion to Uganda, Zambia, Liberia, Sierra Leone, Kenya, Malawi and beyond.",
};

export const history = [
  "In 2020 Stephen Okiror got a clear sense of call from God to create a place in his ancestral land (Wera, Amuria, Uganda) for children to Worship God, get nurtured as generational leaders and inspired to attain social-economic improvement through transformational interventions. The Community of Wera, like the rest of Teso and Eastern Uganda in general, wallows in poverty with children suffering the greatest brunt. Broken relationships with God, with one another, and with the environment fuel poverty as families break, godly living is ignored, and climate change exacerbates the impact of poverty.",
  "Born and raised in this community to a family of 12, Stephen experienced firsthand deprivation, isolation, and poverty. Through the help of siblings who were struggling too, God navigated Stephen to complete a University degree and grow a career. God impressed on him to nurture children in this community, raise a godly army of Worshippers, and change the course of this community: defeating poverty, building sustainable legacies and taking care of Creation, as the object of Worship changes from Idols to the true God.",
  "Wherever we operate, our history fuels a renewed commitment to demonstrate the Love of God by allowing Children to Worship God, be nurtured, and experience programs that holistically transform the Child, their family and community into a flourishing one.",
];

export type GalleryItem = { src: string; title: string; caption: string; width: number; height: number };
export type GalleryChapter = { key: string; label: string; title: string; body: string; items: GalleryItem[] };

export const gallery: GalleryChapter[] = [
  {
    key: "discipleship",
    label: "Discipleship",
    title: "Children Discipleship and Training",
    body: "Discipling the Children to Love God, their neighbors and themselves.",
    items: [
      { src: "/images/gallery/children-discipleship.jpg", title: "Children Discipleship", caption: "Children Learn about God during a Camp", width: 1080, height: 1080 },
      { src: "/images/gallery/life-skills.jpg", title: "Life Skills Training", caption: "Children taught on Life Skills and Christian values of Love, Faith, respect and good company", width: 719, height: 781 },
      { src: "/images/gallery/talent-celebration.jpg", title: "Talent Celebration", caption: "Camp life is a time of dancing and celebrating God given talents", width: 1080, height: 1080 },
    ],
  },
  {
    key: "youth",
    label: "Youth",
    title: "Youth Empowerment",
    body: "Youth Empowerment Sessions: breaking barriers from drugs, betting, alcohol and bad company. Flourishing as a young person through hard work, purity, and a purpose driven life.",
    items: [
      { src: "/images/gallery/youth-empowerment.jpg", title: "Youth Empowerment", caption: "Youth session in the annual Camp", width: 1080, height: 1080 },
      { src: "/images/gallery/sports-sessions.jpg", title: "Sports Sessions", caption: "Sports and interactive sessions", width: 1600, height: 720 },
      { src: "/images/gallery/youth-talent.jpg", title: "Youth Talent", caption: "Youth talent and fun session", width: 1600, height: 720 },
    ],
  },
  {
    key: "education",
    label: "Education",
    title: "Providing Holistic Education",
    body: "Education for the whole person: body, soul and spirit.",
    items: [
      { src: "/images/gallery/literacy.jpg", title: "Literacy Education", caption: "Teaching Kids Literacy to strengthen the learning from schools", width: 1080, height: 1080 },
      { src: "/images/gallery/child-sponsorship.jpg", title: "Child Sponsorship", caption: "A miracle of breaking Child poverty and enabling them scale heights", width: 1080, height: 1080 },
      { src: "/images/gallery/talent-skilling.jpg", title: "Talent & Skilling", caption: "Developing talents and practical skills for the future", width: 1600, height: 1200 },
    ],
  },
  {
    key: "creation",
    label: "Creation Care",
    title: "Creation Care",
    body: "Conservation of indigenous, endangered trees such as the Shea Nut Tree and traditional Teso trees.",
    items: [
      { src: "/images/gallery/shea-nut-tree.jpg", title: "Shea Nut Tree", caption: "Ekungur: Shea Nut Tree Conservancy", width: 752, height: 501 },
      { src: "/images/gallery/carissa-shrub.jpg", title: "Carissa Shrub", caption: "Aimuria: Black Berry Shrub or Carissa Shrub", width: 300, height: 400 },
      { src: "/images/gallery/monkey-orange.jpg", title: "Monkey Orange", caption: "Eturukukut: conservation of indigenous endangered trees", width: 479, height: 479 },
    ],
  },
];
