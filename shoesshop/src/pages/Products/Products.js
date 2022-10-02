import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import { addproduct, updateproduct, deleteproduct } from "../../Redux/apiRequests.js";
import MainLayout from "../../layouts/MainLayout/MainLayout.js";
import "./Products.scss"
import { getAllProduct } from "../../Redux/slice/productSlice.js";
import { Form, Button } from "react-bootstrap";
function Products() {
    const [isLoad, setLoaded] = useState(false);
    const [body, setBody] = useState([]);
    const [ID, setID] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState([]);
    const [price, setPrice] = useState(0);
    const [cis, setCis] = useState(0);
    const [previewSource, setPreviewSource] = useState([]);
    const [fileInput, setFileInput] = useState();
    const [message, setMessage] = useState("");
    const inputImage = useRef();
    
    const dispatch= useDispatch();
    async function getProducts() {
        try {
          const response = await axios.get('/products');
          dispatch(getAllProduct(response.data))
          setBody(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    useEffect(() => {
      getProducts()
    },[isLoad]);
    const handleSubmitAdd = async (e) =>{
      e.preventDefault()
      if(!previewSource || previewSource.length < 5) {
        setMessage("Upload ít nhất 5 bức ảnh của sản phẩm")
      }
      else {
      let imageData = await uploadImage(previewSource)
      imageData = imageData.map((elem, index)=>{
        return elem.url
      })
      console.log(imageData)
      setImage(imageData.join(","));
      const newProduct ={
        name: name,
        desc: desc,
        image: image,
        price: price,
        countInStock: cis
      }
      await addproduct(newProduct,dispatch);
      setLoaded(!isLoad);
      }
    }
    const updatePrepare = (index)=>{
      setID(body[index]._id)
      setName(body[index].name)
      setDesc(body[index].desc)
      setImage(body[index].image)
      setPrice(body[index].price)
      setCis(body[index].countInStock)
    }
    const handleFileInputChange = (e)=>{
      const file = e.target.files[0]
      setMessage("")
      if(previewSource.length > 4) {
        setMessage("Upload tối đa 5 bức ảnh của sản phẩm")
      } else {
      previewFile(file)
      }
    }
    const previewFile = (file) =>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(previewSource)
      reader.onloadend = () =>{
      setPreviewSource([...previewSource, reader.result])
      }
    } 
    const uploadImage = async (base64EncodedImage)=>{
      let file
      try{
      file = await axios.post("/uploads",{file: base64EncodedImage});
      } catch(err){
        console.error(err)
      }
      console.log(file.data)
      return file.data
    }
    const handleSaveUpdate = async ()=>{
      const updatedProduct ={
        _id: ID,
        name: name,
        desc: desc,
        image: image,
        price: price,
        countInStock: cis
      }
      await updateproduct(updatedProduct,dispatch);
      setLoaded(!isLoad);
    }
    const handleDelete = async (index)=>{
      const deletedProduct ={
        _id: body[index]._id,
      }
      await deleteproduct(deletedProduct,dispatch);
      setLoaded(!isLoad);
    }
    return (  
            <MainLayout>
                {body.map((item, index) =>(
                  <div className="item"  key={item._id}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link> 
                    <img src={item.image.split(',')[0]} alt="" />
                    <button onClick={()=>(updatePrepare(index))}>update</button> 
                    <button onClick={()=>(handleDelete(index))}>delete</button></div>
                )) }
                 <Form >
                    <Form.Group className="mb-3" controlId="nameProduct">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e)=>{setName(e.target.value)}} ref={inputImage} value={name||""} type="text" placeholder="Enter Name Product" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageProduct">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => handleFileInputChange(e)} value={fileInput} type="file" placeholder="Enter Product Image" />
                        {previewSource &&  previewSource.map((image, index) => {
                          return(<img src={image} key={index} style={{height:'50px', width: '50px'}} alt="" /> )
                        })}
                        <p>{message}</p> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descProduct">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>{setDesc(e.target.value)}} value={desc||""}  type="text" placeholder="Enter  Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priceProduct">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>{setPrice(e.target.value)}} value={price||""} type="text" placeholder="Enter Product Price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cisProduct">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>{setCis(e.target.value)}} value={cis||""} type="text" placeholder="Enter Product Count" />
                    </Form.Group>
                    <Button onClick={(e)=>{handleSubmitAdd(e)}} variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button onClick={()=>{handleSaveUpdate()}} variant="primary" >
                        Save
                    </Button>
                </Form> 
            </MainLayout>
     );
}

export default Products;