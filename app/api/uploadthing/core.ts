// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define a route for About Us images
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and specify a callback for after upload
    .onUploadComplete(async ({ metadata, file }) => {
      // This will be logged to your backend console if you have a custom logger
      console.log("Upload complete for file:", file.ufsUrl);
      // You could save file.url to a database here if needed,
      // but for this specific form, we'll handle saving the URL directly from the frontend.
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
