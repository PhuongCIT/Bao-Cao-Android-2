import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import ProductItem from "../components/ProductItem";

const ProductCategory = () => {
  const route = useRoute();
  const { category } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products found in the category "{category}".</Text>
      </View>
    );
  }

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 10,
          padding: 10,
          marginLeft: 30,
        }}
      >
        {category}
        {"  "}
        {products?.length}
      </Text>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <ProductItem item={item} />
          </View>

          //   <Pressable
          //     style={{
          //       flexDirection: "column",
          //       borderWidth: 1,
          //       borderColor: "#d0d0d0",
          //       paddingRight: 10,
          //       marginVertical: 15,
          //       borderRadius: 20,
          //       height: 150,
          //     }}
          //   >
          //     <View
          //       style={{
          //         flexDirection: "row",
          //         padding: 10,
          //         justifyContent: "space-between",
          //       }}
          //     >
          //       <View
          //         style={{
          //           backgroundColor: "white",
          //           width: 120,
          //           height: 150,
          //         }}
          //       >
          //         <Image
          //           source={{ uri: item.image }}
          //           resizeMode="contain"
          //           width={100}
          //           height={100}
          //         />
          //       </View>
          //       <View style={styles.productTitle}>
          //         <Text>{item.title}</Text>

          //         <Text style={{ marginTop: 10 }}> Price: {item.price}</Text>
          //       </View>
          //     </View>
          //   </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCategory;
