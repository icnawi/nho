# Solana Transaction Events Parser (WIP)

Solana Program Transactions Events Parser.

## Deploy with docker-compose

## How to run locally (WIP)

1. This repo's default package manager: PnPM. To install it globally use npm: `npm i -g pnpm`
2. Check whether it works: `pnpm -v`
3. `pnpm i` to install deps
4. Run `pnpm copy:env` to transfer env variables
5. To fill out `ANCHOR_WALLET` variable, Solana CLI tool required. How to install [here](https://docs.solana.com/cli/install-solana-cli-tools)
6. When installed, type: `$ solana-keygen new`
7. Install Anchor tools. [Link](https://www.anchor-lang.com/docs/installation)
8. Modify `.env`:
  ```shellscript
   NODE_ENV=development
   API_HOST=127.0.0.1
   API_PORT=5242
   LOG_LEVEL=debug
   MONGO_URL=mongodb://localhost:27017/parser-db
   ANCHOR_WALLET=/home/foo/.config/solana/<wallet_name>.json
   ```
6. Run mongodb container `docker-compose up -d`
7. `pnpm dev`
8. Go to `127.0.0.1:4444/fetch-events` and Voilà
