import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import useFetch from "../hooks/useFetch";
import contactUploadSchema from "../validation/ContactUploadSchema";

export default function UploadContact(): JSX.Element {
  const navigate = useNavigate();
  const [document, setDocument] = useState<File[]>([]);
  const [request, data, statusCode] = useFetch<any>();
  const {
    register,
    handleSubmit,
    setValue,
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
      setDocument(newFileArray);
      setValue("contact", newFileArray, { shouldValidate: true });
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
    formData.append("foo", "foo");
    document.forEach((doc) => {
      formData.append("bar", doc);
    });

    const headers = {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryQ0pBuvRC1EzDAQWT````",
    };

    request(`http://localhost:8080/upload/contact`, {
      method: "POST",
      body: formData,
      headers: headers,
    });
    formData.forEach((thing) => {
      console.log(thing);
    });
    console.log(formData);
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="p-4 text-slate-300 text-4xl">Upload Contact</h2>
        <Button
          text="Home"
          className="text-slate-300"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <hr className="border-bottom-2 w-1/4 m-auto my-4 border-white" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 m-auto">
        <div
          {...getRootProps({
            className:
              "flex flex-col h-40 w-5/5 border-2 border-dashed border-gray-400 rounded-md bg-slate-300 items-center justify-center ",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop files here</p>
          <p>or</p>
          <p>click to select files</p>
        </div>
        <div>{files}</div>
        <div className="text-center p-2">
          <Button text="Submit" className="text-slate-300" onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
}
