import Admin from "../../layouts/Admin/Admin.js";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import ModalForm from "../../components/Modal/Modal.js";
import "./CategoryAdmin.css"
import { getAllCategory } from "../../Redux/slice/categorySlice.js";
import { Form, Button } from "react-bootstrap";
function CategoryAdmin() {
    const [categories, setCategory] = useState([]);
    const [name, setName] = useState([]);
    const [image, setImage] = useState([]);
    const [previewSource, setPreviewSource] = useState([]);
    const [fileInput, setFileInput] = useState();
    const [message, setMessage] = useState("");

    const dispatch= useDispatch();

    async function getCategory() {
        try {
          const response = await axios.get('/api/category');
          dispatch(getAllCategory(response.data))
          setCategory(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    const handleSubmitAdd = async (e) =>{
    e.preventDefault()
    if(!previewSource || previewSource.length < 5) {
        setMessage("Upload ít nhất 5 bức ảnh của sản phẩm")
    }
    else {
    let imageData = await uploadImage(previewSource)
    imageData = imageData.map((elem, index)=>{
        return elem.url
    })}}
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
      useEffect(() => {
        getCategory()
      },[]);
    
    return ( <Admin>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <ModalForm title="Thêm Danh Mục">
                        <div className="form">
                            <Form>
                                <Form.Group className="mb-3" controlId="nameProduct">
                                    <Form.Label>Tên Danh Mục</Form.Label>
                                    <Form.Control onChange={(e)=>{setName(e.target.value)}} value={name||""} type="text" placeholder="Enter Name Product" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="imageProduct">
                                    <Form.Label>Ảnh Danh Mục</Form.Label>
                                    <Form.Control onChange={(e) => handleFileInputChange(e)} value={fileInput} type="file" placeholder="Enter Product Image" />
                                    {previewSource &&  previewSource.map((image, index) => {
                                    return(<img src={image} key={index} style={{height:'50px', width: '50px'}} alt="" /> )
                                    })}
                                    <p>{message}</p> 
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
                            </tr>
                        </thead>
                            <tbody>
                                {categories.map((item, index) =>(
                                    <tr className="item" key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="name">{item.nameCate}</td>
                                        <td className="img-wrap">hihi</td>
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

export default CategoryAdmin;