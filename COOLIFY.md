# Deploying OpenClaw on Coolify

OpenClaw is optimized to run on Coolify using the provided `Dockerfile`.

## 1. Create Resource
1. Go to your Coolify Dashboard -> Projects -> Environment.
2. Click **"+ New Resource"**.
3. Select **"Git Based"** -> **"Private Repository (with GitHub App)"** (or Public/Deploy Key).
4. Select the `openclaw` repository.
5. Branch: `main`.

## 2. Configuration (Configuration Screen)
Before deploying, configure the following settings:

### General
- **Build Pack**: `Dockerfile` (It should be auto-detected).
- **Port Exposes**: `18789`.

### Environment Variables
Add the following Environment Variables:

| Key | Value | Description |
| :--- | :--- | :--- |
| `OPENCLAW_GATEWAY_TOKEN` | `<random_hex_string>` | Generate a secure random string (e.g. `openssl rand -hex 32`). This is your API Key. |
| `NODE_ENV` | `production` | Ensures production optimizations. **Note:** The Dockerfile now automatically handles build-time dependencies, so you don't strictly need to uncheck "Available at Build Time" for this var, but it's good practice. |

### Storage (Persistent Volumes)
To preserve your sessions (WhatsApp login) and config across restarts, you **MUST** configure persistent storage.

1. Go to **Storage** tab.
2. Add a new Persistent Volume:
   - **Path**: `/home/node/.openclaw`
   - **Name**: `openclaw-data` (or similar)

> **Note**: The Docker container runs as the `node` user (UID 1000). Ensure the mounted volume has appropriate permissions if you encounter access issues, though Coolify usually handles this.

## 3. Deploy
Click **"Deploy"**.

## 4. Verification
Once deployed, the logs should show:
```
[gateway] tcp:18789 listening on 0.0.0.0:18789
```

You can then access the interface via the Coolify generated domain (if configured) or IP:18789 using the token `OPENCLAW_GATEWAY_TOKEN`.
