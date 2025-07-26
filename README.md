# ClaimMate 🤖

**AI-Powered Claims Management Assistant**

ClaimMate is a modern, AI-driven platform that automates and streamlines the entire lifecycle of claims management. Built for small businesses and professionals who need efficient, intelligent claims processing without the overhead of dedicated teams.

## 🚀 What is ClaimMate?

ClaimMate transforms the complex, time-consuming process of managing insurance claims into a streamlined, automated experience. Our AI-powered platform handles everything from document intake to payment tracking, making claims management effortless for healthcare practitioners, e-commerce merchants, and small businesses.

## 🎯 Target Users

### Healthcare Practitioners
- **Chiropractors, Therapists, Independent Providers**
- Managing medical insurance claims and reimbursements
- Handling multiple insurance providers and policies
- Streamlining patient billing and claim submissions

### E-commerce Merchants
- **Shopify, Amazon, Etsy Sellers**
- Processing returns, damage claims, and shipping insurance
- Managing warranty claims and customer disputes
- Handling platform-specific claim requirements

### Freelancers & Small Businesses
- **Professional Liability Claims**
- **Travel Insurance Claims**
- **Equipment & Property Claims**
- **Health-Related Claims**

## 💡 The Problem We Solve

### Time-Consuming Process
- Hours spent gathering documents, filling forms, and following up
- Manual data entry and repetitive administrative tasks
- Complex insurance forms and requirements

### Document Overload
- Managing multiple file formats (PDFs, images, emails)
- Platform-specific requirements and submission formats
- Keeping track of claim status across different systems

### Resource Constraints
- Most small businesses can't afford dedicated claims departments
- Limited expertise in insurance processes and regulations
- High opportunity cost of manual claims management

## 🛠️ The ClaimMate Solution

### Smart Intake
- **Drag-and-drop document upload**
- **Email forwarding integration**
- **Multi-format support** (PDF, images, emails)
- **Automatic document classification**

### AI Document Parsing
- **OCR and NLP technology** for data extraction
- **Automatic extraction** of claim numbers, amounts, policy IDs
- **Intelligent document classification**
- **Structured data output**

### Auto Forms
- **Pre-filled forms** for insurers and platforms
- **Multi-format export** (PDFs, JSON, XML)
- **Customizable templates** for different claim types
- **Batch processing capabilities**

### Smart Tracking
- **Automated follow-ups** and status tracking
- **Appeal assistance** with AI-powered suggestions
- **Real-time notifications** and progress updates
- **Performance analytics** and insights

## 💰 Pricing Plans

| Plan | Price | Features | Best For |
|------|-------|----------|----------|
| **Free** | $0/month | • 3 claims per month<br>• Basic document upload<br>• Standard templates | Getting started |
| **Starter** | $19/month | • 10 claims per month<br>• Email parsing<br>• Status tracking<br>• Priority support | Small practices |
| **Pro** | $49/month | • 50 claims per month<br>• Custom templates<br>• API integrations<br>• Advanced analytics | Growing businesses |
| **Enterprise** | $99+/month | • Unlimited claims<br>• White-labeled solutions<br>• Dedicated support<br>• Custom integrations | Large organizations |

## 🛠️ Technology Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components
- **Icons**: Phosphor Icons
- **Theme**: Dark/Light mode support with next-themes
- **Deployment**: Vercel-ready

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/widodu77/claimMate.git
   cd claimMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   # OpenAI API Key (for AI features)
   OPENAI_API_KEY=your-openai-api-key

   # Supabase (for database features)
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # GitHub OAuth (for authentication)
   AUTH_GITHUB_ID=your-github-client-id
   AUTH_GITHUB_SECRET=your-github-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
claimMate/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page (main content)
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card components
│   │   ├── badge.tsx     # Badge component
│   │   └── icons.tsx     # Icon components
│   ├── header.tsx        # Navigation header
│   └── ...               # Other components
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md            # This file
```

## 🎨 Customization

### Content Updates
The main landing page content is in `app/page.tsx`. You can easily modify:
- Hero section messaging and CTAs
- Problem statements and solutions
- Target user descriptions
- Pricing tiers and features
- Contact information

### Styling
- **Global Styles**: Modify `app/globals.css` for theme colors and variables
- **Tailwind Config**: Update `tailwind.config.js` for custom design tokens
- **Component Styles**: Edit individual component files for specific styling

### Branding
- **Logo**: Update in `components/header.tsx`
- **Colors**: Modify CSS variables in `globals.css`
- **Metadata**: Update title and description in `app/layout.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms
The project is compatible with any platform that supports Next.js:
- **Netlify**: Drag and drop deployment
- **Railway**: Simple deployment with Git integration
- **DigitalOcean App Platform**: Managed Next.js hosting
- **AWS Amplify**: AWS-managed hosting

## 🔮 Development Roadmap

### Phase 1: Core Platform (Q1 2024)
- [ ] User authentication and dashboard
- [ ] Document upload and management system
- [ ] Basic AI document parsing
- [ ] Form generation and submission

### Phase 2: Advanced Features (Q2 2024)
- [ ] Automated follow-ups and tracking
- [ ] Integration with major insurance platforms
- [ ] Advanced AI analytics and insights
- [ ] Mobile app development

### Phase 3: Enterprise Solutions (Q3 2024)
- [ ] White-label solutions
- [ ] API for third-party integrations
- [ ] Advanced reporting and analytics
- [ ] Multi-tenant architecture

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [GitHub Wiki](https://github.com/widodu77/claimMate/wiki)
- **Issues**: [GitHub Issues](https://github.com/widodu77/claimMate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/widodu77/claimMate/discussions)
- **Email**: support@claimmate.ai

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Theme support with [next-themes](https://github.com/pacocoursey/next-themes)

## 📞 Contact

- **Website**: [claimmate.ai](https://claimmate.ai)
- **Email**: hello@claimmate.ai
- **Twitter**: [@claimmate_ai](https://twitter.com/claimmate_ai)
- **LinkedIn**: [ClaimMate](https://linkedin.com/company/claimmate)

---

**ClaimMate** - Making claims management effortless with AI 🤖

*Transform your claims process today with intelligent automation*
