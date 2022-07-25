import React, {Component, useEffect, useState} from "react";
import UploadService from "./UploadFilesService";
import './styles.scss';
import {Button} from "@mui/material";

const UploadFiles = ({productIsUpload,data, isPresident, onFetchProduct}) => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const [listImage, setListImage] = useState([]);

    useEffect(() => {
        const productSelected = data.find(item => item.id === productIsUpload.id);
        setListImage(productSelected?.productImages)
    }, [data])

    const selectFile = (event) => {
        console.log(event)
        setSelectedFiles(event.target.files);
    }

    const upload = (e) => {
        e.preventDefault();
        let currentFile = selectedFiles?.[0];
        setProgress(0);
        setCurrentFile(currentFile);
        UploadService.upload(currentFile, productIsUpload?.id, isPresident, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
            .then((response) => {
                setMessage(response.data.message)
                onFetchProduct();
            })
            .then((files) => {
                setFileInfos(files.data)

            }).then(() => {

        })
            .catch(() => {
                setProgress(0);
                setMessage("");
                setCurrentFile(undefined);
            });
        setSelectedFiles(undefined);
        document.getElementById("file-form").value = "";
    }

    return (
        <div>
            {currentFile && (
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{width: progress + "%"}}
                    >
                        {progress}%
                    </div>
                </div>
            )}
            <form  enctype="multipart/form-data">
            <label className="btn btn-default">
                <input id="file-form" type="file" onChange={selectFile}/>
            </label>
                <button className="btn btn-success"
                    // disabled={!selectedFiles}
                        onClick={(e) => upload(e)}
                >
                    Upload
                </button>
            </form>

            <div className="alert alert-light" role="alert">
                {message}
            </div>
            <div className="card">
                <div className="card-header">Danh sách Ảnh</div>
                <ul className="list-group list-group-flush-image">
                    {listImage && listImage && listImage.length ?
                        listImage.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <img src={file.photosImagePath}/>
                            </li>
                        )) : null}
                </ul>
            </div>
        </div>
    );


}

export default UploadFiles;