const channelIcon = require('./channelIcon.svg');

export const colors = {
  darkGrey: '#4b4b50',
  darkPurple: '#7e00e8',
  green: '#22c731',
  grey: '#e4e4e9',
  lightGrey: '#f8f8f9',
  lightPurple: '#cb9af5',
  silver: '#c9c9d2',
  white: '#ffffff',
  yellow: '#ffc600'
};

export const loginStyle = {
  button: {
    backgroundColor: colors.darkPurple,
    border: `solid 1px ${colors.lightGrey}`,
    borderRadius: 6,
    color: colors.white,
    fontFamily: 'Rubik-Light',
    height: 40,
    width: 212
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.darkPurple,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%'
  },
  form: {
    height: 250,
    width: 212
  },
  input: {
    backgroundColor: colors.white,
    border: `solid 1px ${colors.grey}`,
    borderRadius: 6,
    boxShadow: `inset 0 1px 3px 0 ${colors.lightGrey}`,
    color: colors.silver,
    fontFamily: 'Rubik-Italic',
    fontSize: '16px',
    height: 40,
    marginBottom: 11,
    textAlign: 'center',
    width: 212
  },
  logo: {
    marginBottom: 29
  }
};

export const chatStyle = {
  chatContainer: {
    width: '100%'
  },
  container: {
    display: 'flex'
  },
  messages: {
    width: '100%'
  },
  sidebar: {
    width: 280
  }
};

export const headerStyle = {
  container: {
    backgroundColor: colors.lightGrey,
    display: 'flex',
    height: 80,
    padding: 20,
    width: '100%'
  },
  title: {
    color: colors.silver,
    fontSize: '26px',
    marginTop: 5
  },
  right: {
    alignItems: 'center',
    color: colors.darkPurple,
    display: 'flex',
    fontSize: '14px',
    marginLeft: 'auto',
    padding: '10px 0 11px 0'
  },
  username: {
    marginRight: 14
  }
};

export const messageStyle = {
  container: {
    base: {
      listStyleType: 'none',
      padding: '10px 20px 10px 20px'
    },
    mine: {
      textAlign: 'right'
    }
  },
  message: {
    base: {
      backgroundColor: colors.lightGrey,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      display: 'inline-block',
      marginTop: 16,
      padding: 20
    },
    mine: {
      backgroundColor: colors.darkPurple,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 0,
      color: colors.white
    }
  },
  header: {
    fontSize: '12px'
  },
  icon: {
    alignItems: 'center',
    border: `solid 1px ${colors.grey}`,
    borderRadius: '50%',
    color: colors.darkPurple,
    display: 'flex',
    flex: '0 0 20px',
    fontSize: '13px',
    height: 20,
    justifyContent: 'center',
    width: 20
  },
  iconContainer: {
    display: 'inline-block'
  },
  timestamp: {
    color: colors.silver,
    display: 'inline-block',
    marginRight: 13
  },
  username: {
    color: colors.darkPurple,
    display: 'inline-block',
    marginLeft: 13,
    marginRight: 5
  }
};

export const messagesStyle = {
  messages: {
    bottom: 80,
    left: 280,
    margin: 0,
    overflowY: 'scroll',
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 80
  },
  sendMessage: {
    backgroundColor: colors.lightGrey,
    borderTop: `1px solid ${colors.grey}`,
    bottom: 0,
    height: 80,
    left: 280,
    padding: 20,
    position: 'absolute',
    right: 0
  }
};

export const sendMessageStyle = {
  buttons: {
    marginTop: 10,
    textAlign: 'right'
  },
  button: {
    color: colors.darkPurple,
    height: 40,
    marginLeft: -70,
    padding: '0 16px 0 16px',
    position: 'absolute'
  },
  container: {
    display: 'flex',
    fontSize: '16px'
  },
  input: {
    borderRadius: 6,
    color: colors.darkGrey,
    width: '100%',
    height: 40,
    display: 'inline-block',
    padding: '10px 70px 10px 18px'
  }
};

export const sidebarStyle = {
  list: {
    bottom: 0,
    margin: 0,
    overflowY: 'scroll',
    padding: 0,
    position: 'absolute',
    top: 80,
    width: 280
  },
  search: {
    backgroundColor: colors.darkPurple,
    color: colors.white,
    fontSize: '20px',
    height: 80,
    padding: '28px 20px',
    width: 280
  }
};

export const sidebarItemStyle = {
  container: {
    base: {
      borderBottom: `1px solid ${colors.grey}`,
      borderRight: `1px solid ${colors.grey}`,
      cursor: 'pointer',
      display: 'flex',
      height: 80,
      listStyleType: 'none',
      padding: 20
    },
    channel: {
      backgroundColor: colors.white,
      borderLeft: `2px solid ${colors.white}`
    },
    selected: {
      borderLeft: `2px solid ${colors.darkPurple}`
    },
    user: {
      backgroundColor: colors.lightGrey,
      borderLeft: `2px solid ${colors.lightGrey}`
    }
  },
  iconContainer: {
    display: 'inline-block'
  },
  icon: {
    alignItems: 'center',
    border: `solid 1px ${colors.grey}`,
    borderRadius: '50%',
    display: 'flex',
    flex: '0 0 40px',
    height: 40,
    justifyContent: 'center',
    marginRight: 20,
    width: 40
  },
  channelIcon: {
    // Background properties. The background-image gets injected in JavaScript.
    backgroundImage: `url('${channelIcon}')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px 20px'
  },
  info: {
    width: 180
  },
  letterIcon: {
    color: colors.darkPurple,
    fontSize: '26px'
  },
  status: {
    base: {
      borderRadius: '50%',
      height: 6,
      marginLeft: 7,
      width: 6
    },
    offline: {
      backgroundColor: colors.silver
    },
    online: {
      backgroundColor: colors.green
    }
  },
  subtitle: {
    color: colors.silver,
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  time: {
    color: colors.silver,
    float: 'right',
    fontSize: '12px',
    marginTop: 6
  },
  title: {
    alignItems: 'center',
    color: colors.darkGrey,
    display: 'flex',
    fontSize: '14px',
    marginBottom: 4,
    marginTop: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  username: {
    color: colors.darkPurple
  }
};
