import React from "react";
import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="nav d-flex align-items-center">
      <div className="nav-bars container-fluid ">
        <div className="row position-relative">
          <div className="col-sm-9 part1 position-static">
            <nav>
              <ul className="list list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="/">Trang chính </Link>
                </li>
                <li className="list-inline-item">
                  <Link>About</Link>
                </li>
                <li className="list-inline-item">
                  <Link>Shop </Link>
                </li>

                <li className="list-inline-item position-static">
                  <Link>
                    Menu tổng{" "}
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ padding: " 0px 5px" }}
                    />
                  </Link>
                  <div className="dropdown_menu megaMenu mt-3 w-100">
                    <div className="row">
                      <div className="col">
                        <h4>Thời trang</h4>
                        <ul>
                          <li>
                            <Link>Nam</Link>
                          </li>
                          <li>
                            <Link>Nữ</Link>
                          </li>
                          <li>
                            <Link>Giày</Link>
                          </li>
                          <li>
                            <Link>Đồng hồ trang sức</Link>
                          </li>
                          <li>
                            <Link>Trẻ em</Link>
                          </li>
                          <li>
                            <Link>Mùa đông</Link>
                          </li>
                          <li>
                            <Link>Theo chủ đề</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <h4>Thiết bị điện tử</h4>
                        <ul>
                          <li>
                            <Link>Âm thanh</Link>
                          </li>
                          <li>
                            <Link>Camera</Link>
                          </li>
                          <li>
                            <Link>PC - laptop</Link>
                          </li>
                          <li>
                            <Link>Gaming</Link>
                          </li>
                          <li>
                            <Link>Lưu trữ</Link>
                          </li>
                          <li>
                            <Link>Điện thoại</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <h4>Nội thất</h4>
                        <ul>
                          <li>
                            <Link>decor</Link>
                          </li>
                          <li>
                            <Link>Phòng khách</Link>
                          </li>
                          <li>
                            <Link>Phòng ngủ</Link>
                          </li>
                          <li>
                            <Link>Bếp</Link>
                          </li>
                          <li>
                            <Link>Cây cảnh</Link>
                          </li>
                          <li>
                            <Link>Làm sạch</Link>
                          </li>
                          <li>
                            <Link>Cho thứ cưng</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <h4>Thiết bị gia dụng</h4>
                        <ul>
                          <li>
                            <Link>TV</Link>
                          </li>
                          <li>
                            <Link>Tủ lạnh</Link>
                          </li>
                          <li>
                            <Link>Máy lạnh</Link>
                          </li>
                          <li>
                            <Link>Máy giặt</Link>
                          </li>
                          <li>
                            <Link>Quạt</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <h4>Làm đẹp, Đồ chơi & ...</h4>
                        <ul>
                          <li>
                            <Link>Sản phẩm chăm sóc da</Link>
                          </li>
                          <li>
                            <Link>Thức ăn & uống</Link>
                          </li>
                          <li>
                            <Link>Đồ chơi & dụng cụ học tập</Link>
                          </li>
                          <li>
                            <Link>Nhạc</Link>
                          </li>
                          <li>
                            <Link>Sách</Link>
                          </li>
                          <li>
                            <Link>Chăm sóc sức khỏe</Link>
                          </li>
                          <li>
                            <Link>Thể thao</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col">
                        <div className="ads">
                          <img src="/IMG/Home/ads.png" alt="" />
                          <div className="ads-content">
                            <p
                              style={{
                                color: "white",
                              }}
                            >
                              HOT DEALS
                            </p>
                            <p className="ads-c2">Đừng bỏ lỡ những ưu đãi</p>
                            <p className="ads-c3">Tiết kiệm đến 50%</p>
                            <p className="ads-c4">Mua sắm ngay</p>
                          </div>
                          <p className="discount">-50%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list-inline-item">
                  <Link>
                    Blog{" "}
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ padding: " 0px 5px" }}
                    />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link>
                    Trang{" "}
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ padding: " 0px 5px" }}
                    />
                  </Link>
                  <div className="dropdown_menu Drop_Page mt-3">
                    <ul style={{ paddingLeft: "0" }}>
                      <li>
                        <Link to="/about" className="full-link">
                          About us
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="full-link">
                          Liên hệ
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="full-link">
                          Hướng dẫn thanh toán
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="full-link">
                          dịch vụ
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="full-link">
                          Điều Khoản
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link>Liên hệ</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-sm-3 part2 d-flex align-items-center">
            <div className="phNo d-flex align-items-center">
              <span className="headphone">
                <FontAwesomeIcon icon={faHeadphones} />
              </span>
              <div className="info">
                <h4 className="mb-0">66 - 666</h4>
                <p className="mb-0">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
