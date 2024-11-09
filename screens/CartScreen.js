import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();
  const proceedToBuy = () => {
    if (cart.length === 0) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Confirm");
    }
  };
  return (
    <>
      <View
        style={{
          paddingTop: 10,
          height: 80,
          backgroundColor: "#FE9900",
          alignItems: "center",
        }}
      >
        <Header />
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#E4E0E1" }}>
        {/* <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        /> */}

        <View style={{ marginHorizontal: 10 }}>
          {cart?.map((item, index) => (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#F0F0F0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
              key={index}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 140, height: 140, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                </View>

                <View>
                  <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                  >
                    {item?.price}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}>In Stock</Text>
                  <Text
                    style={{ fontWeight: "500", marginTop: 6, color: "red" }}
                  >
                    {item?.rating?.rate} ratings
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={{
                  marginTop: 5,
                  marginHorizontal: 20,
                  marginBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 2,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}
                >
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <AntDesign name="minus" size={24} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <AntDesign name="delete" size={24} color="red" />
                    </Pressable>
                  )}

                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}
                  >
                    <Text>{item?.quantity}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6,
                    }}
                  >
                    <Feather name="plus" size={24} color="black" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 13,
                    borderRadius: 5,
                    backgroundColor: "#FA4032",
                  }}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "#B0F8F6",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
        </View>
        <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

        <Pressable
          onPress={proceedToBuy}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Text>
            {cart.length === 0
              ? "Add neư items to cart"
              : `Proceed to Buy (${cart.length}) items`}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
