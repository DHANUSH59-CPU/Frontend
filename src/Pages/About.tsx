import {
  Sparkles,
  UserCheck,
  Upload,
  Shield,
  Target,
  Users,
  Zap,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const FeatureCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="h-full transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
        {icon}
      </div>
      <CardTitle className="text-xl mb-2">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{children}</CardDescription>
    </CardContent>
  </Card>
);

const TechBadge = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => {
  const badgeContent = (
    <span className="inline-block bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium border border-border transition-colors duration-200 group-hover:bg-primary/10 group-hover:border-primary/30">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group transform transition-transform duration-200 hover:scale-105"
      >
        {badgeContent}
      </a>
    );
  }
  return badgeContent;
};

const AboutUsPage = () => {
  const features = [
    {
      icon: <Sparkles size={24} className="text-primary" />,
      title: "AI-Powered Matching",
      description:
        "Upload character images and let our advanced AI find the perfect actors based on appearance, skills, and compatibility scores.",
    },
    {
      icon: <UserCheck size={24} className="text-primary" />,
      title: "Profile Builder",
      description:
        "Create detailed profiles with role-specific fields, portfolio uploads, skills, languages, and comprehensive information.",
    },
    {
      icon: <Upload size={24} className="text-primary" />,
      title: "Image Upload & Analysis",
      description:
        "Directors can upload character images for AI-powered matching. Actors get discovered through intelligent algorithms.",
    },
    {
      icon: <Shield size={24} className="text-primary" />,
      title: "Secure Platform",
      description:
        "Your data is protected with industry-standard security measures including JWT authentication and OAuth integration.",
    },
    {
      icon: <Target size={24} className="text-primary" />,
      title: "Industry-Focused",
      description:
        "Built specifically for the film industry, connecting actors and directors to create exceptional cinematic experiences.",
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "Direct Connections",
      description:
        "Connect directly with matched talent, view detailed profiles, and build lasting professional relationships.",
    },
  ];

  const technologies = {
    "face embedding microservice": [
      { name: "Python 3.11", href: "https://www.python.org/" },
      { name: "FastAPI", href: "https://fastapi.tiangolo.com/" },
      { name: "Uvicorn", href: "https://www.uvicorn.org/" },
      { name: "PyTorch", href: "https://pytorch.org/" },
      { name: "facenet-pytorch", href: "https://github.com/timesler/facenet-pytorch" },
      { name: "Pillow (PIL)", href: "https://pillow.readthedocs.io/" },
      { name: "NumPy", href: "https://numpy.org/" },
      { name: "python-multipart", href: "https://github.com/andrew-d/python-multipart" },
    ],
    frontend: [
      { name: "React", href: "https://react.dev/" },
      { name: "TypeScript", href: "https://www.typescriptlang.org/" },
      { name: "Vite", href: "https://vitejs.dev/" },
      { name: "Tailwind CSS", href: "https://tailwindcss.com/" },
      { name: "Shadcn UI", href: "https://ui.shadcn.com/" },
      { name: "Redux Toolkit", href: "https://redux-toolkit.js.org/" },
      { name: "Framer Motion", href: "https://www.framer.com/motion/" },
    ],
    backend: [
      { name: "Node.js", href: "https://nodejs.org/" },
      { name: "Express", href: "https://expressjs.com/" },
      { name: "MongoDB", href: "https://www.mongodb.com/" },
      { name: "Mongoose", href: "https://mongoosejs.com/" },
      { name: "JWT", href: "https://jwt.io/" },
    ],
    integrations: [
      { name: "Google OAuth", href: "https://developers.google.com/identity" },
      { name: "Cloudinary", href: "https://cloudinary.com/" },
      { name: "AI Matching Engine", href: "#" },
    ],
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            About Talent Frame
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            An AI-powered platform designed to revolutionize talent discovery in
            the film industry by connecting actors and directors through
            intelligent matching technology.
          </p>
        </header>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="flex justify-center items-center">
            <Card className="w-full max-w-3xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4 flex items-center">
                  <Target size={30} className="mr-3 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-base">
                  The film industry faces challenges in finding the right talent
                  for specific roles. Directors spend countless hours reviewing
                  portfolios and auditions, while actors struggle to be
                  discovered. Talent Frame was built to solve these challenges
                  by leveraging AI technology to match character requirements
                  with the perfect actors, saving time and creating opportunities
                  for both directors and actors in the industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-10">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
              >
                {feature.description}
              </FeatureCard>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-20 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Technology</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We use a modern, robust stack to deliver a fast, secure, and
            reliable experience.
          </p>
          <div className="space-y-6">
            {Object.entries(technologies).map(([section, techs]) => (
              <div key={section}>
                <h3 className="text-xl font-semibold mb-3 capitalize">
                  {section}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {techs.map((tech) => (
                    <TechBadge key={tech.name} href={tech.href}>
                      {tech.name}
                    </TechBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-10">Meet the Team</h2>
          <AnimatedTestimonials
            testimonials={[
              {
                quote:
                  "Co-founder and Full Stack Developer behind Talent Frame. Passionate about leveraging AI technology to revolutionize talent discovery in the film industry. Built the platform to solve the challenges faced by actors and directors in finding the perfect match.",
                name: "Dhanush Kumar S R",
                designation: "Co-founder & Full Stack Developer",
                src: "https://res.cloudinary.com/dkjkyw4pc/image/upload/v1762026493/avatars/avatar_690663e2140cf4c2f7bacdc4.jpg",
              },
              {
                quote:
                  "Co-founder and AI/ML Engineer specializing in face recognition and embedding technologies. Developed the Python microservice that powers Talent Frame's AI matching engine, enabling intelligent actor-director connections.",
                name: "G Harshavardhan",
                designation: "Co-founder & AI/ML Engineer",
                src: "https://res.cloudinary.com/dkjkyw4pc/image/upload/v1762092430/avatars/avatar_6906642a140cf4c2f7bacdd0.jpg",
              },
            ]}
            autoplay={false}
          />
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;

