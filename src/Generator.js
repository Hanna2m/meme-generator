import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import domtoimage from "dom-to-image";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import { Stack, Typography } from "@mui/material";

function MemeGenerator() {
  const [currentMemeIdx, setCurrentMemeIdx] = useState(0);
  const [memeData, setMemeData] = useState([]);
  const [text, setText] = useState(["Sample text 1", "Sample text 2"]);
  const [ownImageSrc, setOwnImageSrc] = useState("");

  const getMemeData = () => {
    Axios.get(`https://api.imgflip.com/get_memes`).then((resp) =>
      setMemeData(resp.data.data.memes)
    );
  };

  useEffect(() => getMemeData(), []);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("File reading was aborted");
    reader.onerror = () => console.log("File reading has failed");
    reader.onload = () => setOwnImageSrc(() => reader.result);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onPrev = () => {
    if (currentMemeIdx === 0) return;
    setOwnImageSrc(() => "");
    setCurrentMemeIdx((prev) => prev - 1);
  };

  const onRandom = () => {
    const newIdx = Math.floor(Math.random() * memeData.length);
    setCurrentMemeIdx((prev) => newIdx);
  };

  const onNext = () => {
    if (currentMemeIdx >= memeData.count - 1) return;
    setOwnImageSrc(() => "");
    setCurrentMemeIdx((prev) => prev + 1);
  };

  const onExport = () => {
    let imgDiv = document.getElementById("img-container");
    domtoimage
      .toPng(imgDiv)
      .then((url) => {
        var link = document.createElement("a");
        link.download = "my-meme.png";
        link.href = url;
        link.click();
      })
      .catch((e) => console.log(e));
  };

  const handleTextChange = (value, idx) => {
    setText((prev) => [
      ...prev.slice(0, idx),
      value,
      ...prev.slice(idx + 1),
    ]);
  };

  const currentImgPath = () => {
    if (ownImageSrc) return ownImageSrc;
    const imgData = memeData[currentMemeIdx];
    if (imgData) return imgData.url;
    else return "";
  };

  return (
    <>
    <Box sx={{display: 'flex',
          alignItems:'center',
          flexDirection: 'column',
          marginTop: '32px',
          marginLeft: '32px'}}>
        <Typography variant="h6" gutterBottom component="div">Create your meme.</Typography>
        <Typography variant="h6" gutterBottom component="div">
            You can use random image or your own one. Just Drag 'n' drop your image file over the picture.
        </Typography>
    </Box>
       
    <Box sx={{
          display: 'flex',
          width: '90%',
          flexDirection: 'row',
          marginTop: '32px',
          marginLeft: '32px'
      }}>
          <Box sx={{
              display: 'flex',
              flexDirection: 'column'
          }}>

              <TextField id="outlined-basic" label="Text Top" variant="outlined"
                  type="text"
                  name="topText"
                  onChange={(e) => handleTextChange(e.target.value, 0)}
                  style={{
                      marginBottom: '16px',
                      marginRight: '16px'
                  }} />
              <TextField id="outlined-basic" label="Text Bottom" variant="outlined"
                  type="text"
                  name="topText"
                  onChange={(e) => handleTextChange(e.target.value, 1)}
                  style={{
                      marginBottom: '16px',
                      marginRight: '16px'
                  }} />
                <Stack className="navigation" spacing={2} direction="row">
                    <Button onClick={onPrev}>Previous</Button>
                    <Button onClick={onRandom} variant="text">Random</Button>
                    <Button onClick={onNext}>Next</Button>
                </Stack> 
                <Button onClick={onExport}>Export meme image</Button>
          </Box>
          
          <Box id="img-container" className="meme" {...getRootProps()}>
          <input {...getInputProps()} />
              <label className="meme-text-top">{text[0]}</label>
              <label className="meme-text-bottom">{text[1]}</label>
              <img src={currentImgPath()} alt="Meme" />
          </Box>
          <Box>
              
              
          </Box>
      </Box>
      
      </>
        
  );
}

export default MemeGenerator;