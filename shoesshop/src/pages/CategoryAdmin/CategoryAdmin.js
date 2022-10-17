import Admin from "../../layouts/Admin/Admin.js";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import ModalForm from "../../components/Modal/Modal.js";
import "./CategoryAdmin.css"
import { addcategory, deletecategory, updatecategory } from "../../Redux/apiRequests.js";
import { getAllCategory} from "../../Redux/slice/categorySlice.js";
import { Form, Button } from "react-bootstrap";
function CategoryAdmin() {
    const [categories, setCategory] = useState([]);
    const [name, setName] = useState();
    const [isLoad, setLoaded] = useState(false);
    const [avatar, setAvatar] = useState([]);
    const [image, setImage] = useState([]);
    const [previewSource, setPreviewSource] = useState([]);
    const [fileInput, setFileInput] = useState();
    const [message, setMessage] = useState("");

    const dispatch= useDispatch();
    categories.map((elem, index)=>{
        const hi= elem.avatarCate[0]
        if(hi) console.log(hi.url)
    })
    async function getCategory() {
        try {
          const response = await axios.get('/api/category');
          dispatch(getAllCategory(response.data))
          setCategory(response.data)
        } catch (error) {
          console.error(error);
        }
    }
    const handleSubmitAdd = async () =>{
    if(!previewSource) {
        setMessage("Upload ít nhất 1 bức ảnh của danh mục")
    }
    else {
    let imageData = await uploadImage(previewSource)
    console.log(imageData)
    imageData = imageData.map((elem, index)=>{
        return { publicId: elem.public_id,
          url: elem.url}
      })
      console.log(imageData)
      const newCategory ={
        nameCate: name,
        avatarCate: imageData,
      }
      await addcategory(newCategory,dispatch);
      setLoaded(!isLoad);
      }
    }
    const handleSubmitUpdate = async ( index) =>{
        let imageData 
        if(!previewSource) {
            imageData = categories[index].avatarCate[0].url
        }
        else {
            imageData = await uploadImage(previewSource)
        console.log(imageData)
        imageData = imageData.map((elem, index)=>{
            return { publicId: elem.public_id,
              url: elem.url}
          })
          console.log(imageData)
          const newCategory ={
            nameCate: name,
            avatarCate: imageData,
          }
          await updatecategory(newCategory,dispatch);
          setLoaded(!isLoad);
          }
        }
    const handleFileInputChange = (e)=>{
        const file = e.target.files[0]
        setMessage("")
        if(previewSource.length > 0) {
          setMessage("Upload tối đa 1 bức ảnh đại diện danh mục")
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
    const deleteImage = async (public_id)=>{
        try{
        console.log(public_id)
        const file = await axios.post("/api/uploads/destroy",{publicId: public_id});
        } catch(err){
            console.error(err)
        }
    }
    const handleDelete = async (index)=>{

        const deletedCategory ={
          _id: categories[index]._id,
        }
        await deleteImage(categories[index].avatarCate[0].publicId)
        await deletecategory(deletedCategory,dispatch);
        setLoaded(!isLoad);
      }
      useEffect(() => {
        getCategory()
      },[isLoad]);
    
    return ( <Admin>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="title text-center py-3">
                        <h2>Danh Sách Danh Mục</h2>
                    </div>
                    <ModalForm title="Thêm Danh Mục" icon="+ Thêm Danh Mục" handleSubmit={handleSubmitAdd}>
                        <div className="formCategory">
                        
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
                    <table className="table categoryList">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Controls</th>
                            </tr>
                        </thead>
                            <tbody>
                                {categories.map((item, index) =>(
                                    <tr className="item" key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="name">{item.nameCate}</td>
                                        <td >{(item.avatarCate[0]) ? <img src={item.avatarCate[0].url } alt="" /> : 'noimg'}</td>
                                        <td className="controls">
                                            <button className="btn btn-primary" onClick={()=>{handleDelete(index)}}><i class="bi bi-trash-fill"></i></button>
                                            <ModalForm title="Chỉnh Sửa Danh Mục" icon={<i class='bi bi-pencil-square'></i>} handleSubmit={handleSubmitUpdate}>      
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="nameCategory">
                                                        <Form.Label>Tên Danh Mục</Form.Label>
                                                        <Form.Control onChange={(e)=>{setName(e.target.value)}} value={name||item.nameCate} type="text" placeholder={item.nameCate} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="imageCategory">
                                                        <Form.Label>Ảnh Danh Mục</Form.Label>
                                                        <Form.Control onChange={(e) => handleFileInputChange(e)} value={fileInput} type="file"/>
                                                        {previewSource &&  previewSource.map((image, index) => {
                                                        return(<img src={image} key={index} style={{height:'50px', width: '50px'}} alt="" /> )
                                                        })}
                                                        <p>{message}</p> 
                                                    </Form.Group>                                 
                                                </Form>                                   
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