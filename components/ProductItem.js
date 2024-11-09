import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable
      style={{
        borderWidth: 0.5,

        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: "row", // Thêm dòng này
        justifyContent: "space-between",
      }}
    >
      <Image
        backgroundColor="white"
        style={{ width: 165, height: 140, marginTop: 5, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <View style={{ padding: 10, backgroundColor: "#C5FCFF" }}>
        <Text numberOfLines={1} style={{ width: 180, marginTop: 10 }}>
          {item?.title}
        </Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            ${item?.price}
          </Text>
          <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
            {item?.rating?.rate} ratings
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("Info", {
                id: item.id,
                title: item?.title,
                price: item?.price,
                carouselImages: item?.image,
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item: item,
              })
            }
            style={{
              backgroundColor: "red",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",

              marginTop: 25,
            }}
          >
            <Text style={{ color: "white" }}>Detail</Text>
          </Pressable>
          <Pressable
            onPress={() => addItemToCart(item)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              width: 80,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",

              marginTop: 25,
            }}
          >
            {addedToCart ? <Text>Cart + 1</Text> : <Text>Add</Text>}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;
