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
import { loading, unLoadding } from "../../Redux/slice/loading.js";
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
  const [imgMessage, setImgMessage] = useState("");
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
    dispatch(unLoadding());
  }, [isLoad]);

  const handleSubmitAdd = async () => {
    if (
      validation.validateName(name) === true &&
      validation.validateCate(cate) === true &&
      validation.validatePrice(price) === true &&
      validation.validateSize(size) === true
    ) {
      if (
        products.find(function (product, index) {
          return product.name === name;
        })
      ) {
        setMessage("Sản phẩm đã tồn tại");
      } else {
        if (previewSource.length < 5) {
          setImgMessage("Vui Lòng Nhập Đủ 5 Bức Ảnh");
          return false;
        } else {
          dispatch(loading());
          let imageData = await uploadImage(previewSource);
          imageData = imageData.map((elem, index) => {
            return { publicId: elem.public_id, url: elem.url };
          });
          const newProduct = {
            name: name,
            desc: desc,
            image: imageData,
            idCate: cate,
            price: price,
            size: size,
          };

          await addproduct(newProduct, dispatch);
          dispatch(unLoadding());
          setLoaded(!isLoad);
        }
      }
    } else {
      setMessage("Thông tin chưa hợp lệ");
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
      setImgMessage("Nhập tối đa 5 bức ảnh");
      return;
    } else {
      previewFile(file);
    }
  };
  const previewSize = () => {
    if (inputSize.current.value && inputCount.current.value) {
      if (
        Number(inputCount.current.value) > 0 &&
        Number.isInteger(Number(inputCount.current.value))
      ) {
        setSize([
          ...size,
          { sizeId: inputSize.current.value, count: inputCount.current.value },
        ]);
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
      <div className="productManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ModalForm
                title="Thêm Sản Phẩm"
                icon="+ Thêm Sản Phẩm"
                handleSubmit={handleSubmitAdd}
              >
                <div className="formProduct">
                  {!message || <span className="message">{message}</span>}
                  <form>
                    <div className="form-group">
                      <label htmlFor="nameProduct">Tên sản phẩm</label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="form-control"
                        id="nameProduct"
                        placeholder="Nhập tên sản phẩm"
                      />
                    </div>
                    <div className="group-flex d-flex">
                      <div className="form-group">
                        <label htmlFor="cate">Danh Mục</label>
                        <Form.Select
                          onChange={(e) => setCate(e.target.value)}
                          value={cate}
                        >
                          <option>Chọn danh mục...</option>
                          {listCate.map((elem, index) => {
                            return (
                              <option key={index} value={elem._id}>
                                {elem.nameCate}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="priceProduct">Giá sản phẩm</label>
                        <input
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                          type="text"
                          className="form-control"
                          id="priceProduct"
                          placeholder="Nhập giá sản phẩm"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input
                        type="file"
                        onChange={(e) => handleFileInputChange(e)}
                        value={fileInput}
                        id="fileProduct"
                      />
                      <div className="listPreview d-flex">
                        {!previewSource ||
                          previewSource.map((image, index) => {
                            return (
                              <div key={index} className="item img-wrap">
                                <img src={image} alt="" />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    previewSource.splice(index, 1);
                                    setFileInput([]);
                                    setLoaded(!isLoad);
                                  }}
                                >
                                  X
                                </button>
                              </div>
                            );
                          })}
                      </div>

                      <label className="fileLabel" htmlFor="fileProduct">
                        + Thêm Ảnh
                      </label>
                    </div>
                    <div className="group-flex d-flex flex-wrap">
                      <div className="form-group">
                        <label htmlFor="sizeProduct">Size</label>
                        <input
                          ref={inputSize}
                          type="text"
                          className="form-control"
                          id="sizeProduct"
                          placeholder="Nhập size"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="countProduct">Số lượng</label>
                        <input
                          ref={inputCount}
                          type="text"
                          className="form-control"
                          id="countProduct"
                          placeholder="Nhập số lượng"
                        />
                      </div>
                      <button
                        type="button"
                        className="addsize btn mt-2"
                        onClick={() => {
                          previewSize();
                        }}
                      >
                        Thêm size
                      </button>

                      <div className="sizePreview mt-2 ">
                        {!size ||
                          size.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="sizewrap d-flex justify-content-between align-items-center"
                              >
                                <span>Size: {item.sizeId} </span>
                                <span>Số lượng: {item.count} </span>

                                <button
                                  className="btn"
                                  type="button"
                                  onClick={(e) => {
                                    size.splice(index, 1);
                                    setFileInput([]);
                                    setLoaded(!isLoad);
                                  }}
                                >
                                  X
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="descProduct">Mô tả</label>
                      <textarea
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        type="text"
                        className="form-control"
                        id="descProduct"
                        placeholder="Nhập mô tả"
                      />
                    </div>
                  </form>
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
                      <td className="price">{item.price}đ</td>
                      <td className="description">{item.desc}</td>
                      <td className="cate">
                        {listCate.map((elem, index) => {
                          if (elem._id === item.idCate) {
                            return elem.nameCate;
                          }
                        })}
                      </td>
                      <td className="size">
                        {item.size.map(
                          (size, index) =>
                            `Size ${size.sizeId} - ${size.count} Đôi`
                        )}
                      </td>
                      <td className="controls">
                        <button
                          className="btn"
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                        <ModalForm
                          title="Chỉnh Sửa Sản Phẩm"
                          icon={<i className="bi bi-pencil-square"></i>}
                          handleSubmit={() => {}}
                        >
                          <div className="formProduct"></div>
                        </ModalForm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default ProductAdmin;
