import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import React, { Component } from "react";
import RegisterPage from "../pages/RegisterPage";
import { LocaleProvider } from "../contexts/LocaleContext";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/api";

class ContactApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogut = this.onLogut.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  onLogut() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <header className="contact-app__header">
              <h1>
                {this.state.localeContext.locale === "id"
                  ? "Aplikasi Kontak"
                  : "Contacts App"}
              </h1>
            </header>

            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>
              {this.state.localeContext.locale === "id"
                ? "Aplikasi Kontak"
                : "Contacts App"}
            </h1>
            <Navigation
              logout={this.onLogut}
              name={this.state.authedUser.name}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}

export default ContactApp;
