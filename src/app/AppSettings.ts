class AppSettings {
    private static BaseUrl = "http://localhost:3000/";

    private static AuthUrl = `${this.BaseUrl}`;
    static SignupUrl = `${this.AuthUrl}signup`;
    static SigninUrl = `${this.AuthUrl}signin`;
    static SignoutUrl = `${this.AuthUrl}signout`;

    static RouteDefault = "";
    static RouteSignup = "signup";
    static RouteSignin = "signin";
    static RouteDashboard = "dashboard";
}

export default AppSettings;
