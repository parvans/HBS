import React, { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../../components";
import { argonTheme } from "../../constants";
import Modal from "react-native-modal";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { HallContext } from "../../context/HallContext";
import { ReasonContext } from "../../context/ReasonContext";
import { api } from "../../api/apiService";
import { AuthContext } from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
const { width, height } = Dimensions.get("screen");

function Hall(props) {
  const { userToken, userInfo} = useContext(AuthContext);
  // console.log(userInfo.isAdmin);
  const decoded = jwtDecode(userToken);
  const { item } = props.route.params;
  const { navigation } = props;
  //console.log(item);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [hallName, setHallName] = useState(item.name);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [openModal, setOpenModal] = useState(false);
  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    setDate(value);
    //console.log(value);
    setDatePicker(false);
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setDatePicker(true);
  };
  const toggleUpdateModal = () => {
    setUpdateModalVisible(!isUpdateModalVisible);
  };
  const handleUpdate = async () => {
    try {
      const res = await api.put(`hall/${item._id}`, {
        name: hallName,
      });
      if (res.status === 200) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: res.data.message,
          button: "close",
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res.data.message,
          button: "close",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: "Are you sure?",
      textBody: "You want to delete this hall",
      button: "No",
      button: "Yes",
      onPressButton: () => {
        deleteHall();
      },
    });
    const deleteHall = async () => {
      try {
        const res = await api.delete(`hall/${item._id}`);
        if (res.status === 200) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: res.data.message,
            button: "Ok",
            onPressButton: () => {
              navigation.navigate("App");
            },
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: res.data.message,
            button: "close",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  };
  const handleBook = async () => {
    if (date === undefined) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please select date",
        button: "close",
      });
    } else if (!reason) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please enter reason",
        button: "close",
      });
    } else {
      try {
        const res = await api.post(`book/${item._id}`, {
          date: date,
          reason: reason,
          userId: decoded.id,
        });
        if (res.status === 201) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: res.data.message,
            button: "Ok",
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: res.data.message,
            button: "Ok",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <AlertNotificationRoot>
      <Block flex center style={styles.container}>
        {/* Book Modal */}
        <Modal isVisible={isModalVisible}>
          <Block flex style={styles.modalCard}>
            <Block flex style={{ marginTop: 20 }}>
              <Block flex={0.17} middle>
                <Text color="black" size={30}>
                  Book {item.name}
                </Text>
              </Block>
              <Block Block flex center>
                <KeyboardAvoidingView>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Text bold size={16} color="#32325D">
                      Select Date
                    </Text>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="YYYY-MM-DD"
                        value={date.toLocaleDateString()}
                        onChangeText={(text) => setDate(text)}
                      />
                      {datePicker && (
                        <DateTimePicker
                          value={date}
                          mode={"date"}
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
                          is24Hour={true}
                          onChange={onDateSelected}
                          style={styles.datePicker}
                        />
                      )}
                    </Block>
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Text bold size={16} color="#32325D">
                      Reason
                    </Text>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Reason"
                        value={reason}
                        onChangeText={(text) => setReason(text)}
                      />
                    </Block>
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={handleBook}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Book Now
                      </Text>
                    </Button>
                    <Button onPress={toggleModal}>Close</Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Modal>
        {/* Update Modal */}
        <Modal isVisible={isUpdateModalVisible}>
          <Block flex style={styles.modalCard}>
            <Block flex style={{ marginTop: 20 }}>
              <Block flex={0.17} middle>
                <Text color="black" size={30}>
                  Update {item.name}
                </Text>
              </Block>
              <Block Block flex center>
                <KeyboardAvoidingView>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Text bold size={16} color="#32325D">
                      Hall Name
                    </Text>
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Hall Name"
                        value={hallName}
                        onChangeText={(text) => setHallName(text)}
                      />
                    </Block>
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={handleUpdate}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Update
                      </Text>
                    </Button>
                    <Button onPress={toggleUpdateModal}>Close</Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Modal>
        <Block flex>
          <Image source={{ uri: item.url }} style={styles.image} />
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={30} style={styles.cardTitle}>
              {item.name}
            </Text>

            <Button color="primary" style={styles.button} onPress={toggleModal}>
              <Text bold size={14} color={theme.COLORS.WHITE}>
                Book
              </Text>
            </Button>
            {userInfo.isAdmin&&<>
              <Button
              color="secondary"
              style={styles.updateButton}
              onPress={toggleUpdateModal}
            >
              <Text bold size={14} color={theme.COLORS.WHITE}>
                Update
              </Text>
            </Button>
            <Button
              color="#ff5a5f"
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text bold size={14} color={theme.COLORS.WHITE}>
                Delete
              </Text>
            </Button>
              </>
            }
          </Block>
        </Block>
      </Block>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 400,
    // borderRadius: 150,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    justifyContent: "center",
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    textAlign: "center",
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "green",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  updateButton: {
    width: 100,
    height: 40,
    backgroundColor: "#F5CE0A",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  deleteButton: {
    width: 100,
    height: 40,
    backgroundColor: "#ff5a5f",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  inputIcons: {
    marginRight: 12,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});

export default Hall;
