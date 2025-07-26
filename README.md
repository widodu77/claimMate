# ClaimMate 🤖

**AI-Powered Claims Management Assistant**

ClaimMate is a modern landing page for an AI-powered claims management platform that automates and streamlines the entire lifecycle of claims processing. Built for small businesses and professionals who need efficient, AI-driven claims management.

## 🚀 Current Features

### Landing Page
- **Modern Design**: Clean, professional landing page with dark/light mode support
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Smooth animations and hover effects
- **Professional Branding**: Consistent ClaimMate branding throughout

### Sections
- **Hero Section**: Clear value proposition and call-to-action buttons
- **Problem Statement**: Highlights pain points in claims management
- **Solution Overview**: Showcases AI-powered features
- **Target Users**: Specific audience segments
- **Pricing Tiers**: Transparent pricing structure
- **Contact & Footer**: Professional contact information

## 🎯 Target Users

- **Healthcare Practitioners**: Chiropractors, therapists, and independent healthcare providers managing insurance claims
- **E-commerce Merchants**: Shopify, Amazon, and Etsy sellers handling returns, damage claims, and shipping insurance
- **Freelancers & SMBs**: Professional liability, travel, equipment, and health-related claims

## 💰 Pricing Structure

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0/month | 3 claims per month |
| **Starter** | $19/month | 10 claims, email parsing, status tracking |
| **Pro** | $49/month | 50 claims, custom templates, integrations |
| **Enterprise** | $99+/month | Unlimited claims, white-labeled |

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components
- **Icons**: Phosphor Icons
- **Theme**: Dark/Light mode support with next-themes
- **Deployment**: Vercel-ready

## 📦 Installation & Setup

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

3. **Set up environment variables** (optional for landing page)
   ```bash
   cp .env.example .env
   ```
   
   For future features, you may need:
   ```env
   # OpenAI API Key (for future AI features)
   OPENAI_API_KEY=your-openai-api-key

   # Supabase (for future database features)
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # GitHub OAuth (for future auth features)
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

## 🔮 Future Roadmap

### Phase 1: Core Features
- [ ] User authentication and dashboard
- [ ] Document upload and management
- [ ] Basic AI document parsing
- [ ] Form generation and submission

### Phase 2: Advanced Features
- [ ] Automated follow-ups and tracking
- [ ] Integration with insurance platforms
- [ ] Advanced AI analytics
- [ ] Mobile app development

### Phase 3: Enterprise Features
- [ ] White-label solutions
- [ ] API for third-party integrations
- [ ] Advanced reporting and analytics
- [ ] Multi-tenant architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [GitHub Wiki](https://github.com/widodu77/claimMate/wiki)
- **Issues**: [GitHub Issues](https://github.com/widodu77/claimMate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/widodu77/claimMate/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Theme support with [next-themes](https://github.com/pacocoursey/next-themes)

---

**ClaimMate** - Making claims management effortless with AI 🤖

*Currently in development - Landing page ready for deployment*
