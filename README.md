# 🛡️ Passly

Passly is a secure and modern password manager built with **Next.js 15**, **Supabase**, and **Kinde Auth**. It provides 256-bit AES encryption to keep your credentials safe and accessible from anywhere with a premium glassmorphism interface.

> Developed by [Ram (Ram6023)](https://github.com/Ram6023)  
> **🔗 Live Demo:** [https://passly-seven.vercel.app/](https://passly-seven.vercel.app/)

## ✨ Features

- **🔐 256-bit AES Encryption**: Secure client-side encryption for all your passwords.
- **✨ Modern UI**: Premium glassmorphism interface built with Tailwind CSS and Framer Motion.
- **⚡ High Performance**: Optimized with Next.js 15 and the React Compiler.
- **☁️ Supabase Backend**: Fast and scalable data storage with Row Level Security (RLS).
- **🔑 Secure Auth**: Industrial-grade authentication powered by Kinde.
- **📱 Responsive**: Fully optimized for mobile and desktop screens.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **Authentication**: [Kinde](https://kinde.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Supabase Project
- A Kinde Auth Project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ram6023/passly.git
   cd passly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

   # Kinde Auth
   KINDE_CLIENT_ID="your-client-id"
   KINDE_CLIENT_SECRET="your-client-secret"
   KINDE_ISSUER_URL="https://your-domain.kinde.com"
   KINDE_SITE_URL="http://localhost:3000"
   KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
   KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/pw"

   # Encryption
   SECRET_KEY="your-random-hex-key"
   ```

### 🗃️ Database Setup

Run the following SQL in your **Supabase SQL Editor** to create the required table:

```sql
create table passwords (
  id uuid default gen_random_uuid() primary key,
  "userId" text not null,
  "createdAt" timestamp with time zone default now() not null,
  password text not null,
  title text not null,
  category text not null,
  "userName" text,
  url text,
  notes text,
  email text
);

-- Enable RLS
alter table passwords enable row level security;

-- Policies
create policy "Users can manage their own passwords"
  on passwords for all
  using (auth.uid()::text = "userId");
```

### 🏃 Run Locally

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) or visit the live link at [https://passly-seven.vercel.app/](https://passly-seven.vercel.app/) to see the app!

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---
Made with 💙 by [Ram](https://github.com/Ram6023)
