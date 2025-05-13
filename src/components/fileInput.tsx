/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "./ui/form";
import { UseFormReturn, UseFormSetValue } from "react-hook-form";
import useUpload from "@/stores/useUpload";
import { useState } from "react";
import { Button } from "./ui/button";

interface FileInputProps {
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  setValue: UseFormSetValue<any>;
}

export function FileInputAvatarImage({
  name,
  form,
  label,
  className = "w-full max-w-sm",
  disabled = false,
  required = false,
  description,
  setValue,
}: FileInputProps) {
  const { uploadFile } = useUpload();
  const [showUrl, setUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const username = form.watch("username")

  const handleRemoveFile = () => {
    setUrl(null);
    setUploadProgress(0);
    setValue(name, `https://avatar.iran.liara.run/username?username=${username}`);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setUploadProgress(0);

        const imageUrl = await uploadFile(file, (progress) => {
          setUploadProgress(progress);
        });

        setUploadProgress(100);

        if (imageUrl) {
          setValue(name, imageUrl, { shouldValidate: true });
          setUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error handling file change:", error);
        setUploadProgress(-1);
      }
    }
  };

  const renderProgressText = (progress: number) => {
    if (progress < 100 && progress >= 0) return `Uploading ${progress}%`;
    if (progress === 100) return "Done";
    return "Error";
  };

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <div className={`grid items-center gap-1.5 ${className}`}>
            {label && (
              <Label className="flex items-center gap-1 text-xs md:text-base">
                {label}
                {required && <span className="text-red-500">*</span>}
              </Label>
            )}
            {uploadProgress === 0 ? (
              <>
                <Input
                  id={`file-${name}`}
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  disabled={disabled}
                  className="cursor-pointer text-xs md:text-base"
                  onBlur={field.onBlur}
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <>
                {/* Progress bar component */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>
                      {showUrl
                        ? "Image uploaded"
                        : renderProgressText(uploadProgress)}
                    </span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`absolute h-full transition-all duration-300 ${
                        uploadProgress < 0
                          ? "bg-red-500"
                          : uploadProgress === 100
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${uploadProgress < 0 ? 100 : uploadProgress}%`,
                      }}
                    />
                  </div>

                  {/* Preview and actions */}
                  {showUrl && (
                    <div className="mt-2 flex items-center gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="h-8 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                      <div className="flex justify-end">
                        <label
                          htmlFor={`new-${name}`}
                          className="cursor-pointer rounded-md bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-800/30 transition-all"
                        >
                          {showUrl ? "Change Image" : "Upload Again"}
                        </label>
                        <Input
                          id={`new-${name}`}
                          type="file"
                          accept=".jpg, .jpeg, .png, .webp"
                          disabled={disabled}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
            <Input className="hidden" type="text" {...field} />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export function FileInputImage({
  name,
  form,
  label,
  className = "w-full max-w-sm",
  disabled = false,
  required = false,
  description,
  setValue,
}: FileInputProps) {
  const { uploadFile } = useUpload();
  const [showUrl, setUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleRemoveFile = () => {
    setUrl(null);
    setUploadProgress(0);
    setValue(name, "");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setUploadProgress(0);

        const imageUrl = await uploadFile(file, (progress) => {
          setUploadProgress(progress);
        });

        setUploadProgress(100);

        if (imageUrl) {
          setValue(name, imageUrl, { shouldValidate: true });
          setUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error handling file change:", error);
        setUploadProgress(-1);
      }
    }
  };

  const renderProgressText = (progress: number) => {
    if (progress < 100 && progress >= 0) return `Uploading ${progress}%`;
    if (progress === 100) return "Done";
    return "Error";
  };

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <div className={`grid items-center gap-1.5 ${className}`}>
            {label && (
              <Label className="flex items-center gap-1 text-xs md:text-base">
                {label}
                {required && <span className="text-red-500">*</span>}
              </Label>
            )}
            {uploadProgress === 0 ? (
              <>
                <Input
                  id={`file-${name}`}
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  disabled={disabled}
                  className="cursor-pointer text-xs md:text-base"
                  onBlur={field.onBlur}
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <>
                {/* Progress bar component */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>
                      {showUrl
                        ? "Image uploaded"
                        : renderProgressText(uploadProgress)}
                    </span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`absolute h-full transition-all duration-300 ${
                        uploadProgress < 0
                          ? "bg-red-500"
                          : uploadProgress === 100
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${uploadProgress < 0 ? 100 : uploadProgress}%`,
                      }}
                    />
                  </div>

                  {/* Preview and actions */}
                  {showUrl && (
                    <div className="mt-2 flex items-center gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="h-8 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                      <div className="flex justify-end">
                        <label
                          htmlFor={`new-${name}`}
                          className="cursor-pointer rounded-md bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-800/30 transition-all"
                        >
                          {showUrl ? "Change Image" : "Upload Again"}
                        </label>
                        <Input
                          id={`new-${name}`}
                          type="file"
                          accept=".jpg, .jpeg, .png, .webp"
                          disabled={disabled}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
            <Input className="hidden" type="text" {...field} />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
