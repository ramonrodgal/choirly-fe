import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { postEventByChoir } from "../utils/api";
import { NavigationContainer } from "@react-navigation/native";


export default function CreateEventScreen({ route }) {
  const { choirId, choirName } = route.params;

  // dates
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(date);
  const [endTime, setEndTime] = useState(date);
  const [duration, setDuration] = useState("");

  // android date picker states
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  // event type
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("rehearsal");
  const [items, setItems] = useState([
    { label: "Rehearsal", value: "rehearsal" },
    { label: "Performance", value: "performance" },
    { label: "Other", value: "other" },
  ]);

  // submitted state
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const durationMilliseconds = endTime - startTime;
    const durationHours = Math.floor(
      (durationMilliseconds % 86400000) / 3600000
    ); // hours
    const durationMins = Math.round(
      ((durationMilliseconds % 86400000) % 3600000) / 60000
    ); // minutes
    // this sometimes gives 59 mins instead of 1 hour so may want to try out other method

    // deals with singular/plural
    let h;
    if (durationHours === 1) {
      h = "1 hour ";
    } else if (durationHours > 1) {
      h = `${durationHours} hours `;
    } else {
      h = "";
    }

    // deals with singular/plural
    let m;
    if (durationMins === 1) {
      m = "1 minute";
    } else if (durationMins > 1) {
      m = `${durationMins} minutes`;
    } else {
      m = "";
    }

    // combining the date with the start time
    const dateString = date.toISOString().slice(0, 11);
    const timeString = startTime.toISOString().slice(11);
    const finalDate = new Date(`${dateString}${timeString}`);

    setDate(finalDate);
    setDuration(`${h}${m}`);
  }, [startTime, endTime]);

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDateOpen(false);
  };

  const startTimeChange = (event, selectedDate) => {
    const currentTime = selectedDate || date;
    setStartTime(currentTime);
    setStartTimeOpen(false);
  };

  const endTimeChange = (event, selectedDate) => {
    const currentTime = selectedDate || date;
    setEndTime(currentTime);
    setEndTimeOpen(false);
  };

  // from react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      details: "",
    },
  });

  const onSubmit = (data) => {
    const eventPost = { ...data, duration, date, type, choir: choirName };
    console.log(eventPost);

    postEventByChoir(choirId, eventPost)
      .then(() => {
        console.log("event sent");
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

      <Text style={styles.label}>Date: {date.toString().slice(0, 15)}</Text>
      {Platform.OS === "ios" || dateOpen ? (
        <View style={styles.date}>
          <DateTimePicker
            value={date}
            display="default"
            onChange={dateChange}
            mode="date"
          />
        </View>
      ) : (
        <Button
          title="Choose a date"
          onPress={() => {
            setDateOpen(true);
          }}
        />
      )}

      <Text style={styles.label}>
        Start time: {startTime.toString().slice(16, 21)}
      </Text>
      {Platform.OS === "ios" || startTimeOpen ? (
        <View style={styles.date}>
          <DateTimePicker
            value={startTime}
            onDateChange={setStartTime}
            // is24Hour={true}
            display="default"
            onChange={startTimeChange}
            mode="time"
            // minuteInterval="5"
          />
        </View>
      ) : (
        <Button
          title="Choose a start time"
          onPress={() => {
            setStartTimeOpen(true);
          }}
        />
      )}

      <Text style={styles.label}>
        End time: {endTime.toString().slice(16, 21)}
      </Text>
      {Platform.OS === "ios" || endTimeOpen ? (
        <View style={styles.date}>
          <DateTimePicker
            value={endTime}
            onDateChange={setEndTime}
            // is24Hour={true}
            display="default"
            onChange={endTimeChange}
            mode="time"
            minimumDate={startTime}
            // minuteInterval="5"
          />
        </View>
      ) : (
        <Button
          title="Choose an end time"
          onPress={() => {
            setEndTimeOpen(true);
          }}
        />
      )}

      <Text>Duration: {duration}</Text>

      <Text style={styles.label}>Type of event:</Text>
      <DropDownPicker
        open={open}
        value={type}
        items={items}
        setOpen={setOpen}
        setValue={setType}
        setItems={setItems}
        placeholder="Rehearsal"
      />

      <Text style={styles.label}>Details:</Text>
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
        name="details"
      />
      {errors.details && <Text>Details about the event are required.</Text>}

      <View style={styles.button}>
        {submitted ? (
          <View>
            <Text>Your event has been created</Text>
            <Button
              title="Back to events"
              onPress={() => {
                navigation.navigate("Events");
              }}
            />
          </View>
        ) : (
          <Button title="Create an event" onPress={handleSubmit(onSubmit)} />
        )}
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
