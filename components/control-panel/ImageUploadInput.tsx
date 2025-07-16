"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ImageUpload = ({ onSubmit }: ImageUploadProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="image"
          type="image"
          name="image"
          accept="appliation/pdf"
          required
          className=""
        />
        <Button>Upload</Button>
      </div>
    </form>
  );
};

export default ImageUpload;
