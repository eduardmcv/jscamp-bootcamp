import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:1234",
  "https://midu.dev",
  "http://jscamp.dev",
  "http://localhost:5173",
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    if (!origin) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
});
