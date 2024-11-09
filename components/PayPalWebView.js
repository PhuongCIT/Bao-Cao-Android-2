import React from "react";
import { WebView } from "react-native-webview";

const PayPalWebView = ({ url, onPaymentSuccess, onPaymentError }) => {
  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={(event) => {
        if (event.url.includes("success")) {
          onPaymentSuccess(event);
        } else if (event.url.includes("cancel")) {
          onPaymentError(event);
        }
      }}
    />
  );
};

export default PayPalWebView;
