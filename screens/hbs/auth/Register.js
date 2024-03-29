import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text } from "galio-framework";
import { Button, Icon, Input } from "../../../components";
import { argonTheme } from "../../../constants";
import Images from "../../../constants/Images";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { log } from "react-native-reanimated";
import Spinner from 'react-native-loading-spinner-overlay';
import { api } from "../../../api/apiService";
import { AlertNotificationRoot, ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../context/AuthContext";
const { width, height } = Dimensions.get("screen");

export default function Register(props) {
  const { navigation } = props;
  const {userToken}=useContext(AuthContext)
  const [deparments, setDepartments] = useState([])
  const depts = [
    "B.Sc Data Science", "BCA", "B.Sc Computer Science", "B.Sc Information Technology", "B.Com", "B.Com(CA)",
    "B.Com(IT)", "B.Com (Accounting & Finance)", "B.Com (Business Analytics)",
    "B.Com (Professional Accounting)", "B.Sc Maths", "M.Sc Maths", "B.Sc. Psychology", "B.Sc Biochemistry",
    "B.Sc Biotechnology", "B.Sc Microbiology", "B.Sc Nutrition and Dietetics", "B.Sc Internet of Things",
    "B.Sc Electronics & Communication System", "BBA", "BBA(CA)", "BBA(Logistics)", "B.A. English Literature"
    , "MCA", "M.Sc Computer Science", "MBA", "M.Com", "M.Com (Computer Applications)",
    "M.Com (International Business)", "M.Sc Biochemistry", "M.Sc Biotechnology", "M.Sc Microbiology",
    "M.Sc Foods & Nutrition", "M.Sc Applied Electronics", "M.A. English Literature",
  ]

  if (depts.length !== 0) {
    depts.map((item) => {
      deparments.push({ label: item, value: item })
    })
    // console.log(deparments)
  }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('hbs@123')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
// console.log('====================================');
// console.log(value);
// console.log('====================================');

  const handleRegDept = async() => {
    if(!name ||!email||!value){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'All fields are required',
        button: 'close',
      });
    }else if(!name){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Name is required',
        button: 'close',
      });
    }else if(!email){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Email is required',
        button: 'close',
      });
    }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3}$/.test(email)){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Invalid Email',
        button: 'close',
      });
    }else{
     try {
      if(name&&value&&email){
        setLoading(true)
        const res = await api.post('auth', {
          name: name,
          email: email,
          department: value,
          password: password,
        },
        {
          headers: {
            'token': userToken,
          },
        }
        )
        if(res.status===201){
          setLoading(false)
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: res.data.message,
            button: 'Ok',
            onPressButton: () => {
              navigation.navigate('Home')
            },
          });
        }else{
          setLoading(false)
          console.log(res.data);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: res.data.message,
            button: 'close',

          });
        }
      }
     } catch (error) {
      console.log(error)
     }
    }
  }
  return (
    <AlertNotificationRoot>
    <Block flex middle>
      <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex style={{ marginTop: 20 }}>
              <Block flex={0.17} middle>
                <Text color="black" size={30}>
                  Register
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Input
                      borderless
                      placeholder="Name"
                      value={name}
                      onChangeText={(text) => setName(text)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={deparments}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Select Department' : '...'}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <AntDesign
                          style={styles.icon}
                          color={isFocus ? 'blue' : 'black'}
                          name="Safety"
                          size={16}
                        />
                      )}
                    />
                  </Block>
                  <Block width={width * 0.8} >
                    <Input
                      borderless
                      placeholder="Email"
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={handleRegDept}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Register
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: "#F4F5F7",
    borderRadius: 20,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
