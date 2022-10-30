import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../layouts/MainLayout/MainLayout.js";
import "./Products.css";
import { getAllProduct } from "../../Redux/slice/productSlice.js";
import { Form } from "react-bootstrap";
import ReactSlider from "react-slider";
import ProductCard from "../../components/ProductCard/ProductCard.js";
import { enableMapSet } from "immer";
function Products() {
  const listCate = useSelector((state) => state.category.category);
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);

  const [cate, setCate] = useState();
  const [size, setSize] = useState();
  const inputCate = useRef(false);
  const inputSize = useRef(false);
  const inputPriceMin = useRef(0);
  const inputPriceMax = useRef(0);

  const [isLoad, setLoad] = useState([]);
  var listsize = [];

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

  const filter = () => {
    let filterList = products;
    if (inputSize.current.value !== "0") {
      filterList = filterList.filter((elem, index) => {
        return elem.size.some(function (item, index) {
          return item.sizeId === inputSize.current.value;
        });
      });
    }
    if (inputCate.current.value !== "0") {
      filterList = filterList.filter((elem, index) => {
        return elem.idCate === inputCate.current.value;
      });
    }
    if (inputPriceMin.current.value) {
      filterList = filterList.filter((elem, index) => {
        return elem.size.some(function (item, index) {
          return item.price > inputPriceMin.current.value;
        });
      });
    }
    if (inputPriceMax.current.value) {
      filterList = filterList.filter((elem, index) => {
        return elem.size.some(function (item, index) {
          return item.price < inputPriceMax.current.value;
        });
      });
    }
    setProductsFilter(filterList);
  };
  useEffect(() => {
    getProducts();
  }, [isLoad]);

  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="siteBar">
              {" "}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="category">Danh mục</Form.Label>
                  <Form.Select
                    ref={inputCate}
                    // onChange={(e) => {
                    //   const filterList = products.filter((elem, index) => {
                    //     return elem.idCate === e.target.value;
                    //   });
                    //   setProductsFilter(filterList);
                    // }}
                    value={cate}
                    id="category"
                  >
                    <option value="0">Chọn danh mục</option>
                    {listCate.map((elem, index) => {
                      return (
                        <option key={index} value={elem._id}>
                          {elem.nameCate}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="size">Size</Form.Label>
                  <Form.Select
                    ref={inputSize}
                    // onChange={(e) => {
                    //   const filterList = products.filter((elem, index) => {
                    //     return elem.size.some(function (item, index) {
                    //       return item.sizeId === e.target.value;
                    //     });
                    //   });
                    //   setProductsFilter(filterList);
                    // }}
                    value={size}
                    id="size"
                  >
                    <option value="0">Chọn size</option>
                    {products.map((elem, index) => {
                      return elem.size.map((value, index) => {
                        if (
                          !listsize.find(function (item, index) {
                            return item === value.sizeId;
                          })
                        ) {
                          listsize = [...listsize, value.sizeId];
                          return (
                            <option key={index} value={value.sizeId}>
                              {value.sizeId}
                            </option>
                          );
                        }
                      });
                    })}
                  </Form.Select>
                </Form.Group>
                <div className="priceFilter d-flex">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Giá thấp nhất</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Giá cao nhất</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    filter();
                  }}
                  className="filter btn w-100"
                >
                  Lọc
                </button>
              </Form>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="list">
              <div className="row">
                {productsFilter.length === 0
                  ? products.map((item, index) => (
                      <div className="col-lg-4">
                        <ProductCard item={item} />
                      </div>
                    ))
                  : productsFilter.map((item, index) => (
                      <div className="col-lg-4">
                        <ProductCard item={item} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Products;
