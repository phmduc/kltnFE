import Admin from "../../layouts/Admin/Admin.js";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import ModalForm from "../../components/Modal/Modal.js";
import ModalOrder from "../../components/ModalOrder/ModalOrder.js";
import { validation } from "../../js/validation.js";
import {
  addproduct,
  updateproduct,
  deleteproduct,
  deleteImage,
} from "../../Redux/apiRequests.js";
import ReactPaginate from "react-paginate";
import { removeFromCart } from "../../Redux/slice/cartSlice.js";
import React from "react";
import { loading, unLoadding } from "../../Redux/slice/loading.js";
import "./ProductAdmin.css";
import { getAllProduct } from "../../Redux/slice/productSlice.js";
import { Form } from "react-bootstrap";
import { DatePicker, Space } from "antd";

function ProductAdmin() {
  //State
  const [products, setProducts] = useState([]);
  const listCate = useSelector((state) => state.category.category);
  const [isLoad, setLoaded] = useState(false);
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [cate, setCate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);
  const [fileInput, setFileInput] = useState();
  const [imgMessage, setImgMessage] = useState("");
  const [message, setMessage] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [sizeCount, setSizeCount] = useState(0);
  const [sizePrice, setSizePrice] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setendOffset] = useState(6);
  const [currentItems, setCurrent] = useState([]);
  const [history, setHistory] = useState([]);
  const [pageCount, setPageCount] = useState();
  const dispatch = useDispatch();

  //function
  const handlePageClick = (event) => {
    setItemOffset((event.selected * 6) % products.length);
    setendOffset(((event.selected * 6) % products.length) + 6);
    setLoaded(!isLoad);
  };
  async function getProducts() {
    try {
      const response = await axios.get("/api/products");
      dispatch(getAllProduct(response.data));
      setProducts(response.data);
      setCurrent(response.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(response.data.length / 6));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
    dispatch(unLoadding());
  }, [isLoad]);
  const resetInput = async () => {
    setName("");
    setCate("");
    setDesc("");
    setSizeId("");
    setSizeCount(0);
    setSizePrice("");
    setSize([]);
    setPreviewSource([]);
    setFileInput();
  };
  const handleSubmitAdd = async () => {
    if (
      validation.validateName(name) === true &&
      validation.validateCate(cate) === true
    ) {
      if (
        products.find(function (product, index) {
          return product.name === name;
        })
      ) {
        setMessage("S???n ph???m ???? t???n t???i");
      } else {
        if (previewSource.length < 5) {
          setImgMessage("Vui L??ng Nh???p ????? 5 B???c ???nh");
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
          };
          await addproduct(newProduct, dispatch);
          dispatch(unLoadding());
          setLoaded(!isLoad);
          toast.success(`Th??m th??nh c??ng`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      setMessage("Th??ng tin ch??a h???p l???, vui l??ng ki???m tra l???i");
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setMessage("");
    if (previewSource.length > 4) {
      setImgMessage("Nh???p t???i ??a 5 b???c ???nh");
      return;
    } else {
      previewFile(file);
    }
  };
  const updateSize = async (id) => {
    if (sizeId && sizePrice) {
      if (Number(sizePrice) > 0 && Number.isInteger(Number(sizePrice))) {
        await axios.put(`/api/products/size/${id}`, {
          sizeId,
          sizeCount,
          sizePrice,
        });
        toast.success("C???p nh???t th??nh c??ng", {
          position: toast.POSITION.TOP_CENTER,
        });
        resetInput();
        setLoaded(!isLoad);
      } else {
        if (Number(sizePrice) < 0 && Number.isInteger(Number(sizePrice)))
          toast.error(`Gi?? kh??ng h???p l???`, {
            position: toast.POSITION.TOP_CENTER,
          });
      }
    } else {
      toast.error(`Vui l??ng nh???p ?????y ????? th??ng tin`, {
        position: toast.POSITION.TOP_CENTER,
      });
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
  const handleSaveUpdate = async (index) => {
    if (
      validation.validateName(name) === true &&
      validation.validateCate(cate) === true &&
      validation.validateSize(size) === true
    ) {
      if (previewSource.length < 5) {
        setImgMessage("Vui L??ng Nh???p ????? 5 B???c ???nh");
        return false;
      } else {
        dispatch(loading());
        let imageData = await uploadImage(previewSource);
        imageData = imageData.map((elem, index) => {
          return { publicId: elem.public_id, url: elem.url };
        });

        const updatedProduct = {
          _id: ID,
          name: name,
          desc: desc,
          image: imageData,
          idCate: cate,
          size: size,
        };
        currentItems[index].image.forEach((elem, index) => {
          deleteImage(elem.publicId);
        });
        console.log(updatedProduct);
        await updateproduct(updatedProduct, dispatch);
        dispatch(unLoadding());
        toast.success(`Update th??nh c??ng`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoaded(!isLoad);
      }
    } else {
      setMessage("Th??ng tin ch??a h???p l???, vui l??ng ki???m tra l???i");
    }
  };
  const handleDelete = async (index) => {
    const deletedProduct = {
      _id: currentItems[index]._id,
    };
    currentItems[index].image.forEach((elem, index) => {
      deleteImage(elem.publicId);
    });
    await deleteproduct(deletedProduct, dispatch);
    setLoaded(!isLoad);
    toast.success(`X??a th??nh c??ng`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const updatePrepare = async (index) => {
    setID(currentItems[index]._id);
    setName(currentItems[index].name);
    setCate(currentItems[index].idCate);
    setDesc(currentItems[index].desc);
    setSize(currentItems[index].size);
    const promise = currentItems[index].image.map(async (elem, index) => {
      return await convertToBase64(elem.url).then((response) => response);
    });
    let images = await Promise.all(promise);
    setPreviewSource(images);
  };
  const search = async (e) => {
    if (!e.target.value) {
      setLoaded(!isLoad);
    } else {
      setCurrent(
        products.filter((elem, index) => {
          return elem.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
      );
      setPageCount(
        Math.ceil(
          products.filter((elem, index) => {
            return elem.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          }).length / 6
        )
      );
    }
  };
  return (
    <Admin>
      <div className="productManage">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ModalForm
                title="Th??m S???n Ph???m"
                icon="+ Th??m S???n Ph???m"
                size="lg"
                handleSubmit={handleSubmitAdd}
                reset={resetInput}
              >
                <div className="formProduct">
                  {!message || <span className="message">{message}</span>}
                  <form>
                    <div className="group-flex d-flex flex-wrap">
                      <div className="form-group">
                        <label htmlFor="nameProduct">T??n s???n ph???m</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          className="form-control"
                          id="nameProduct"
                          placeholder="Nh???p t??n s???n ph???m"
                        />
                        {validation.validateName(name) || (
                          <span className="message">
                            {validation.validateName(name)}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cate">Danh M???c</label>
                        <Form.Select
                          onChange={(e) => setCate(e.target.value)}
                          value={cate}
                        >
                          <option value={0}>Ch???n danh m???c...</option>
                          {listCate.map((elem, index) => {
                            return (
                              <option key={index} value={elem._id}>
                                {elem.nameCate}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {validation.validateCate(cate) || (
                          <span className="message">
                            {validation.validateCate(cate)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>???nh s???n ph???m</label>
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
                        + Th??m ???nh
                      </label>
                    </div>

                    <div className="form-group">
                      <label htmlFor="descProduct">M?? t???</label>
                      <textarea
                        class="form-control"
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
              </ModalForm>
              <input
                type="text"
                className="form-control my-3"
                placeholder="Nh???p t??n s???n ph???m "
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onChange={(e) => {
                  search(e);
                }}
              />
              <table className="table  table-hover  productList">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">T??n s???n ph???m</th>
                    <th scope="col">H??nh ???nh</th>
                    <th scope="col" className="text-center">
                      M?? t???
                    </th>
                    <th scope="col" className="text-center">
                      H??ng
                    </th>
                    {/* <th scope="col">Size - S??? l?????ng</th> */}
                    <th scope="col" className="text-center">
                      T??y ch???n
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {currentItems.map((item, index) => (
                    <tr className="item" key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td className="name">{item.name}</td>
                      <td className="img-wrap">
                        <img className="img" src={item.image[0].url} alt="" />
                      </td>
                      <td className="desc">
                        <span>{item.desc}</span>
                      </td>
                      <td className="cate text-center">
                        {listCate.map((elem, index) => {
                          if (elem._id === item.idCate) {
                            return elem.nameCate;
                          }
                        })}
                      </td>

                      <td className="controls">
                        <button
                          className="btn w-100"
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                        <ModalForm
                          title="Ch???nh S???a S???n Ph???m"
                          icon={<i className="bi bi-pencil-square"></i>}
                          reset={resetInput}
                          size="lg"
                          prepare={() => {
                            updatePrepare(index);
                          }}
                          handleSubmit={() => {
                            handleSaveUpdate(index);
                          }}
                        >
                          <div className="formProduct">
                            {!message || (
                              <span className="message">{message}</span>
                            )}
                            <form>
                              <div className="group-flex d-flex flex-wrap">
                                <div className="form-group">
                                  <label htmlFor="nameProduct">
                                    T??n s???n ph???m
                                  </label>
                                  <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="nameProduct"
                                    placeholder="Nh???p t??n s???n ph???m"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="cate">Danh M???c</label>
                                  <Form.Select
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setCate(e.target.value);
                                    }}
                                    value={cate}
                                  >
                                    <option>Ch???n danh m???c...</option>
                                    {listCate.map((elem, index) => {
                                      return (
                                        <option key={index} value={elem._id}>
                                          {elem.nameCate}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label>???nh s???n ph???m</label>
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
                                        <div
                                          key={index}
                                          className="item img-wrap"
                                        >
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
                                <label
                                  className="fileLabel"
                                  htmlFor="fileProduct"
                                >
                                  + Th??m ???nh
                                </label>
                              </div>

                              <div className="form-group">
                                <label htmlFor="descProduct">M?? t???</label>
                                <textarea
                                  class="form-control"
                                  value={desc}
                                  onChange={(e) => {
                                    setDesc(e.target.value);
                                  }}
                                />
                              </div>
                            </form>
                          </div>
                        </ModalForm>
                        <ModalOrder
                          size="lg"
                          title="S???n ph???m trong kho"
                          icon="Kho"
                        >
                          <ModalOrder
                            size="lg"
                            title="L???ch s??? nh???p xu???t"
                            icon="L???ch s??? nh???p xu???t"
                          >
                            <div className="pickDate d-flex align-items-center">
                              <div className="from">
                                T???:
                                <input
                                  type="date"
                                  className="mx-2"
                                  onChange={(e) => {
                                    setFrom(e.target.value);
                                  }}
                                ></input>
                              </div>
                              <div className="to mx-2">
                                ?????n:
                                <input
                                  type="date"
                                  className="mx-2"
                                  onChange={(e) => {
                                    setTo(e.target.value);
                                  }}
                                ></input>
                              </div>
                              <button
                                className="btn mx-2"
                                onClick={() => {
                                  if (!from || !to) {
                                    toast.error(
                                      `Vui l??ng nh???p ng??y b???t ?????u v?? k???t th??c`,
                                      {
                                        position: toast.POSITION.TOP_CENTER,
                                      }
                                    );
                                  } else {
                                    if (
                                      Number(new Date(from)) >
                                      Number(new Date(to))
                                    ) {
                                      toast.error(`Ng??y kh??ng h???p l??? `, {
                                        position: toast.POSITION.TOP_CENTER,
                                      });
                                    } else {
                                      const showHistory =
                                        item.historyUpdate.filter((elem) => {
                                          const elemDate = Number(
                                            new Date(
                                              elem.date
                                                .split("@")[0]
                                                .split("/")[2]
                                                .trim() +
                                                "-" +
                                                elem.date
                                                  .split("@")[0]
                                                  .split("/")[1] +
                                                "-" +
                                                elem.date
                                                  .split("@")[0]
                                                  .split("/")[0]
                                            )
                                          );
                                          return (
                                            elemDate >=
                                              Number(new Date(from)) &&
                                            elemDate <= Number(new Date(to))
                                          );
                                        });
                                      setHistory(showHistory);
                                    }
                                  }
                                }}
                              >
                                Ch???n
                              </button>
                            </div>
                            <div class="tableHistory my-3 ">
                              {history.length !== 0 ? (
                                history.map((elem, index) => {
                                  return (
                                    <div key={index} className="item">
                                      <div className="top d-flex ">
                                        <div className="info">
                                          Ng??y: <span>{elem.date}</span>
                                        </div>
                                        <div className="info">
                                          Tr???ng th??i:
                                          <span>
                                            {elem.status === 0
                                              ? "Xu???t"
                                              : elem.status === 1
                                              ? "Nh???p"
                                              : elem.status === 4
                                              ? "X??a"
                                              : "Th??m"}
                                          </span>
                                        </div>
                                        <div className="info">
                                          Size: <span>{elem.sizeId}</span>
                                        </div>
                                      </div>

                                      <div className="body d-flex mt-2">
                                        {elem.number ? (
                                          <React.Fragment>
                                            <div className="info">
                                              S??? l?????ng:
                                              <span>{elem.number}</span>
                                            </div>
                                            <div className="info">
                                              T???n kho c??:
                                              <span>{elem.oldCount}</span>
                                            </div>
                                            <div className="info">
                                              T???n kho m???i:
                                              <span>{elem.newCount}</span>
                                            </div>
                                            <div className="info">
                                              Chi ti???t:
                                              {elem.fromOrder !== undefined ? (
                                                <span>
                                                  T??? h??a ????n {elem.fromOrder}
                                                </span>
                                              ) : (
                                                <span>Tr???c ti???p t??? kho</span>
                                              )}
                                            </div>
                                          </React.Fragment>
                                        ) : null}
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="message text-center">
                                  Ch??a c?? l???ch s???
                                </div>
                              )}
                            </div>
                          </ModalOrder>
                          <table class="table">
                            <thead>
                              <tr>
                                <th className="text-center" scope="col">
                                  Size
                                </th>
                                <th className="text-center" scope="col">
                                  Status
                                </th>
                                <th className="text-center" scope="col">
                                  Count
                                </th>
                                <th className="text-center" scope="col">
                                  Price
                                </th>
                                <th className="text-center" scope="col">
                                  Control
                                </th>
                              </tr>
                            </thead>
                            <tbody className="size">
                              {item.size.map((size) => (
                                <tr>
                                  <th className="text-center" scope="row">
                                    {size.sizeId}
                                  </th>
                                  <td className="text-center">
                                    {size.count > 0 ? "C??n h??ng" : "H???t h??ng"}
                                  </td>
                                  <td className="text-center">
                                    <div className="countAtt d-flex align-items-center justify-content-center">
                                      {size.count}{" "}
                                      <ModalForm
                                        title="Ch???nh S???a S??? L?????ng"
                                        icon={
                                          <i className="bi bi-pencil-square"></i>
                                        }
                                        button="w-100"
                                        reset={resetInput}
                                        size="md"
                                        handleSubmit={async () => {
                                          if (
                                            Number.isInteger(Number(sizeCount))
                                          ) {
                                            if (sizeCount > 0) {
                                              await axios.put(
                                                `/api/products/updateqtt/${item._id}`,
                                                {
                                                  sizeId: sizeId,
                                                  count: size.count - sizeCount,
                                                }
                                              );
                                              toast.success(
                                                "C???p nh???t th??nh c??ng",
                                                {
                                                  position:
                                                    toast.POSITION.TOP_CENTER,
                                                }
                                              );
                                              setLoaded(!isLoad);
                                            } else {
                                              toast.error(
                                                "S??? l?????ng kh??ng h???p l???",
                                                {
                                                  position:
                                                    toast.POSITION.TOP_CENTER,
                                                }
                                              );
                                            }
                                          } else {
                                            toast.error(
                                              "S??? l?????ng kh??ng h???p l???",
                                              {
                                                position:
                                                  toast.POSITION.TOP_CENTER,
                                              }
                                            );
                                          }
                                        }}
                                        prepare={() => {
                                          setSizeId(size.sizeId);
                                          setSizeCount(size.count);
                                        }}
                                      >
                                        <div className="sizeTitle mb-4">
                                          Size: {size.sizeId}
                                        </div>
                                        <form className="updateSizeForm">
                                          <div className="form-group d-flex mb-2">
                                            <label htmlFor="">S??? l?????ng: </label>
                                            <input
                                              type="text"
                                              value={sizeCount}
                                              onChange={(e) => {
                                                setSizeCount(e.target.value);
                                              }}
                                            />
                                          </div>
                                        </form>
                                      </ModalForm>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className="priceAtt align-items-center d-flex justify-content-center">
                                      {size.price}
                                      <ModalForm
                                        title="Ch???nh S???a Gi??"
                                        icon={
                                          <i className="bi bi-pencil-square"></i>
                                        }
                                        button="w-100"
                                        reset={resetInput}
                                        size="md"
                                        handleSubmit={() => {
                                          updateSize(item._id);
                                        }}
                                        prepare={() => {
                                          setSizeId(size.sizeId);
                                          setSizePrice(size.price);
                                        }}
                                      >
                                        <div className="sizeTitle mb-4">
                                          Size: {size.sizeId}
                                        </div>
                                        <form className="updateSizeForm">
                                          <div className="form-group d-flex">
                                            <label htmlFor="">Gi??: </label>
                                            <input
                                              type="text"
                                              value={sizePrice}
                                              onChange={(e) => {
                                                setSizePrice(e.target.value);
                                              }}
                                            />
                                          </div>
                                        </form>
                                      </ModalForm>
                                    </div>
                                  </td>
                                  <td className="text-center ">
                                    <button
                                      className="btn w-100 mb-2"
                                      onClick={async () => {
                                        await axios.put(
                                          `/api/products/size/delete/${item._id}`,
                                          { sizeId: size.sizeId }
                                        );
                                        toast.success(`X??a th??nh c??ng`, {
                                          position: toast.POSITION.TOP_CENTER,
                                        });
                                        dispatch(
                                          removeFromCart({
                                            ID: item._id,
                                            size: size.sizeId,
                                          })
                                        );

                                        setLoaded(!isLoad);
                                      }}
                                    >
                                      X??a
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <span className="title">{"Th??m size"}</span>
                          <form className="d-flex sizeForm">
                            <div className="form-group">
                              <input
                                placeholder="M?? size"
                                type="text"
                                value={sizeId}
                                onChange={(e) => {
                                  setSizeId(e.target.value);
                                }}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                placeholder="Gi??"
                                type="text"
                                className="form-control"
                                value={sizePrice}
                                onChange={(e) => {
                                  setSizePrice(e.target.value);
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                if (
                                  item.size.some((elem) => {
                                    return elem.sizeId === sizeId;
                                  })
                                ) {
                                  toast.error(`Size ???? t???n t???i`, {
                                    position: toast.POSITION.TOP_CENTER,
                                  });
                                } else updateSize(item._id);
                              }}
                            >
                              Th??m
                            </button>
                          </form>
                        </ModalOrder>
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
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default ProductAdmin;
