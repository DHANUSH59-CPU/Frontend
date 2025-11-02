import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import CardFlip from "@/components/kokonutui/card-flip";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/store/appStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserPlus,
  Upload,
  Sparkles,
  Users,
  Shield,
  Zap,
  Target,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.authSlice);

  // Quick Start actions
  const quickStartActions = [
    {
      title: "Edit Profile",
      subtitle: "Build your profile",
      description:
        "Create or update your profile with your skills, experience, portfolio, and other details. Showcase your talent to directors or define your casting needs.",
      features: [
        "Role-specific fields",
        "Upload portfolio",
        "Skills & languages",
        "Bio & details",
      ],
      onClick: () => {
        if (isAuthenticated) {
          navigate("/profile");
        } else {
          navigate("/login");
        }
      },
    },
    {
      title: "Match",
      subtitle: "Find perfect matches",
      description:
        "Upload character images and let AI find the perfect actors for your project. Get compatibility scores and detailed match results instantly.",
      features: [
        "Upload images",
        "AI-powered matching",
        "Compatibility scores",
        "Detailed results",
      ],
      onClick: () => {
        if (isAuthenticated) {
          navigate("/match");
        } else {
          navigate("/login");
        }
      },
    },
    {
      title: "Character Builder",
      subtitle: "Define your vision",
      description:
        "Build detailed character profiles with specific requirements for casting. Define the perfect character for your project. (Coming Soon)",
      features: [
        "Character details",
        "Casting requirements",
        "Visual references",
        "Coming Soon",
      ],
      onClick: () => {
        if (isAuthenticated) {
          navigate("/character-builder");
        } else {
          navigate("/login");
        }
      },
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <LampContainer className="bg-background">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-40 text-center"
        >
          <motion.h1 className="bg-gradient-to-br from-foreground to-muted-foreground py-4 bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Welcome to <br /> Talent Frame
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the perfect talent for your story — powered by AI and
            crafted for the film industry.
          </motion.p>
        </motion.div>
      </LampContainer>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Sign up / Build Profile",
                description:
                  "Create your account and build a comprehensive profile showcasing your talent, skills, and experience.",
                icon: UserPlus,
              },
              {
                step: "2",
                title: "Upload Images / Get Matched",
                description:
                  "Directors upload character images for AI matching. Actors get discovered through intelligent matching algorithms.",
                icon: Upload,
              },
              {
                step: "3",
                title: "Connect & Collaborate",
                description:
                  "Review matches, check compatibility scores, and connect with perfect talent to bring your vision to life.",
                icon: Users,
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Talent Frame
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for the film industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "AI-Powered Matching",
                description:
                  "Advanced AI algorithms analyze character images and find the perfect matches based on appearance, skills, and compatibility.",
                icon: Sparkles,
              },
              {
                title: "Profile Builder",
                description:
                  "Create detailed profiles with role-specific fields, portfolio uploads, skills, languages, and comprehensive information.",
                icon: Zap,
              },
              {
                title: "Secure Platform",
                description:
                  "Your data is protected with industry-standard security measures. Privacy and confidentiality are our top priorities.",
                icon: Shield,
              },
              {
                title: "Industry-Focused",
                description:
                  "Built specifically for the film industry, connecting actors and directors to create exceptional cinematic experiences.",
                icon: Target,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                    <CardHeader>
                      <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with these key actions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {quickStartActions.map((action) => (
              <div
                key={action.title}
                className="flex justify-center w-full"
                style={{ minHeight: "320px" }}
              >
                <CardFlip
                  title={action.title}
                  subtitle={action.subtitle}
                  description={action.description}
                  features={action.features}
                  onClick={action.onClick}
                  disabled={action.disabled}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
