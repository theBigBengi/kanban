"use client";

import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageId, setSelecteImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log(`Faild to get images from unsplash`);
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-sky-700' />
      </div>
    );

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;

              setSelecteImageId(image.id);
            }}
            key={image.id}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              className='object-cover rounded-sm'
              src={image.urls.thumb}
              alt='unsplash-image'
              fill
            />

            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                <Check className='h-4 w-4 text-white' />
              </div>
            )}

            <Link
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
              href={image.links.html}
              target='_blank'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  );
};
