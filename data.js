/*
  data.js
  --------
  Everything content-related lives here: your profile, your projects, and
  your experience. main.js and project.js read from these arrays/objects
  to render the page, so editing this file is almost always enough —
  you shouldn't need to touch the HTML for day-to-day updates.

  Project fields:
    image      optional — path to a cover image (shown on the card and
               detail page). Leave "" to show the initials placeholder.
    stack      tools/methods used (shown as "Stack" on the detail page)
    team       short team description (shown as "Team" on the detail page)
    links      optional list of { label, url } buttons on the detail page
    screenshotLayout   "mobile" (tall phone frames), "desktop" (wide frames) or
                       "mockup" (images that already include a device frame)
    screenshots        list of { src, caption }. Leave src "" to show a
                       placeholder until the real image is added, e.g.
                       { src: "assets/projects/kind/shot-1.jpg", caption: "..." }
*/

const PROFILE = {
  name: "Timothy Othniel Wahyudi",
  title: "Master Track Information Systems Management",
  school: "BINUS University | GPA 3.95 / 4.00 | Jakarta, Indonesia",
  bio:
    "I’m an Information Systems (Master Track) student at BINUS University, recognized in the top 5% of the School of Information Systems. I turn messy business problems into clear requirements, data models and working designs, using SQL, Excel Power Pivot, BPMN/UML and Figma, with foundational SAP S/4HANA and Oracle NetSuite knowledge. Three-time competition finalist in 2026, including the Top 40 of the Agentic AI University Hackathon, part-time IS Lab Assistant, and project lead for a ±60-person student team.",
  tags: ["Functional Consultant", "Business Analyst", "System Analyst"],
  cvUrl: "assets/CV.pdf",
  linkedin: "https://linkedin.com/in/timothyothnielwahyudi",
  email: "timothy.wahyudi@binus.ac.id",
  phone: "+62 851 5627 5425",
};

