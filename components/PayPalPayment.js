import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import PayPalWebView from "./PayPalWebView";
import domainURL from "../domain";

const PayPalPayment = () => {
  const [paymentUrl, setPaymentUrl] = useState(null);

  const createOrder = async () => {
    try {
      const response = await axios.post(`${domainURL}/create-order`);
      setPaymentUrl(response.data.approvalUrl); // URL để chuyển hướng tới trang thanh toán PayPal
    } catch (error) {
      console.error("Error creating PayPal order: ", error);
    }
  };

  const handlePaymentSuccess = (event) => {
    console.log("Payment successful:", event);
    // Xử lý logic khi thanh toán thành công
  };

  const handlePaymentError = (event) => {
    console.log("Payment error:", event);
    // Xử lý logic khi thanh toán thất bại hoặc bị hủy
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay with PayPal</Text>
      <Button title="Pay with PayPal" onPress={createOrder} />
      {paymentUrl && (
        <PayPalWebView
          url={paymentUrl}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default PayPalPayment;
