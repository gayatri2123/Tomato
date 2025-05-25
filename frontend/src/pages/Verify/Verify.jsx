import React, { useEffect, useContext } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams(); // removed setSearchParams
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Payment verification failed:", err);
        navigate("/");
      }
    };

    verifyPayment();
  }, [success, orderId, url, navigate]); // no more warning

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
