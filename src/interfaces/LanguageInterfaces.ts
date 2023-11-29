export interface ILanguage {
  login: {
    form: {
      title: string;
      email_input: string;
      password_input: string;
      forgot_password: string;
      button: string;
    };
    overlay: {
      title: string;
      subtitle: string;
      button: string;
      language: string;
    };
    ok: {
      result: string;
      title: string;
      message: string;
    };
    error: {
      result: string;
      title: string;
      message: string;
    };
  };
  register: {
    form: {
      title: string;
      switch: {
        client: string;
        provider: string;
        Business: string;
      };
      name_lastname_input: string;
      business_name_input: string;
      email_input: string;
      password_input: string;
      password_again_input: string;
      button: string;
    };
    overlay: {
      title: string;
      subtitle: string;
      button: string;
      language: string;
    };
    ok: {
      result: string;
      title: string;
      message: string;
    };
    error: {
      result: string;
      title: string;
      message: string;
    };
  };
  logout: {
    ok: {
      result: string;
      title: string;
      message: string;
    };
    error: {
      result: string;
      title: string;
      message: string;
    };
  };
}