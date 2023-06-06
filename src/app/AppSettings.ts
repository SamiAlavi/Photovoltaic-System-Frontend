class AppSettings {
    static SESSION_KEY = "token";

    private static BaseUrl = "http://localhost:3000/";
    private static ApiUrl = `${this.BaseUrl}api/`;
    private static AuthUrl = `${this.ApiUrl}`;

    static SignupUrl = `${this.AuthUrl}signup`;
    static SigninUrl = `${this.AuthUrl}signin`;
    static SignoutUrl = `${this.AuthUrl}signout`;

    static RouteDefault = "";
    static RouteSignup = "signup";
    static RouteSignin = "signin";
    static RouteProject = "project";
    static RouteDashboard = "dashboard";
}

export default AppSettings;
