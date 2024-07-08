import React from 'react';
import PropTypes from "prop-types"
import { View, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CheckBox(props: any) {

  function handleChange() {
    const { onChange } = props;
    if (onChange) {
      return onChange();
    }
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleChange}>
        <View className={`border-gray-400 border-2 w-6 h-6 rounded-md ${props.value ? 'bg-blue-500' : ''} flex justify-center items-center`}>
          {
            props.value ? <FontAwesomeIcon size={12} style={{ color: props.iconColor ? props.iconColor : '#fff' }} icon={faCheck}/> : null
          }
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

CheckBox.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  iconColor: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  checkColor: PropTypes.string
}
