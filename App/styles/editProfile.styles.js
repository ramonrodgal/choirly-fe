import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    paddingTop: 0,
    backgroundColor: "white",
  },
  topName: {
    justifyContent: "flex-start",
  },
  avatar: {
    height: 100,
    marginTop: 5,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 75,
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
  },
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
    marginBottom: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  blueButton: {
    backgroundColor: "#B2DED9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 8,
    marginTop: 10,
  },
  basicInfo: {
    borderTopWidth: 2,
    backgroundColor: "#EBE2D8",
    borderColor: "#A6A19A",
    fontSize: 14,
    width: 330,
    alignSelf: "center",
    padding: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: 20,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  test: {
    backgroundColor: "white",
  },
});

export default styles;
