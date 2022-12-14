import Admin from "../../layouts/Admin/Admin.js";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ModalForm from "../../components/Modal/Modal.js";
import ReactPaginate from "react-paginate";

import "./CategoryAdmin.css";
import { toast } from "react-toastify";
import {
  addcategory,
  deletecategory,
  updatecategory,
  deleteImage,
} from "../../Redux/apiRequests.js";
import { getAllCategory } from "../../Redux/slice/categorySlice.js";
import { Form, Button } from "react-bootstrap";
import { loading, unLoadding } from "../../Redux/slice/loading.js";
function CategoryAdmin() {
  const products = useSelector((state) => state.product.productsList);
  const [categories, setCategory] = useState([]);
  const [name, setName] = useState();
  const [isLoad, setLoaded] = useState(false);
  const [previewSource, setPreviewSource] = useState([]);
  const [fileInput, setFileInput] = useState();
  const [message, setMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setendOffset] = useState(6);
  const [currentItems, setCurrent] = useState([]);
  const [pageCount, setPageCount] = useState();

  // let currentItems = hasResult
  //   ? result.slice(itemOffset, endOffset)
  //   : categories.slice(itemOffset, endOffset);
  // let pageCount = Math.ceil(
  //   hasResult ? result.length / 6 : categories.length / 6
  // );
  const handlePageClick = (event) => {
    setItemOffset((event.selected * 6) % categories.length);
    setendOffset(((event.selected * 6) % categories.length) + 6);
    setLoaded(!isLoad);
  };
  useEffect(() => {
    getCategory();
    setName();
    setFileInput();
  }, [isLoad]);
  const dispatch = useDispatch();
  async function getCategory() {
    try {
      const response = await axios.get("/api/category");
      dispatch(getAllCategory(response.data));
      setCategory(response.data);
      setCurrent(response.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(response.data.length / 6));
    } catch (error) {
      console.error(error);
    }
  }

  //CRUD
  const handleSubmitAdd = async () => {
    if (!name) {
      setNameMessage("Tên danh mục không được bỏ trống");
    }
    if (previewSource.length === 0) {
      setMessage("Upload ít nhất 1 bức ảnh của danh mục");
    } else {
      dispatch(loading());
      let imageData = await uploadImage(previewSource);
      imageData = imageData.map((elem, index) => {
        return { publicId: elem.public_id, url: elem.url };
      });
      const newCategory = {
        nameCate: name,
        avatarCate: imageData,
      };
      await addcategory(newCategory, dispatch);
      dispatch(unLoadding());
      setPreviewSource([]);
      setLoaded(!isLoad);
      toast.success(`Thêm thành công`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const resetInput = async () => {
    setName();
    setPreviewSource([]);
    setFileInput();
  };
  const handleSubmitUpdate = async (index) => {
    let imageData;
    let newName;
    if (previewSource.length === 0) {
      imageData = currentItems[index].avatarCate;
      console.log(imageData);
    } else {
      deleteImage(currentItems[index].avatarCate[0].publicId);
      imageData = await uploadImage(previewSource);
      imageData = imageData.map((elem, index) => {
        return { publicId: elem.public_id, url: elem.url };
      });
    }
    if (!name) {
      newName = currentItems[index].nameCate;
    }
    const newCategory = {
      _id: currentItems[index]._id,
      nameCate: name || newName,
      avatarCate: imageData,
    };
    await updatecategory(newCategory, dispatch);
    setPreviewSource([]);
    setLoaded(!isLoad);
    toast.success(`Update thành công`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setMessage("");
    if (previewSource.length > 0) {
      setMessage("Upload tối đa 1 bức ảnh đại diện danh mục");
    } else {
      previewFile(file);
      setFileInput([]);
    }
  };
  const convertToBase64 = (url) => {
    return fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        return new Promise(function (resolve) {
          var reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        });
      });
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
  const handleDelete = async (index) => {
    const deletedCategory = {
      _id: currentItems[index]._id,
    };
    if (
      products.some((elem) => {
        return elem.idCate === currentItems[index]._id;
      })
    ) {
      toast.error(`Xóa thất bại, danh mục còn sản phẩm`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      Promise.all([
        await deleteImage(currentItems[index].avatarCate[0].publicId),
        await deletecategory(deletedCategory, dispatch),
      ]);
      setLoaded(!isLoad);
      toast.success(`Xóa thành công`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const updatePrepare = async (index) => {
    setName(currentItems[index].idCate);
    const promise = currentItems[index].image.map(async (elem, index) => {
      return await convertToBase64(elem.url).then((response) => response);
    });
    let images = await Promise.all(promise);
    setPreviewSource(images);
  };
  //End CRUD
  const search = async (e) => {
    if (!e.target.value) {
      setLoaded(!isLoad);
    } else {
      setCurrent(
        categories.filter((elem, index) => {
          return elem.nameCate
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
      );
      setPageCount(
        Math.ceil(
          categories.filter((elem, index) => {
            return elem.nameCate
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          }).length / 6
        )
      );
    }
  };
  return (
    <Admin>
      <div className="categoryManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ModalForm
                title="Thêm Danh Mục"
                icon="+ Thêm Danh Mục"
                size="md"
                handleSubmit={handleSubmitAdd}
                reset={resetInput}
              >
                <div className="formCategory">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên Danh Mục</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setNameMessage();
                          setName(e.target.value);
                        }}
                        value={name || ""}
                        type="text"
                        placeholder="Tên danh mục"
                      />
                      <span className="message">{nameMessage}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ảnh Danh Mục</Form.Label>
                      <Form.Control
                        id="imageInput"
                        className="custom-file-input"
                        onChange={(e) => {
                          handleFileInputChange(e);
                          setMessage();
                        }}
                        value={fileInput}
                        type="file"
                      />
                      <label class="inputButton" htmlFor="imageInput">
                        + Thêm ảnh
                      </label>
                      <div className="listPreview d-flex">
                        {previewSource &&
                          previewSource.map((image, index) => {
                            return (
                              <div key={index} className="image">
                                <div className="img-wrap">
                                  <img src={image} alt="" />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <span className="message">{message}</span>
                    </Form.Group>
                  </Form>
                </div>
              </ModalForm>
              <input
                type="text"
                className="form-control my-3"
                placeholder="Nhập tên hoặc id sản phẩm"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onChange={(e) => {
                  // setInputSearch(e.target.value);
                  search(e);
                }}
              />
              <div class="content table-responsive table-full-width">
                <table className="table categoryList table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr className="item" key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td className="name">{item.nameCate}</td>
                        <td>
                          {item.avatarCate[0] ? (
                            <img src={item.avatarCate[0].url} alt="" />
                          ) : (
                            "noimg"
                          )}
                        </td>
                        <td className="controls">
                          <button
                            className="btn btn-primary mb-2"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                          <ModalForm
                            title="Chỉnh Sửa Danh Mục"
                            size="md"
                            reset={resetInput}
                            prepare={() => {
                              updatePrepare(index);
                            }}
                            icon={<i className="bi bi-pencil-square"></i>}
                            handleSubmit={() => {
                              handleSubmitUpdate(index);
                            }}
                          >
                            <div className="formCategory">
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>Tên Danh Mục</Form.Label>
                                  <Form.Control
                                    onChange={(e) => {
                                      setName(e.target.value);
                                    }}
                                    value={name}
                                    type="text"
                                    placeholder={item.nameCate}
                                  />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Ảnh Danh Mục</Form.Label>
                                  <Form.Control
                                    onChange={(e) => handleFileInputChange(e)}
                                    value={fileInput}
                                    type="file"
                                  />
                                  <div className="listPreview d-flex">
                                    {previewSource.length !== 0 ? (
                                      previewSource.map((image, index) => {
                                        return (
                                          <div key={index} className="image">
                                            <div className="img-wrap">
                                              <img src={image} alt="" />
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div className="image">
                                        <div className="img-wrap">
                                          <img
                                            src={item.avatarCate[0].url}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <p>{message}</p>
                                </Form.Group>
                              </Form>
                            </div>
                          </ModalForm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default CategoryAdmin;
