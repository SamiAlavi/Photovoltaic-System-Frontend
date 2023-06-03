class AppSettings {
    private static BaseUrl = "http://localhost:3000/";

    private static AuthUrl = `${this.BaseUrl}auth/`;
    static SignupUrl = `${this.AuthUrl}signup/`;
    static SigninUrl = `${this.AuthUrl}signin/`;

    static RouteDefault = "";
    static RouteSignup = "signup";
    static RouteSignin = "signin";
}

export default AppSettings;
