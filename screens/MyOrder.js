import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import domainURL from "../domain";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const MyOrder = () => {
  const navigation = useNavigation();

  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${domainURL}/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {user?.name} My Order
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy More</Text>
        </Pressable>
      </View>

      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders?.map((order) => (
            <Pressable
              style={{
                flexDirection: "column",
                marginTop: 20,
                // gap: 20,
                padding: 15,
                borderRadius: 8,

                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View
                  style={{
                    marginHorizontal: 10,
                    flexDirection: "row",
                    height: 130,
                  }}
                  key={product._id}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 0,
                      }}
                    >
                      <Text style={{ color: "orange" }}>Shipping</Text>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: -10,
                        left: 150,
                      }}
                    >
                      <Text style={{ color: "red", fontSize: 18 }}>
                        Returns
                      </Text>
                    </View>
                    <Text numberOfLines={2} style={{ marginTop: 15 }}>
                      {product.name}
                    </Text>
                  </View>
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default MyOrder;
