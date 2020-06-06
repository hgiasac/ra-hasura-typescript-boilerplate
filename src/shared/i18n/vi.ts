import englishMessages from "ra-language-english";

// https://marmelab.com/react-admin/Translation.html
export default {
  ...englishMessages,
  layout: {
    theme: {
      light: "sáng",
      dark: "tối"
    },
    menu: {
      users: "Users"
    }
  },
  common: {
    language: "language"
  },
  resources: {
    users: {
      name: "User"
    },
    configuration: {
      name: "configuration"
    }
  }
};
