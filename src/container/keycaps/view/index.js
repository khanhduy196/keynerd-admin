/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Swiper from 'react-id-swiper';
import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle } from '../../styled';
import { getKeycap } from '../../../redux/keycap/actionCreator';
import './style.scss';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination]);
function ViewKeycap() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { keycap } = useSelector((state) => state.keycapStore);

  useEffect(() => {
    dispatch(getKeycap(id));
  }, [dispatch, id]);

  const paramsOne = {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };
  return (
    <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
      <GlobalUtilityStyle>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
              <div className="flex justify-between py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                <Heading as="h4" className="text-lg font-medium mb-0">
                  {keycap.name}
                </Heading>
              </div>
              <div className="p-[25px]">
                <Swiper {...paramsOne}>
                  {!!keycap.photos &&
                    keycap.photos.map((photo, index) => {
                      return (
                        <div key={index + 1} className="testimonial-block__single">
                          <figure>
                            <img src={photo} alt="" />
                          </figure>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="p-[25px]">
                {!!keycap.details &&
                  keycap.details.map((detail, index) => {
                    return detail.fileUrl ? (
                      <Link key={index + 1} to={detail.fileUrl} target="_blank">
                        <div>
                          {detail.profile} {detail.size}U
                        </div>
                      </Link>
                    ) : (
                      <div key={index + 1}>
                        {detail.profile} {detail.size}U
                      </div>
                    );
                  })}
              </div>
            </div>
          </Col>
        </Row>
      </GlobalUtilityStyle>
    </div>
  );
}

export default ViewKeycap;
