# SONORA — free AI music experiment

SONORA uses the open-source **ACE-Step 1.5** music model. The website itself does not host a GPU, and Vercel's free serverless functions cannot run this large model. For a zero-subscription test, run ACE-Step on a computer you control.

## Free local test (Windows / Linux / macOS)

1. Install Git and Python 3.11.
2. Follow the official ACE-Step 1.5 installation guide: https://github.com/ace-step/ACE-Step-1.5
3. Clone and install ACE-Step as described by its official guide, then start its REST API:

   ```bash
   git clone https://github.com/ace-step/ACE-Step-1.5.git
   cd ACE-Step-1.5
   # Follow the official platform-specific dependency / GPU setup.
   uv sync
   uv run acestep-api
   ```

   The API normally listens at `http://127.0.0.1:8001`. The first run downloads model weights and can take time and disk space.

4. Serve this repository's `index.html` locally (from the repository root):

   ```bash
   python -m http.server 8080
   ```

5. Open `http://127.0.0.1:8080/?local=1`. Keep the ACE-Step API running in another terminal. The page submits a generation task, polls for completion, and plays the returned audio.

## Connecting a hosted ACE-Step server to the deployed website

The Vercel function at `/api/generate-song` is only a lightweight secure bridge; it does not host the model. If you later expose your own ACE-Step server over HTTPS, add these Vercel Environment Variables:

- `ACESTEP_API_URL`: base URL of your ACE-Step REST API (for example, `https://your-secure-host.example`, without a trailing slash).
- `ACESTEP_API_KEY`: optional API key configured on that ACE-Step server.

Redeploy after setting the variables. Never put the API key in `index.html`.

## What is and is not free

- ACE-Step 1.5 is open source (Apache-2.0) and can be self-hosted.
- The code and model do not require a per-song API subscription.
- Generation still consumes your own computer's electricity, storage and GPU/CPU resources. A supported GPU is strongly recommended; CPU-only generation can be very slow.
- Vercel's free plan does not provide a persistent GPU for this model. A free hosted GPU with unlimited availability is not guaranteed.
- This repository does not claim that the deployed website can generate songs until an ACE-Step server is actually running and connected.

## Language and voice notes

The page offers 22 language choices and Arabic dialect labels. ACE-Step supports multilingual lyrics, but actual quality varies by language and dialect; the Arabic dialect selector guides the prompt and is not a guarantee of perfect dialect pronunciation. Male/female/duet are prompt preferences, not guaranteed voice identity controls.