const PROJECTS = [
  {
    id: "sigap",
    title: "SIGAP",
    image: "assets/projects/sigap/thumbnail.jpg",
    eyebrow: "Agentic AI University Hackathon 2026 · Top 40 Finalist",
    tagline:
      "A five-agent AI system that drafts, monitors and corrects annual drug procurement plans (RKO) for Indonesian health facilities, with the pharmacist keeping the final say.",
    tags: ["Hackathon", "Agentic AI", "Finalist"],
    category: "Agentic AI University Hackathon 2026",
    year: "2026",
    role: "Top 40 Finalist · Co-developer",
    team: "TheBest Team (3 members)",
    stack: "AWS Bedrock AgentCore, Amazon SageMaker, EventBridge, SAP S/4HANA (MM, PP), SAP IBP, SAP Joule, SAP Ariba",
    description:
      "SIGAP (Signal · Intelligent Forecast · Gap Diagnoser · Autonomous Action · Pharmacist Approval) is an agentic AI solution for puskesmas and hospital pharmacists. It builds the yearly drug requirement plan from consumption and morbidity data, watches realisation every month, investigates why the plan and reality diverge, and prepares the corrective documents ready for sign-off.",
    problem:
      "Pharmacists still build RKOs mostly by hand. Planning accuracy was recorded at only 59.89% in Jombang district, and Surabaya puskesmas showed 47.9% stagnant stock alongside 8.56% stock-outs at the same time. E-purchasing realisation usually lands below 50% of the submitted RKO, and existing channels (e-Monev Obat, e-Katalog LKPP) only record data — none of them diagnose why the numbers drift.",
    approach:
      "We designed a closed loop of five agents, each with one job. A Signal Sensor self-triggers when an item’s deviation crosses a threshold; a Gap Diagnoser tests four competing hypotheses (plan set too high, order not placed, supplier under-fulfilment, real demand shift) against the evidence each one needs and reports the surviving cause with an explicit confidence level. An Action Orchestrator then either revises the RKO or escalates to SAP Joule for production planning. Every output stops at a Human-in-the-Loop pharmacist approval with the full reasoning trace. The architecture maps each agent to AWS Bedrock AgentCore services (Runtime, Gateway, Memory, Identity, Observability, Code Interpreter) and to SAP modules (S/4HANA MM & PP, IBP, Ariba).",
    highlights: [
      "Selected as one of the Top 40 Finalists of the Agentic AI University Hackathon 2026, advancing to the Finals & Demo Day on 31 October 2026",
      "Cuts plan-deviation detection from a 12-month cycle down to monthly",
      "Projected 15–20% improvement in drug-planning accuracy, with every decision explainable and approved by a pharmacist",
      "Mapped the full agent loop onto real enterprise services across AWS and SAP",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "SIGAP closed-loop agent framework" },
      { src: "", caption: "AWS & SAP module map" },
      { src: "", caption: "Example run: diagnosing a supply gap" },
      { src: "", caption: "Expected impact" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "kind",
    title: "KIND",
    image: "assets/projects/kind/thumbnail.jpg",
    eyebrow: "ITECHNOCUP PNJ 2026 · International UI/UX Competition · Finalist",
    tagline:
      "An integrated care platform that connects families and care recipients, so dementia is recognized early, managed with confidence, and never faced alone.",
    tags: ["Competition", "UI/UX", "Finalist"],
    category: "ITECHNOCUP Politeknik Negeri Jakarta 2026: International UI/UX Competition",
    year: "2026",
    role: "Finalist · UI/UX design & prototyping",
    team: "Team Excelsior (3 members)",
    stack: "Figma, Design Thinking, SEQ & SUS usability testing, 3-tier architecture",
    description:
      "KIND (Keeping Informed, Nurturing Dementia Care) is a family-caregiving app for dementia. It serves three users at once: the primary family caregiver, relatives who live elsewhere but want to help, and the person living with dementia (PLWD) themselves — not just the person managing care.",
    problem:
      "Indonesia’s STRiDE study found dementia in 27.9% of 2,216 screened older adults, yet only five of them had ever been formally diagnosed. Care falls on one untrained relative, tasks get passed around between family members, and important details disappear between group chats and phone calls. Families can’t tell whether a change in behaviour is normal ageing or something that needs attention.",
    approach:
      "We followed Design Thinking (Empathize → Define → Ideate → Prototype → Test): user interviews, segmentation and personas, an As-Is vs To-Be journey, solution mapping, then high-fidelity prototyping in Figma on an iPhone frame. Core modules: shared Task & Care Management with an AI that surfaces symptom patterns from care logs; Sentinel safety monitoring (CCTV, smartwatch, fall and wandering alerts); a Life Memory Book for the PLWD; an AI-assisted Caregiver Learning Hub; and a Care Circle with permission-based family access. The system scope was defined using a 3-tier architecture.",
    highlights: [
      "Finalist at an international UI/UX competition (ITECHNOCUP PNJ 2026)",
      "SUS rose across three test rounds, 76 → 80 → 86 (average 80.6)",
      "SEQ score of 5.3 across seven core tasks, from adding a recipient to connecting a camera",
      "Iterated the design from tester feedback, e.g. task progress bars and a more capable camera view",
    ],
    screenshotLayout: "mockup",
    screenshots: [
      { src: "assets/projects/kind/shot-1.jpg", caption: "Home: the person’s status, AI recap, live camera and recent behaviour logs" },
      { src: "assets/projects/kind/shot-2.jpg", caption: "Daily care schedule with task progress" },
      { src: "assets/projects/kind/shot-3.jpg", caption: "AI Summary of the day’s vitals, routine and behaviour, with a recommendation" },
      { src: "assets/projects/kind/shot-4.jpg", caption: "Patterns: AI analysis of behaviour logs, agitation peaks and next-day risk" },
      { src: "assets/projects/kind/shot-5.jpg", caption: "Wandering detection: live location, safe zone, Alert Everyone and SOS" },
      { src: "assets/projects/kind/shot-6.jpg", caption: "Lock-screen alert when the person leaves home" },
      { src: "assets/projects/kind/shot-7.jpg", caption: "Sentinel home camera with smart motion alerts" },
      { src: "assets/projects/kind/shot-8.jpg", caption: "Life Memory Book: a shared family timeline of milestones" },
      { src: "assets/projects/kind/shot-9.jpg", caption: "Guided memory session with conversation prompts for the caregiver" },
      { src: "assets/projects/kind/shot-10.jpg", caption: "Education Hub: AI chat for stage-specific caregiving advice" },
      { src: "assets/projects/kind/shot-11.jpg", caption: "Expert-reviewed articles matched to the person’s dementia stage" },
      { src: "assets/projects/kind/shot-12.jpg", caption: "Care Circle: plans and inviting family members to help" },
    ],
    links: [
      { label: "View prototype", url: "https://bit.ly/PrototypeExcelsiorKINDITECHNO" },
      { label: "Figma workspace", url: "https://bit.ly/WorkspaceExcelsiorITECHNO" },
    ],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "skillfuel",
    title: "SkillFuel",
    image: "assets/projects/skillfuel/thumbnail.jpg",
    eyebrow: "HACKFEST UC 2026 · International UI/UX Competition · Finalist",
    tagline:
      "An AI-powered career ecosystem that helps fresh graduates build verified skills and portfolios, and helps recruiters find them faster.",
    tags: ["Competition", "UI/UX", "Finalist"],
    category: "HACKFEST Universitas Ciputra 2026: International UI/UX Competition",
    year: "2026",
    role: "Finalist · Led ideation & UI/UX prototyping",
    team: "Raja Gukguk KMG (5 members)",
    stack: "Figma, Design Thinking, Google Forms survey, HR interviews, SEQ & SUS testing",
    description:
      "SkillFuel is a two-sided platform. Job seekers get structured courses, mentors, an AI CV Builder, Skill Gap Analysis and AI Project Simulations to build a real portfolio; recruiters get Smart Matching that ranks candidates on verified competencies instead of self-reported claims.",
    problem:
      "Graduates leave university without the practical experience or portfolio employers now expect, and their CVs tend to be wordy and overclaim skills. On the other side, HR has under a minute per CV and no reliable way to check what a candidate can actually do. In our survey of 60 respondents, 74% felt their education didn’t match job requirements and 68% found writing an attractive CV hard.",
    approach:
      "We ran a Design Thinking process: a 60-respondent survey, interviews with three HR professionals, segmentation and personas for fresh graduates, young professionals and recruiters, then task flows, a navigation map and high-fidelity Figma screens. Features follow the SKILLS framework: Smart career path, Knowledge courses, Intelligent CV generator, Learning through AI project simulation, Live mentors, and Smart recruiter matching. Job Seek only unlocks applications once a user meets course or project requirements.",
    highlights: [
      "Finalist at an international UI/UX competition (HACKFEST UC 2026)",
      "SUS score of 89.5 and overall SEQ of 4.48 in usability testing",
      "Skill Gap Analysis was ranked the #1 most-wanted feature by survey respondents",
      "Redesigned the Course flow after testing, bringing Continue Learning and streaks to the top",
    ],
    screenshotLayout: "mobile",
    screenshots: [
      { src: "", caption: "Home & Courses" },
      { src: "", caption: "CV Builder AI" },
      { src: "", caption: "Project Simulation AI" },
      { src: "", caption: "Smart Matching for HR" },
    ],
    links: [
      { label: "Figma prototype", url: "https://bit.ly/SkillFuelFigma" },
      { label: "Task flow", url: "https://bit.ly/SkillFuelTaskFlow" },
      { label: "SUS results", url: "https://bit.ly/SkillFuelSUSCalculation" },
    ],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "ventela-d2c",
    title: "Ventela D2C",
    image: "assets/projects/ventela-d2c/thumbnail.jpg",
    eyebrow: "Information Systems Project Management · Final Project",
    tagline:
      "A project plan to move a local sneaker brand from marketplace dependence to its own direct-to-consumer commerce and data platform.",
    tags: ["Project Management", "Agile/Scrum", "Business Case"],
    category: "Course Final Project — Information Systems Project Management",
    year: "2026",
    role: "Team project",
    team: "6 members",
    stack: "Business case, Project Charter, Product Backlog & user stories, WBS, Gantt chart, Risk plan",
    description:
      "A full project-management case for Ventela, an Indonesian footwear brand whose website was only a passive catalog. We planned the build of an owned e-commerce platform with direct checkout, so the brand can sell directly, own its customer data and control its pricing.",
    problem:
      "100% of Ventela’s transactions went through marketplaces and resellers it doesn’t own. Marketplace fashion commission had climbed to about 11.7% per transaction, the brand had 0% first-party customer data, reseller prices were uncontrolled, and stock split across channels caused overstock and stock-outs.",
    approach:
      "We wrote the business case (objectives, tangible and intangible benefits, financial feasibility), then a Project Charter with scope, out-of-scope items, requirements, stakeholders and measurable success criteria. Delivery was planned with Agile/Scrum across four epics: User & Customer, Product & Inventory, Order & Payment, and Shipping & Fulfillment, broken into a WBS, a ~23-week schedule with a critical path, and a risk plan with mitigations.",
    highlights: [
      "Product backlog of 28 user stories (215 story points) with acceptance criteria and priorities",
      "Defined measurable targets: ≥30% direct-channel sales in 12 months, ≥95% inventory accuracy, ≥99.9% uptime",
      "Planned recovery of ~10–15% margin on each transaction moved off marketplaces",
      "Mapped the critical path end to end, from initiation to post-implementation review",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "Business case & objectives" },
      { src: "", caption: "Product backlog" },
      { src: "", caption: "Work Breakdown Structure" },
      { src: "", caption: "Gantt chart & critical path" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "jagotrack",
    title: "JagoTrack",
    image: "assets/projects/jagotrack/thumbnail.jpg",
    eyebrow: "Information Systems Analysis & Design · Lecture Final Project",
    tagline:
      "An operations dashboard and field app for Kopi Jago, tracking every coffee cart’s sales, stock requests and cash deposits in one place.",
    tags: ["System Analysis", "UML", "Final Project"],
    category: "Course Final Project — Information Systems Analysis and Design (Lecture)",
    year: "2025",
    role: "Team project",
    team: "Group project",
    stack: "Fishbone, DFD, Use Case, Class, Sequence, State Transition & Activity diagrams, 3-tier client/server design",
    description:
      "JagoTrack is a system designed for Kopi Jago, a Jakarta coffee brand that sells from electric carts. Cart operators (“Jagoan”) use a mobile app to record orders and request stock; management uses the JagoTrack web dashboard to monitor every cart, confirm stock requests and verify sales deposits.",
    problem:
      "Jagoan earn a 13% share per cup and refill or return stock at the warehouse throughout the day, but sales, stock movements and deposits weren’t tracked in one connected system. That made it hard for management to see each cart’s performance or keep inventory accurate.",
    approach:
      "We gathered requirements through field observation at a Kopi Jago cart, an interview with a Jagoan partner, and analysis of the company’s official channels. From there we mapped the business process, ran a fishbone root-cause analysis, and modelled the system with a context diagram, DFDs, use case diagrams and detailed use case descriptions, class, sequence, state transition and activity diagrams. We then designed the app and web screens and a 3-tier client/server architecture sized for low-end Android devices on unstable 3G/4G.",
    highlights: [
      "Requirements grounded in a real on-site interview and observation",
      "Detailed use cases, e.g. order input with cash/QRIS payment, stock checks and exception handling",
      "Designed 7 Jagoan app flows and 4 management web flows",
      "Specified client, application-server and database-server requirements (MySQL)",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "Business process & fishbone analysis" },
      { src: "", caption: "Data Flow Diagrams" },
      { src: "", caption: "Use case & class diagrams" },
      { src: "", caption: "Jagoan app & JagoTrack web screens" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "mybca-database",
    title: "myBCA Database",
    image: "assets/projects/mybca-database/thumbnail.jpg",
    eyebrow: "Data & Information Management · Final Project",
    tagline:
      "A secure, transaction-ready database design for BCA’s digital banking: customers, accounts, transfers, QRIS payments and audit logs.",
    tags: ["Database Design", "Data Management", "Final Project"],
    category: "Course Final Project — Data and Information Management",
    year: "2025",
    role: "Team project",
    team: "5 members",
    stack: "Database initial study, advanced ERD, physical database design, integrity constraints, application mock-ups",
    description:
      "A data and information management study of Bank Central Asia’s myBCA ecosystem. We analysed how BCA manages customer master data, accounts and real-time transactions across ATM, mobile, internet banking and QRIS, then designed the database to support it.",
    problem:
      "BCA serves 25M+ active customers and processes millions of transactions a day. Data arrives from many channels (ATM, teller, mobile, QRIS), which risks inconsistency without strong integration, and the bank must protect customer data under OJK and BI regulations.",
    approach:
      "We ran a database initial study (company situation, problems, constraints, objectives), then built an advanced ERD and a physical design of 20 tables, covering Customer, Account, User Role, Audit Log, Channel, Transactions, transfer sub-types (to BCA / to other banks), Merchant, Terminal and QRIS Transaction. We added derived data and general constraints (balances can’t go negative, transaction amounts must be > 0) and designed matching app screens for registration, transfers and an activity dashboard.",
    highlights: [
      "Designed one consistent Customer ID across all channels (Master Data Management)",
      "20-table physical design with role-based access and audit logging",
      "Business rules enforced in the database, not just the app",
      "Linked the data model to real user flows: transfers, QRIS and activity history",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "Advanced ERD" },
      { src: "", caption: "Physical database design" },
      { src: "", caption: "App design: transfers" },
      { src: "", caption: "Activity dashboard & QRIS" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "bquick-sales-dashboard",
    title: "B-Quick Sales Dashboard",
    image: "assets/projects/bquick-sales-dashboard/thumbnail.jpg",
    eyebrow: "Data Modelling Lab · Final Project",
    tagline:
      "An interactive Excel sales dashboard built on ~1.05 million transactions for a motorcycle spare-parts retail network.",
    tags: ["Data Analytics", "Excel", "Power Pivot"],
    category: "Course Final Project — Data Modelling (Lab)",
    year: "2026",
    role: "Team project",
    team: "2 members",
    stack: "Excel Power Query, Power Pivot & Data Model, DAX measures, XLOOKUP, PivotTables, slicers, Goal Seek",
    description:
      "We turned a large raw sales dataset into an executive dashboard for B-Quick, a motorcycle parts and service retailer. The analysis covers ~1.05M transactions (Jan–May 2018) across 11 product categories and 7 related entities.",
    problem:
      "Raw transaction tables don’t answer business questions on their own. Management needed to see which categories and customer segments drive revenue, and to know which data-quality issues had to be fixed before the numbers could be trusted for decisions.",
    approach:
      "We imported 7 entities (Sales, Products, Employees, Customers, Countries, Cities, Categories), cleaned text and discount fields, and calculated Unit Price, Total Price and Net Revenue. We classified every transaction as Low/Medium/High value, built named ranges and lookups, related the tables in a Power Pivot Data Model with DAX measures, ran Goal Seek against a revenue target, and finished with five PivotCharts and a slicer-driven interactive dashboard.",
    highlights: [
      "Modelled ~1,048,576 sales rows in a single relational Excel Data Model",
      "DAX measures for total quantity, transaction count and average net revenue",
      "Interactive dashboard with month and transaction-value slicers",
      "Flagged data-quality issues before the insights were used",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "Interactive sales dashboard" },
      { src: "", caption: "Power Pivot data model" },
      { src: "", caption: "PivotCharts" },
      { src: "", caption: "Data cleaning & formulas" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "decathlon-pos-database",
    title: "Decathlon Retail & POS DB",
    image: "assets/projects/decathlon-pos-database/thumbnail.jpg",
    eyebrow: "Database Fundamentals · Final Project",
    tagline:
      "A relational database for retail management and point-of-sale, modelled on Decathlon’s stores, products, inventory and orders.",
    tags: ["SQL", "Oracle", "Final Project"],
    category: "Course Final Project — Database Fundamentals",
    year: "2025",
    role: "Team project",
    team: "5 members",
    stack: "Oracle SQL — DDL, DML, TCL, constraints, joins, subqueries, group functions, views, sequences, regular expressions",
    description:
      "We designed and implemented a relational database that simulates how a global sports retailer runs its stores: customers, employees, products, inventory per store, and point-of-sale orders.",
    problem:
      "A retailer with thousands of products, staff and transactions across many stores needs well-structured, consistent data to run POS operations and to answer business questions from that data.",
    approach:
      "We modelled six entities (Customer, Employee, Product, Store, Inventory, Orders) in an ERD, then implemented them in SQL with primary/foreign keys, NOT NULL and CHECK constraints (including regex email validation), loaded dummy data, and wrote queries for real reporting needs, such as employee tenure, probation end dates, stock levels and sales summaries, using single-row and group functions, joins, subqueries and views.",
    highlights: [
      "Full database lifecycle: ERD → DDL → data → queries → views",
      "Data quality enforced at the schema level with CHECK and regex constraints",
      "Business-style queries for HR and inventory reporting",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "Entity Relationship Diagram" },
      { src: "", caption: "DDL & constraints" },
      { src: "", caption: "Query results" },
      { src: "", caption: "Views" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "stsport",
    title: "StSport",
    image: "assets/projects/stsport/thumbnail.jpg",
    eyebrow: "Information Systems Analysis & Design Lab · Final Project",
    tagline:
      "A system design for booking sports courts and buying sports equipment in one app, with reporting for venue partners.",
    tags: ["System Analysis", "UML", "Final Project"],
    category: "Course Final Project — Information Systems Analysis and Design (Lab)",
    year: "2025",
    role: "Team project",
    team: "4 members",
    stack: "Fishbone, Context diagram & DFD, Use Case, Class, Sequence, State Transition & Activity diagrams, client/server architecture",
    description:
      "StSport connects people who want to play sport with venue owners. Customers can find available courts, book and cancel, and buy equipment; partner staff confirm bookings, and admins generate booking and sales reports.",
    problem:
      "Interest in sport keeps growing, but people struggle to find real-time court availability, booking is often manual, and equipment has to be bought separately. Venue owners, meanwhile, lack an efficient way to manage bookings and reach customers.",
    approach:
      "We analysed root causes with two fishbone diagrams, then modelled the system with a context diagram and seven DFDs (registration, booking, cancellation, equipment purchase, booking confirmation, and two reports). We wrote use case descriptions with pre/post-conditions and exception flows (for example, auto-cancelling unpaid bookings after one hour), followed by class, sequence, state transition and activity diagrams, system input/output designs and the client/server architecture.",
    highlights: [
      "Seven DFDs covering every core business process",
      "Use cases with clear business rules and exception handling",
      "End-to-end design from root-cause analysis to architecture",
    ],
    screenshotLayout: "desktop",
    screenshots: [
      { src: "", caption: "Fishbone analysis" },
      { src: "", caption: "Context diagram & DFDs" },
      { src: "", caption: "Use case diagram" },
      { src: "", caption: "Class & sequence diagrams" },
    ],
    links: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    id: "social-door",
    title: "Social Door",
    image: "assets/projects/social-door/thumbnail.jpg",
    eyebrow: "User Experience Research & Design · Lecture Final Project",
    tagline:
      "A one-stop neighbourhood app to share road updates, discover nearby places and events, book local facilities, and talk with neighbours.",
    tags: ["UI/UX", "Figma", "Final Project"],
    category: "Course Final Project — User Experience Research and Design (Lecture)",
    year: "2024",
    role: "Team project",
    team: "4 members",
    stack: "Figma, Design Thinking, survey, persona, user journey, task flow, low- & high-fidelity wireframes, navigation map",
    description:
      "Social Door is a mobile app for people living in urban housing complexes. It brings together what’s happening around them: events, trending food and hangout spots, live traffic, facility bookings and a community forum.",
    problem:
      "Residents struggle to find nearby events, good places to eat, real-time traffic information and public facilities, and have no shared space to swap information with their neighbours.",
    approach:
      "We ran a survey and built a persona (a university student living in a mid-range urban housing complex), mapped pain points to solutions, and sketched and designed in Figma from low to high fidelity. The app has five main features: Jelajah (explore trending places), Aktivitas (book sports facilities and local tickets), Events, CCTV (live traffic and user updates) and Forum, plus a notification centre.",
    highlights: [
      "Every feature traced back to a specific user pain point",
      "Complete artefact set: persona, user journey, task flow, wireframes and navigation map",
      "High-fidelity interactive Figma prototype",
    ],
    screenshotLayout: "mobile",
    screenshots: [
      { src: "", caption: "Jelajah (explore)" },
      { src: "", caption: "Aktivitas (book facilities)" },
      { src: "", caption: "Events" },
      { src: "", caption: "CCTV & Forum" },
    ],
    links: [
      { label: "High-fidelity design", url: "https://www.figma.com/design/WXHCHynzCePJe6M5dQyutb/LEC-FP?node-id=222-22929" },
    ],
    liveUrl: "",
    repoUrl: "",
  },
];

/*
  EXPERIENCE is grouped by organization (matching the wireframe: one
  company/school header can have multiple role entries under it — e.g.
  two promotions at the same company, or two roles at the same school).
*/
const EXPERIENCE = [
  {
    company: "BINUS University",
    initials: "BU",
    logo: "assets/binuslogo.png",
    roles: [
      {
        eyebrow: "School of Information Systems",
        title: "Information System Laboratory Assistant",
        meta: "Part-Time · Feb 2026 – Present",
        description:
          "Teach Database Fundamentals and User Experience Research & Design lab sessions across 2 classes (~90 students), prepare lab materials, resolve technical issues, and grade assignments and final projects against course criteria with constructive feedback. Recognized as a Dedicated Laboratory Assistant (2026).",
      },
      {
        eyebrow: "BINUS Student Advisory & Support Center (SASC)",
        title: "Duta Binusian — Student Mentor",
        meta: "Mentor Scholarship Awardee · Feb 2026 – Aug 2026",
        description:
          "Mentored a student through structured one-on-one sessions in Algorithm & Programming and Business Application Development, adapting to their needs and tracking progress. My mentee finished with an A (100/100) in Algorithm & Programming and a B+ (83/100) in Business Application Development.",
      },
      {
        eyebrow: "School of Information Systems",
        title: "Member, Information Systems Case Study Club (ISCSC)",
        meta: "Feb 2026 – Present",
        description:
          "Solve real business cases through structured training and competitions, working with other members to break problems down, form hypotheses and build recommendations using case-solving frameworks.",
      },
    ],
  },
  {
    company: "HIMSISFO BINUS",
    initials: "HB",
    logo: "assets/HIMSISFOlogo.png",
    roles: [
      {
        eyebrow: "Himpunan Mahasiswa Sistem Informasi (HIMSISFO) BINUS @Kemanggisan",
        title: "Information Commission Coordinator",
        meta: "2026/2027 Term · Feb 2026 – Present",
        description:
          "Lead the internal information flow, communication updates and documentation for HIMSISFO, supervising commission members as they prepare announcements and communication materials so they go out on time and support cross-division work.",
      },
      {
        eyebrow: "Pengabdian kepada Masyarakat (Community Service) HIMSISFO 2026: LINK",
        title: "Advisory Board — Logistics",
        meta: "Mar 2025 – Jul 2026",
        description:
          "Advised the logistics team on planning and operations for a multi-region community program across Greater Jakarta, Semarang and Medan reaching ~300 students, keeping plans aligned with university regulations and consistent across all three regions.",
      },
      {
        eyebrow: "GERAK HIMSISFO 2026: VIBEZ (Gathering, Rekreasi, dan Rapat Kerja)",
        title: "Coordinator, Support Division",
        meta: "Mar 2025 – Jun 2026",
        description:
          "Coordinated the Support Division for a two-day hybrid organizational development and bonding program connecting members from Jakarta, Semarang and Medan, working with the Project Manager on briefings, collaborative sessions and participant engagement.",
      },
      {
        eyebrow: "LDKCP HIMSISFO 2026: LUNAR — “Leadership with Understanding and Actions”",
        title: "Speaker",
        meta: "14 June 2026",
        description:
          "Invited to speak at HIMSISFO’s leadership training for incoming members, sharing insights from leading teams and projects across the organization. Recognized with a Certificate of Appreciation for my contribution.",
      },
      {
        eyebrow: "Farewell Party & Yearbook HIMSISFO 2026: Film",
        title: "Project Manager",
        meta: "Mar 2025 – Feb 2026",
        description:
          "Led 6 divisions and ±60 members across regions, owning the timeline, budget, venue, creative direction, logistics and cross-division communication from planning to execution.",
      },
      {
        eyebrow: "Pengabdian kepada Masyarakat (PkM) HIMSISFO 2025: SPARK",
        title: "Coordinator, Publication & Documentation Division",
        meta: "Mar 2025 – Jul 2025",
        description:
          "Led a 6-member team covering a 5-day program with 80+ participants, set the creative theme and visual style, and delivered all documentation on schedule for event evaluation and post-event media releases.",
      },
      {
        eyebrow: "HIMSISFO 2025",
        title: "Staff Roles — SELCAVIS: PRODIGI, Welcoming Party: VENTURE & 3rd Commission",
        meta: "Mar 2025 – Nov 2025",
        description:
          "Produced and edited photo/video documentation for a ±150-participant selection program (Publication & Documentation, SELCAVIS: PRODIGI); supported operations and participant flow for 300+ new activist candidates (Support Division, VENTURE); and designed Instagram Story content as a 3rd Commission (Information) activist.",
      },
    ],
  },
  {
    company: "PT Fukuda Technology",
    initials: "FT",
    logo: "assets/fukudalogo.jpeg",
    roles: [
      {
        eyebrow: "Measurement & Calibration",
        title: "Intern",
        meta: "Internship · Apr 2024 – May 2024",
        description:
          "Learned fundamental measurement techniques and observed how field technicians carry out accuracy verification, assisted with simple supervised measurement tasks, and saw first-hand the documentation practices that keep industrial work precise and consistent.",
      },
    ],
  },
];

/*
  CERTIFICATES powers the "Achievements & Certifications" section and the
  certificate.html?id=... detail pages. Add a new object with a unique id
  and an image in assets/certificates/ and it appears automatically.

    type            one of the filter groups: "Award", "Competition",
                    "Training", "Organization"
    credentialId    optional certificate / letter number
    verifyUrl       optional link where the certificate can be verified
    relatedProject  optional id from PROJECTS — adds a "View related project" button
    image           leave "" for an award whose certificate hasn't been issued
                    yet; a "Certificate coming soon" placeholder is shown
*/
const CERTIFICATES = [
  {
    id: "excellence-awardee-2026",
    title: "School of Information Systems Excellence Awardee 2026",
    issuer: "BINUS University — School of Information Systems",
    date: "17 June 2026",
    year: "2026",
    type: "Award",
    image: "assets/certificates/excellence-awardee-2026.jpg",
    summary: "Recognized among the top 5% of students in the School of Information Systems for academic performance.",
    description:
      "A Certificate of Appreciation from the Dean of the School of Information Systems, awarded at BINUS Excellence Day for excellent academic achievement in 2026 that brought recognition to BINUS University.",
    significance:
      "Excellence Awardees are the top 5% of students in the School of Information Systems by academic performance. I earned it while also working as a lab assistant, mentoring through Duta Binusian, coordinating a HIMSISFO commission and competing in three competitions.",
    skills: ["Academic excellence (GPA 3.95 / 4.00)", "Consistency", "Time management alongside work and organizations"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "deans-list-2025",
    title: "Dean’s List 2025",
    issuer: "BINUS University — School of Information Systems",
    date: "31 December 2025",
    year: "2025",
    type: "Award",
    image: "assets/certificates/deans-list-2025.jpg",
    summary: "Placed on the 2025 Dean’s List for outstanding academic achievement (top 25% of the school).",
    description:
      "Certifies that I was placed on the School of Information Systems Dean’s List 2025 in recognition of outstanding academic achievement, signed by the Dean of the School of Information Systems.",
    significance:
      "The Dean’s List recognizes the top 25% of students in the school based on their academic performance for the year, and it was the first step towards the 2026 Excellence Award.",
    skills: ["Academic excellence", "Information Systems fundamentals", "Self-discipline"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "itechnocup-2026-finalist",
    title: "Finalist — ITechno Cup 2026 International UI/UX Design Competition",
    issuer: "HIMATIK, Politeknik Negeri Jakarta",
    date: "17 August – 29 September 2026",
    year: "2026",
    type: "Competition",
    image: "assets/certificates/itechnocup-2026-finalist.jpg",
    summary: "Finalist with Team Excelsior for KIND, a dementia family-care platform.",
    description:
      "Awarded to Team Excelsior (Adrian Aulia Pulungan, Debora Tendean and Timothy Othniel Wahyudi) as a Finalist in the International UI/UX Design Competition at ITechno Cup 2026, organized by HIMATIK, Politeknik Negeri Jakarta.",
    significance:
      "Our entry, KIND, is an integrated care platform that helps families recognize dementia early and coordinate care together. We took it from user research to a tested Figma prototype, and its usability score rose from 76 to 86 over three rounds of testing.",
    skills: ["UI/UX design", "Design Thinking", "User research & usability testing (SEQ, SUS)", "Figma prototyping", "Pitching"],
    credentialId: "1655/PL3.13/SRt/ITECHNO CUP/HIMATIK PNJ/IX/2026",
    verifyUrl: "",
    relatedProject: "kind",
  },
  {
    id: "hackfest-2026-finalist",
    title: "Finalist — Hackfest International UI/UX Competition 2026",
    issuer: "Universitas Ciputra — Informatics Student Union",
    date: "18 April 2026",
    year: "2026",
    type: "Competition",
    image: "assets/certificates/hackfest-2026-finalist.jpg",
    summary: "Finalist with Raja Gukguk KMG for SkillFuel, an AI-powered career readiness platform.",
    description:
      "A Certificate of Appreciation recognizing my outstanding achievement as a Finalist, with team Raja Gukguk KMG, at Hackfest: International UI/UX Competition 2026, held by Universitas Ciputra.",
    significance:
      "I led ideation and UI/UX prototyping for SkillFuel, a platform that helps fresh graduates build verified skills and portfolios and helps recruiters screen candidates faster. The prototype scored 89.5 on the System Usability Scale.",
    skills: ["Product ideation", "UI/UX design", "Survey & interview research", "Figma prototyping", "Team leadership"],
    credentialId: "090/SU-IMT/UC/CA/IV/2026",
    verifyUrl: "",
    relatedProject: "skillfuel",
  },
  {
    id: "agentic-ai-hackathon-2026-finalist",
    title: "Top 40 Finalist — Agentic AI University Hackathon 2026",
    issuer: "Agentic AI University Hackathon 2026 · with AWS & SAP",
    date: "21 September 2026",
    year: "2026",
    type: "Competition",
    image: "assets/certificates/agentic-ai-hackathon-2026-finalist.jpg",
    summary: "Selected as one of the Top 40 Finalists with SIGAP, advancing to the Finals & Demo Day on 31 October 2026.",
    description:
      "The official finalist announcement from the Agentic AI University Hackathon 2026 team, sent on 21 September 2026. It confirms that my team, TheBest Team, made it into the Top 40 Finalists and advanced to the Hackathon Finals & Demo Day on 31 October 2026 at BINUS University Alam Sutera. Before the finals, teams receive a month of expert mentoring from AWS and SAP (1–30 October).",
    significance:
      "SIGAP turns drug procurement planning in Indonesian health facilities from a manual yearly estimate into a monthly, self-checking loop. Five agents detect deviations, test competing root-cause hypotheses, and prepare corrections for a pharmacist to approve. The architecture runs on AWS Bedrock AgentCore and connects to SAP S/4HANA, IBP, Joule and Ariba.",
    skills: ["Agentic AI solution design", "AWS Bedrock AgentCore", "SAP S/4HANA & IBP", "Business process analysis", "Healthcare supply chain"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "sigap",
  },
  {
    id: "ui-studentpreneurs-bmcc-2026",
    title: "Semifinalist — Business Model Canvas Competition, The 15th UI Studentpreneurs",
    issuer: "BEM FEB Universitas Indonesia",
    date: "26 January 2026",
    year: "2026",
    type: "Competition",
    image: "assets/certificates/ui-studentpreneurs-bmcc-2026.jpg",
    summary: "Reached the semifinal of a business model competition hosted by Universitas Indonesia.",
    description:
      "A Certificate of Appreciation recognizing me as a Semifinalist in the Business Model Canvas Competition at The 15th UI Studentpreneurs, organized by the Student Executive Board of the Faculty of Economics and Business, Universitas Indonesia (Depok).",
    significance:
      "The competition is judged on how well a team designs and justifies a business model, from customer segments and value proposition to revenue streams and cost structure. It’s the business side of the work I do as an aspiring business analyst.",
    skills: ["Business Model Canvas", "Business analysis", "Value proposition design", "Presentation"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "dedicated-lab-assistant-2026",
    title: "Dedicated Laboratory Assistant (Asisten Berdedikasi)",
    issuer: "Information System Laboratory, School of Information Systems, BINUS University",
    date: "Even Semester 2025/2026",
    year: "2026",
    type: "Award",
    image: "assets/certificates/dedicated-lab-assistant-2026.jpg",
    summary: "Recognized for outstanding dedication and teaching performance as an IS Lab Assistant.",
    description:
      "Awarded by the Dean of the School of Information Systems to recognize me as a Dedicated Assistant (Asisten Berdedikasi) of the Information System Laboratory for the Even Semester 2025/2026.",
    significance:
      "In my first semester as a part-time lab assistant I taught Database Fundamentals and User Experience Research & Design lab sessions to ~90 students across 2 classes, and graded their assignments and final projects against course criteria.",
    skills: ["Teaching & facilitation", "SQL & database fundamentals", "UX research & design", "Assessment & feedback"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "duta-binusian-mentor-scholarship-2026",
    title: "Mentor Scholarship Awardee — Duta Binusian",
    issuer: "BINUS Student Advisory & Support Center (SASC)",
    date: "2026",
    year: "2026",
    type: "Award",
    image: "",
    summary: "Selected for the Duta Binusian mentor scholarship to support fellow students academically.",
    description:
      "BINUS SASC selected me as a Mentor Scholarship Awardee in the Duta Binusian program, which places students as mentors who guide their peers through mentoring sessions, study-group facilitation and academic support. The certificate will be added here once it is available.",
    significance:
      "From February to August 2026 I mentored a student through structured one-on-one sessions in Algorithm & Programming and Business Application Development. My mentee finished with an A (100/100) in Algorithm & Programming and a B+ (83/100) in Business Application Development.",
    skills: ["Mentoring", "Explaining technical concepts", "Programming fundamentals", "Progress monitoring"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "agentic-ai-hackathon-workshop-2026",
    title: "Agentic AI Hackathon 2026 — Online Workshop",
    issuer: "Sokrates · powered by AWS, with SAP",
    date: "11 September 2026",
    year: "2026",
    type: "Training",
    image: "assets/certificates/agentic-ai-hackathon-workshop-2026.jpg",
    summary: "Workshop on building agentic AI solutions, part of the hackathon where my team’s SIGAP reached the finals.",
    description:
      "A Certificate of Participation for the Agentic AI Hackathon 2026 Online Workshop, part of the preparation and learning journey towards developing AI-driven solutions. The hackathon was run by Sokrates, powered by AWS, with SAP as a partner.",
    significance:
      "What I learned in the workshop went straight into SIGAP, my team’s hackathon entry. SIGAP is a five-agent system for drug procurement planning that maps its agents onto AWS Bedrock AgentCore and SAP modules, and it reached the finals.",
    skills: ["Agentic AI concepts", "AWS Bedrock AgentCore", "SAP enterprise modules", "Human-in-the-loop design"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "sigap",
  },
  {
    id: "bca-berbagi-ilmu-2026",
    title: "BCA Berbagi Ilmu: From Lecture Hall to Real World — Thriving in a Turbulent Era",
    issuer: "PT Bank Central Asia Tbk × BINUS University",
    date: "8 April 2026",
    year: "2026",
    type: "Training",
    image: "assets/certificates/bca-berbagi-ilmu-2026.jpg",
    summary: "Industry session from BCA on moving from university into a fast-changing workplace.",
    description:
      "A certificate of participation in BCA Berbagi Ilmu, organized by PT Bank Central Asia Tbk together with BINUS University. It is signed by BINUS’s Vice Rector of Student Affairs and an Executive Vice President of BCA.",
    significance:
      "The session covered how graduates can adapt and stay relevant as they move from the classroom into an uncertain working world. It is directly relevant to my goal of landing an industry internship.",
    skills: ["Career readiness", "Industry insight (banking)", "Adaptability"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "mybca-database",
  },
  {
    id: "train-the-trainer-2026",
    title: "Train the Trainer: Presentation Techniques",
    issuer: "BINUS Corporate Learning & Development (BCL&D)",
    date: "27 January 2026",
    year: "2026",
    type: "Training",
    image: "assets/certificates/train-the-trainer-2026.jpg",
    summary: "Training in presentation and delivery techniques for people who teach and facilitate.",
    description:
      "A Certificate of Attendance for the Train the Trainer: Presentation Techniques training run by BINUS Corporate Learning & Development. You can verify it online with the certificate code below.",
    significance:
      "I took this training just before starting as an IS Lab Assistant, and I now use it every week when I lead lab sessions for ~90 students.",
    skills: ["Presentation skills", "Public speaking", "Facilitation"],
    credentialId: "vdIOKXwgdK",
    verifyUrl: "https://beelajarlms.apps.binus.edu/verify_certificate",
    relatedProject: "",
  },
  {
    id: "himsisfo-ldkcp-lunar-2026-speaker",
    title: "Speaker — LDKCP HIMSISFO 2026: LUNAR",
    issuer: "HIMSISFO BINUS University × AIS Student Chapters",
    date: "14 June 2026",
    year: "2026",
    type: "Organization",
    image: "assets/certificates/himsisfo-ldkcp-lunar-2026-speaker.jpg",
    summary: "Invited as a speaker at HIMSISFO’s leadership training, “Leadership with Understanding and Actions”.",
    description:
      "A Certificate of Appreciation from HIMSISFO in recognition of my outstanding contribution and the insights I delivered as a speaker at LDKCP HIMSISFO 2026: LUNAR, “Leadership with Understanding and Actions”, on 14 June 2026. It is signed by the General President of HIMSISFO 2026/2027 and the event’s Project Manager.",
    significance:
      "LDKCP is HIMSISFO’s leadership training for incoming members. Speaking there let me pass on what I’ve learned leading teams across the organization, such as managing ±60 people as Project Manager of the Farewell Party & Yearbook, to the next generation of activists.",
    skills: ["Public speaking", "Leadership", "Knowledge sharing", "Mentoring"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "himsisfo-film-2026-project-manager",
    title: "Project Manager — Farewell Party & Yearbook HIMSISFO 2026: Film",
    issuer: "HIMSISFO BINUS University × AIS Student Chapters",
    date: "1 February 2026",
    year: "2026",
    type: "Organization",
    image: "assets/certificates/himsisfo-film-2026-project-manager.jpg",
    summary: "Led 6 divisions and ±60 members to deliver HIMSISFO’s farewell party and yearbook.",
    description:
      "A Certificate of Contribution from HIMSISFO for my outstanding dedication and contribution as Project Manager of Farewell Party and Yearbook HIMSISFO 2026: Film, held on 1 February 2026.",
    significance:
      "As Project Manager I owned the timeline, budget, venue planning, creative direction, logistics and cross-division communication for 6 divisions and around 60 committee members across regions. It was my largest end-to-end project.",
    skills: ["Project management", "Budgeting", "Stakeholder coordination", "Leadership"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "himsisfo-pkm-spark-2025",
    title: "Coordinator, Publication & Documentation — PkM HIMSISFO 2025: SPARK",
    issuer: "HIMSISFO BINUS University × AIS Student Chapters",
    date: "21–25 July 2025",
    year: "2025",
    type: "Organization",
    image: "assets/certificates/himsisfo-pkm-spark-2025.jpg",
    summary: "Led the media team for a 5-day community service program with 80+ participants.",
    description:
      "A Certificate of Contribution from HIMSISFO for my outstanding dedication and contribution as Coordinator of the Publication and Documentation Division at PkM HIMSISFO 2025: SPARK, from 21 to 25 July 2025.",
    significance:
      "I led a 6-member team producing all multimedia coverage for the program, set its creative theme and visual style, and delivered every piece of documentation on schedule for the event evaluation and post-event releases.",
    skills: ["Team coordination", "Creative direction", "Deadline management"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
  {
    id: "himsisfo-selcavis-prodigi-2025",
    title: "Staff, Publication & Documentation — SELCAVIS HIMSISFO 2025: PRODIGI",
    issuer: "HIMSISFO BINUS University × AIS Student Chapters",
    date: "11 October 2025",
    year: "2025",
    type: "Organization",
    image: "assets/certificates/himsisfo-selcavis-prodigi-2025.jpg",
    summary: "Documented a selection program of ±150 participants.",
    description:
      "A Certificate of Contribution from HIMSISFO for my outstanding dedication and contribution as Staff of the Publication and Documentation Division at SELCAVIS HIMSISFO 2025: PRODIGI on 11 October 2025.",
    significance:
      "I produced and edited the photo and video documentation for HIMSISFO’s activist selection program, which had around 150 participants.",
    skills: ["Documentation", "Photo & video editing", "Teamwork"],
    credentialId: "",
    verifyUrl: "",
    relatedProject: "",
  },
];
