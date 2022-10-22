import Admin from "../../layouts/Admin/Admin.js";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalForm from "../../components/Modal/Modal.js";
import { validation } from "../../js/validation.js";
import {
  addproduct,
  updateproduct,
  deleteproduct,
} from "../../Redux/apiRequests.js";
import MainLayout from "../../layouts/MainLayout/MainLayout.js";
import "./ProductAdmin.css";
import { getAllProduct } from "../../Redux/slice/productSlice.js";
import { Form, Button } from "react-bootstrap";
function ProductAdmin() {
  const listCate = useSelector((state) => state.category.category);
  const [isLoad, setLoaded] = useState(false);
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
  const dispatch = useDispatch();

  async function getProducts() {
    try {
      const response = await axios.get("/api/products");
      dispatch(getAllProduct(response.data));
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmitAdd = async () => {
    if (
      validation.validateName(name) &&
      validation.validateCate(cate) &&
      validation.validatePrice(price) &&
      validation.validateSize(size)
    ) {
      if (previewSource.length < 5) {
        setMessage("Vui Lòng Nhập Đủ 5 Bức Ảnh");
      } else {
        let imageData = await uploadImage(previewSource);
        imageData = imageData.map((elem, index) => {
          return { publicId: elem.public_id, url: elem.url };
        });
        const newProduct = {
          name: name,
          desc: desc,
          image: imageData,
          cate: {
            idCate: listCate[cate]._id,
            nameCate: listCate[cate].nameCate,
          },
          price: price,
          size: size,
        };

        await addproduct(newProduct, dispatch);
        setLoaded(!isLoad);
      }
    }
  };
  const updatePrepare = (index) => {
    setID(products[index]._id);
    setName(products[index].name);
    setDesc(products[index].desc);
    setImage(products[index].image);
    setPrice(products[index].price);
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setMessage("");
    if (previewSource.length > 4) {
      return;
    } else {
      previewFile(file);
    }
  };
  const previewSize = () => {
    const sizeInput = inputSize.current.value;
    const countInput = Number(inputCount.current.value);
    console.log(typeof countInput);
    if (sizeInput && countInput) {
      if (inputCount.current.value > 0 && Number.isInteger(countInput)) {
        setSize([...size, { sizeId: sizeInput, count: countInput }]);
        inputSize.current.value = "";
        inputCount.current.value = "";
      } else {
        inputCount.current.value = "Không Hợp Lệ";
      }
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([...previewSource, reader.result]);
    };
  };
  const uploadImage = async (base64EncodedImage) => {
    let file;
    try {
      file = await axios.post("/api/uploads", { file: base64EncodedImage });
      return file.data;
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveUpdate = async () => {
    const updatedProduct = {
      _id: ID,
      name: name,
      desc: desc,
      image: image,
      price: price,
    };
    await updateproduct(updatedProduct, dispatch);
    setLoaded(!isLoad);
  };
  const handleDelete = async (index) => {
    const deletedProduct = {
      _id: products[index]._id,
    };
    await deleteproduct(deletedProduct, dispatch);
    setLoaded(!isLoad);
  };
  return (
    <Admin>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ModalForm
              title="Thêm Sản Phẩm"
              icon="+ Thêm Sản Phẩm"
              handleSubmit={handleSubmitAdd}
            >
              <div className="form">
                <Form>
                  <Form.Group className="mb-3" controlId="nameProduct">
                    <Form.Label>Tên Sản Phẩm</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name || ""}
                      type="text"
                      placeholder="Tên sản phẩm"
                    />
                    {validation.validateName(name) !== true ? (
                      <p className="message">{validation.validateName(name)}</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="imageProduct">
                    <Form.Label>Ảnh Sản Phẩm (Tối đa 5 bức)</Form.Label>
                    <Form.Control
                      className="custom-file-input"
                      id="imageInputProduct"
                      onChange={(e) => handleFileInputChange(e)}
                      value={fileInput}
                      type="file"
                    />
                    <label class="inputButton" htmlFor="imageInputProduct">
                      + Thêm ảnh
                    </label>
                    {validation.validateImage(previewSource) !== true ? (
                      <p className="message">
                        {validation.validateImage(previewSource)}
                      </p>
                    ) : null}
                    <div className="listPreview d-flex">
                      {previewSource &&
                        previewSource.map((image, index) => {
                          return (
                            <div key={index} className="item">
                              <div className="img-wrap">
                                <img src={image} alt="" />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    previewSource.splice(index, 1);
                                    setLoaded(!isLoad);
                                  }}
                                ></button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="descProduct">
                    <Form.Label>Mô Tả</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      value={desc || ""}
                      type="text"
                      placeholder="Thêm mô tả"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="descProduct">
                    <Form.Label>Tên Danh Mục</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setCate(e.target.value);
                      }}
                    >
                      <option value="novalue">Chọn Danh Mục</option>
                      {listCate.map((cate, index) => (
                        <option key={index} value={index}>
                          {cate.nameCate}
                        </option>
                      ))}
                    </Form.Select>
                    {validation.validateCate(cate) !== true ? (
                      <p className="message">{validation.validateCate(cate)}</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="sizeProduct">
                    <Form.Label>Size</Form.Label>

                    <div className="d-flex input-size ">
                      <Form.Control
                        ref={inputSize}
                        type="text"
                        placeholder="Enter Size"
                      />
                      <Form.Control
                        ref={inputCount}
                        type="text"
                        placeholder="Enter Count"
                      />
                    </div>
                    {validation.validateSize(size) !== true ? (
                      <p className="message">{validation.validateSize(size)}</p>
                    ) : null}
                    {size.map((elem, index) => {
                      return (
                        <div
                          className="sizewrap"
                          key={index}
                          style={{ display: "flex" }}
                        >
                          <p>Size: {elem.sizeId} - </p>
                          <p> {elem.count} Đôi</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              size.splice(index, 1);
                              setLoaded(!isLoad);
                            }}
                          ></button>
                        </div>
                      );
                    })}
                    <Button
                      className="my-2"
                      onClick={() => {
                        previewSize();
                      }}
                    >
                      Add Size
                    </Button>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="priceProduct">
                    <Form.Label>Giá Sản Phẩm</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      value={price || ""}
                      type="text"
                      placeholder="Enter Product Price"
                    />
                    {validation.validatePrice(price) !== true ? (
                      <p className="message">
                        {validation.validatePrice(price)}
                      </p>
                    ) : null}
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
                {products.map((item, index) => (
                  <tr className="item" key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td className="name">{item.name}</td>
                    <td className="img-wrap">
                      <img src={item.image[0].url} alt="" />
                    </td>
                    <td className="price">{item.price}</td>
                    <td className="description">{item.desc}</td>
                    <td className="cate">{item.Cate.nameCate}</td>
                    <td className="size">
                      {item.size.map(
                        (size, index) =>
                          `Size ${size.sizeId} - ${size.count} Đôi`
                      )}
                    </td>
                    <td className="delete">
                      <button
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        delete
                      </button>
                      <ModalForm title="Edit" icon=""></ModalForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default ProductAdmin;
