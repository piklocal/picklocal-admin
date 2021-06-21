const keyUri = {


    // BACKEND_URI:"https://piklocal-sssserver-mjpfe.ondigitalocean.app/api",
    BACKEND_URI:"http://localhost:5000/api",
// 
    // SOCKET_URI:"https://piklocal-server-mjpfe.ondigitalocean.app",
    SOCKET_URI:"http://localhost:5000",

       STORE_IMAGE_URI:"https://piklocal-server-mjpfe.ondigitalocean.app/static/images",

      // BACKEND_IMAGE_API : "https://piklocal.ml"
      // BACKEND_IMAGE_API : "https://piklocal.ml/static/images"
}



let token = localStorage.getItem('admintoken')

const config = {
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    }
  };



  export  {keyUri, config }
  



