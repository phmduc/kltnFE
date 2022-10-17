import Admin from "../../layouts/Admin/Admin.js";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import ModalForm from "../../components/Modal/Modal.js";
import { addproduct, updateproduct, deleteproduct } from "../../Redux/apiRequests.js";
import MainLayout from "../../layouts/MainLayout/MainLayout.js";
import "./ProductAdmin.css"
import { getAllProduct } from "../../Redux/slice/productSlice.js";
import { Form, Button } from "react-bootstrap";
function ProductAdmin() {
    const listCate = useSelector((state)=>state.category.category)
    const [isLoad, setLoaded] = useState(false);
    const [body, setBody] = useState([]);
    const [ID, setID] = useState("");
    const [name, setName] = useState("");
    const [cate, setCate] = useState("");
    const [user, setUser] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState([]);
    const [image, setImage] = useState([]);
    const [previewSource, setPreviewSource] = useState([]);
    const [fileInput, setFileInput] = useState();
    const [message, setMessage] = useState("");
    const inputSize = useRef();
    const inputCount = useRef();

    const [products, setProducts] = useState([]);
    const dispatch= useDispatch();
    console.log(listCate)
    listCate.map((cate, index) => {
      console.log(cate.nameCate)
    })
    async function getProducts() {
        try {
          const response = await axios.get('/api/products');
          dispatch(getAllProduct(response.data))
          setProducts(response.data)
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(() => {
        getProducts()
      },[]);

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
        Cate: cate,
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
    return ( <Admin>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <ModalForm title="Thêm Sản Phẩm">
                        <div className="form">
                            <Form>
                                <Form.Group className="mb-3" controlId="nameProduct">
                                    <Form.Label>Tên Sản Phẩm</Form.Label>
                                    <Form.Control onChange={(e)=>{setName(e.target.value)}} value={name||""} type="text" placeholder="Enter Name Product" />
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
                                    <Form.Select aria-label="Default select example">
                                    <option>Chọn Danh Mục</option>
                                    {listCate.map((cate, index) => <option key={index} value={cate._id}>{cate.nameCate}</option>
                                    )}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="sizeProduct">
                                    <Form.Label>Size</Form.Label>
                                    <div className="d-flex ">
                                        <Form.Control ref={inputSize} type="text" placeholder="Enter Size" />
                                        <Form.Control ref={inputCount} type="text" placeholder="Enter Count" />
                                    </div>
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
                            </Form>
                        </div>
                    </ModalForm>
                    <table className="table productList">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Size-Number</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                            <tbody>
                                {products.map((item, index) =>(
                                    <tr className="item" key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="name">{item.name}</td>
                                        <td className="img-wrap"><img src={item.image.split(',')[0]} alt="" /></td>
                                        <td className="price">{item.price}</td>
                                        <td className="description">{item.desc}</td>
                                        <td className="cate">{item.Cate}</td>
                                        <td className="size">{item.size.map((size, index) =>(`Size ${size.sizeId} - ${size.count} Đôi`))}</td>
                                        <td className="delete">
                                            <button>delete</button>
                                            <ModalForm title="Edit">
                                             
                                            </ModalForm>
                                        </td>
                                    </tr>
                                    ) )}
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Admin> );
}

export default ProductAdmin;