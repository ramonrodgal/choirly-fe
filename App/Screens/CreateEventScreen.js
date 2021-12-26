import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { postEventByChoir } from "../utils/api";
import { Feather } from "@expo/vector-icons";
import Background from "../components/Background";
import { useFocusEffect } from "@react-navigation/core";
import styles from "../styles/createEvent.styles";
import InputText from "../components/form/InputText";
import TextArea from "../components/form/TextArea";
import DatePicker from "../components/form/DatePicker";

export default function CreateEventScreen({ navigation, route }) {
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

  useFocusEffect(
    useCallback(() => {
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
    }, [startTime, endTime])
  );

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

    postEventByChoir(choirId, eventPost)
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Create an event</Text>

        <InputText
          label={"Title:"}
          placeholder={"Enter a title for your event here"}
          name={"title"}
          errorMessage={"A title is required."}
          errors={errors}
          control={control}
          required={true}
        />

        <InputText
          label={"Location:"}
          placeholder={"Enter a location here"}
          name={"location"}
          errorMessage={"A location is required."}
          errors={errors}
          control={control}
          required={true}
        />

        {/* //-------------------------------------------------------------TIME AND DATE */}

        <View style={styles.circles}>
          {Platform.OS === "ios" || dateOpen ? (
            <View style={styles.date}>
              <DateTimePicker
                value={date}
                display="default"
                onChange={dateChange}
                mode="date"
              />
              <Text style={styles.buttonText}>
                {date.toString().slice(0, 15)}
              </Text>
              <Feather name="calendar" size={24} color="#586F7C" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => {
                setDateOpen(true);
              }}
            >
              <Text style={styles.buttonText}>
                {date.toString().slice(4, 15)}
              </Text>
              <Feather name="calendar" size={24} color="#586F7C" />
            </TouchableOpacity>
          )}

          <DatePicker
            featherName={"calendar"}
            color={"#586F7C"}
            onPress={setDateOpen}
            text={date.toString().slice(4, 15)}
          />

          {/*
            <DatePicker
              featherName={"clock"}
              color={"#586F7C"}
              value={startTime}
              mode={"time"}
              onChange={startTimeChange}
              onPress={setStartTimeOpen}
              state={startTimeOpen}
            />
            */}
          {Platform.OS === "ios" || startTimeOpen ? (
            <View style={styles.time}>
              <DateTimePicker
                value={startTime}
                onDateChange={setStartTime}
                display="default"
                onChange={startTimeChange}
                mode="time"
              />
              <Text style={styles.buttonText}>
                From {startTime.toString().slice(16, 21)}
              </Text>
              <Feather name="clock" size={24} color="#586F7C" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setStartTimeOpen(true);
              }}
            >
              <Text style={styles.buttonText}>
                From {startTime.toString().slice(16, 21)}
              </Text>
              <Feather name="clock" size={24} color="#586F7C" />
            </TouchableOpacity>
          )}

          {Platform.OS === "ios" || endTimeOpen ? (
            <View style={styles.endTime}>
              <DateTimePicker
                value={endTime}
                onDateChange={setEndTime}
                display="default"
                onChange={endTimeChange}
                mode="time"
                minimumDate={startTime}
              />
              <Text style={styles.buttonText}>
                Until {endTime.toString().slice(16, 21)}
              </Text>
              <Feather name="clock" size={24} color="#586F7C" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEndTimeOpen(true);
              }}
            >
              <Text style={styles.buttonText}>
                Until {startTime.toString().slice(16, 21)}
              </Text>
              <Feather name="clock" size={24} color="#586F7C" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.labelType}>Type of event:</Text>
        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={type}
          items={items}
          setOpen={setOpen}
          setValue={setType}
          setItems={setItems}
          placeholder="Rehearsal"
        />

        <TextArea
          label={"Details:"}
          placeholder={"Enter a description here"}
          name={"details"}
          errorMessage={"Details about the event are required."}
          errors={errors}
          control={control}
          required={true}
        />

        {submitted ? (
          <View>
            <Text>Your event has been created</Text>

            <TouchableOpacity
              style={styles.buttonNormal}
              onPress={() => {
                navigation.navigate("Events");
              }}
            >
              <Text style={styles.buttonText}>Back to events</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.buttonNormal}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonTextLast}>Create an event</Text>
          </TouchableOpacity>
        )}
      </View>
    </Background>
  );
}
