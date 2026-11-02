# Render backend deployment

The build can succeed while startup fails if MongoDB is unreachable. Opening a
port without a working database does not fix the paste API.

Configure the existing Render web service:

- Branch: `main`
- Root directory: `server`
- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/api/health`
- Environment: set `MONGO_URI` to the hosted MongoDB connection string.
  `MONGODB_URI` is accepted as an alternative. If both exist, `MONGO_URI` wins.
- Let Render provide `PORT`; the server binds on `0.0.0.0`.

Do not upload the local `.env`: its `127.0.0.1` address points to your computer's
MongoDB and cannot work on Render. Keep database credentials in Render's
Environment settings, never in GitHub.

For MongoDB Atlas, use the application's connection string from Connect > Drivers,
including the database name. Use an Atlas **database user**, URL-encode special
characters in the password, and allow the Render service's outbound IP ranges in
Atlas Network Access. Confirm the cluster is active.

Save the environment changes and deploy the latest commit. Successful logs show
`MongoDB Connected` followed by `Server running on port ...`. Verify both
`/api/health` and `/api/pastes` return HTTP 200. The health endpoint returns 503
if the database disconnects.

If the frontend is deployed separately, its production
`VITE_REACT_APP_BACKEND_BASE_URL` must be `https://<backend>.onrender.com/api`;
rebuild the frontend after changing this setting.

References:
- https://render.com/docs/web-services
- https://render.com/docs/configure-environment-variables
- https://www.mongodb.com/docs/atlas/reference/partner-integrations/render/
