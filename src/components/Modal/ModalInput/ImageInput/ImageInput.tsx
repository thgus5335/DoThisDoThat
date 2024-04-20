import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import styles from './ImageInput.module.scss';
import imageAdd from '@/src/assets/icons/imageAdd.svg';

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
    <>
      <div className={styles.imageInput}>
        <label htmlFor="imageInputField" className={styles.imageInputButton}>
          <Image className={styles.imagePreview} src={preview ? preview : imageAdd} fill alt="추가한 이미지" />
        </label>
        {/*{preview && <img src={preview} alt="Image preview" className={styles.imagePreview} />}*/}
        <input
          id="imageInputField"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.imageInputField}
        />
      </div>
    </>
  );
};

export default ImageInput;
