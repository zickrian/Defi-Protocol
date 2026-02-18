🧠 0. Global Design Principles
Visual

Pure black / white / grey scale
(#000, #111, #222, #fff, #888)

No gradient

No shadows berat

Thin borders (1px)

Font: Inter / Satoshi / Geist

Philosophy

Data-first

Risk-forward

No decorative bullshit

Semua angka penting langsung kelihatan

Bayangin:

Black background
White text
Grey separators
Flat cards

🚪 1. Entry Flow
Landing

Button:

[ Launch App ]


↓

Wallet Connect

Metamask / WalletConnect

Setelah connect → redirect ke /dashboard

Tidak ada intermediate page.

📊 2. Main Dashboard Layout

Grid system:

--------------------------------------------------
Top Bar
--------------------------------------------------

Left Sidebar | Main Content Area

🔝 TOP BAR

Minimal:

Left:

Logo

Network selector
(Robinhood Chain / Arbitrum Sepolia)

Center:

Protocol Status:

TVL: $34.8M | Utilization: 62%


Right:

Wallet Address (short)

Health Factor badge

Settings

Example:

0x91...e3a | HF 1.42 🟢


HF warna:

1.3 green

1–1.3 yellow

<1 red

⬅ Sidebar Navigation
Dashboard
Markets
Portfolio
Bridge
Liquidations
Governance

🧩 3. Dashboard (Home)

Ini halaman pertama setelah connect.

A. Protocol Overview (Top Cards)

4 cards horizontal:

Card 1 — Total Market Size
$34.8M
Total Value Locked

Card 2 — Total Supplied
$20.3M

Card 3 — Total Borrowed
$13.2M

Card 4 — Utilization
62%

B. User Position Summary

Card besar:

LEFT:
Your Collateral: $2,430
Your Debt: $1,520
Health Factor: 1.41
Max Borrow: $181

RIGHT:

Risk bar:

SAFE  |======|----|  DANGER


Live updating.

Ini penting:
user langsung tahu posisi dia.

📈 4. Markets Page

Ini versi kamu dari Aave Markets.

Table:

| Asset | Price | Supply APY | Borrow APY | Total Supplied | Total Borrowed |

Assets:

TSLA

AMZN

PLTR

NFLX

AMD

USDC

ETH

Setiap row:

TSLA   $243.10   2.1%   4.3%   $3.2M   $1.9M   [Supply] [Borrow]


Click asset → Asset Detail Page.

📄 5. Asset Detail Page

Example: TSLA

Header
TSLA
Synthetic Tesla Stock
Price: $243.10

Stats
Total Supplied
Total Borrowed
Utilization
Collateral Factor
Liquidation Threshold

User Actions
Supply Panel

Input:

Amount
[ Supply ]


Checkbox:

Use as collateral ☑

Borrow Panel

Input:

Amount


Auto show:

HF after borrow: 1.12 ⚠


Button:

[ Borrow ]

💼 6. Portfolio Page

Personal positions.

Supplied Assets
TSLA    $1200
AMZN    $400

Borrowed Assets
USDC   $800
ETH    $300

Leverage Loop Indicator

Very important.

Display:

Leverage Depth: 2.3x


And flow visualization:

TSLA → Borrow AMZN → Swap → TSLA → Deposit


So user understands recursion.

🔁 7. Bridge Page

Robinhood ↔ Arbitrum Sepolia

Two panels:

From Robinhood

Asset
Amount
Destination Address

[ Bridge to Arbitrum ]

From Arbitrum

Asset
Amount

[ Return to Robinhood ]

Status box:

Transaction Pending...

☠️ 8. Liquidation Page

Permissionless liquidator UI.

Table:

| User | HF | Debt | Collateral | Action |

Rows:

0x81... 0.92 $1,200 TSLA $1,400 [Liquidate]

🧮 9. Health Factor Modal (Critical UX)

Whenever user borrows:

Popup:

Health Factor After Borrow: 0.97

⚠ This position can be liquidated.

Proceed anyway?


Hard warning.

🧱 10. Architecture Mapping (UI → Contracts)

UI calls:

LendingPool.sol

deposit

borrow

repay

withdraw

CollateralManager.sol

getHealthFactor

PriceOracle.sol

getPrice

BridgeAdapter.sol

bridgeToArbitrum

Frontend continuously polling:

healthFactor()
utilization()

⚠ Devil’s Advocate (Real Risk)

Kalau kamu tidak tampilkan ini secara eksplisit:

Health Factor

Liquidation Threshold

Recursive leverage depth

User WILL overleverage.

Dan protocol bakal jadi:

casino with delayed explosion.

So these must be first-class UI elements.

✅ Summary

Kamu bukan bikin:

❌ lending dapp
❌ stock app

Kamu bikin:

Synthetic Stock Leverage Engine + Cross Chain Liquidity Router

Dashboard harus reflect itu.