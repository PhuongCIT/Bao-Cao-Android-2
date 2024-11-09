import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

const Checkout = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Sample items for the checkout summary
  const items = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
    { id: 3, name: "Item 3", price: 15 },
  ];

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  const handleCashPayment = () => {
    // Here you would process the cash payment
    if (name && phone && address) {
      Alert.alert(
        "Payment Successful",
        `Thank you for your payment of $${totalAmount}!`
      );
      // Reset the input fields after payment
      setName("");
      setPhone("");
      setAddress("");
    } else {
      Alert.alert("Input Error", "Please fill in all fields.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.subtitle}>Items:</Text>
      {items.map((item) => (
        <Text key={item.id}>
          {item.name} - ${item.price}
        </Text>
      ))}
      <Text style={styles.total}>Total: ${totalAmount}</Text>

      <Text style={styles.subtitle}>Enter Your Details:</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <Button title="Pay Cash" onPress={handleCashPayment} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Checkout;
