import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    paddingTop: 0,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
  },
  // -------------------------------- top name
  topName: {
    justifyContent: "flex-start",
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
  },
  titleName: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 2,
  },
  //--------------------------------AVATAR
  avatar: {
    height: 150,
    marginTop: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 75,
    marginTop: 68,
  },
  imageRandom: {
    width: 150,
    height: 150,
    marginTop: 60,
  },
  titleInfo: {
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
  },
  //--------------------------------NAME AND SURNAME
  nameSurname: {
    alignContent: "center",
    marginTop: 75,
    fontSize: 14,
  },
  //----------------------------------EDIT PROFILE BUTTON
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#B2DED9",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },

  // ----------------------------------------INFO
  basicInfo: {
    borderTopWidth: 2,
    backgroundColor: "#EBE2D8",
    borderColor: "#A6A19A",
    minHeight: 50,
    fontSize: 14,
    padding: 8,
    width: 350,
    alignSelf: "center",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  voice: {
    backgroundColor: "#DBDBDB",
    fontSize: 14,
    padding: 5,
    borderRadius: 6,
  },
  iconContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  singOutButtonContainer: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
});

export default styles;
