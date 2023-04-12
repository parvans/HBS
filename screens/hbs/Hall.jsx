import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Alert, Dimensions, Image, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Button, Icon, Input } from '../../components';
import { argonTheme } from '../../constants';
import Modal from 'react-native-modal';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { HallContext } from '../../context/HallContext';
import { ReasonContext } from '../../context/ReasonContext';
import Book from './Book';
const { width, height } = Dimensions.get("screen");

function Hall(props) {
  const { item } = props.route.params;
  const { navigation } = props;
  //console.log(item);
  const [isModalVisible, setModalVisible] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [openModal,setOpenModal]=useState(false)

  function showDatePicker() {
    setDatePicker(true);
  };
  function onDateSelected(event, value) {
    setDate(value);
    console.log(value);
    setDatePicker(false);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setDatePicker(true);
  };
  let context=useContext(HallContext)
    let reasonContext=useContext(ReasonContext)
const handleBook = () => {
  if(date===undefined){
    Alert.alert(
      "Error",
      "Please select date",
      [
        {
          text: "Cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
    )
  }else if(!reason){
    Alert.alert(
      "Error",
      "Please enter reason",
      [
        {
          text: "Cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
    )
  }else{
    setOpenModal(true)
    context.search.date=date
    reasonContext.search.reason=reason
  }
}

  return (
    <Block flex center style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <Block flex style={styles.modalCard}>
          {/* <Text bold size={28} color="#32325D">Hello!</Text>

          <Button onPress={toggleModal} >
            Close
          </Button> */}
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
                    {
                      datePicker && (
                        <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                      />)
                    }
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
        {openModal && <Book setOpenModel={setOpenModal} hall={item} date={date} navigation={navigation} />}
      </Modal>
      <Block flex>
        <Image source={{ uri: item.url }} style={styles.image} />
        <Block flex space="between" style={styles.cardDescription}>
          <Text size={30} style={styles.cardTitle}>{item.name}</Text>
          <Button color="primary" style={styles.button} onPress={toggleModal}>
            <Text bold size={14} color={theme.COLORS.WHITE}>
              Book
            </Text>
          </Button>
        </Block>          
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 500,
    // borderRadius: 150,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    justifyContent: 'center',
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    textAlign: 'center',
  },
  button: {
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  }
});

export default Hall;