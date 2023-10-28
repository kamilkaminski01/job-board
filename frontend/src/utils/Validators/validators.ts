export const valid = {
  required: {
    value: true,
    message: 'This field is required'
  },
  emailPattern: {
    value:
      /^(([^<>()[\]\\.,;: @"]+(\.[^<>()[\]\\.,;: @"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Incorrect email address'
  },
  passwordPattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/,
    message:
      'The password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
  },
  namesPattern: {
    value:
      /^[a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0148\u014a-\u017f]{1}[a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0148\u014a-\u017f ,.'-]{0,28}[a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0148\u014a-\u017f.]{1}$/,
    message: 'Incorrect format'
  },
  textFieldPattern: {
    value: /^\D*$/,
    message: 'This field can not contain digits'
  },
  githubPattern: {
    value: /^(https:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$/,
    message: 'Incorrect GitHub profile address'
  },
  linkedinPattern: {
    value: /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+$/,
    message: 'Incorrect LinkedIn profile address'
  },
  differentPasswordsMessage: 'Passwords are different',
  minLength: (length: number) => {
    return {
      value: length,
      message: `The minimum number of character for this field is: ${length}`
    }
  },
  maxLength: (length: number) => {
    return {
      value: length,
      message: `The maximum number of character for this field is: ${length}`
    }
  }
}
