import React, { ChangeEvent, useState } from 'react';

type ImageUploadProps = {
  onImageChange: (file: File) => void;
};

const ImageInput = ({ onImageChange }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img src={preview} alt="Image preview" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
      )}
    </div>
  );
};

export default ImageInput;
