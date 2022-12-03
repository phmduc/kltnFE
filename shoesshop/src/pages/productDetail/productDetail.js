import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/slice/cartSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import { toast } from 'react-toastify';
import { Fancybox, Carousel } from '@fancyapps/ui/dist/fancybox.esm.js';
import '@fancyapps/ui/dist/fancybox.css';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import $ from 'jquery';
import './productDetail.css';
import { Rate } from 'antd';

function ProductDetail({ match }) {
  const listCart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const [item, setItem] = useState();
  const [error, setError] = useState('');
  const [count, setCount] = useState(1);
  const path = useLocation().pathname.split('/');
  const ID = path[path.length - 1];
  // const voteData = item.voting;
  async function getProductDetail() {
    try {
      const response = await axios.get(`/api/products/${ID}`);
      setItem(response.data);
      console.log(item?.voting.starVote);
      // console.log(response.data.voting);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  useEffect(() => {
    getProductDetail();
  }, [ID]);
  // console.log('cc:', voteData);
  console.log('item:', item?.voting);

  const handleAddCart = () => {
    const size = $('.size .nav-link.active').html();
    let countInStock;
    item.size.map((item) => {
      if (size === item.sizeId) {
        countInStock = item.count;
      }
    });
    if (count <= countInStock) {
      const itemAdd = {
        ID: item._id,
        size: size,
        count: count,
      };
      dispatch(addToCart(itemAdd));
      toast.success(`Thêm thành công`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(
        `Vượt quá số lượng trong kho, Hiện tại còn ${countInStock} Sản phẩm`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    if (count === 0) {
      toast.error(`Vui lòng nhập số lượng`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <MainLayout>
      {item === undefined ? (
        <p>{error}</p>
      ) : (
        <div className='product'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-7'>
                <div className='previewImg'>
                  <Tabs id='imageTab' className='mb-3'>
                    {item.image.map((item) => {
                      return (
                        <Tab
                          key={item.id}
                          eventKey={`#image-${item.id}`}
                          title={
                            <img
                              className='img-fluid'
                              src={item.url}
                              alt='sneaker-product'
                            />
                          }>
                          <a
                            data-fancybox='gallery'
                            href={item.url}
                            className='img-wrap'>
                            <img src={item.url} alt='' />
                          </a>
                        </Tab>
                      );
                    })}
                  </Tabs>
                </div>
              </div>
              <div className='col-lg-5'>
                <div className='info'>
                  <span className='name'>{item.name}</span>
                  <div className='size my-3'>
                    <span>Size:</span>
                    <Tabs id='sizeTab' className='mb-3'>
                      {item.size.map((item) => {
                        return (
                          <Tab
                            key={item.id}
                            eventKey={`#size-${item.id}`}
                            onSelect={(e) => {}}
                            title={item.sizeId}>
                            <span className='price'>
                              {Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(item.price)}
                            </span>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </div>
                  <div class='count d-flex align-items-center mb-3'>
                    Số lượng
                    <div class='number'>
                      <button
                        onClick={() => {
                          if (count <= 0) {
                            setCount(0);
                          } else setCount(count - 1);
                        }}
                        class='minus'>
                        -
                      </button>
                      <input
                        onChange={(e) => {
                          setCount(e.target.value);
                        }}
                        type='text'
                        value={count}
                      />
                      <button
                        onClick={() => {
                          setCount(count + 1);
                        }}
                        class='plus'>
                        +
                      </button>
                    </div>
                  </div>
                  <div className='controls d-flex'>
                    <button
                      onClick={(e) => {
                        handleAddCart();
                      }}
                      className='btn cart'>
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                  <div className='policy'>
                    <span>Chính sách và ưu đãi</span>
                    <ul>
                      <li>
                        <i className='bi bi-globe'></i> Free ship toàn quốc
                      </li>
                      <li>
                        <i className='bi bi-repeat'></i> Hoàn tiền 100% nếu
                        không hài lòng
                      </li>
                      <li>
                        <i className='bi bi-tag'></i>Có thể áp dụng mã giảm giá{' '}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-10'>
                <div className='desc mt-3'>
                  <span>Mô Tả</span>
                  <p className='mt-3'>&emsp; {item.desc}</p>
                </div>
              </div>
              <div className='col-10 voting'>
                <div className='heading'>
                  <h5>Đánh giá sản phẩm</h5>
                </div>
                <div className='vote__menu'>
                  <div className='vote__info'>
                    <p className='vote__info-star'>4.5/5</p>
                    <span>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={4.5}
                        style={{
                          position: 'relative',
                          top: '-1px',
                          fontSize: '15px',
                          marginLeft: '10px',
                          color: '#f59e0b',
                        }}
                      />
                    </span>
                    <p className='vote__info-des'>
                      <b>{item.length}</b> đánh giá và nhận xét
                    </p>
                  </div>
                  <div className='vote__board text-center'>
                    <span className='vote__board-item'>
                      <span>5</span>
                      <Rate
                        disabled
                        defaultValue={1}
                        count={1}
                        style={{
                          position: 'relative',
                          top: '-1px',
                          fontSize: '15px',
                          margin: '0 5px',
                          color: '#f59e0b',
                        }}
                      />
                      <span>68 đánh giá</span>
                    </span>
                    <span className='vote__board-item'>
                      <span>4</span>
                      <Rate
                        disabled
                        defaultValue={1}
                        count={1}
                        style={{
                          position: 'relative',
                          top: '-1px',
                          fontSize: '15px',
                          margin: '0 5px',
                          color: '#f59e0b',
                        }}
                      />
                      <span>1 đánh giá</span>
                    </span>
                    <span className='vote__board-item'>
                      <span>3</span>
                      <Rate
                        disabled
                        defaultValue={1}
                        count={1}
                        style={{
                          position: 'relative',
                          top: '-1px',
                          fontSize: '15px',
                          margin: '0 5px',
                          color: '#f59e0b',
                        }}
                      />
                      <span>0 đánh giá</span>
                    </span>
                    <span className='vote__board-item'>
                      <span>2</span>
                      <Rate
                        disabled
                        defaultValue={1}
                        count={1}
                        style={{
                          position: 'relative',
                          top: '-1px',
                          fontSize: '15px',
                          margin: '0 5px',
                          color: '#f59e0b',
                        }}
                      />
                      <span>0 đánh giá</span>
                    </span>
                    <span className='vote__board-item'>
                      <span>1</span>
                      <Rate
                        disabled
                        defaultValue={1}
                        count={1}
                        style={{
                          fontSize: '15px',
                          margin: '0 5px',
                          color: '#f59e0b',
                        }}
                      />
                      <span>0 đánh giá</span>
                    </span>
                    <button
                      type='button'
                      class='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal'>
                      Đánh giá ngay
                    </button>

                    <div
                      class='modal fade'
                      id='exampleModal'
                      tabindex='-1'
                      aria-labelledby='exampleModalLabel'
                      aria-hidden='true'>
                      <div class='modal-dialog'>
                        <div class='modal-content'>
                          <div class='modal-header'>
                            <h1 class='modal-title fs-5' id='exampleModalLabel'>
                              Đánh giá sản phẩm
                            </h1>
                            <button
                              type='button'
                              class='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'></button>
                          </div>
                          <div class='modal-body'>
                            <div className='btn'>Đăng nhập để đánh giá</div>
                            <p className='vote-star'>
                              <Rate disabled defaultValue={5} />
                            </p>
                            <div class='input-group'>
                              <input
                                type='text'
                                class='form-control'
                                placeholder='Họ và tên'
                                aria-label='Username'
                                aria-describedby='basic-addon1'></input>
                            </div>
                            <div class='input-group'>
                              <input
                                type='text'
                                class='form-control'
                                placeholder='Email'
                                aria-label='Username'
                                aria-describedby='basic-addon1'></input>
                            </div>
                          </div>
                          <div class='modal-footer'>
                            <button
                              type='button'
                              class='btn btn-secondary'
                              data-bs-dismiss='modal'>
                              Close
                            </button>
                            <button type='button' class='btn btn-primary'>
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='vote__comment'>
                  {/* <div className='vote__comment-item'>
                    <div className='vote__comment-heading'>
                      <div className='vote__comment-user'>
                        <span className='vote__comment-ava'>S</span>
                        <span className='vote__comment-name'>Son Le</span>
                      </div>
                      <div className='vote__comment-time'>29/11/2022 14:44</div>
                    </div>
                    <div className='vote__comment-des'>
                      <p>
                        Đánh giá:
                        <span>
                          <i class='bi bi-star-fill'></i>
                          <i class='bi bi-star-fill'></i>
                          <i class='bi bi-star-fill'></i>
                          <i class='bi bi-star-fill'></i>
                          <i class='bi bi-star-fill'></i>
                        </span>
                      </p>
                      <p>
                        Nhận xét:
                        <span>
                          Giày dùng rất tốt đáng giá tiền vận chuyển nhanh đóng
                          gói kĩ tôi rất thích lần sau tôi sẽ không mua nữa
                        </span>
                      </p>
                    </div>
                  </div> */}
                  {item.voting.map((elm) => (
                    <div className='vote__comment-item' key={elm.id}>
                      <div className='vote__comment-heading'>
                        <div className='vote__comment-user'>
                          <span className='vote__comment-ava'>
                            {elm.username.charAt(0)}
                          </span>
                          <span className='vote__comment-name'>
                            {elm.username}
                          </span>
                        </div>
                        <div className='vote__comment-time'>
                          29/11/2022 14:44
                        </div>
                      </div>
                      <div className='vote__comment-des'>
                        <p>
                          Đánh giá:
                          <Rate
                            disabled
                            character={<i class='bi bi-star-fill'></i>}
                            defaultValue={elm.starVote}
                            style={{
                              fontSize: '15px',
                              marginLeft: '10px',
                              color: '#f59e0b',
                            }}
                          />
                        </p>
                        <p>
                          Nhận xét:
                          <span>{elm.comment}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ProductDetail;
