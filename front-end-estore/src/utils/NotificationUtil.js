import {notification} from 'antd'

const openNotification = (type, message) => {
    notification[type]({
      message: type,
      description: message,
      duration : 3,
    });
  };
  
  
export default openNotification;