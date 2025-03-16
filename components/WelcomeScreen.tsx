import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const WelcomeScreen: React.FC = () => {
    //  const [firstName, onChangeFirstName] = React.useState('');
    return (
        //  <ScrollView style={styles.container}>
        //  <Image
        //        style={styles.logo}
        //     source={require('../assets/images/logo.png')}
        //         resizeMode="center"
        //        accessible={true}
        //       accessibilityLabel={'Little Lemon Logo'}
        //    />

        //  <Text style={styles.title}>
        //         Little Lemon, your local Mediterranean Bistro
        //     </Text>
        //    <Image
        //        style={styles.image}
        //       source={require('../assets/images/Picture1.png')}
        //        resizeMode="cover"
        //       accessible={true}
        //           accessibilityLabel={'Little Lemon Logo'}
        //       />
        //       <Image
        //         style={styles.image}
        //         source={require('../assets/images/Picture2.png')}
        //         resizeMode="cover"
        //         accessible={true}
        //         accessibilityLabel={'Little Lemon Logo'}
        //     />
        //     <Image
        //         style={styles.image}
        //       source={require('../assets/images/Picture3.png')}
        //          resizeMode="cover"
        //         accessible={true}
        //         accessibilityLabel={'Little Lemon Logo'}
        //      />
        //   <Image
        //        style={styles.image}
        //        source={require('../assets/images/Picture4.png')}
        //        resizeMode="cover"
        //        accessible={true}
        //        accessibilityLabel={'Little Lemon Logo'}
        //   />
        // </ScrollView>
        // );
        //};

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/logo.png')}
                        resizeMode="center"
                        accessible={true}
                        accessibilityLabel={'Little Lemon Logo'}
                    />
                    <Text
                        style={styles.headerText}>
                        Little Lemon
                    </Text>
                </View>
                <Text
                    style={styles.descriptionText}>
                    Little Lemon is a charming neighborhood bistro that serves simple food
                    and classic cocktails in a lively but casual environment. We would love
                    to hear your experience with us!
                </Text>
            </View>
        </ScrollView >
    );
}
//  <ScrollView style={styles.container}>
//     <View>
//       <Text style={styles.headerText}>Welcome to Little Lemon</Text>
//     <Text style={styles.regularText}>
//        Little Lemon is a charming neighborhood bistro that serves simple food
//        and classic cocktails in a lively but casual environment.</Text>
//         <TextInput
//           style={styles.inputBox}
//           onChangeText={onChangeFirstName}
//         value={firstName}
//      placeholder={"First Name"}
//      onFocus={() => { Alert.alert("First name is focused") }}
//      onBlur={() => { Alert.alert("First name is now blurred") }}
//    />
//     </View>
//   </ScrollView>
// );
//}

const styles = StyleSheet.create({
    //container: { flex: 1 },
    //  headerText: {
    //     padding: 40,
    //     fontSize: 30,
    //    color: '#EDEFEE',
    //   textAlign: 'center',
    //  },
    //  regularText: {
    //      fontSize: 24,
    //    padding: 20,
    //   marginVertical: 8,
    //   color: '#EDEFEE',
    //  textAlign: 'center',
    //  },
    //inputBox: {
    //   height: 40,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    //  fontSize: 16,
    // borderColor: '#EDEFEE',
    //backgroundColor: '#EDEFEE',
    //   },
    headerContainer: {
        flexDirection: 'row',       // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center',       // Canh giữa theo chiều dọc
        justifyContent: 'center',   // Canh giữa theo chiều ngang (nếu cần)
        padding: 20,
    },
    logo: {
        height: 100,
        width: 100,  // Thay đổi kích thước nếu cần; bạn có thể điều chỉnh theo ý muốn
        marginRight: 10,  // Khoảng cách giữa ảnh và chữ
    },
    headerText: {
        fontSize: 30,
        color: '#EDEFEE',
        // Bạn có thể thêm các thuộc tính style khác nếu cần
    },
    descriptionText: {
        fontSize: 24,
        padding: 20,
        marginVertical: 8,
        color: '#EDEFEE',
        textAlign: 'center',
    },
    //     image: {
    //        width: 350,
    //        height: 250,
    //          borderRadius: 10,
    //      },
    //      container: {
    //       flex: 1,
    //        padding: 24,
    //         marginTop: 25,
    //       backgroundColor: '#fff',
    //       },

    //      title: {
    //         marginTop: 16,
    //         paddingVertical: 10,
    //        color: '#333333',
    //          textAlign: 'center',
    //           fontSize: 20,
    //       fontWeight: 'bold',
    //},
});

export default WelcomeScreen; 