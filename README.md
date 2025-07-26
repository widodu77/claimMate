# ClaimMate 🤖

**AI-Powered Claims Management Assistant**

ClaimMate automates and streamlines the entire lifecycle of claims management, from document upload to payment tracking. Built for small businesses and professionals who need efficient, AI-driven claims processing.

## 🚀 Features

### Smart Intake
- Upload documents, emails, or photos via drag-and-drop or email forwarding
- Support for multiple file formats (PDF, images, emails)

### AI Document Parsing
- OCR and NLP technology to extract structured information
- Automatic extraction of claim numbers, amounts, policy IDs
- Intelligent document classification and data extraction

### Auto Forms
- Pre-filled forms for insurers and platforms
- Support for PDFs, JSON, XML formats
- Customizable templates for different claim types

### Smart Tracking
- Automated follow-ups and status tracking
- Appeal assistance with AI-powered suggestions
- Real-time notifications and progress updates

## 🎯 Target Users

- **Healthcare Practitioners**: Chiropractors, therapists, and independent healthcare providers managing insurance claims
- **E-commerce Merchants**: Shopify, Amazon, and Etsy sellers handling returns, damage claims, and shipping insurance
- **Freelancers & SMBs**: Professional liability, travel, equipment, and health-related claims

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0/month | 3 claims per month |
| **Starter** | $19/month | 10 claims, email parsing, status tracking |
| **Pro** | $49/month | 50 claims, custom templates, integrations |
| **Enterprise** | $99+/month | Unlimited claims, white-labeled |

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **Icons**: Phosphor Icons
- **Theme**: Dark/Light mode support
- **Deployment**: Vercel-ready

## 📦 Installation

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
   
   Add your environment variables:
   ```env
   # OpenAI API Key (required for AI features)
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
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Navigation header
│   └── ...               # Other components
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md            # This file
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by modifying:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration
- Component-specific styles in individual files

### Content
Update the landing page content in `app/page.tsx`:
- Hero section messaging
- Feature descriptions
- Pricing tiers
- Target user profiles

### Branding
- Update the logo and branding in `components/header.tsx`
- Modify colors in the Tailwind config
- Update metadata in `app/layout.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

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

---

**ClaimMate** - Making claims management effortless with AI 🤖
