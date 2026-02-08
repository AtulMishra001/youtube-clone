import mongoose from "mongoose";
// connecting database
export default function dbConnect(app) {
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI;

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Database connection error:", err.message);
    });
}
