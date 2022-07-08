import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";
const Home = () => {
  const [data, setData] = useState([]);
  var password = [];
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9013/file")
      .then((res) => {
        setData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const downloadFile = async (id) => {
    let key = localStorage.getItem("image-password");
    let pass = prompt("Enter 6 digit password here.");

    if (pass == key) {
      await axios
        .get(`http://localhost:9013/download/${id}`)
        .then((res) => {
          const splitArray = res.data.split("\\");
          const newArray = splitArray[splitArray.length - 1];
          fileDownload(splitArray.join("\\"), newArray);
          alert("File Downloaded.");
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("File can't downloaded. Password dosent matches");
    }
  };

  const deleteHandle = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:9013/file/delete/${id}`)
      .then((res) => {
        alert("File Deleted.");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const configAxios = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();

  const onSubmitHandle = async () => {
    formData.append("file", img);
    let str = "0123456789";
    let uuid = [];
    for (let i = 0; i < 6; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    password = uuid.join("");
    localStorage.setItem("image-password", password);
    await axios
      .post("http://localhost:9013/file", formData, configAxios)
      .then((res) => {
        alert(`File Submited... Your password is ${password}`);
        navigate("/home");
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container mt-5">
        <h4 className="alert alert-dark text-center">Upload File</h4>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Upload File :
          </label>
          <input
            className="form-control "
            type="file"
            name="file"
            id="formFile"
            onChange={onFileChange}
          />
        </div>

        <button type="submit" className="btn btn-dark" onClick={onSubmitHandle}>
          Submit
        </button>
      </div>

      <div className="container mt-5">
        <h1 className=" text-center">View File Uploaded</h1>
        <div className="row">
          <div className="col-sm-10 offset-1 mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Download</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((ele, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>

                      <td>{ele.file}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info btn-sm"
                          onClick={() => downloadFile(ele._id)}
                        >
                          Download
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHandle(ele._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
