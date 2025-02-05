"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgess?: (progress: number) => void;
  fileType?: "image" | "video";
}




export default function FileUpload({ onSuccess, onProgess, fileType = "image" }: FileUploadProps) {

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState < string | null > (null)



  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false)
    setError(null)
    onSuccess(response)
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgess) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgess(Math.round(percentComplete));
    }
    setUploading(true);
    setError(null);
  };

  const handleStartUpload = ():void => {
     setUploading(true);
     setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Only video files are allowed");
        return false
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("video must be less than 100 MB")
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid file (JPEG, PNG, webP)")
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("video must be less than 5 MB")
        return false;
      }
    }
    return false;
  }


  return (
    <div className="space-y-2">

      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        useUniqueFileName={true}
        validateFile={validateFile}

        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder = {fileType === "video"?"/video":"/images"}
        accept={fileType==="video"?"video/*":"image/*"}
        className="file-input file-input-bordered w-full"
      />
      {
        uploading && (
          <div className="flex items-center gap-2 text-sm text-primary">
              <Loader2 className="animate-spin w-4 h-4"/>
              <span>Uploading...</span>
          </div>
        )
      }
      {error &&(
        <div className="text-error text-sm">
            {error}
       </div>)}
  
    </div>
  );
}