import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

export default function CreateEventScreen() {
  const [date, setDate] = useState(new Date());

  const [startTime, setStartTime] = useState(date);
  const [endTime, setEndTime] = useState(date);

  const durationMilliseconds = endTime - startTime;
  const durationHours = Math.floor((durationMilliseconds % 86400000) / 3600000); // hours
  const durationMins = Math.round(
    ((durationMilliseconds % 86400000) % 3600000) / 60000
  ); // minutes
  console.log("hours:", durationHours, "minutes:", durationMins);
  // at the moment the start and end times are on the current date - this is fine to get duration but not perfect

  // need to change this and set a duration state which is the difference between start and end

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Rehearsal", value: "rehearsal" },
    { label: "Performance", value: "performance" },
    { label: "Other", value: "other" },
  ]);

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const startTimeChange = (event, selectedDate) => {
    const currentTime = selectedDate || date;
    setStartTime(currentTime);
  };

  const endTimeChange = (event, selectedDate) => {
    const currentTime = selectedDate || date;
    setEndTime(currentTime);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      date: "",
      type: "",
      description: "",
    },
  }); // all this is from useForm which is imported from react-hook-form
  const onSubmit = (data) => console.log(data); // on submit the data is logged

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create an event</Text>
      <Text style={styles.label}>Title:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter a title for your event here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text>A title is required.</Text>}

      <Text style={styles.label}>Location:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter a location here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="location"
      />
      {errors.location && <Text>A location is required.</Text>}

      <Text style={styles.label}>Date:</Text>
      <View style={styles.date}>
        <DateTimePicker
          value={date}
          display="default"
          onChange={dateChange}
          mode="date"
        />
      </View>

      <Text style={styles.label}>Start time:</Text>
      <View style={styles.date}>
        <DateTimePicker
          value={startTime}
          onDateChange={setStartTime}
          is24Hour={true}
          display="default"
          onChange={startTimeChange}
          mode="time"
        />
      </View>

      <Text style={styles.label}>End time:</Text>
      <View style={styles.date}>
        <DateTimePicker
          value={endTime}
          onDateChange={setEndTime}
          is24Hour={true}
          display="default"
          onChange={endTimeChange}
          mode="time"
        />
      </View>

      <Text style={styles.label}>Type of event:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {errors.type && <Text>A type is required.</Text>}

      <Text style={styles.label}>Description:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter a description here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {errors.description && <Text>A description is required.</Text>}

      <View style={styles.button}>
        <Button title="Create an event" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  label: {
    color: "black",
    padding: 0,
    margin: 2,
    marginLeft: 0,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "white",
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "beige",
    borderRadius: 4,
  },
  title: {
    fontWeight: "bold",
    padding: 10,
  },
  date: {
    flex: 1,
    width: "100%",
  },
});
