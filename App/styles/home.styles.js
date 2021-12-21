import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  //-------------------------TITLE
  titleContainer: {
    marginTop: 10,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    color: "#2F4550",
  },
  titleWelcome: {
    fontSize: 16,
    color: "#BD5C1E",
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    width: "40%",
  },
  dropdown: {
    width: "60%",
  },
  buttonContainer: {
    flex: 1,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    marginTop: 200,
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  //-------------------------CARDS
  choirCardsContainer: {
    flex: 10,
    width: 380,
    alignItems: "center",
  },
  card: {
    height: 100,
    width: 330,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  loc: {
    fontWeight: "700",
  },
  choirTitle: {
    fontWeight: "700",
    color: "#586F7C",
  },
  choirDesc: {},
  seeMore: {
    color: "#BC9C22",
    alignSelf: "flex-start",
  },
  //-------------------------BUTTONS
  logo: {
    width: 300,
    height: 300,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  //------------------------------BUTTON
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
    width: 200,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default styles;
