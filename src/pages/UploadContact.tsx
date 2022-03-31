import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import useFetch from "../hooks/useFetch";
import contactUploadSchema from "../validation/ContactUploadSchema";

export default function UploadContact(): JSX.Element {
  const [document, setDocument] = useState<File[]>([]);
  const [request, data, statusCode] = useFetch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(contactUploadSchema),
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (document) => {
      fileChangeHandler(document);
    },
  });

  const fileChangeHandler = (file: File[]) => {
    const newFileArray = file.concat(document);
    // const totalFileSizes = getTotalSize(newFileArray);
    if (newFileArray.length !== 0) {
      setDocument(file);
    }
  };

  const convertBytesToMb = (bytes: number) => {
    const megaBytes = bytes / 1024 / 1024;
    if (megaBytes < 0.01) {
      return "0.01";
    }
    return megaBytes.toFixed(2);
  };

  //   const removeFile = (index: number) => {
  //     const newFileArray = removeFileByIndex([...document], index);
  //     // if (newFileArray.length === 0) {
  //     setDocument([]);

  //     // } else {
  //     //   setDocument(newFileArray);

  //     // }
  //   };
  let files = document.map((file: File, index: number) => (
    <div className="text-sm" key={index}>
      {file.name} - {convertBytesToMb(file.size)} MB -{" "}
      <p
        className="underline inline cursor-pointer"
        // onClick={() => removeFile(index)}
      >
        Remove File
      </p>
    </div>
  ));

  const onSubmit = () => {
    let formData = new FormData();
    formData.append("contact", JSON.stringify(document));
 
    const headers = {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryQ0pBuvRC1EzDAQWT````",
    };
    request(`http://localhost:8080/upload/contact`, {
      method: "POST",
      body: formData,
      headers: headers,
    });
    console.log(formData)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 m-auto">
        <div
          {...getRootProps({
            className:
              "flex flex-col h-40 w-5/5 border-2 border-dashed border-gray-400 rounded-md bg-gray-100 items-center justify-center ",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop files here or</p>
          <br />
          <p>click to select files</p>
        </div>

        <div>{files}</div>

        <Button text="Submit" className="text-white" onClick={onSubmit} />
      </form>
    </div>
  );
}
