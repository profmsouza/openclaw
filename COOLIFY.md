# Deploying OpenClaw on Coolify

OpenClaw is optimized to run on Coolify using the provided `Dockerfile`.

## 1. Create Resource
1. Go to your Coolify Dashboard -> Projects -> Environment.
2. Click **"+ New Resource"**.
3. Select **"Git Based"**.
4. Choose the repository type:
   - **For Public Repositories** (like yours): Select **"Public Repository"**.
     - Enter URL: `https://github.com/profmsouza/openclaw`
   - **For Private Repositories**: Select "Private Repository (with GitHub App)".
5. Branch: `main`.

## 2. Configuration (Configuration Screen)
Before deploying, configure the following settings:

### General
- **Build Pack**: `Dockerfile` (It should be auto-detected).
- **Port Exposes**: `18789`.

### Environment Variables
**CRITICAL:** Add the following Environment Variables to ensure connectivity and persistence.

| Key | Value | Description |
| :--- | :--- | :--- |
| `OPENCLAW_GATEWAY_TOKEN` | `<sua_senha_aqui>` | Define a simple password for access (e.g. `minhasenha123`). This is your API Key. |
| `OPENCLAW_GATEWAY_TRUSTED_PROXIES` | `0.0.0.0/0` | **REQUIRED** to fix "Untrusted Proxy" errors and WebSocket disconnects on Coolify. |
| `NODE_ENV` | `production` | Ensures production optimizations. |

### Storage (Persistent Volumes)
To preserve your sessions (WhatsApp login) and config across restarts, you **MUST** configure persistent storage.

1. Go to **Storage** tab.
2. Add a new Persistent Volume:
   - **Name**: `openclaw-data`
   - **Destination Path** (onde os dados ficam no container): `/home/node/.openclaw`
   - **Source Path**: Pode deixar em branco (o Coolify cria automaticamente).

> **Note**: The Docker container now runs as `root` to ensure compatibility with Coolify volumes (`EACCES` fix).

## 3. Deploy
Click **"Deploy"**.

## 4. Verification
Once deployed, the logs should show:
```
[gateway] listening on 0.0.0.0:18789
```

### Accessing the Interface
Use the following URL format:
`https://<seu-dominio-coolify>/?token=<sua_senha_aqui>`

Example:
`https://openclaw.sparklingtech.com.br/?token=minhasenha123`

---

## Troubleshooting ("Force Brute" Reinstall)
If you need to delete and reinstall:
1. Delete the resource in Coolify.
2. Follow the steps above from scratch.
3. **IMPORTANT**: Do not forget to re-add the `OPENCLAW_GATEWAY_TRUSTED_PROXIES` variable. It is often forgotten during reinstalls and is the main cause of "Offline" errors.
