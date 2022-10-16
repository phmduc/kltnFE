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
    const [cate, setCate] = useState("");
    const [user, setUser] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState([]);
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState([]);
    const [previewSource, setPreviewSource] = useState([]);
    const [fileInput, setFileInput] = useState();
    const [message, setMessage] = useState("");
    const inputSize = useRef();
    const inputCount = useRef();

    
    
    const dispatch= useDispatch();
    async function getProducts() {
        try {
          const response = await axios.get('/api/products');
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
      const newProduct ={
        name: name,
        desc: desc,
        image: imageData.join(","),
        idCate: cate,
        user: user,
        price: price,
        size: size
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
    const previewSize = ()=>{
      const sizeInput= inputSize.current.value
      const countInput= inputCount.current.value
      setSize([...size, {sizeId: sizeInput, count: countInput}])
    }
    const previewFile = (file) =>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
      setPreviewSource([...previewSource, reader.result])
      }
    } 
    const uploadImage = async (base64EncodedImage)=>{
      let file
      try{
      file = await axios.post("/api/uploads",{file: base64EncodedImage});
      return file.data
      } catch(err){
        console.error(err)
      }
    }
    const handleSaveUpdate = async ()=>{
      const updatedProduct ={
        _id: ID,
        name: name,
        desc: desc,
        image: image,
        price: price,
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
                        <Form.Label>Tên Sản Phẩm</Form.Label>
                        <Form.Control onChange={(e)=>{setName(e.target.value)}} value={name||""} type="text" placeholder="Enter Name Product" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageProduct">
                        <Form.Label>Ảnh Sản Phẩm (Tối đa 5 bức)</Form.Label>
                        <Form.Control onChange={(e) => handleFileInputChange(e)} value={fileInput} type="file" placeholder="Enter Product Image" />
                        {previewSource &&  previewSource.map((image, index) => {
                          return(<img src={image} key={index} style={{height:'50px', width: '50px'}} alt="" /> )
                        })}
                        <p>{message}</p> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descProduct">
                        <Form.Label>Mô Tả</Form.Label>
                        <Form.Control onChange={(e)=>{setDesc(e.target.value)}} value={desc||""}  type="text" placeholder="Enter  Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descProduct">
                        <Form.Label>Cate</Form.Label>
                        <Form.Control onChange={(e)=>{setCate(e.target.value)}} value={cate||""}  type="text" placeholder="Enter  Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descProduct">
                        <Form.Label>User</Form.Label>
                        <Form.Control onChange={(e)=>{setUser(e.target.value)}} value={user||""}  type="text" placeholder="Enter  Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sizeProduct">
                        <Form.Label>Size</Form.Label>
                        <Form.Control ref={inputSize} type="text" placeholder="Enter Size" />
                        <Form.Control ref={inputCount} type="text" placeholder="Enter Count" />
                        {size.map((elem, index)=>{
                          return (<div className="sizewrap" key={index} style={{display:"flex"}}>
                            <p> {elem.sizeId}:</p> 
                            <p>{elem.count}</p>
                            </div>)
                        })}
                         <Button onClick={()=>{previewSize()}}>Add Size</Button>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priceProduct">
                        <Form.Label>Giá Sản Phẩm</Form.Label>
                        <Form.Control onChange={(e)=>{setPrice(e.target.value)}} value={price||""} type="text" placeholder="Enter Product Price" />
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