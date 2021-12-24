import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../styles/register.styles";

export default function InputText({
  label,
  placeholder,
  name,
  errors,
  errorMessage,
  control,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors[name] && <Text style={styles.warning}>{errorMessage}</Text>}
    </View>
  );
}
