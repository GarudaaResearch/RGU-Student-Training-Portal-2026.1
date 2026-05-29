import type { ContentType } from '../types';

export interface DetailedLesson {
  id: string;
  moduleId: string;
  title: string;
  contentType: ContentType;
  description: string;
  durationSec: number;
  orderNo: number;
  isCompleted: boolean;
  
  // High-fidelity content simulated fields:
  videoThumbnail?: string;
  videoDurationText?: string;
  textBody?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  codeOutput?: string;
  quizQuestions?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  assignmentPrompt?: string;
}

export const MOCK_LESSONS_BY_MODULE: Record<string, DetailedLesson[]> = {
  m01: [
    {
      id: 'l01_1',
      moduleId: 'm01',
      title: '1. Welcome to CII AI Hub & Ecosystem 2026',
      contentType: 'video',
      description: 'An introductory welcome by Prof. R. Anjit Raja detailing the 2026 AI student training portal and path ahead.',
      durationSec: 720,
      orderNo: 1,
      isCompleted: true,
      videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
      videoDurationText: '12:00'
    },
    {
      id: 'l01_2',
      moduleId: 'm01',
      title: '2. Understanding Generative AI Foundations',
      contentType: 'text',
      description: 'A comprehensive primer explaining Neural Networks, Large Language Models (LLMs), and transformers from first principles.',
      durationSec: 900,
      orderNo: 2,
      isCompleted: true,
      textBody: `### Welcome to the Frontier of GenAI

Generative Artificial Intelligence represents a paradigm shift in how humans interact with computation. Instead of writing rigid, deterministic logic, we instruct models using natural language.

#### Key Concept 1: Large Language Models (LLMs)
LLMs are deep learning neural networks trained on vast corpora of text. They function primarily as advanced probabilistic prediction engines. When you enter a prompt, the model calculates the probability of the next sequence of tokens (words or parts of words) based on its training parameters.

#### Key Concept 2: The Transformer Architecture
Introduced in 2017 in the landmark research paper *"Attention Is All You Need"*, the Transformer architecture revolutionized natural language processing. Its core mechanism—**Self-Attention**—allows the model to weigh the relevance of different words in a sentence, regardless of their distance from each other. 

> [!NOTE]
> Self-Attention enables the model to capture context and long-range dependencies in language that previous RNN and LSTM architectures completely failed to handle.

#### Core Milestones:
1. **Pre-training:** The model digests unstructured internet-scale text to learn grammar, facts, and reasoning patterns.
2. **Fine-tuning / Alignment:** Techniques like *RLHF (Reinforcement Learning from Human Feedback)* align the raw model outputs with human expectations of utility, truthfulness, and safety.`
    },
    {
      id: 'l01_3',
      moduleId: 'm01',
      title: '3. Foundations of AI Literacy Quiz',
      contentType: 'quiz',
      description: 'Test your understanding of the foundational principles of generative AI, tokens, and neural networks.',
      durationSec: 600,
      orderNo: 3,
      isCompleted: false,
      quizQuestions: [
        {
          id: 'q1_1',
          question: 'What is the primary breakthrough mechanism of the Transformer architecture introduced in 2017?',
          options: [
            'Recurrent connections that process words sequentially',
            'Self-Attention, which calculates contextual relationships between words in parallel',
            'Gradient descent and backpropagation models',
            'Rule-based semantic parser pipelines'
          ],
          correctAnswer: 'Self-Attention, which calculates contextual relationships between words in parallel',
          explanation: 'The Self-Attention mechanism allows transformers to process all tokens in a prompt simultaneously, weighing their relationships dynamically, unlike older sequential models.'
        },
        {
          id: 'q1_2',
          question: 'What is a "token" in the context of Large Language Models?',
          options: [
            'A cryptocurrency coin used to pay for API credits',
            'A security key used to log in to the student portal',
            'A basic unit of text (usually 3-4 characters or part of a word) processed by the LLM',
            'A complete database row representing user progress'
          ],
          correctAnswer: 'A basic unit of text (usually 3-4 characters or part of a word) processed by the LLM',
          explanation: 'LLMs do not read words directly; they break text down into numerical "tokens," which represent common sequences of characters.'
        }
      ]
    },
    {
      id: 'l01_4',
      moduleId: 'm01',
      title: '4. AI Coding Workspace: Run Your First Prompt Script',
      contentType: 'code',
      description: 'Explore python-based API scripting to interact with Large Language Models programmatically.',
      durationSec: 1200,
      orderNo: 4,
      isCompleted: false,
      codeLanguage: 'python',
      codeSnippet: `def generate_ai_response(prompt):
    # Simulated programmatic API call to LLM
    print(f"Sending prompt to LLM: '{prompt}'")
    
    system_prompt = "You are a helpful student assistant."
    
    # Simulating LLM generation process
    if "neural network" in prompt.lower():
        return "Neural networks are computational systems inspired by the biological brain."
    elif "hello" in prompt.lower():
        return "Hello Student! Welcome to the Centre for Innovation and Incubation."
    else:
        return "Insight generated from the generative model: Complete!"

# Run the prompt simulation
response = generate_ai_response("Hello, explain neural networks simply!")
print(f"AI Response: {response}")`,
      codeOutput: `Sending prompt to LLM: 'Hello, explain neural networks simply!'
AI Response: Neural networks are computational systems inspired by the biological brain.`
    },
    {
      id: 'l01_5',
      moduleId: 'm01',
      title: '5. AI Literacy & Academic Integrity Essay',
      contentType: 'assignment',
      description: 'Submit an essay analyzing the balance between AI assistance and academic integrity in higher education.',
      durationSec: 1800,
      orderNo: 5,
      isCompleted: false,
      assignmentPrompt: `Write a short 500-word analysis addressing the following:
1. Identify three specific ways generative AI tools can support student research.
2. Outline the potential risks of reliance on AI tools (e.g., hallucinations, loss of critical thinking).
3. Draft a set of 3 personal guidelines that you will follow to ensure all submissions in your college course remain highly ethical and original.`
    }
  ],
  m02: [
    {
      id: 'l02_1',
      moduleId: 'm02',
      title: '1. Core Principles of Prompt Engineering',
      contentType: 'video',
      description: 'Learn the core principles of constructing high-fidelity prompts: Role, Context, Task, Constraints, and Examples.',
      durationSec: 900,
      orderNo: 1,
      isCompleted: true,
      videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
      videoDurationText: '15:00'
    },
    {
      id: 'l02_2',
      moduleId: 'm02',
      title: '2. Zero-Shot vs. Few-Shot Prompting Techniques',
      contentType: 'text',
      description: 'A structural guide to prompting. Learn when to use few-shot examples to lock in specific outputs.',
      durationSec: 800,
      orderNo: 2,
      isCompleted: false,
      textBody: `### Staging Prompt Contexts

The quality of an AI response is directly proportional to the structure of your prompt. Understanding the difference between **Zero-Shot** and **Few-Shot** prompting is your foundation.

#### Zero-Shot Prompting
Zero-shot prompting refers to giving the model a task without any examples. You rely entirely on the model's pre-trained knowledge base.
*Example:*
> "Classify this feedback as positive, neutral, or negative: 'The UI is a bit sluggish, but the features are exactly what I needed.'"

#### Few-Shot Prompting
Few-shot prompting is when you provide one or more high-quality examples of the input-output format you want. This teaches the model the style, tone, and syntax requirements dynamically.
*Example:*
> "Classify the feedback:
> Feedback: 'This is the worst experience ever!' -> Negative
> Feedback: 'It is okay, nothing special.' -> Neutral
> Feedback: 'Absolutely brilliant!' -> Positive
> Feedback: 'The UI is a bit sluggish, but the features are exactly what I needed.' ->"

> [!TIP]
> Use Few-Shot prompting when you need a very strict JSON schema, structural layout, or particular tone that cannot be described with words alone.`
    },
    {
      id: 'l02_3',
      moduleId: 'm02',
      title: '3. Prompt Engineering Assessment',
      contentType: 'quiz',
      description: 'Validate your proficiency in advanced prompting techniques, chain-of-thought, and XML tag structuring.',
      durationSec: 720,
      orderNo: 3,
      isCompleted: false,
      quizQuestions: [
        {
          id: 'q2_1',
          question: 'What is the purpose of "Chain-of-Thought" prompting?',
          options: [
            'To force the model to output a continuous sentence without spaces',
            'To direct the model to explain its step-by-step reasoning before outputting the final answer',
            'To link multiple LLMs together in a pipeline',
            'To encrypt the prompt for security'
          ],
          correctAnswer: 'To direct the model to explain its step-by-step reasoning before outputting the final answer',
          explanation: 'Chain-of-Thought prompting prompts the model to break down its reasoning, which dramatically improves performance on logical, mathematical, and multi-step tasks.'
        }
      ]
    }
  ],
  m03: [
    {
      id: 'l03_1',
      moduleId: 'm03',
      title: '1. Introduction to Vibe Coding & Cursor',
      contentType: 'video',
      description: 'Learn how "Vibe Coding" using natural language and editor agents is reshaping software engineering.',
      durationSec: 1000,
      orderNo: 1,
      isCompleted: true,
      videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
      videoDurationText: '16:40'
    },
    {
      id: 'l03_2',
      moduleId: 'm03',
      title: '2. HTML Component Sandbox with AI Agents',
      contentType: 'code',
      description: 'Write a modern glassmorphic card component with CSS variables in this interactive sandbox.',
      durationSec: 1500,
      orderNo: 2,
      isCompleted: false,
      codeLanguage: 'html',
      codeSnippet: `<!-- Modern Glassmorphic UI Card -->
<div class="glass-card">
  <h4 class="title">RGU AI Hub</h4>
  <p class="description">Building state of the art web interfaces with AI copilots.</p>
  <button class="action-btn">Explore Now</button>
</div>

<style>
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 20px;
  max-width: 300px;
  text-align: center;
}
.title { color: #479EF5; font-size: 18px; margin-bottom: 8px; }
.description { color: #ADADAD; font-size: 13px; line-height: 1.4; }
.action-btn {
  margin-top: 15px;
  background: #479EF5;
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>`,
      codeOutput: `Glassmorphism UI Card compiled successfully!
Viewport rendered 3 elements inside glass-card container.`
    }
  ],
  m04: [
    {
      id: 'l04_1',
      moduleId: 'm04',
      title: '1. Python Variables & AI Assistance',
      contentType: 'video',
      description: 'Understanding python syntax and how to prompt an AI model to write clean code.',
      durationSec: 900,
      orderNo: 1,
      isCompleted: false,
      videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
      videoDurationText: '15:00'
    }
  ],
  m05: [
    {
      id: 'l05_1',
      moduleId: 'm05',
      title: '1. Domain-Specific AI Tooling Ecosystems',
      contentType: 'text',
      description: 'An overview of curated AI platforms specialized by engineering, business, design, and science.',
      durationSec: 800,
      orderNo: 1,
      isCompleted: false,
      textBody: `### Professional AI Tooling Matrix

Different academic streams benefit from heavily optimized, domain-specific generative models and utilities. In 2026, the ecosystem has moved far beyond raw chatbots into production-level agent systems.

#### 1. Tech & Coding Stream
- **Cursor / VS Code Copilot:** Direct contextual IDE integration.
- **Bolt.new / Lovable:** Rapid prototype builders compiling fully functional client and server code with a single prompt.
- **v0.dev:** High-fidelity UI generator in Tailwind, React, and Lucide.

#### 2. Science & Biotech Stream
- **AlphaFold Database:** Structural biochemistry lookup.
- **PubMed/OpenAlex AI Assistants:** Literature mapping, synthesis, and correlation discovery.

#### 3. Commerce & Business Stream
- **Recharts / ChatGPT Advanced Data Analysis:** Automating complex financial models, sales analysis, and plotting.
- **Julius AI:** Data science assistant for CSV and spreadsheets.

#### 4. Design & Creative Stream
- **Midjourney / DALL-E 3:** Creative concepts, layout drafting.
- **Figma AI:** Automating vector drafts, typography scaling, and component generation.`
    }
  ],
  m06: [
    {
      id: 'l06_1',
      moduleId: 'm06',
      title: '1. Planning Your Web App Wireframe',
      contentType: 'video',
      description: 'How to use mock-up tools and prompt generators to build highly effective structure plans.',
      durationSec: 1000,
      orderNo: 1,
      isCompleted: false,
      videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
      videoDurationText: '16:40'
    }
  ],
  m07: [
    {
      id: 'l07_1',
      moduleId: 'm07',
      title: '1. Netflix Recommendation Systems Evolution',
      contentType: 'text',
      description: 'Analyzing how Netflix integrated machine learning and deep collaborative filtering into their core products.',
      durationSec: 900,
      orderNo: 1,
      isCompleted: false,
      textBody: `### Case Study: Netflix Recommendation Architecture

#### The Problem
In streaming entertainment, user churn is highly correlated with "choice overload"—the friction of looking for something to watch. Netflix recognized that personalized recommendation algorithms were critical to retention.

#### The AI Solution
Netflix utilizes a combination of machine learning frameworks:
- **Collaborative Filtering:** Finding similar users and recommending items they liked.
- **Content-Based Filtering:** Recommending items similar in metadata (genres, actors, pacing) to what the user watched.
- **Personalized Artwork Generation:** Recommending the same film but displaying different cover art dynamically based on your viewing history. If you watch romantic comedies, the movie thumbnail will highlight romantic scenes. If you watch horror, it will highlight dark, high-contrast scenes.

> [!IMPORTANT]
> Dynamic artwork personalization alone improved click-through rates (CTR) by over 14.8% across global subscribers.`
    }
  ],
  m08: [
    {
      id: 'l08_1',
      moduleId: 'm08',
      title: '1. Scientific Literature Mapping with OpenAlex & AI',
      contentType: 'text',
      description: 'For PG research: how to automate complex literature collection, filtering, and summarization.',
      durationSec: 1200,
      orderNo: 1,
      isCompleted: false,
      textBody: `### AI-Enabled Academic Literature Mapping

Postgraduate research requires highly rigorous, comprehensive literature reviews. Manual parsing of thousands of academic articles is the biggest bottleneck in thesis formulation.

#### Recommended AI-Powered Framework
1. **Query Formulation:** Construct highly precise, nested queries targeting open scholarship databases like OpenAlex or EuropePMC.
2. **Metadata Aggregation:** Retrieve citation metrics, h-indices, and citation co-occurrence maps programmatically.
3. **Synthesis & Categorization:** Use specialized prompt pipelines to extract:
   - Specific methodologies used.
   - Core datasets referenced.
   - Conflicting results or research gaps identified in existing literature.

> [!WARNING]
> When using generative AI for literature review, never rely on a chatbot's raw outputs without cross-checking the actual DOI links. Standard chatbots are prone to hallucinating scientific citations that do not exist.`
    }
  ]
};
