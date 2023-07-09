import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Search from "antd/lib/transfer/search";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
 
  const [searchkey, setsearchkey] = useState('')
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);
  function filterBySearch() {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(searchkey) ||
        doctor.lastName.toLowerCase().includes(searchkey) ||
        doctor.specialization.toLowerCase().includes(searchkey)
    );
    
    setDoctors(filtered)
  }
  return (
    <Layout>
      <div className="home-heading">
        <h1>List of Available Doctors</h1>
      </div>
      <input
            type="text"
            className="form-control i2 m-2"
            placeholder='Search By Doctor or specalization'
            value={searchkey}
            onKeyUp={filterBySearch}
            onChange={(e) => { setsearchkey(e.target.value) }}
          />
      
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8} key={doctor.id}>
            <div className="doctor-card">
              <Doctor doctor={doctor} />
            </div>
          </Col>
        ))}
      </Row>
      <style>
        {`
          .home-heading {
            margin-bottom: 24px;
            text-align: center;
          }

          .doctor-card {
            background-color: #f1f1f1;
            border-radius: 8px;
            padding: 16px;
            transition: all 0.3s;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .doctor-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            animation: trembling 1s infinite;
            
            
          }
          @keyframes trembling {
            0% {
              transform: rotate(0);
            }
            25% {
              transform: rotate(-2deg);
            }
            75% {
              transform: rotate(2deg);
            }
            100% {
              transform: rotate(0);
            }
          
        `}
      </style>
    </Layout>
  );
}

export default Home;
