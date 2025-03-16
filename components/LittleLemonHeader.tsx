import * as React from "react";
import { Text, View } from "react-native";

const LittleLemonHeader: React.FC = () => {
  return (
    <View style={{ flex: 0.2, backgroundColor: '#F4CE14' }}>
      <Text style={{ padding: 40, fontSize: 30, color: 'black', textAlign: 'center' }}>
        Little Lemon
      </Text>
    </View>
  );

}
export default LittleLemonHeader; 