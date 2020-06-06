import englishMessages from "ra-language-english";

// https://marmelab.com/react-admin/Translation.html
export default {
  ...englishMessages,
  layout: {
    theme: {
      light: "light",
      dark: "dark"
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
