This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview
This project is a Next.js application that demonstrates how to connect to an Ethereum wallet, send transactions, and interact with ERC-20 tokens using the Wagmi library. It includes two main components:

SendTransaction: This component provides a user interface for sending transactions to the Ethereum blockchain. It allows users to enter the recipient address, transaction amount, and optional message.

LoadERC20Token: This component retrieves information about an ERC-20 token and displays it to the user. It shows the token name, symbol, and balance of the connected user.

Technologies Used
The project is built using the following technologies:

Next.js: Next.js is a React framework that provides features for building server-side rendered and static web applications. It simplifies the development process and improves application performance.

Wagmi: Wagmi is a JavaScript library that offers a set of hooks for interacting with Ethereum wallets from React applications. It streamlines the process of connecting to wallets, sending transactions, and interacting with smart contracts.

ethers.js: ethers.js is a JavaScript library that provides tools for interacting with the Ethereum blockchain. Wagmi utilizes it to connect to the blockchain and send transactions.

SendTransaction: SendTransaction is a custom component that facilitates sending transactions to the Ethereum blockchain. It presents a user interface for entering transaction details and submitting the transaction.

LoadERC20Token: LoadERC20Token is a custom component that retrieves information about an ERC-20 token and displays it to the user. It showcases the token name, symbol, and balance of the connected user.

## Additional Tools
In addition to these core technologies, the project utilizes the following tools:

create-next-app: create-next-app is a tool that simplifies the process of setting up and configuring the development environment for Next.js applications.

next/font: next/font is a Next.js plugin that automatically optimizes and loads fonts, improving application performance by reducing the number of HTTP requests required for font loading.


## Getting Started

Install the required dependencies:
```bash
npm install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
