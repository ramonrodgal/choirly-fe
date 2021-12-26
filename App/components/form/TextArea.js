import React from "react";
import { Text, View, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../styles/register.styles";

export default function TextArea({
  label,
  placeholder,
  name,
  errors,
  errorMessage,
  control,
  required = false,
  multiline = true,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputDesc}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={multiline}
          />
        )}
        name={name}
      />
      {errors[name] && <Text style={styles.warning}>{errorMessage}</Text>}
    </View>
  );
}
