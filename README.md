# Passly

Passly is a secure and modern password manager built with Next.js, Prisma, and MongoDB. It provides 256-bit AES encryption in the cloud to keep your credentials safe and accessible from anywhere.

## Features

- **Secure Storage**: 256-bit AES encryption for all your passwords.
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS and Framer Motion.
- **Cross-Platform**: Accessible from any device with a modern web browser.
- **Fast and Efficient**: Optimized with Next.js for high performance.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **Authentication**: [Kinde](https://kinde.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase Database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ram6023/passly.git
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="your-mongodb-url"
   KINDE_CLIENT_ID="your-kinde-client-id"
   KINDE_CLIENT_SECRET="your-kinde-client-secret"
   KINDE_ISSUER_URL="https://your-domain.kinde.com"
   KINDE_SITE_URL="http://localhost:3000"
   KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
   KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
   ```

4. Generate Prisma client:
   ```bash
   bun x prisma generate
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


