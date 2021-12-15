import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { HomeStackNav } from "./HomeStackNav";
import { UserProfileStackNav } from "./UserProfileStackNav";
import ChoirGroubTabs from "./ChoirGroupTabNav";
import NotificationsScreen from "../Screens/NotificationsScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { LogoTitle } from "../components/LogoTitle";
import { NotificationBell } from "../components/NotificationBell";
import { auth } from "../../firebase";
import { getChoirs, getUserByUsername } from "../utils/api";
import { GetChoirNameByIdLabel } from "../components/GetChoirNameByIdLabel";
import { getChoirById } from "../utils/api";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const username = auth.currentUser.displayName;
  // const username = "genie"; // HARDCODED FOR NOW

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [choirIds, setChoirIds] = useState([]);
  const [groups, setGroups] = useState([]);

  // useFocusEffect(
  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(username)
      .then((user) => {
        setUser(user);
        setChoirIds(user.groups);
        setIsLoading(false);
      })
      .then(() => {
        return getChoirs();
      })
      .then((choirs) => {
        const myChoirs = choirs.filter((choir) => {
          return choirIds.includes(choir._id);
        });
        const myChoirs2 = myChoirs.map((choir) => {
          return { choirName: choir.name, choirId: choir._id };
        });
        setGroups(myChoirs2);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [username]);
  // );

  if (isLoading) {
    return (
      <Image
        style={styles.loading}
        source={{
          uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif",
        }}
      />
    );
  }

  console.log(groups);
  // access username here from auth - done
  // get request user by username which includes groups with choir ids - done
  // map through choir ids to get choir name
  // display the name as the drawer nav title and pass the choir id through to the screen
  // get choir names by username

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "black", // this changes the hamburger colour
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center", // this centers the logo on android
        headerRight: () => <NotificationBell />,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNav} />
      <Drawer.Screen name="Profile" component={UserProfileStackNav} />

      {/* this works!! */}
      {groups.map((group) => {
        return (
          <Drawer.Screen
            key={group.choirId}
            name={group.choirName}
            component={ChoirGroubTabs}
            initialParams={{ choirId: group.choirId }}
          />
        );
      })}

      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
