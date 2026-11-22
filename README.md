# SONORA

A single-page Arabic RTL music studio interface built with Next.js.

## Current engine connection

The page embeds the official ACE-Step 1.5 Hugging Face Space:

- https://huggingface.co/spaces/ACE-Step/Ace-Step-v1.5
- Runtime: https://ace-step-ace-step-v1-5.hf.space

This is a first-stage live test using the official Space UI. It is **not yet a custom server-to-server API integration**. The public Space exposes a Gradio API, but its current endpoint argument schema must be verified before replacing the embedded UI with native SONORA controls.

The free Hugging Face ZeroGPU quota is limited and is not suitable as unlimited production capacity. Visitors may need to sign in to Hugging Face, and availability/queue time depends on the service.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

## Deployment

This repository contains the application source only. No Vercel project, deployment, or environment variables have been created.
