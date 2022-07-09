import React from "react";
import 'antd/dist/antd.css';

import { useState, useEffect } from "react";
import axios from "axios";
import { UploadOutlined,DownloadOutlined,DeleteOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";
const HomePage = () => {

/////////////////
const headers = {
    token: localStorage.getItem("user-token"),
    
  };

   
var token = headers.token;

var decoded = jwt_decode(token);
 var tokenData=decoded.result
console.log(tokenData.email,"decodeedd");
console.log(headers.token,"hh")
const[up,setUp]=useState()
const [state, setState] = useState();






////////////////
  const [data, setData] = useState([]);
  var password = [];
  const [flag, setFlag] = useState(false);
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:7000/file?email=${tokenData.email}`)
      .then((res) => {
        setData(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
    setFlag(true)
  };

  const downloadFile = async (id) => {
    let key = localStorage.getItem("image-password");
    let pass = prompt("Enter 6 digit password here.");

    if (pass == key) {
    //   await axios
    //     .get(`http://localhost:7000/download/${id}`)
        
    axios({
        url:`http://localhost:7000/download/${id}`,
        method:"GET",
        responseType:"blob"
    })
    .then((res) => {

        //   fileDownload(splitArray.join("\\"), newArray);
        fileDownload(res.data,res.data.type);
        console.log(res.data.type,"filespathggggggggggg")
          setPhoto(res.data)
          console.log(res.data,res.data.type)
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
    setFlag(true)
    console.log(id);
    await axios
      .delete(`http://localhost:7000/file/delete/${id}`)
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
    setFlag(true)
    formData.append("email",tokenData.email)
    formData.append("file", img)
    let str = "0123456789";
    let uuid = [];
    for (let i = 0; i < 6; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    password = uuid.join("");
    localStorage.setItem("image-password", password);
    await axios
      .post("http://localhost:7000/file", formData, configAxios)
      .then((res) => {
        alert(`File Submited... Your password is ${password}`);
        navigate("/home");
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  console.log(data,"path")
  return (
   <div  style={{backgroundColor:"GrayText",height:"1000px"}}>
 <div style={{backgroundColor:"GrayText"}}>

<div style={{display:"flex",justifyContent:"center"}} className="site-card-border-less-wrapper">
    <Card

title="Upload Files"
      bordered={false}
      style={{
        width: 1000,justifyContent:"center"
      }}
    >

        <div className="mb-3">
          
          <input
            className="form-control "
            type="file"
            name="file"
            id="formFile"
            onChange={onFileChange}
          />

        </div>

        <button  type="submit" className="btn btn-dark" onClick={onSubmitHandle}>
        <UploadOutlined />   Submit
        </button>
 
 </Card>
  </div>





  <div style={{display:"flex",justifyContent:"center"}} className="site-card-border-less-wrapper">
    <Card

      bordered={false}
      style={{
       height:"50%", width: 1000,justifyContent:"center"
      }}
    >

      <div className="container mt-5">
        <h1 style={{backgroundColor:"yellowgreen"}} className=" text-center">File Data</h1>
        <div className="row">
          <div className="col-sm-10 offset-1 mt-5">
            <table className="table">
              <thead style={{backgroundColor:"yellow"}}>
                <tr>
                  <th scope="col">Sr.No.</th>
                  <th scope="col">Path</th>
                  

                  <th scope="col">Download</th>
                  <th scope="col">Delete</th>
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
                            <DownloadOutlined />
                          Download
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHandle(ele._id)}
                        >
                            <DeleteOutlined />
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
      
 </Card>
  </div>
    </div>
   </div>
  );
};

export default HomePage;
