import { on } from "events";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";

const UploadAvatar = () => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  useEffect(() => {
    console.log(preview);
  }, [preview]);

  return (
    <div>
      <Avatar
        width={400}
        height={400}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
      />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
};

export default UploadAvatar;
