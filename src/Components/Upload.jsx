import React from "react";
import { BsUpload } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { setTimeout } from "timers";
import logo from '../assest/Logo.jpg'

const Upload = () => {
  const [file, setFile] = React.useState();
  const [imagePreview, setImagePreview] = React.useState("");
  const [base64, setBase64] = React.useState();
  const [name, setName] = React.useState();
  const [size, setSize] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const onChange = (e) => {
    console.log("file", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const handleReaderLoaded = (readerEvnt) => {
    let binaryString = readerEvnt?.target?.result;
    setBase64(btoa(binaryString));
  };

  const onFileSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("bine", base64);
    let payload = { image: base64 };
    console.log("payload", payload);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e?.target?.file[0];
    console.log("reader", reader);
    console.log("file", file);

    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setSize(file.size);
        setName(file.name);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const remove = () => {
    setFile("");
    setImagePreview("");
    setBase64("");
    setName("");
    setSize("");
  };

  return (
    <React.Fragment className="containers">
      <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
        <div className="Card">
          <img
            src={logo}
            alt="Logo de la impresa"
            width={imagePreview === "" ? 310 : 310}
            height={imagePreview === "" ? 400 : 480}
          />
        </div>
      </form>
    </React.Fragment>
  );
};
export default Upload;
