// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// export default function MemeGenerator() {
//     const [loading, setLoading] = useState(false);
//     const [topText, setTopText] = useState('');
//     const [bottomText, setBottomText] = useState('');
//     const [allMemeImgs, setAllMemeImgs] = useState([]);
//     const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg")

//     //fetch data
//     useEffect(()=>{
//         setLoading(true);
//         axios
//         .get('https://api.imgflip.com/get_memes')
//         .then((res) => {
//             console.log(res)
//             setAllMemeImgs(res.data.memes)
           
//             setLoading(false)
//         })
//         .catch((error) => console.log(error))
//     }, []);
    
//     //set Text
//     const handleChange = event => {
//         setTopText(topText);
//         setBottomText(bottomText);
//     }

//     const handleSubmit = event =>{
//         event.preventDefault();
//         if(allMemeImgs) {
//         console.log(allMemeImgs)
//         const random = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
//         setRandomImg(random)
//         console.log(random) 
//         } else console.log ("Loading...")
        

//     }

//   return (
//     <div>
//     <form className="meme-form" onSubmit={handleSubmit}>
//       <input
//         placeholder="Enter Text"
//         type="text"
//         value={topText}
//         name="topText"
//         onChange={handleChange}
//       />
//       <input
//         placeholder="Enter Text"
//         type="text"
//         value={bottomText}
//         name="bottomText"
//         onChange={handleChange}
//       />
//       <button>Generate</button>
//     </form>

//     <br />
//     <div className="meme">
//       <img src={randomImg} alt="meme" />
//       <h2 className="top">{topText}</h2>
//       <h2 className="bottom">{bottomText}</h2>
//     </div>
//   </div>
// //    <>
// //    <Box
// //       component="form"
// //       sx={{
// //         '& > :not(style)': { m: 1, width: '25ch' },
// //       }}
// //       noValidate
// //       autoComplete="off"
// //       onSubmit={handleSubmit}
// //     >
// //       <TextField id="outlined-basic" label="Text Top" variant="outlined" 
// //       value={topText}
// //       name="topText"
// //       onChange={handleChange}/>
// //       <TextField id="outlined-basic" label="Text Bottom" variant="outlined"
// //       value={bottomText}
// //       name="bottomText"
// //       onChange={handleChange} />
// //     <Button >Generate</Button>
// //     </Box>
// //     <Box>
// //     <img src={randomImg} alt="meme" />
// //     </Box>
// //    </>
//   )
// }


import React from "react";

class MemeGenerator extends React.Component {
  state = {
    loading: false,
    topText: "",
    bottomText: "",
    allMemeImgs: [],
    randomImg: "http://i.imgflip.com/1bij.jpg"
  };
  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(content =>
        this.setState({
          allMemeImgs: content.data.memes,
          loading: false
        })
      );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const rand =
      allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    this.setState({
      randomImg: rand
    });
  };

  render() {
    return (

        // <><Box
        //     component="form"
        //     sx={{
        //         '& > :not(style)': { m: 1, width: '25ch' },
        //     }}
        //     noValidate
        //     autoComplete="off"
            
        // >
        //     <TextField id="outlined-basic" label="Text Top" variant="outlined"
        //         value={this.state.topText}
        //         name="topText"
        //         onChange={this.handleChange} />
        //     <TextField id="outlined-basic" label="Text Bottom" variant="outlined"
        //         value={this.state.bottomText}
        //         name="bottomText"
        //         onChange={this.handleChange} />
        //     <Button onSubmit={this.handleSubmit}>Generate</Button>
        // </Box><Box>
        //         <img src={this.state.randomImg} alt="meme" />
        //     </Box></>
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <TextField id="outlined-basic" label="Text Top" variant="outlined"
            placeholder="Enter Text"
            type="text"
            value={this.state.topText}
            name="topText"
            onChange={this.handleChange}
          />
          <TextField id="outlined-basic" label="Text Bottom" variant="outlined"
            placeholder="Enter Text"
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>

        <br />
        <div className="meme">
          <img src={this.state.randomImg} alt="meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
