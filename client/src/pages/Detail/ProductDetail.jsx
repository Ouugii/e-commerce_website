import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Header from "../../component/header/header";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";
import { specs } from "../../pages/Detail/fakeArray/fakeDetail";
import { Fakecomment } from "../../pages/Detail/fakeArray/fakecomment";
import CountdownTimer from "../../pages/Detail/fakeArray/countDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductHome from "../../component/ProductHome/ProductHome";
import axios from "axios";
import {
  faCartShopping,
  faShare,
  faTag,
  faCircleInfo,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Suggest from "../../component/Suggest/Suggest";
const ProductDetail = () => {
  //all state
  const [showMessage, setShowMessage] = useState(false);
  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
  const [activeTabs, setActiveTabs] = useState(1);
  const [product, setProduct] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const launchDate = new Date("2024-10-01T00:00:00");
  ///Lay cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const accessToken = getCookie("accessToken");
  //Biến môi trường
  ///////
  const { id } = useParams();
  //Slide
  ///////
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const goto = (url) => {
    setZoomImage(url);
  };

  //fetchProductDetail
  ////////////
  useEffect(() => {
    if (!id) {
      setProduct(null);
      return;
    }
    const fetchProductDetail = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://localhost:3030/api/v1/p/products/${id}`,
          { headers }
        );

        setProduct(response.data.metadata.product);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
        setProduct(null);
      }
    };

    fetchProductDetail();
  }, [id]);
  //Add to card
  ///////////
  const handleAddToCart = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const payload = {
        productId: product._id,
        quantity,
      };

      const response = await axios.post(
        "http://localhost:3030/api/v1/customer/cart",
        payload,
        {
          headers,
        }
      );
      if (response.status === 201) {
        setShowMessage2(true);
        setTimeout(() => {
          setShowMessage2(false);
        }, 1000);
        console.log(payload);
      } else {
        console.log("Data sent false");
        setShowMessage3(true);
        setTimeout(() => {
          setShowMessage3(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng", error);
      setShowMessage3(true);
      setTimeout(() => {
        setShowMessage3(false);
      }, 1000);
    }
  };

  // Cập nhật số lượng sản phẩm khi người dùng nhập vào
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };
  ///ảnh zoom
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setZoomImage(product.images[0].url);
    }
  }, [product]);
  ////test log

  //share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <div>
      <Header />
      <section className="detailsPage">
        <div className="container-fluid deatailProdct">
          <div className="row">
            <div className="col-md-10 part11">
              <div className="row">
                {/*Ảnh Sản phẩm */}
                <div className="col-md-6 ">
                  <div className="productZoom">
                    {" "}
                    <InnerImageZoom zoomScale={2} src={zoomImage} />
                  </div>

                  <Slider {...settings} className="ZoomSlider">
                    {product &&
                      product.images.map((image) => (
                        <div className="item" key={image._id}>
                          <img
                            src={image.url}
                            alt="Product"
                            onClick={() => goto(image.url)}
                          />
                        </div>
                      ))}
                  </Slider>
                </div>
                {/*  */}
                {/* Thông tin sản phẩm */}
                <>
                  {product ? (
                    <div className="col-md-6 productInfo">
                      <span className="Sale_rpc">Sale</span>
                      <div>
                        <h1>{product?.name || "Sản phẩm không có tên"}</h1>
                        <p className="quantity_inf">
                          Thương hiệu:{" "}
                          <span
                            style={{
                              padding: "1px 10px",
                              border: "1px solid rgba(0, 0, 0, 0.2)",
                              borderRadius: "10px",
                              cursor: "pointer",
                              color: "black",
                            }}
                          >
                            {product?.brand?.name || "Không có thương hiệu"}
                          </span>
                        </p>
                        <p className="quantity_inf">
                          Danh mục:{" "}
                          <span>
                            {product?.categories &&
                            product.categories.length > 0
                              ? product.categories.map((category, index) => (
                                  <span key={index}>
                                    {category.name}
                                    {index < product.categories.length - 1 &&
                                      ", "}
                                  </span>
                                ))
                              : "Không có danh mục"}
                          </span>
                        </p>
                        <p className="quantity_inf">
                          Số lượng còn lại:{" "}
                          {product?.stock_quantity || "Không có thông tin"}
                        </p>
                      </div>
                      {/* Giá */}
                      {product?.sale_price && product?.price ? (
                        <div>
                          <p className="priceif">Giá ưu đãi</p>
                          <div className="priceSelec">
                            <span className="rPrice">
                              {product.sale_price.toLocaleString("vi-VN")} VND
                            </span>
                            <div className="ml-2">
                              <span className="oPrice">
                                {product.price.toLocaleString("vi-VN")} VND
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>Giá không khả dụng</p>
                      )}
                      {/* Ưu đãi */}
                      <div className="OfferAvai">
                        <p className="priceif" style={{ paddingBottom: "5px" }}>
                          Ưu đãi đi kèm
                        </p>
                        <p className="OfferAvaiItem">
                          <FontAwesomeIcon
                            icon={faTag}
                            style={{ color: "#54c963" }}
                          />{" "}
                          Giảm giá thêm 15% khi mua qua zaloPay{" "}
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </p>
                        <p className="OfferAvaiItem">
                          <FontAwesomeIcon
                            icon={faTag}
                            style={{ color: "#54c963" }}
                          />{" "}
                          Bảo hành có cam kết trong 12 tháng{" "}
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </p>
                        <p className="OfferAvaiItem">
                          <FontAwesomeIcon
                            icon={faTag}
                            style={{ color: "#54c963" }}
                          />{" "}
                          Bảo hành chính hãng 1 năm tại các trung tâm bảo hành
                          hãng <FontAwesomeIcon icon={faCircleInfo} />
                        </p>
                        <p className="OfferAvaiItem">
                          <FontAwesomeIcon
                            icon={faTag}
                            style={{ color: "#54c963" }}
                          />{" "}
                          Giao hàng tận nhà nhanh chóng{" "}
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </p>
                      </div>
                      {/* specials */}
                      <p
                        style={{
                          paddingBottom: "5px",
                          margin: "0",
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        Thông tin về sản phẩm:
                      </p>
                      <div className="If_Decreption">
                        <p>{product?.description || "Không có mô tả"}</p>
                      </div>
                      {/* addcard */}
                      <div className="AddCardSection">
                        <div className="CounterSec">
                          <input
                            type="number"
                            placeholder="0"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                          />
                        </div>
                        <div className="AddCard" onClick={handleAddToCart}>
                          <FontAwesomeIcon icon={faCartShopping} />
                          <p>Thêm vào giỏ hàng</p>
                        </div>
                        <div className="Share" onClick={handleShare}>
                          <FontAwesomeIcon icon={faShare} />
                          <p>Chia sẻ</p>
                        </div>
                        {showMessage && (
                          <div className="copy-message">
                            Đã sao chép liên kết thành công
                          </div>
                        )}
                        {showMessage1 && (
                          <div className="Alert-message">
                            Hãy đăng nhập tài khoản
                          </div>
                        )}
                        {showMessage2 && (
                          <div className="addCart-message">
                            Thêm vào giỏ thành công
                          </div>
                        )}
                        {showMessage3 && (
                          <div className="error-message">
                            Lỗi ! Thử lại sau nhé
                          </div>
                        )}
                      </div>
                      {/* sell detail */}
                      <p
                        style={{
                          paddingBottom: "5px",
                          margin: "0",
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        Thông tin về người bán:
                      </p>
                      <div className="SellInfo">
                        <img src={product.shop.img_url} alt="" />
                        <div className="SellInfoName">
                          <p style={{ fontSize: "20px", fontWeight: "600" }}>
                            {product.shop.name}
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: "600",
                              color: "gray",
                            }}
                          >
                            Hoạt động 2 phút trước
                          </p>
                        </div>
                        <div className="SellAnother">
                          <p>
                            tỉ lệ phản hồi: <span>99%</span>
                          </p>
                          <p>
                            thời gian phản hồi: <span>Trong vài giờ</span>
                          </p>
                        </div>
                        <div className="SellAnother">
                          <p>
                            tham gia: <span>24h</span>
                          </p>
                          <p>
                            Người theo dõi: <span>12</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>Đang tìm sản phẩm</p>
                  )}
                </>
                {/* End */}
              </div>
            </div>
            <div className="col-md-2 part22 ">
              <div className="prodctAdv">
                <img src="/IMG/detailPdct/adv.png" alt="" />
              </div>
              <div className="prodctAdv">
                <img src="/IMG/detailPdct/adv2.png" alt="" />
              </div>
            </div>
          </div>
          <div className="CardPrdctDetail mt-5 p-5 mb-5 card">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <p onClick={() => setActiveTabs(0)}>Thông tin chi tiết</p>
                </li>
                <li className="list-inline-item">
                  <p onClick={() => setActiveTabs(1)}>Thông tin kỹ thuật</p>
                </li>
                <li className="list-inline-item">
                  <p onClick={() => setActiveTabs(2)}>Review</p>
                </li>
              </ul>
              {/* tab dưới */}
              {/* ----------- */}
              {activeTabs === 0 && (
                <div className="TabsContent">
                  <p>
                    + 2 tính năng sử dụng : che chắn tốt cho cả trời mưa lẫn
                    trời nắng , Có nút đóng /mở ô dù tự động, hạn chế dùng lực
                    tay . Nhỏ gọn tiện dụng dễ mang ra ngoài , du lịch dã ngoại
                    . Kiểu dáng trẻ trung, đơn giản không dễ lỗi mốt . Cấu tạo
                    của dù tự động 2 chiều Tập trung vào tính năng tiện lợi cho
                    người sử dụng, cấu tạo của dù tự động 2 chiều cũng tương tự
                    như các mẫu dù cán ngắn thông thường.
                  </p>
                  <p>
                    Nút bấm tự động : được bố trí thuận tiện ở tay cầm. Khi bấm
                    mở, dù có lực bấm tốt, tán dù bung nhanh khỏe, lúc thu gọn
                    trơn, mượt, không bị kéo rít, không bị nặng tay. Khung kèo
                    dù : phần khung gồm được làm từ thép trắng kết hợp với
                    cacbon sơn tĩnh điện , ghép nối tạo thành 1 khối chắc chắn,
                    tạo ưu thế về khả năng chống chịu gió . Khi cầm chỉ như cầm
                    1 chai nước suối. Cho vào túi xách, balo, cốp xe hoặc cầm
                    tay đều là chuyện nhỏ . Dùng đi làm, đi dạo phố , dã ngoại
                    đều tiện lợi vì không tốn quá nhiều diện tích cất giữ .
                  </p>
                  <p>
                    -------------------------------------------------------------------------------------------------------------------------------------
                    ------------------------------------------------------------------
                  </p>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} /> Trong 03 ngày kể từ
                      khi nhận được sản phẩm
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} /> Nếu sản phẩm sai mẫu
                      mã, bị lỗi..., quý khách sẽ được miễn phí hoàn toàn cước
                      đổi trả sản phẩm khác.{" "}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} /> Quý khách được đổi
                      với sản phẩm mới ngang hoặc cao giá hơn{" "}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} /> 1 sản phẩm, chỉ được
                      bảo hành đổi trả 1 lần duy nhất.{" "}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} /> Tất cả các sản phẩm
                      đăng bán đều được shop chụp hình và quay video bằng điện
                      thoại (100% ảnh thật){" "}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faThumbsUp} /> Đến với Shop bạn
                      hoàn toàn có thể yên tâm về chất lượng
                    </li>
                  </ul>
                  <p>
                    + 2 tính năng sử dụng : che chắn tốt cho cả trời mưa lẫn
                    trời nắng , Có nút đóng /mở ô dù tự động, hạn chế dùng lực
                    tay . Nhỏ gọn tiện dụng dễ mang ra ngoài , du lịch dã ngoại
                    . Kiểu dáng trẻ trung, đơn giản không dễ lỗi mốt . Cấu tạo
                    của dù tự động 2 chiều Tập trung vào tính năng tiện lợi cho
                    người sử dụng, cấu tạo của dù tự động 2 chiều cũng tương tự
                    như các mẫu dù cán ngắn thông thường.
                  </p>
                  <img
                    src="/IMG/Home/canva.png"
                    alt=""
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                  <p>
                    Nút bấm tự động : được bố trí thuận tiện ở tay cầm. Khi bấm
                    mở, dù có lực bấm tốt, tán dù bung nhanh khỏe, lúc thu gọn
                    trơn, mượt, không bị kéo rít, không bị nặng tay. Khung kèo
                    dù : phần khung gồm được làm từ thép trắng kết hợp với
                    cacbon sơn tĩnh điện , ghép nối tạo thành 1 khối chắc chắn,
                    tạo ưu thế về khả năng chống chịu gió . Khi cầm chỉ như cầm
                    1 chai nước suối. Cho vào túi xách, balo, cốp xe hoặc cầm
                    tay đều là chuyện nhỏ . Dùng đi làm, đi dạo phố , dã ngoại
                    đều tiện lợi vì không tốn quá nhiều diện tích cất giữ .
                  </p>
                  <p>
                    ❤️ Lưu ý: Không nên chà xát mạnh bằng bàn chải. Khuyến cáo
                    nên giặt bằng tay. Nón có sắc màu cá tính với nhiều màu sắc
                    tự nhiên, nổi bật, dễ dàng phối cùng các loại trang phục
                    khác nhau Chất liệu thoáng mát, không tạo cảm giác hầm bí
                    khi đội, cho bạn thoải mái diện trong các hoạt động hằng
                    ngày Sản phẩm sẽ là Phụ kiện tuyệt vời để nâng tầm set đồ
                    của bạn khi phối cùng quần jean, quần short<br></br>Hướng
                    dẫn bảo quản Mũ lưỡi trai thêu chữ Memorie • Giặt riêng sản
                    phẩm màu sáng và màu tối • Giặt sản phẩm với nước ở nhiệt độ
                    thường • Nên phơi sản phẩm dưới ánh nắng trực tiếp • Không
                    nên sử dụng chất tẩy, không xoắn vắt mạnhThông tin chi tiết
                    sản phẩmt ất cổ cao nam nữ trơn nhiều màu vớ chất mềm dày
                    dặn thoáng khí phong cách Unisex phong cách Hàn Quốc -Tất
                    được sản xuất chất liệu cotton tự nhiên đạt chứng nhận nguồn
                    gốc an toàn, mềm mại, thấm hút mồ hôi tốt, giữ đôi chân luôn
                    khô thoáng.
                  </p>
                  <p>
                    Thiết kế vùng thoát khí tăng cường khả năng thoát mồ hôi, bổ
                    sung công nghệ kháng khuẩn khử mùi mang lại cảm giác tự tin,
                    thoải mái -Thiết kế tất tinh tế cực kỳ đáng yêu, trẻ trung,
                    năng động và đặc biệt rất thời trang -Chun tất với công nghệ
                    dệt kim tự động đảm bảo không bị nhão sau một thời gian sử
                    dụng -Chất liệu vải mềm, tất mỏng nhẹ thoáng, co giãn 4
                    chiều -Đặc biệt sản phẩm tất rất dề phối đồ cho các bạn nữ
                    -Tất 4 mùa đều đi được mang lại cảm giác thoải mái - Phù hợp
                    cho các bạn chân đi giày size từ 35-41. - Số lượng tính: 1
                    đôi gồm 2 chiếc. Hướng dẫn sử dụng tất cổ cao nam nữ trơn
                    nhiều màu vớ chất mềm dày dặn thoáng khí phong cách Unisex
                    phong cách Hàn Quốc -Hướng dẫn phối đồ với tất cổ cao của TA
                    Store Cách 1:Bạn có thể mix vớ trắng + giày trắng kèm áo sơ
                    mi trắng và quần short, túi tote trắng Cách 2:Giày xanh + Vớ
                    trắng + short bò trắng + sơ mi mỏng hồng Rất nhiều cách mix
                    đồ khác nhau với vớ cho các bạn nữ thỏa sức sáng tạo -Hướng
                    dẫn giặt và bảo quản Giặt tay nhẹ nhàng Phơi ngang trên móc,
                    tránh ánh nắng trực tiếp. Xếp vớ gọn gàng để không bị nhăn.
                    Tránh những vật dụng sắc nhọn làm xước tất - vớ TA Store CAM
                    KẾT Sản phẩm 100% giống mô tả. Hình ảnh sản phẩm là ảnh thật
                    do shop tự chụp và giữ bản quyền hình ảnh Đảm bảo vải chất
                    lượng 100% Tất được kiểm tra kĩ càng, cẩn thận và tư vấn
                    nhiệt tình trước khi gói hàng giao cho Quý Khách Hàng có
                    sẵn, giao hàng ngay khi nhận được đơn Hoàn tiền nếu sản phẩm
                    không giống với mô tả Chấp nhận đổi hàng khi size không vừa
                    Giao hàng trên toàn quốc, nhận hàng trả tiền Hỗ trợ đổi trả
                    theo quy định của Shopee 1. Điều kiện áp dụng (trong vòng 07
                    ngày kể từ khi nhận sản phẩm) - Hàng hoá vẫn còn mới, chưa
                    qua sử dụng - Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển
                    hoặc do nhà sản xuất. 2. Trường hợp được chấp nhận: - Hàng
                    không đúng size, kiểu dáng như quý khách đặt hàng - Không đủ
                    số lượng, không đủ bộ như trong đơn hàng 3. Trường hợp không
                    đủ điều kiện áp dụng chính sách: - Quá 07 ngày kể từ khi Quý
                    khách nhận hàng - Gửi lại hàng không đúng mẫu mã, không phải
                    sản phẩm của TA Store - Không thích, không hợp, đặt nhầm mã,
                    nhầm màu,... Do màn hình và điều kiện ánh sáng khác nhau,
                    màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 3-5%
                  </p>
                </div>
              )}
              {activeTabs === 1 && (
                <div className="TabsContent">
                  <div className="specs-container">
                    <h2>Thông số kỹ thuật </h2>
                    <table className="specs-table">
                      <tbody>
                        {Object.keys(specs).map((key) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{specs[key]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTabs === 2 && (
                <div className="TabsContentfix">
                  <div className="row">
                    <div
                      className="col-md-8"
                      style={{ maxHeight: "700px", overflowY: "scroll" }}
                    >
                      <h3>Đánh giá của khách hàng và phản hồi</h3>
                      <br />
                      {/* fake comment */}
                      {/* fake comment */}
                      {/* fake comment */}
                      {Fakecomment.map((cmt) => {
                        return (
                          <div
                            className="card p-3 reviewCard flex-row"
                            key={cmt.id}
                          >
                            <div className="reviewcardIMG">
                              <div className="rounded-circle">
                                <img src={cmt.image} alt="" />
                              </div>
                              <span
                                className="text-b d-block text-center"
                                style={{ fontWeight: "600" }}
                              >
                                {cmt.name}
                              </span>
                            </div>
                            <div
                              className="infoReview"
                              style={{ paddingLeft: "40px" }}
                            >
                              <h5>{cmt.time}</h5>
                              <Rating
                                name="half-rating-read"
                                defaultValue={2.5}
                                precision={0.5}
                                readOnly
                              />
                              <p>{cmt.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                      {/* fake comment */}
                      {/* fake comment */}
                      {/* fake comment */}
                    </div>
                    {/* tổng quan đánh giá */}
                    <div className="col-md-4">
                      <h5>Tổng quan đánh giá</h5>
                      <div className="d-flex align-items-center">
                        <Rating
                          name="half-rating-read"
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                        <strong className="m-3">4.5 trên 5</strong>
                      </div>
                      <br />
                      {/* Số liệu */}
                      <div className="progressBarBox d-flex align-items-center">
                        <span style={{ marginRight: "10px" }}>5 sao</span>
                        <div className="progress" style={{ width: "85%" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "75%" }}
                          >
                            70%
                          </div>
                        </div>
                      </div>
                      <div className="progressBarBox d-flex align-items-center">
                        <span style={{ marginRight: "10px" }}>4 sao</span>
                        <div className="progress" style={{ width: "85%" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "35%" }}
                          >
                            29%
                          </div>
                        </div>
                      </div>
                      <div className="progressBarBox d-flex align-items-center">
                        <span style={{ marginRight: "10px" }}>3 sao</span>
                        <div className="progress" style={{ width: "85%" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "100%" }}
                          >
                            100%
                          </div>
                        </div>
                      </div>
                      <div className="progressBarBox d-flex align-items-center">
                        <span style={{ marginRight: "10px" }}>2 sao</span>
                        <div className="progress" style={{ width: "85%" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "0%" }}
                          >
                            0%
                          </div>
                        </div>
                      </div>
                      <div className="progressBarBox d-flex align-items-center">
                        <span style={{ marginRight: "10px" }}>1 sao</span>
                        <div className="progress" style={{ width: "85%" }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "0%" }}
                          >
                            0%
                          </div>
                        </div>
                      </div>
                      {/* Số liệu */}
                      <img
                        src="/IMG/Home/fash2.png"
                        alt=""
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </div>
                    {/* tổng quan đánh giá */}
                    <div className="WriteCmt col-md-9">
                      <form action="" className="writeReview">
                        <h4>Đánh giá sản phẩm</h4>
                        <br />

                        <div className="form-group">
                          <textarea
                            name=""
                            className="form-control"
                            placeholder="Nhập nhận xét vào đây"
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-md mt-3">
                          Tạo đánh giá
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="feature">
            {/* <div className="d-flex align-items-center">
              <h2>Sắp ra mắt: </h2>
              <CountdownTimer targetDate={launchDate} />
            </div> */}
            <img
              src="/IMG/Home/arrival1.png"
              alt=""
              style={{ width: "100%" }}
            />
            <div className="SuggestFa">
              <Suggest />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
