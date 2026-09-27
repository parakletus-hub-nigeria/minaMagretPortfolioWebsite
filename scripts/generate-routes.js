import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const defaultOgImage = 'https://cdn.sanity.io/images/cod4w9ou/production/c72faa4aa2c39e39b4f941284cd7f055ddb8e922-3889x4861.jpg';

const routes = [
  {
    path: '/home',
    title: 'Home - Professor Mina Margaret Ogbanga',
    description: 'Official academic website of Professor Mina Margaret Ogbanga — First Professor of Social Work & Environmental Sustainability Globally, Ford Foundation Fellow, and Development Activist.',
  },
  {
    path: '/about/profile',
    title: 'Executive Biography & Profile - Professor Mina Margaret Ogbanga',
    description: 'Explore the life, academic leadership, and advocacy career of Professor Mina Margaret Ogbanga — First Professor of Social Work & Environmental Sustainability Globally.',
  },
  {
    path: '/about/my-work',
    title: 'Professional Impact & Initiatives - Professor Mina Margaret Ogbanga',
    description: 'Community development, environmental restoration, extractive industry advocacy, and WASH projects led by Professor Mina Margaret Ogbanga.',
  },
  {
    path: '/about/education',
    title: 'Education & Executive Studies - Professor Mina Margaret Ogbanga',
    description: 'Academic credentials, University of Cambridge, Harvard University executive education, and doctoral research in sustainable development.',
  },
  {
    path: '/about/fellowships-and-scholarships',
    title: 'Fellowships & Scholarships - Professor Mina Margaret Ogbanga',
    description: 'Ford Foundation Fellowships and prestigious academic research endowments awarded to Professor Mina Margaret Ogbanga.',
  },
  {
    path: '/about/awards-and-recognitions',
    title: 'Awards & Recognitions - Professor Mina Margaret Ogbanga',
    description: 'EU AID Women in Development, UN-Habitat, and NIM Best Young Manager accolades honoring Professor Mina Margaret Ogbanga.',
  },
  {
    path: '/writings/papers',
    title: 'Research Publications & Papers - Professor Mina Margaret Ogbanga',
    description: 'Peer-reviewed academic research papers, scholarly citations, and policy monographs on environmental social work, extractive sector, and SDGs.',
  },
  {
    path: '/writings/textbooks',
    title: 'Authored Textbooks & Books - Professor Mina Margaret Ogbanga',
    description: 'Academic textbooks and scholarly volumes authored by Professor Mina Margaret Ogbanga for students, researchers, and practitioners.',
  },
  {
    path: '/writings/manuals',
    title: 'Development Manuals & Toolkits - Professor Mina Margaret Ogbanga',
    description: 'Practical toolkits, training manuals, and field guides on peacebuilding, extractive sector governance, and environmental sustainability.',
  },
  {
    path: '/gallery/videos',
    title: 'Keynotes & Media Appearances - Professor Mina Margaret Ogbanga',
    description: 'Speeches, keynote lectures, TEDx talks, and broadcast interviews featuring Professor Mina Margaret Ogbanga.',
  },
  {
    path: '/gallery/news',
    title: 'News & Press Releases - Professor Mina Margaret Ogbanga',
    description: 'Latest media features, press releases, and global coverage of Professor Mina Margaret Ogbanga.',
  },
  {
    path: '/gallery/pictures',
    title: 'Official Portraits & Press Kit - Professor Mina Margaret Ogbanga',
    description: 'Download high-resolution official portraits and media assets for conference programs and press kits.',
  },
  {
    path: '/blog',
    title: 'Articles & Perspectives - Professor Mina Margaret Ogbanga',
    description: 'Thought leadership essays and commentaries on climate resilience, social justice, and higher education.',
  },
  {
    path: '/contact',
    title: 'Speaking Engagements & Advisory Inquiries - Professor Mina Margaret Ogbanga',
    description: 'Invite Professor Mina Margaret Ogbanga for keynote addresses, policy advisory, research collaborations, or media interviews.',
  },
];

function generatePrerenderedRoutes() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run "vite build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  let generatedCount = 0;

  for (const route of routes) {
    const pageUrl = `https://minaogbanga.com${route.path}`;
    const pageImage = route.ogImage || defaultOgImage;

    let html = template;

    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
    
    // Replace meta description
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace canonical URL
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${pageUrl}" />`
    );

    // Replace OpenGraph tags
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:url" content="${pageUrl}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:image" content="${pageImage}" />`
    );

    // Replace Twitter cards
    html = html.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:image" content="${pageImage}" />`
    );

    // Target route directory in dist
    const routeDirPath = path.join(distDir, route.path.replace(/^\//, ''));
    fs.mkdirSync(routeDirPath, { recursive: true });

    const outputFilePath = path.join(routeDirPath, 'index.html');
    fs.writeFileSync(outputFilePath, html, 'utf8');
    generatedCount++;
  }

  console.log(`✓ Prerendered ${generatedCount} static routes with custom OpenGraph / SEO tags in dist/`);
}

generatePrerenderedRoutes();
