import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-base font-pmedium text-slate-200">{title}</Text>
      <View className="w-full h-12 px-4 bg-primary rounded-2xl focus:border-secondary items-center border border-white">
        <TextInput
          className="flex-1 text-white text-base font-psemibold w-full "
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" || title === "Confirm Password"}
        />
      </View>
    </View>
  );
};

export default FormField;
