"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    {
      title: "Provider-Side Intelligence",
      description: "AI analyzes patient transcripts to identify missing diagnoses and overlooked symptoms that healthcare providers may miss during consultations.",
      icon: "🔍"
    },
    {
      title: "Patient Engagement",
      description: "The patient portal allows users to easily chat with AI about their symptoms, providing medical professionals with comprehensive patient data and detailed symptom patterns.",
      icon: "💬"
    },
    {
      title: "Early Detection",
      description: "AI catches subtle cues and symptom patterns that patients themselves may overlook, identifying serious health concerns before they become critical.",
      icon: "⚡"
    },
    {
      title: "RAG For Patient Records",
      description: "Patient records are stored in a vector store embedding so that the agent could retreive info from the entire patient database at once. It also utilizes a tool to get all information for specific patients, allowing both in depth and broad research.",
      icon: "🧠"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              The core of this project was built in a day. This was to stay in line with the directions of the project assignment. To see further updates please navigate to
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <a
                href="https://ai-scribe-sooty.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 transition-colors"
              >
                https://ai-scribe-sooty.vercel.app
              </a>.
            </p>
            <p></p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-8 mb-4">
              Hi, I&apos;m Yasser, an AI Engineer. The moment I saw ChatGPT messaging me token by token my senior year of University, I knew that I wanted to become an AI Engineer and help build the brightest possible future for humanity. I went through textbooks and dedicated thousands of hours to teach myself machine learning, software engineering, and data science. I applied my knowledge, working day and night, discovering new ways to make awesome AI systems do useful tasks. I love the mission of DeepScribe and I see it leading a revolution in how hospitals fundamentally operate. It would be my honor to help be part of that mission!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                How this project works
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  This project demonstrates an intelligent AI assistant designed to augment clinical decision-making and enhance patient outcomes. The system operates on two integrated fronts:
                </p>
                <p>
                  <span className="text-white font-semibold">For Healthcare Providers:</span> The AI analyzes patient encounter transcripts and medical records, identifying patterns, potential diagnoses, and critical symptoms that may have been overlooked during the clinical interaction. This ensures comprehensive patient evaluation and reduces diagnostic gaps.
                </p>
                <p>
                  <span className="text-white font-semibold">For Patients:</span> An intuitive patient portal enables individuals to engage in detailed conversations with AI about their symptoms and health concerns. This creates a rich dataset of patient experiences and symptom descriptions that healthcare providers can review before appointments, leading to more informed clinical decisions.
                </p>
              </div>
            </section>

            {/* Features Grid */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
                Key Features
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all"
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Impact Section */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                The Project Advantage
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Medical professionals face the constant challenge of managing vast amounts of patient information while maintaining diagnostic accuracy. This project addresses this by leveraging advanced AI to:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-white/50 font-semibold">•</span>
                    <span><span className="text-white font-semibold">Identify Red Flags:</span> Detect subtle symptom patterns that may indicate serious underlying conditions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white/50 font-semibold">•</span>
                    <span><span className="text-white font-semibold">Fill Information Gaps:</span> Find missing data points that could impact clinical decisions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white/50 font-semibold">•</span>
                    <span><span className="text-white font-semibold">Enable Proactive Care:</span> Alert healthcare providers before conditions escalate, enabling preventive interventions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white/50 font-semibold">•</span>
                    <span><span className="text-white font-semibold">Enhance Patient Engagement:</span> Encourage patients to articulate symptoms thoroughly, improving data quality for clinical assessment</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Vision */}
            <section>
              <div className="p-8 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Why Hire Me?
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    With great power comes great responsibility. For better or worse, we are gifted the most powerful tool in the history of the world, one that grows stronger by the day. What draws me to DeepScribe is not only the opportunity to work with technology I love and build amazing products within a dynamic, innovative team in San Francisco, but also the chance to apply this technology toward making healthcare fundamentally better. That means saving more lives and making people happier.
                  </p>
                  <p>
                    There is enormous potential for AI to analyze patient data and identify subtle red flags that humans might miss, patterns that could change outcomes. I work extremely hard, am deeply driven, and I thrive on generating great ideas quickly. I would be honored to help DeepScribe achieve the impact I know it&apos;s capable of.
                  </p>
                  <p>
                    Thank you for your time and consideration. Hope to hear from you soon.
                  </p>
                  <p>
                    - Yasser Ali
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
      </div>
    </div>
  );
}
