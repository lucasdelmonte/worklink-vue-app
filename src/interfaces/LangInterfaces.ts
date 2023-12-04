interface MegamenuCategories {
  title: string;
  categories: Record<string, string>;
}

interface Megamenu {
  provider_categories: MegamenuCategories;
}

interface Header {
  megamenu: Megamenu;
  user: {
    view_profile: string;
    logout: string;
  };
}

interface LoginForm {
  title: string;
  email_input: string;
  password_input: string;
  forgot_password: string;
  button: string;
}

interface LoginOverlay {
  title: string;
  subtitle: string;
  button: string;
  language: string;
}

interface LoginOk {
  result: string;
  title: string;
  message: string;
}

interface LoginError {
  result: string;
  title: string;
  message: string;
}

interface Login {
  form: LoginForm;
  overlay: LoginOverlay;
  ok: LoginOk;
  error: LoginError;
}

interface RegisterFormSwitch {
  client: string;
  provider: string;
  business: string;
}

interface RegisterForm {
  title: string;
  switch: RegisterFormSwitch;
  name_lastname_input: string;
  business_name_input: string;
  email_input: string;
  password_input: string;
  password_again_input: string;
  button: string;
}

interface RegisterOverlay {
  title: string;
  subtitle: string;
  button: string;
  language: string;
}

interface RegisterOk {
  result: string;
  title: string;
  message: string;
}

interface RegisterError {
  result: string;
  title: string;
  message: string;
}

interface Register {
  form: RegisterForm;
  overlay: RegisterOverlay;
  ok: RegisterOk;
  error: RegisterError;
}

interface LogoutOk {
  result: string;
  title: string;
  message: string;
}

interface LogoutError {
  result: string;
  title: string;
  message: string;
}

interface Logout {
  ok: LogoutOk;
  error: LogoutError;
}

interface Lang {
  header: Header;
  login: Login;
  register: Register;
  logout: Logout;
}

export interface ILanguage {
  [key: string]: string | Lang;
}