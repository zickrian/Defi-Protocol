🧠 AUNO FRONTEND MASTER PROMPT (Enterprise White Infra Style)

Build a production-grade DeFi protocol landing page named Auno using Next.js 14 App Router + TypeScript (strict) and Tailwind CSS.

This is NOT a marketing landing page.
This is infrastructure-grade UI.

Visual direction:

Institutional

White dominant

Clean spacing

Technical credibility

Similar density & rhythm to Aave

NO gradients

NO playful visuals

NO emojis

NO consumer fintech styling

Think: protocol documentation + capital markets UI.

Core Tech Stack

Next.js 14 App Router

TypeScript strict

Tailwind CSS (custom design tokens)

Framer Motion (subtle fade only)

Lucide React icons

Headless UI (accordion)

Wagmi + Viem

RainbowKit

React Query

No component libraries (no MUI / Chakra / Ant).

Design Tokens (Hard Rules)

Inside tailwind.config.ts define:

colors:
  background: #FFFFFF
  surface: #F8FAFC
  border: #E5E7EB
  primary: #6366F1
  text: #0F172A


Usage rules:

White = main background

Light gray = section separators

Indigo ONLY for buttons / active states

Shadows max: shadow-md

Rounded: rounded-xl

Font: Inter

Letter spacing slightly increased for headings

No gradients anywhere.

Layout Philosophy

Architecture first.
Marketing second.

Page order:

Navbar

Architecture Explanation

Hero

Supported Assets

Cross Chain Flow

Liquidity

Risk Engine

Oracle Infra

Security

Capital Efficiency Comparison

Metrics

Developers

FAQ

Newsletter

Footer

Never place hero first.

Navbar

Left:
Auno wordmark (Inter, spaced)

Center:
Protocol
Architecture
Security
Developers
FAQ

Right:
Rounded button: Launch DApp

Flat white background, thin bottom border.

Architecture Section (FIRST)

Heading:

Native Collateral. Cross-Chain Liquidity.

Below:

Three horizontal cards connected with SVG lines:

Robinhood Chain
Oracle & Risk Engine
Arbitrum

Each card:

White background

Border

Three bullet points

Lucide icon top

Must stack vertically on mobile.

Hero

Headline:

Borrow Without Moving Your Stocks

Subtext:

Tokenized equities remain native on Robinhood Chain while borrowing executes on Arbitrum.

Buttons:

Launch DApp (primary)
Read Documentation (outline)

Below headline:

Three overlapping dashboard cards:

TSLA Collateral Value

Borrow Capacity (USDC / ETH)

Health Factor

Flat cards. No glassmorphism.

Supported Assets

Grid:

TSLA
AMZN
PLTR
NFLX
AMD

Each card:

Ticker
Oracle price
Badge: Native on Robinhood Chain

Responsive 5 → 2 → 1 columns.

Cross Chain Flow

Four steps horizontally:

1 Deposit
2 Oracle
3 Risk Engine
4 Borrow

Minimal arrows between cards.

Liquidity

Title:

Arbitrum Liquidity Pools

Metric cards:

Total Liquidity
Utilization Rate

Prepared for React Query.

Explicit text:

No asset bridging occurs.

Risk Engine

Show formula card:

Health Factor = (Collateral × LTV) / Debt

Add small example liquidation scenario.

Clarify liquidation happens on Robinhood Chain.

Oracle Infra

Explain:

Redundant feeds

Heartbeat

Fallback pricing

Include uptime mock metric (99.98%).

Security

4 cards grid:

Smart Contract Audits
Oracle Verification
Cross Chain Integrity
Liquidation Safeguards

Use Lucide icons.

Capital Efficiency

Two side by side cards:

Traditional Bridging
Auno Native Model

Explain risk reduction.

Metrics

Centered:

Total Collateral Locked
Total Borrowed
Average Health Factor

Large typography.

Developers

Title:

Built for Developers

Mention:

EVM compatible

Modular contracts

GitHub placeholder

FAQ

Headless UI accordion:

How does cross chain borrowing work?

Where is collateral stored?

How liquidation happens?

Oracle reliability?

Keyboard accessible.

Newsletter

Simple email input + button.

No decoration.

Footer

4 columns:

Protocol
Developers
Security
Legal

Left small Auno logo.

Lucide social icons.

Motion

Framer Motion:

fade + translateY(12px)

on scroll

hover elevate cards -4px

No parallax.

Web3

Create /lib/web3.ts

Include:

Arbitrum Sepolia

Custom Robinhood Chain testnet

RainbowKit modal wired to Launch DApp.

Lazy load wallet.

Folder Structure

/components/ui
/components/sections
/lib

Strict separation.

Accessibility

Focus visible

AA contrast

Labelled inputs

Accessible accordion

Performance

Next Image

dynamic imports

Lighthouse > 90

Tone

Technical.
Precise.
Infrastructure oriented.

Never hype.