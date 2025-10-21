# Healthcare AI Chat - DeepScribe Project

An AI-powered healthcare documentation system built for DeepScribe, featuring a dual-interface design that serves both medical professionals and patients.

## 🚀 Features

### Dual Interface System

#### Medical Professional Interface
- **Patient Record Queries**: Healthcare providers can ask the AI questions about patient records, medical histories, and treatment plans
- **Conversation History Access**: Review previous patient-AI interactions and symptom discussions
- **Clinical Decision Support**: Get AI-powered insights and recommendations based on patient data
- **Secure Access**: HIPAA-compliant access to patient information and interaction logs

#### Patient Interface
- **Symptom Assessment**: Patients can describe their symptoms in natural conversation
- **AI-Guided Consultation**: The AI asks relevant follow-up questions similar to what a doctor or nurse would ask
- **24/7 Availability**: Patients can get preliminary health assessments anytime
- **Secure Data Sharing**: Patient interactions are securely stored and accessible to healthcare providers

### Shared Capabilities
- **Unified Data Access**: Medical professionals can access patient-AI conversation histories for comprehensive care
- **Intelligent Triage**: AI helps identify urgent cases and appropriate care levels
- **Documentation Automation**: Automatic generation of clinical notes from patient interactions
- **Privacy-First Design**: All interactions are encrypted and HIPAA-compliant

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework for the web application
- **TypeScript** - Type-safe JavaScript for robust development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth user interactions
- **Shadcn/UI** - Modern component library based on Radix UI

### Backend
- **Python FastAPI** - High-performance API framework
- **OpenAI API** - Advanced language model for intelligent responses
- **SQLite/PostgreSQL** - Database for storing patient data and conversation histories
- **JWT Authentication** - Secure token-based authentication
- **Pydantic** - Data validation and serialization

### AI & Machine Learning
- **OpenAI GPT Models** - For natural language understanding and generation
- **Prompt Engineering** - Custom prompts designed for medical contexts
- **Conversation Memory** - Maintains context across patient interactions
- **Medical Knowledge Base** - Integrated medical terminology and protocols

### Security & Compliance
- **HIPAA Compliance** - Built with healthcare data protection in mind
- **End-to-End Encryption** - All patient data is encrypted in transit and at rest
- **Role-Based Access Control** - Different access levels for patients vs. medical professionals
- **Audit Logging** - Complete logs of all data access and modifications

## 📋 Prerequisites

- Node.js 18+
- OpenAI API key

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-ai-chat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file with your OpenAI API key
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```


## 📁 Project Structure

```
healthcare-ai-chat/
├── app/                    # Next.js app directory
│   ├── (chat)/            # Patient chat interface
│   ├── professional/      # Medical professional interface
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── chat.tsx          # Chat interface components
│   ├── overview.tsx      # Landing page
│   └── ui/               # Base UI components
├── lib/                   # Shared utilities
├── hooks/                # React hooks
└── .env                  # Environment variables (add your OPENAI_API_KEY here)
```



